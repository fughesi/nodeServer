const Joi = require("joi");

const contactValidation = Joi.object({
  // user_id: Joi.number().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
});

const userValidation = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { contactValidation, userValidation };
