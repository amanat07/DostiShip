const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  profilePic: {   // ✅ ADD THIS ONLY
    type: String
  },
  interests: {
  type: [String],
  default: []
}
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);