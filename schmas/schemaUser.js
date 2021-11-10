const Joi = require('joi');

module.exports = {
  UserSchema: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).max(20).required(),
  }),
};
