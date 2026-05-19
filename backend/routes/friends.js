const express = require("express");
const router = express.Router();

const User = require("../models/User");
const FriendRequest =
require("../models/FriendRequest");

const authMiddleware =
require("../middleware/authMiddleware");


router.get(
  "/suggestions",
  authMiddleware,
  async (req, res) => {

    try {

      const myId =
        req.user.userId;

      const requests =
        await FriendRequest.find({
          $or: [
            { from: myId },
            { to: myId },
          ],
        });

      const excludedIds =
        requests.flatMap((r) => [
          r.from.toString(),
          r.to.toString(),
        ]);

      excludedIds.push(
        myId.toString()
      );

      const users =
        await User.find({
          _id: {
            $nin: excludedIds,
          },
        }).select(
          "name username interests profilePic"
        );

      res.json(users);

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);




// SEND REQUEST
router.post(
  "/send/:id",
  authMiddleware,
  async (req, res) => {

    try {

      // PREVENT SELF REQUEST
      if (
        req.user.userId ===
        req.params.id
      ) {

        return res.status(400).json({
          error:
            "Cannot send request to yourself",
        });

      }

      // PREVENT DUPLICATES BOTH WAYS
      const existing =
        await FriendRequest.findOne({
          $or: [
            {
              from:
                req.user.userId,
              to:
                req.params.id,
            },
            {
              from:
                req.params.id,
              to:
                req.user.userId,
            },
          ],
        });

      if (existing) {

        return res.status(400).json({
          error:
            "Friend request already exists",
        });

      }

      const request =
        new FriendRequest({
          from:
            req.user.userId,
          to:
            req.params.id,
        });

      await request.save();

      res.json({
        message:
          "Friend request sent",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);


// GET REQUESTS
router.get(
  "/requests",
  authMiddleware,
  async (req, res) => {

    try {

      const requests =
        await FriendRequest.find({
          to: req.user.userId,
          status: "pending",
        }).populate(
          "from",
          "name username interests profilePic"
        );

      res.json(requests);

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);


// ACCEPT

router.put(
  "/accept/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const request =
        await FriendRequest.findById(
          req.params.id
        );

      if (!request) {

        return res.status(404).json({
          error:
            "Request not found",
        });

      }

      // UPDATE STATUS
      request.status =
        "accepted";

      await request.save();

      // ADD BOTH USERS
      await User.findByIdAndUpdate(
        request.from,
        {
          $addToSet: {
            friends: request.to,
          },
        }
      );

      await User.findByIdAndUpdate(
        request.to,
        {
          $addToSet: {
            friends:
              request.from,
          },
        }
      );

      res.json({
        message:
          "Friend request accepted",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);




// DECLINE
router.put(
  "/decline/:id",
  authMiddleware,
  async (req, res) => {

    try {

      await FriendRequest.findByIdAndUpdate(
        req.params.id,
        {
          status: "declined",
        }
      );

      res.json({
        message:
          "Declined",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

module.exports = router;