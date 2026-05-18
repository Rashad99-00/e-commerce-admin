import {
  Navigate,
  Outlet,
} from "react-router-dom";

function PublicRoute() {

  const token =
    localStorage.getItem(
      "accessToken"
    );

  return token
    ? <Navigate to="/dashboard" />
    : <Outlet />;
}

export default PublicRoute;