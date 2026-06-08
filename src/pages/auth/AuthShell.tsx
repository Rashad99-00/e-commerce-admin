import {
  ArrowLeftOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import {
  Link,
} from "react-router-dom";

import type {
  ReactNode,
} from "react";

import "./Auth.css";
import "./Auth.responsive.css";

type AuthShellProps = {
  badge: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  showBack?: boolean;
};

function AuthShell({
  badge,
  title,
  subtitle,
  children,
  showBack = true,
}: AuthShellProps) {
  return (
    <main className="auth-page">
      <section className="auth-aside">
        <Link className="auth-brand" to="/login">
          <ShopOutlined />
          <span>
            NOVA
            <small>Admin Panel</small>
          </span>
        </Link>

        <div className="auth-aside-copy">
          <p>İdarəetmə platforması</p>
          <h1>
            Mağazanızı rahat və
            <span> təhlükəsiz idarə edin.</span>
          </h1>
          <div className="auth-feature">
            <SafetyCertificateOutlined />
            Təhlükəsiz giriş və e-poçt təsdiqi
          </div>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          {showBack && (
            <Link className="auth-back" to="/login">
              <ArrowLeftOutlined />
              Giriş səhifəsi
            </Link>
          )}
          <p className="auth-badge">{badge}</p>
          <h2>{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>
          {children}
        </div>
      </section>
    </main>
  );
}

export default AuthShell;
