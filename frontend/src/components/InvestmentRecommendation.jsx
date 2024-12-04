import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InvestmentRecommendation = ({ userId }) => {
    const [recommendation, setRecommendation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Ambil rekomendasi investasi ketika komponen dimuat
        const getRecommendation = async () => {
            try {
                const token = localStorage.getItem('token');  // Ambil token JWT dari localStorage
                const response = await axios.get(`http://localhost:5000/api/recommendation/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }  // Kirimkan token di header
                });
                setRecommendation(response.data);  // Simpan data rekomendasi ke state
            } catch (error) {
                setError('Error fetching recommendation');
                console.error('Error fetching recommendation:', error);
            }
        };

        getRecommendation();
    }, [userId]);  // Trigger API call setiap kali userId berubah

    if (error) {
        return <div>{error}</div>;  // Tampilkan error jika terjadi
    }

    if (!recommendation) {
        return <div>Loading recommendation...</div>;  // Tampilkan loading sebelum mendapatkan data
    }

    return (
        <div>
            <h2>Investment Recommendation</h2>
            <p>{recommendation.message}</p>
            <ul>
                {recommendation.changes.map((change, index) => (
                    <li key={index}>
                        {change.asset_type}: {change.recommended_allocation}% allocation
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InvestmentRecommendation;
