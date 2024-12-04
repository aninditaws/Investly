// controllers/marketDataController.js
const supabase = require('../db');

// Mendapatkan data pasar
const getMarketData = async (req, res) => {
    const { data, error } = await supabase.from('market_data').select('*');
    if (error) {
        console.error('Error fetching market data:', error);
        return res.status(500).json({ error: 'Failed to fetch market data' });
    }
    res.status(200).json(data);
};

// Menambah data pasar baru
const addMarketData = async (req, res) => {
    const { tickerSymbol, price, volume, date } = req.body;

    const { data, error } = await supabase
        .from('market_data')
        .insert([{ ticker_symbol: tickerSymbol, price, volume, date }]);

    if (error) {
        console.error('Error adding market data:', error);
        return res.status(500).json({ error: 'Failed to add market data' });
    }

    res.status(201).json(data);
};

module.exports = {
    getMarketData,
    addMarketData
};
