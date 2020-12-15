const Card = require('../models/card');
const { NotFoundError, ForbiddenError } = require('../errors/index');

module.exports.getCards = (req, res, next) => {
  Card.find()
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('карточки не найдены'))
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: { _id: req.user._id },
  })
    .then((card) => res.status(200).send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findById(id)
    .orFail(new NotFoundError('карточка не найдена'))
    .then((card) => {
      if (!card.owner.equals(req.user._id)) return Promise.reject(new ForbiddenError('нельзя удалить чужую карточку'));
      return Card.findByIdAndRemove(id);
    })
    .then((card) => res.status(200).send({ data: card }))
    .catch(next);
};

const handleLike = (method) => (req, res, next) => {
  const message = method === '$addToSet'
    ? 'лайк!'
    : 'лайк, только наоборот(';

  Card.findByIdAndUpdate(
    req.params.cardId,
    { [method]: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .orFail(new NotFoundError('карточка не найдена'))
    .then((card) => {
      res.status(200).send({ card, message });
    })
    .catch(next);
};

module.exports.likeCard = handleLike('$addToSet');
module.exports.dislikeCard = handleLike('$pull');
