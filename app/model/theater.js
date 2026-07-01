const mongoose = require("mongoose");

const theaterSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    theaterName: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
    },

    totalScreen: {
      type: Number,
      min: [1, "Theater minimum have 1 screen"],
    },
  },
  { timestamps: true, versionKey: false },
);

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
