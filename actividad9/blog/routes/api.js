const router = require('express').Router();

router.use('/autores', require('./api/autores'));

module.exports = router;