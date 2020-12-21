const router = require('express').Router();
const {
  getCards, postCard, deleteCard, likeCard, dislikeCard, removeDislikeCard, removeLikeCard,
} = require('../controllers/cards');
const {
  updateCardValidator,
  postCardValidator,
} = require('../utils/request-validators');

router.delete('/:id', updateCardValidator, deleteCard);
router.get('/', getCards);
router.post('/', postCardValidator, postCard);
router.put('/:cardId/likes', likeCard);
router.delete('/:cardId/likes', removeLikeCard);
router.put('/:cardId/dislikes', dislikeCard);
router.delete('/:cardId/dislikes', removeDislikeCard);

module.exports = router;
