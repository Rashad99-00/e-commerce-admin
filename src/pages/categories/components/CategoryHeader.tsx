import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import type { Category } from "../types";

type Props = {
  categories: Category[];
  total: number;
  search: string;
  onSearch: (value: string) => void;
  onCreate: () => void;
};

function CategoryHeader({ categories, total, search, onSearch, onCreate }: Props) {
  const activeCount = categories.filter((category) => category.isActive).length;
  const productsCount = categories.reduce((sum, category) => sum + category.productsCount, 0);

  return (
    <>
      <div className="admin-categories-header">
        <div>
          <h1>Kateqoriyalar</h1>
          <p>Kateqoriyaları yaradın, redaktə edin və aktivliyini idarə edin.</p>
        </div>
        <Button type="primary" size="large" icon={<PlusOutlined />} onClick={onCreate}>
          Yeni kateqoriya əlavə et
        </Button>
      </div>
      <div className="admin-category-stat-grid">
        <div className="admin-category-stat"><strong>{total}</strong><span>Tapılan kateqoriya</span></div>
        <div className="admin-category-stat"><strong>{activeCount}</strong><span>Səhifədə aktiv</span></div>
        <div className="admin-category-stat"><strong>{productsCount}</strong><span>Səhifədə məhsul</span></div>
      </div>
      <div className="admin-category-filters">
        <Input
          allowClear
          prefix={<SearchOutlined />}
          placeholder="Kateqoriya adı ilə axtar..."
          value={search}
          onChange={(event) => onSearch(event.target.value)}
        />
      </div>
    </>
  );
}

export default CategoryHeader;
