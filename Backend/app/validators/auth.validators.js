const Joi = require("joi");

const registerSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d).{8,}$/)
    .message(
      "Password must be at least 8 characters long and include both letters and numbers"
    )
    .required(),
  city: Joi.string().required(),
  phone: Joi.number().integer().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
