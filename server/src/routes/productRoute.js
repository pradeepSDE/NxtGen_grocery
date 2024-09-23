const express = require('express');
const { createProduct, getProducts, fetchProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/createproduct',createProduct)
router.get('/getproduct/:productId',getProducts)
router.get('/fetchproducts',fetchProducts)

module.exports = router