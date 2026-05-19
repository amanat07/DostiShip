const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const upload = require("../middleware/upload");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "No token",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.userId;

    req.user = {
      userId: decoded.userId,
    };

    next();

  } catch {

    res.status(401).json({
      error: "Invalid token",
    });

  }
};

// ================= CREATE POST =================
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {

    try {

      const { caption } = req.body;

      const newPost = new Post({
        username: req.body.username,

        user: req.userId,
        caption,

        image: req.file
          ? req.file.path
          : "",
      });

      await newPost.save();

      res.json({
        message: "Post created",
        post: newPost,
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

// ================= GET ALL POSTS =================
router.get("/", async (req, res) => {
  try {

    const posts = await Post.find()
      .populate(
        "user",
        "username name email profilePic"
      )
      .populate(
        "comments.user",
        "username name email profilePic"
      )
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

// ================= GET SINGLE POST =================
router.get("/:id", async (req, res) => {
  try {

    const post = await Post.findById(
      req.params.id
    )
      .populate(
        "user",
        "username name email profilePic"
      )
      .populate(
        "comments.user",
        "username name email profilePic"
      );

    if (!post) {
      return res.status(404).json({
        error: "Post not found",
      });
    }

    res.json(post);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

// ================= DELETE POST =================
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {

    try {

      const post = await Post.findById(
        req.params.id
      );

      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }

      // ONLY OWNER CAN DELETE
      if (
        String(post.user) !==
        String(req.user.userId)
      ) {
        return res.status(403).json({
          error: "Unauthorized",
        });
      }

      await Post.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message: "Post deleted",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

// ================= LIKE / UNLIKE =================
router.put(
  "/:id/like",
  authMiddleware,
  async (req, res) => {

    try {

      const post = await Post.findById(
        req.params.id
      );

      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }

      const alreadyLiked =
        post.likes.some(
          (id) =>
            String(id) ===
            String(req.userId)
        );

      if (alreadyLiked) {

        post.likes =
          post.likes.filter(
            (id) =>
              String(id) !==
              String(req.userId)
          );

      } else {

        post.likes.push(req.userId);

      }

      await post.save();

      res.json({
        likes: post.likes.length,
        liked: !alreadyLiked,
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

// ================= ADD COMMENT =================
router.post(
  "/:id/comment",
  authMiddleware,
  async (req, res) => {

    try {

      const { text } = req.body;

      if (!text) {
        return res.status(400).json({
          error: "Comment text required",
        });
      }

      const post = await Post.findById(
        req.params.id
      );

      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }

      post.comments.push({
        user: req.userId,
        text,
      });

      await post.save();

      const updated =
        await Post.findById(
          req.params.id
        ).populate(
          "comments.user",
          "username name email profilePic"
        );

      const newComment =
        updated.comments[
          updated.comments.length - 1
        ];

      res.json({
        message: "Comment added",
        comment: newComment,
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

// ================= DELETE COMMENT =================
router.delete(
  "/comment/:postId/:commentId",
  authMiddleware,
  async (req, res) => {

    try {

      const post =
        await Post.findById(
          req.params.postId
        );

      if (!post) {
        return res.status(404).json({
          error: "Post not found",
        });
      }

      const comment =
        post.comments.id(
          req.params.commentId
        );

      if (!comment) {
        return res.status(404).json({
          error: "Comment not found",
        });
      }

      // ONLY COMMENT OWNER
      if (
        String(comment.user) !==
        String(req.user.userId)
      ) {
        return res.status(403).json({
          error: "Unauthorized",
        });
      }

      comment.deleteOne();

      await post.save();

      res.json({
        message: "Comment deleted",
      });

    } catch (err) {

      res.status(500).json({
        error: err.message,
      });

    }
  }
);

module.exports = router;