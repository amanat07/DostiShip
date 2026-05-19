const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");

// ================= REGISTER =================
router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    const { name, username, email, password, gender } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: req.file ? req.file.path : ""
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        gender: user.gender,
        profilePic: user.profilePic
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [
        { username },
        { email: username }
      ]
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        interests: user.interests,
        gender: user.gender,
        profilePic: user.profilePic
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ================= GET PROFILE =================
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json({ user });

  } catch (err) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

// ================= SAVE INTERESTS =================
router.post("/interests", authMiddleware, async (req, res) => {
  try {
    const { interests } = req.body;

    if (!interests || !interests.length) {
      return res.status(400).json({
        error: "Please select at least one interest"
      });
    }

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { interests },
      { new: true }
    ).select("-password");

    res.json({
      message: "Interests saved",
      user
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// ================= GET INTERESTS =================
router.get("/interests", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select("interests");

    if (!user) {
      return res.status(404).json({
        error: "User not found"
      });
    }

    res.json({
      interests: user.interests
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});
router.put("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { username, password, interests } = req.body;

    const updateData = {};

    if (username) updateData.username = username;

    if (interests) updateData.interests = interests;

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      updateData,
      { new: true }
    ).select("-password");

    res.json({
      message: "Profile updated",
      user: updatedUser,
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;