const express = require('express');
const authenticate = require('../middlewares/auth.middleware');
const { createOrder, getAllOrders, getOrderById, deleteOrder, activeInactiveOrder } = require('../controllers/order.controllers');
const router = express.Router();


router.post('/', authenticate, createOrder);
router.get('/', authenticate, getAllOrders);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrder);
router.patch('/:id', authenticate, activeInactiveOrder);



module.exports = router;