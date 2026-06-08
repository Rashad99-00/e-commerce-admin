import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../constants/api";

function PublicRoute() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default PublicRoute;
