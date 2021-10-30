const Joi = require('joi');

const signupValidation = (request) => {
  const schema = Joi.object({
    username: Joi.string().required().min(4).max(16),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})',
        ),
      ),
  });

  // Validation
  const { error, value } = schema.validate(request.body);

  return { error, value };
};

const loginValidation = (request) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  // Validation
  const { error, value } = schema.validate(request.body);

  return { error, value };
};

module.exports.signupValidation = signupValidation;
module.exports.loginValidation = loginValidation;
