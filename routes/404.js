const router = require('express').Router();
const notFound = require('../controllers/404');

router.all('', notFound);

module.exports = router;
