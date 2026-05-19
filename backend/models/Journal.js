const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
    },

    title: {
      type: String,
      default: "Untitled Entry",
    },

    content: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      default: "neutral",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Journal",
  journalSchema
);