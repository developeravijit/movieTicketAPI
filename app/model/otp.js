const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  otp: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
