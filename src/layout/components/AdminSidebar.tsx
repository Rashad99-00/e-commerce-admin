import { Layout, Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  collapsed: boolean;
  onBreakpoint: (broken: boolean) => void;
  onNavigate: () => void;
};

const items = [
  { key: "/dashboard", label: "Dashboard" },
  { key: "/categories", label: "Kateqoriyalar" },
  { key: "/products", label: "Məhsullar" },
];

function AdminSidebar({ collapsed, onBreakpoint, onNavigate }: Props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Layout.Sider
      className="admin-sider"
      breakpoint="lg"
      collapsed={collapsed}
      collapsedWidth={0}
      onBreakpoint={onBreakpoint}
      trigger={null}
    >
      <div className="admin-logo">Admin Panel</div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => {
          navigate(key);
          onNavigate();
        }}
      />
    </Layout.Sider>
  );
}

export default AdminSidebar;
