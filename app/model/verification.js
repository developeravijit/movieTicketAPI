const mongoose = require("mongoose");

const verificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  token: {
    type: String,
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: "15m",
  },
});

const Verify = mongoose.model("Verify", verificationSchema);

module.exports = Verify;
