import { useNavigate } from "react-router-dom";
import InvestmentRecommendation from "../components/InvestmentRecommendation";
import { useEffect } from "react";

const Dashboard = () => {
  const userId = localStorage.getItem("id");
  const userName = localStorage.getItem("name");
  const navigate = useNavigate();

  // Cek apakah token login sudah dimiliki atau belum
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Jika tidak ada token, kembali ke halaman login
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="font-bold text-2xl text-gray-800 mb-4">
          Welcome to Investly Dashboard,{" "}
          <span className="text-indigo-600">{userName}</span>
        </h1>

        {/* Investment Recommendation Component */}
        <InvestmentRecommendation userId={userId} />
      </div>
    </div>
  );
};

export default Dashboard;
