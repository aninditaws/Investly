import React from 'react';
import InvestmentRecommendation from '../components/InvestmentRecommendation';

const Dashboard = () => {
    const userId = 1;  // Contoh userId, bisa didapatkan setelah login atau dari state

    return (
        <div>
            <h1>Welcome to Investly Dashboard</h1>
            <InvestmentRecommendation userId={userId} />
        </div>
    );
};

export default Dashboard;
