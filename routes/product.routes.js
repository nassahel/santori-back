const express = require('express');
const { createProduct, getAllProducts, deleteProduct } = require('../controllers/products.controllers');
const authenticate = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/', authenticate, createProduct);
router.get('/', getAllProducts);
router.delete('/:id', authenticate, deleteProduct);



module.exports = router;