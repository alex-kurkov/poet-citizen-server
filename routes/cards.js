const router = require('express').Router();
const {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const {
  updateCardValidator,
  postCardValidator,
} = require('../utils/request-validators');

router.delete('/:id', updateCardValidator, deleteCard);
router.get('/', getCards);
router.post('/', postCardValidator, postCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
