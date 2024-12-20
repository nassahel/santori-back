const express = require('express');
const { createUser, getAllUsers, deleteUser, getUserById } = require('../controllers/user.controllers');
const authenticate = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/', createUser);
router.get('/', authenticate, getAllUsers);
router.get('/:userId', authenticate, getUserById);
router.delete('/:id', deleteUser);



module.exports = router;