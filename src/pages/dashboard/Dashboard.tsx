import { message } from "antd";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../utils/apiError";
import LatestProducts from "./components/LatestProducts";
import StatsCards from "./components/StatsCards";
import { getDashboardStats } from "./services";
import type { DashboardStats } from "./types";
import "./Dashboard.css";

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setStats(await getDashboardStats());
      } catch (error) {
        message.error(getApiErrorMessage(error, "Dashboard məlumatları yüklənmədi"));
      }
    };

    void loadStats();
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <StatsCards stats={stats} />
      <h2>Son Məhsullar</h2>
      <LatestProducts products={stats?.latestProducts ?? []} />
    </div>
  );
}

export default Dashboard;
