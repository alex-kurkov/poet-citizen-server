const User = require('../models/user');
const { NotFoundError } = require('../errors/index');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .orFail()
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(new NotFoundError('пользователь не найден'))
    .select()
    .then((user) => res.status(200).send({ data: user }))
    .catch(next);
};

module.exports.patchAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(new NotFoundError('пользователь не найден'))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch(next);
};
