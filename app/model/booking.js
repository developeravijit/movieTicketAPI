const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    showId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true,
    },

    seats: [
      {
        row: String,
        seatNo: Number,
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
