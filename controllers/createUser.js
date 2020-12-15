const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { AuthorizationError } = require('../errors/index');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  if (!email || !password) throw new AuthorizationError('не предоставлены email или пароль');
  bcrypt.hash(password, 12)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then(({ _id }) => User.findById(_id).select())
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports = createUser;
