const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, Investly!');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const addPortfolio = async (userId, assetType, allocationPercentage, value) => {
    const { data, error } = await supabase
        .from('portfolio')
        .insert([
            { user_id: userId, asset_type: assetType, allocation_percentage: allocationPercentage, value: value }
        ]);

    if (error) {
        console.error('Error adding portfolio:', error);
        return;
    }

    console.log('Portfolio added:', data);
};

// addPortfolio(1, 'Stocks', 50, 10000);

app.post('/api/portfolio', async (req, res) => {
    const { userId, assetType, allocationPercentage, value } = req.body;

    // Memanggil fungsi untuk menambah portfolio
    const { data, error } = await supabase
        .from('portfolio')
        .insert([
            { user_id: userId, asset_type: assetType, allocation_percentage: allocationPercentage, value: value }
        ]);

    if (error) {
        console.error('Error adding portfolio:', error);
        return res.status(500).json({ error: 'Failed to add portfolio' });
    }

    console.log('Portfolio added:', data);
    return res.status(201).json(data); // Mengirimkan respons dengan data yang baru saja ditambahkan
});

app.get('/api/portfolio/:userId', async (req, res) => {
    const { userId } = req.params;

    // Mengambil data portfolio untuk user yang spesifik
    const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching portfolio:', error);
        return res.status(500).json({ error: 'Failed to fetch portfolio' });
    }

    return res.status(200).json(data);
});

