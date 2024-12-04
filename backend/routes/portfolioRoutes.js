const express = require('express');
const router = express.Router();
const authenticateToken = require('../auth');
const { addPortfolio, getPortfolio } = require('../controllers/portfolioController');  // Mengimpor controller

// Menambah portofolio baru
router.post('/', addPortfolio);

// Mengambil portofolio berdasarkan userId
router.get('/:userId', authenticateToken, getPortfolio);

module.exports = router;
