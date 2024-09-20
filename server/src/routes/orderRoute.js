const express = require('express');
const router = express.Router();
const {createOrder} = require('../controllers/orderControls')

router.post('/orders', createOrder)

module.exports = router