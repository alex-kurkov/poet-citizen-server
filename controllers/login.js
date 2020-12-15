const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const { AuthorizationError } = require('../errors/index');

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AuthorizationError('не предоставлены email или пароль');
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev',
        { expiresIn: '7d' },
      );
      res
      /*         .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
        }) */
        .status(200)
        .send({ message: 'авторизация успешна!', email: user.email, token });
    })
    .catch(next);
};

module.exports = login;
