const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  },

  theaterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Theater",
  },

  screen: {
    type: Number,
  },

  showDate: {
    type: Date,
  },

  showTime: {
    type: String,
  },

  endTime: {
    type: String,
  },

  ticketPrice: {
    type: Number,
  },

  totalSeats: {
    type: Number,
  },

  availableSeats: {
    type: Number,
  },
});

const Show = mongoose.model("Show", showSchema);
module.exports = Show;
