const express = require('express');
const { createProduct, getAllProducts, deleteProduct, getProductsByCategory } = require('../controllers/products.controllers');
const authenticate = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/', createProduct);
router.get('/', authenticate, getAllProducts);
router.get('/:category', getProductsByCategory);
router.delete('/:id', deleteProduct);



module.exports = router;