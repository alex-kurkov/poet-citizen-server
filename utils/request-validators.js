const { celebrate, Joi } = require('celebrate');

const loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string(),
  }),
});

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const updateCardValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required(),
  }),
  cookies: Joi.object().keys({
    jwt: Joi.string().required(),
  }).unknown(),
});
const postCardValidator = celebrate({
  body: Joi.object().keys({
    rhyme: Joi.string().min(2).max(3000).required(),
    link: Joi.string().uri(),
  }),
});
const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = {
  loginValidator,
  signupValidator,
  updateCardValidator,
  postCardValidator,
  updateUserValidator,
  getUserByIdValidator,
};
