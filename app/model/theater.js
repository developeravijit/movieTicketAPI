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
      required: true,
      min: [1, "Theater must have at least 1 screen"],
    },

    screen: [
      {
        screenNumber: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        totalSeats: {
          type: Number,
          required: true,
        },
        seats: [
          {
            seatNumber: String,
            seatType: {
              type: String,
              enum: ["Regular", "Premium", "Recliner"],
            },
            price: Number,
          },
        ],
      },
    ],
  },
  { timestamps: true, versionKey: false },
);

const Theater = mongoose.model("Theater", theaterSchema);

module.exports = Theater;
