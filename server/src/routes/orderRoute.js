const express = require('express');
const router = express.Router();
const {createOrder, getOrderHistory} = require('../controllers/orderControls');
const { updateAddress } = require('../controllers/profileController');
const { createPayment } = require('../controllers/paymentControl');

router.post('/orders', createOrder)
router.get('/orders_history',getOrderHistory )
router.put('/users/:id', updateAddress)
// router.post('/payment',createPayment)
module.exports = router