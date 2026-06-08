import { DeleteOutlined, EditOutlined, FolderOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import type { Category } from "../types";

type Props = {
  categories: Category[];
  page: number;
  total: number;
  loading: boolean;
  deletingId: string | null;
  onPageChange: (page: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

function CategoryTable(props: Props) {
  const columns: TableProps<Category>["columns"] = [
    {
      title: "Kateqoriya",
      render: (_, category) => (
        <div className="admin-category-name">
          <FolderOutlined />
          <div>
            <strong>{category.name}</strong>
            <span>{category.description || "Açıqlama yoxdur"}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Məhsul sayı",
      width: 130,
      render: (_, category) => (
        <Tag color={category.productsCount ? "blue" : "default"}>
          {category.productsCount} məhsul
        </Tag>
      ),
    },
    {
      title: "Status",
      width: 105,
      render: (_, category) => (
        <Tag color={category.isActive ? "success" : "default"}>
          {category.isActive ? "Aktiv" : "Passiv"}
        </Tag>
      ),
    },
    {
      title: "Yaradılıb",
      width: 130,
      render: (_, category) => new Date(category.createdAt).toLocaleDateString("az-AZ"),
    },
    {
      title: "Əməliyyatlar",
      width: 215,
      render: (_, category) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => props.onEdit(category)}>
            Redaktə
          </Button>
          <Popconfirm
            title="Kateqoriyanı silmək istəyirsiniz?"
            description={category.productsCount ? "İçində məhsul olan kateqoriya silinməyə bilər." : undefined}
            okText="Sil"
            cancelText="Ləğv et"
            okButtonProps={{ danger: true }}
            onConfirm={() => props.onDelete(category)}
          >
            <Button danger icon={<DeleteOutlined />} loading={props.deletingId === category.id}>
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      className="admin-categories-table"
      columns={columns}
      dataSource={props.categories}
      rowKey="id"
      loading={props.loading}
      scroll={{ x: 850 }}
      pagination={{
        current: props.page,
        pageSize: 10,
        total: props.total,
        showSizeChanger: false,
        showTotal: (count) => `Cəmi ${count} kateqoriya`,
        onChange: props.onPageChange,
      }}
    />
  );
}

export default CategoryTable;
