const Joi = require("joi");

const createMovie = Joi.object({
  theaterId: Joi.string().hex().length(24).required().messages({
    "string.empty": "Theater is required",
    "string.length": "Invalid theater id",
  }),

  movieName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Movie name is required",
    "string.min": "Movie name must be at least 3 characters",
    "string.max": "Movie name cannot exceed 50 characters",
  }),

  genre: Joi.string().required().messages({
    "string.empty": "Genre is required",
  }),

  language: Joi.string().required().messages({
    "string.empty": "Language is required",
  }),

  duration: Joi.number().min(1).required().messages({
    "number.base": "Duration must be a number",
    "number.min": "Duration must be greater than 0",
    "any.required": "Duration is required",
  }),

  cast: Joi.string().required().messages({
    "string.empty": "Cast is required",
  }),

  director: Joi.string().required().messages({
    "string.empty": "Director is required",
  }),

  releaseDate: Joi.date().required().messages({
    "date.base": "Invalid release date",
    "any.required": "Release date is required",
  }),
});

module.exports = {
  createMovie,
};
