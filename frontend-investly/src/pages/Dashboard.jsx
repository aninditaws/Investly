import { useNavigate } from "react-router-dom";
import InvestmentRecommendation from "../components/InvestmentRecommendation";
import { useEffect } from "react";

const Dashboard = () => {
  const userId = localStorage.getItem("id"); // Contoh userId, bisa didapatkan setelah login atau dari state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If no token, navigate to login page
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      <h1>Welcome to Investly Dashboard</h1>
      <InvestmentRecommendation userId={userId} />
    </div>
  );
};

export default Dashboard;
