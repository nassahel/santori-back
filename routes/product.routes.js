const express = require('express');
const { createProduct, getAllProducts, deleteProduct, getProductsByCategory, editProduct } = require('../controllers/products.controllers');
const authenticate = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/', authenticate, createProduct);
router.get('/', authenticate, getAllProducts);
router.get('/:category', getProductsByCategory);
router.delete('/:id', authenticate, deleteProduct);
router.put('/:id', authenticate, editProduct)



module.exports = router;