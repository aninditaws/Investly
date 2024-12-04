const supabase = require('../db');  // Mengimpor Supabase client

// Menambah portofolio baru
const addPortfolio = async (req, res) => {
    const { userId, assetType, allocationPercentage, value } = req.body;

    // Memanggil Supabase untuk menambah portofolio
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
    return res.status(201).json(data);  // Mengirimkan respons data
};

// Mengambil portofolio berdasarkan user_id
const getPortfolio = async (req, res) => {
    const { userId } = req.params;

    const { data, error } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId);

    if (error) {
        console.error('Error fetching portfolio:', error);
        return res.status(500).json({ error: 'Failed to fetch portfolio' });
    }

    return res.status(200).json(data);  // Mengirimkan data portfolio
};

// Mendapatkan rekomendasi investasi berdasarkan portofolio pengguna
const getInvestmentRecommendation = async (req, res) => {
    const { userId } = req.params;

    // Ambil data portofolio pengguna
    const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId);

    if (portfolioError) {
        return res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }

    // Gunakan data portfolio untuk memberikan rekomendasi
    let totalAllocation = portfolio.reduce((acc, asset) => acc + asset.allocation_percentage, 0);

    // Logika rekomendasi berbasis alokasi
    let recommendation = {
        message: 'Diversify your portfolio more',
        changes: []
    };

    if (totalAllocation > 80) {
        recommendation = {
            message: 'Consider diversifying your portfolio. Reduce stock allocation and add more bonds.',
            changes: [
                { asset_type: 'Bonds', recommended_allocation: 40 },
                { asset_type: 'Stocks', recommended_allocation: 40 },
                { asset_type: 'Cash', recommended_allocation: 20 }
            ]
        };
    } else if (totalAllocation < 50) {
        recommendation = {
            message: 'Increase your stock allocation to benefit from market growth.',
            changes: [
                { asset_type: 'Stocks', recommended_allocation: 60 },
                { asset_type: 'Bonds', recommended_allocation: 30 },
                { asset_type: 'Cash', recommended_allocation: 10 }
            ]
        };
    }

    // Kirimkan hasil rekomendasi ke pengguna
    res.status(200).json(recommendation);
};

// Export fungsi-fungsi controller untuk digunakan di routing
module.exports = {
    addPortfolio,
    getPortfolio,
    getInvestmentRecommendation
};
