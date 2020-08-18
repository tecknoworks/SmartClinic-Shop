var express = require('express');
var router = express.Router();

const cartRouter = require('./cart');

router.use('/cart', cartRouter);

module.exports = router;
