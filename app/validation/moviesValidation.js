const Joi = require("joi");

const createTheater = Joi.object({
  theaterName: Joi.string().required().messages({
    "string.empty": "Theater name is required",
  }),

  location: Joi.string().required().messages({
    "string.empty": "Location is required",
  }),

  totalScreen: Joi.number().min(1).required().messages({
    "number.base": "Total screen must be a number",
    "number.min": "Theater must have at least 1 screen",
    "any.required": "Total screen is required",
  }),
});

const createMovie = Joi.object({
  theaterId: Joi.array()
    .items(Joi.string().hex().length(24))
    .min(1)
    .required()
    .messages({
      "array.base": "Theater ids must be an array",
      "array.min": "At least one theater is required",
      "any.required": "Theater is required",
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
  createTheater,
  createMovie,
};
