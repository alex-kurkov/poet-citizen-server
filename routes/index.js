const router = require('express').Router();
const auth = require('../middlewares/auth');
const { loginValidator, signupValidator } = require('../utils/request-validators');
const createUser = require('../controllers/createUser');
const login = require('../controllers/login');
const logout = require('../controllers/logout');
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const notFoundRouter = require('./404');

router.post('/signup', signupValidator, createUser);
router.post('/signin', loginValidator, login);
router.post('/signout', logout);
router.use('/cards', auth, cardsRouter);
router.use('/users', auth, usersRouter);
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
router.use('*', notFoundRouter);

module.exports = router;
