const express = require('express');
const router = express.Router();
const {getAllUsers, getAllProducts} = require('../controllers/adminController');
router.get('/users', getAllUsers)

module.exports = router;