const express = require('express');
const { createUser, getAllUsers, deleteUser } = require('../controllers/user.controllers');
const authenticate = require('../middlewares/auth.middleware');
const router = express.Router();


router.post('/', createUser);
router.get('/', authenticate, getAllUsers);
router.delete('/:id', authenticate, deleteUser);



module.exports = router;