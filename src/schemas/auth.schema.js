const joi = require('joi');

const signupSchema = joi.object({
  username: joi.string().min(3).max(50).required(),
  email:    joi.string().email().required(),
  password: joi.string().min(8).required()
});

const loginSchema = joi.object({
  email:    joi.string().email().required(),
  password: joi.string().required()
});

module.exports = { signupSchema, loginSchema };