import api from "../../services/api";
import type { DashboardStats } from "./types";

export async function getDashboardStats() {
  const response = await api.get("/dashboard/stats");
  return response.data.data as DashboardStats;
}
