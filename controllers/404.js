const { NotFoundError } = require('../errors/index');

const notFound = (req, res, next) => {
  Promise.reject(new NotFoundError('Запрашиваемый ресурс не найден'))
    .catch(next);
};

module.exports = notFound;
