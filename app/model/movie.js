const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    theaterId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Theater",
      },
    ],

    movieName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    language: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },

    cast: {
      type: String,
      required: true,
      trim: true,
    },

    director: {
      type: String,
      required: true,
      trim: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
