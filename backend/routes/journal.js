const express = require("express");
const router = express.Router();

const Journal = require("../models/Journal");


// GET USER JOURNALS
router.get("/:userId", async (req, res) => {
  try {

    const journals = await Journal.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.json({
      journals,
      count: journals.length,
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});


// CREATE JOURNAL
router.post("/", async (req, res) => {
  try {

    const {
      userId,
      username,
      title,
      content,
      mood,
    } = req.body;

    const journal = new Journal({
      userId,
      username,
      title,
      content,
      mood,
    });

    await journal.save();

    res.status(201).json(journal);

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});


// DELETE JOURNAL
router.delete("/:id", async (req, res) => {
  try {

    await Journal.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Deleted",
    });

  } catch (err) {

    res.status(500).json({
      error: err.message,
    });

  }
});

module.exports = router;