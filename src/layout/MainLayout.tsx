import { Layout } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import api from "../services/api";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import "./MainLayout.css";

function MainLayout() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleBreakpoint = (broken: boolean) => {
    setIsMobile(broken);
    setCollapsed(broken);
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Local session still needs to be cleared when the server is unavailable.
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <Layout className="admin-shell">
      <AdminSidebar
        collapsed={collapsed}
        onBreakpoint={handleBreakpoint}
        onNavigate={() => isMobile && setCollapsed(true)}
      />
      <Layout className="admin-body">
        <AdminHeader
          isMobile={isMobile}
          onMenu={() => setCollapsed((current) => !current)}
          onLogout={() => void handleLogout()}
        />
        <Layout.Content className="admin-content">
          <Outlet />
        </Layout.Content>
        <Layout.Footer className="admin-footer">Admin Panel ©2026</Layout.Footer>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
