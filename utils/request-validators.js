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
    about: Joi.string(),
    avatar: Joi.string().uri(),
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
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().uri().required(),
  }),
});
const patchAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
});
const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(300).required(),
  }),
});

module.exports = {
  loginValidator,
  signupValidator,
  updateCardValidator,
  postCardValidator,
  patchAvatarValidator,
  updateUserValidator,
  getUserByIdValidator,
};
