// routes/marketDataRoutes.js
const express = require('express');
const router = express.Router();
const { getMarketData, addMarketData } = require('../controllers/marketDataController');

// Mendapatkan data pasar
router.get('/', getMarketData);

// Menambah data pasar baru
router.post('/', addMarketData);

module.exports = router;
