const Joi = require("joi");

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const Register = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be atleast 3 characters",
    "string.max": "Name cannot exceed 20 characters",
  }),

  email: Joi.string().lowercase().required().messages({
    "string.empty": "Name is required",
    "string.lowercase": "Email must be in lowercase format",
  }),

  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Name is required",
    "string.pattern.base":
      "Password must be atleast 1 Uppercase, 1 Lowercase, 1 Special Character, 1 Number & minimum 8 Digit",
  }),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.length": "Phone number must be 10 digits",
      "string.pattern.base": "Invalid phone number",
    }),
});

const Login = Joi.object({
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "Name is required",
    "string.lowercase": "Email must be in lowercase format",
  }),

  otp: Joi.number().integer().required().messages({
    "number.base": "OTP must be a number",
    "any.required": "OTP is required",
  }),
});

module.exports = {
  Register,
  Login,
};
