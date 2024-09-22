const express = require('express');
const router = express.Router();
const {createOrder, getOrderHistory} = require('../controllers/orderControls')

router.post('/orders', createOrder)
router.get('/orders_history',getOrderHistory )

module.exports = router