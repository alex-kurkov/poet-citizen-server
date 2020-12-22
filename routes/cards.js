const router = require('express').Router();
const auth = require('../middlewares/auth');

const {
  getCards, postCard, deleteCard, likeCard, dislikeCard, removeDislikeCard, removeLikeCard,
} = require('../controllers/cards');
const {
  updateCardValidator,
  postCardValidator,
} = require('../utils/request-validators');

router.delete('/:id', updateCardValidator, auth, deleteCard);
router.get('/', getCards);
router.post('/', postCardValidator, auth, postCard);
router.put('/:cardId/likes', auth, likeCard);
router.delete('/:cardId/likes', auth, removeLikeCard);
router.put('/:cardId/dislikes', auth, dislikeCard);
router.delete('/:cardId/dislikes', auth, removeDislikeCard);

module.exports = router;
