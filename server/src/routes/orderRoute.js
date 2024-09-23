const express = require('express');
const router = express.Router();
const {createOrder, getOrderHistory} = require('../controllers/orderControls');
const { updateAddress } = require('../controllers/profileController');

router.post('/orders', createOrder)
router.get('/orders_history',getOrderHistory )
router.put('/users/:id', updateAddress)

module.exports = router