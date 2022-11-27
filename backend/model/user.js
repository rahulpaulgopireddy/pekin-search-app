const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// UserSchema export model
module.exports = mongoose.model("user", UserSchema);
