import { Navigate, Outlet } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "../constants/api";

function PrivateRoute() {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
  return token ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
