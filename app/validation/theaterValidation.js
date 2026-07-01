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

module.exports = { createTheater };
