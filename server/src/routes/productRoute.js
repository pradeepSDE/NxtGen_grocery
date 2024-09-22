const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/createproduct',createProduct)
router.get('/getproduct/:productId',getProducts)

module.exports = router