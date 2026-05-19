import {Layout, Menu, Button,} from "antd";

import {
  LogoutOutlined,
} from "@ant-design/icons";

import {
  Outlet,
  useNavigate,
} from "react-router-dom";

import api from "../services/api";

const {
  Header,
  Sider,
  Content,
  Footer,
} = Layout;

function MainLayout() {

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {

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

        navigate("/login");

      }
    };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >

      <Sider>

        <div
          style={{
            color: "white",
            padding: 20,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </div>

        <Menu
  theme="dark"
  mode="inline"
  onClick={({ key }) =>

  navigate(key)

}   
  items={[
    {
      key: "/dashboard",
      label: "Dashboard",
    },
    {
      key: "/categories",
      label: "Kateqoriyalar",
    },

  ]}

/>

      </Sider>

      <Layout>

        <Header
          style={{
            background: "white",
            display: "flex",
            justifyContent:
              "flex-end",
            alignItems: "center",
          }}
        >

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={
              handleLogout
            }
          >
            Çıxış
          </Button>

        </Header>

        <Content
          style={{
            margin: 20,
            padding: 20,
            background: "white",
            borderRadius: 10,
          }}
        >

          <Outlet />

        </Content>

        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Admin Panel ©2026
        </Footer>

      </Layout>

    </Layout>
  );
}

export default MainLayout;