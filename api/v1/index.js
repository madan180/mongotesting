const router = require('express').Router();

router.use('/products', require('./products'));

router.use('/vendors', require('./vendors'));

module.exports = router;