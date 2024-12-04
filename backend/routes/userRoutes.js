// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');

// Mendapatkan semua pengguna
router.get('/', getUsers);

// Menambah pengguna baru
router.post('/', createUser);
router.post('/login', loginUser);  // Login endpoint

module.exports = router;
