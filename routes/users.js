const router = require('express').Router();
const {
  getUsers, getUser, updateUser, getUserById,
} = require('../controllers/users');
const {
  updateUserValidator,
  getUserByIdValidator,
} = require('../utils/request-validators');

router.get('/me', getUser);
router.get('/:id', getUserByIdValidator, getUserById);
router.get('/', getUsers);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
