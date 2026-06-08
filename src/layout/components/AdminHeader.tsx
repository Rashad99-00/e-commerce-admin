import { LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Layout } from "antd";

type Props = {
  isMobile: boolean;
  onMenu: () => void;
  onLogout: () => void;
};

function AdminHeader({ isMobile, onMenu, onLogout }: Props) {
  return (
    <Layout.Header className="admin-header">
      {isMobile && (
        <Button className="admin-menu-button" icon={<MenuOutlined />} onClick={onMenu} />
      )}
      <Button danger icon={<LogoutOutlined />} onClick={onLogout}>
        Çıxış
      </Button>
    </Layout.Header>
  );
}

export default AdminHeader;
