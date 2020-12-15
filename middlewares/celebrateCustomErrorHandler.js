const { isCelebrateError } = require('celebrate');

const celebrateCustomErrorHandler = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    res.status(400).send({
      message: 'Переданные данные не прошли валидацию',
    });
  }
  next(err);
};

module.exports = celebrateCustomErrorHandler;
