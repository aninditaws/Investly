// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser, loginUser} = require('../controllers/userController');

// Mendapatkan semua pengguna
router.get('/', getUsers);

// Menambah pengguna baru
router.post('/register', createUser);
router.post('/login', loginUser);

module.exports = router;
