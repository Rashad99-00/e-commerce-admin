import { Card, Col, Row } from "antd";
import type { DashboardStats } from "../types";

type Props = {
  stats: DashboardStats | null;
};

function StatsCards({ stats }: Props) {
  const cards = [
    { title: "Kateqoriyalar", value: stats?.totalCategories ?? 0 },
    { title: "Məhsullar", value: stats?.totalProducts ?? 0 },
    { title: "İstifadəçilər", value: stats?.totalUsers ?? 0 },
    { title: "Anbar", value: stats?.totalStock ?? 0 },
  ];

  return (
    <Row className="dashboard-stat-grid" gutter={[16, 16]}>
      {cards.map((item) => (
        <Col xs={24} sm={12} xl={6} key={item.title}>
          <Card className="dashboard-stat-card" title={item.title}>
            <strong>{item.value}</strong>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default StatsCards;
