// controllers/recommendationController.js
const supabase = require('../db');

// Mendapatkan rekomendasi investasi berdasarkan portofolio pengguna
const getInvestmentRecommendation = async (req, res) => {
    const { userId } = req.params; // Mendapatkan userId dari URL params

    // Mengambil portofolio pengguna
    const { data: portfolio, error: portfolioError } = await supabase
        .from('portfolio')
        .select('*')
        .eq('user_id', userId);

    if (portfolioError) {
        return res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }

    // Logika rekomendasi (bisa lebih kompleks berdasarkan preferensi atau data pasar)
    let recommendation = {
        message: 'Diversify your portfolio more',
        changes: []
    };

    // Analisis alokasi portofolio pengguna
    let totalAllocation = portfolio.reduce((acc, asset) => acc + asset.allocation_percentage, 0);

    // Jika alokasi saham terlalu tinggi, rekomendasikan lebih banyak obligasi atau aset lain
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
        // Jika alokasi saham terlalu rendah, tambahkan lebih banyak saham
        recommendation = {
            message: 'Increase your stock allocation to benefit from market growth.',
            changes: [
                { asset_type: 'Stocks', recommended_allocation: 60 },
                { asset_type: 'Bonds', recommended_allocation: 30 },
                { asset_type: 'Cash', recommended_allocation: 10 }
            ]
        };
    }

    // Kirimkan rekomendasi ke pengguna
    res.status(200).json(recommendation);
};

module.exports = {
    getInvestmentRecommendation
};
