import { SearchOutlined } from "@ant-design/icons";
import { Input, InputNumber, Select } from "antd";
import type { CategoryOption, ProductQuery } from "../types";

type Props = {
  categories: CategoryOption[];
  query: ProductQuery;
  onSearch: (value: string) => void;
  onCategory: (value?: string) => void;
  onMinPrice: (value: number | null) => void;
  onMaxPrice: (value: number | null) => void;
};

function ProductFilters({
  categories, query, onSearch, onCategory, onMinPrice, onMaxPrice,
}: Props) {
  return (
    <div className="admin-product-filters">
      <Input
        allowClear
        prefix={<SearchOutlined />}
        placeholder="Məhsul adı ilə axtar..."
        value={query.search}
        onChange={(event) => onSearch(event.target.value)}
      />
      <Select
        allowClear
        placeholder="Kateqoriya"
        value={query.categoryId}
        options={categories.map(({ id, name }) => ({ label: name, value: id }))}
        onChange={onCategory}
      />
      <InputNumber
        min={0}
        placeholder="Min qiymət"
        value={query.minPrice}
        onChange={onMinPrice}
      />
      <InputNumber
        min={0}
        placeholder="Maks qiymət"
        value={query.maxPrice}
        onChange={onMaxPrice}
      />
    </div>
  );
}

export default ProductFilters;
