import { Button } from "antd";

import {
  useNavigate,
} from "react-router-dom";

import api from "../../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const handleLogout = async () => {

    try {

      await api.post(
        "/auth/logout"
      );

    } catch {

      console.log(
        "Logout failed"
      );

    } finally {

      localStorage.clear();

      navigate("/");

    }
  };

  return (
    <div
      style={{
        padding: 40,
      }}
    >

      <h1>
        Dashboard
      </h1>

      <Button
        danger
        onClick={handleLogout}
      >
        Logout
      </Button>

    </div>
  );
}

export default Dashboard;