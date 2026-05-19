const router = require("express").Router();

const Message = require("../models/Message");

// SAVE MESSAGE
router.post("/", async (req, res) => {

  try {

    const {
      from,
      to,
      message,
    } = req.body;

    const newMessage =
      await Message.create({
        from,
        to,
        message,
      });

    res.json(newMessage);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

// GET CHAT HISTORY
router.get(
  "/:from/:to",
  async (req, res) => {

    try {

      const messages =
        await Message.find({
          $or: [
            {
              from:
                req.params.from,
              to:
                req.params.to,
            },

            {
              from:
                req.params.to,
              to:
                req.params.from,
            },
          ],
        }).sort({
          createdAt: 1,
        });

      res.json(messages);

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

module.exports = router;