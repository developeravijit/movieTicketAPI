const Joi = require("joi");

const createTheater = Joi.object({
  theaterName: Joi.string().trim().min(3).required().messages({
    "string.empty": "Theater name is required",
    "string.min": "Theater name must be at least 3 characters",
    "any.required": "Theater name is required",
  }),

  location: Joi.string().trim().required().messages({
    "string.empty": "Location is required",
    "any.required": "Location is required",
  }),

  totalScreen: Joi.number().integer().min(1).required().messages({
    "number.base": "Total screen must be a number",
    "number.integer": "Total screen must be an integer",
    "number.min": "Theater must have at least 1 screen",
    "any.required": "Total screen is required",
  }),

  screens: Joi.array()
    .min(1)
    .items(
      Joi.object({
        rows: Joi.array()
          .min(1)
          .items(
            Joi.object({
              row: Joi.string().trim().uppercase().required().messages({
                "string.empty": "Row is required",
                "any.required": "Row is required",
              }),

              totalSeats: Joi.number().integer().min(1).required().messages({
                "number.base": "Total seats must be a number",
                "number.integer": "Total seats must be an integer",
                "number.min": "Row must have at least one seat",
                "any.required": "Total seats is required",
              }),

              seatType: Joi.string()
                .valid("Regular", "Premium", "Recliner")
                .required()
                .messages({
                  "any.only": "Seat type must be Regular, Premium or Recliner",
                  "any.required": "Seat type is required",
                }),

              price: Joi.number().min(0).required().messages({
                "number.base": "Price must be a number",
                "number.min": "Price cannot be negative",
                "any.required": "Price is required",
              }),
            }),
          )
          .required(),
      }),
    )
    .length(Joi.ref("totalScreen"))
    .required()
    .messages({
      "array.base": "Screens must be an array",
      "array.min": "At least one screen is required",
      "array.length": "Screens count must match totalScreen",
      "any.required": "Screens are required",
    }),
});

const createMovie = Joi.object({
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

const assignMovie = Joi.object({
  movieId: Joi.string().required().messages({
    "string.empty": "Movie Id is required",
  }),

  theaterId: Joi.string().required().messages({
    "string.empty": "Movie Id is required",
  }),

  screen: Joi.number().integer().min(1).required().messages({
    "string.empty": "Movie Id is required",
  }),

  showDate: Joi.string().required().messages({
    "string.empty": "Movie Id is required",
  }),

  showTime: Joi.string().required().messages({
    "string.empty": "Movie Id is required",
  }),

  endTime: Joi.string().required().messages({
    "string.empty": "Movie Id is required",
  }),
});

module.exports = {
  createTheater,
  createMovie,
  assignMovie,
};
