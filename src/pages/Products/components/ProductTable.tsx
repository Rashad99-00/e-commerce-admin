import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Popconfirm, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { getImageSrc } from "../../../utils/image";
import type { Product } from "../types";

type Props = {
  products: Product[];
  loading: boolean;
  deletingId: string | null;
  page: number;
  total: number;
  onPageChange: (page: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
};

function ProductTable(props: Props) {
  const columns: TableProps<Product>["columns"] = [
    {
      title: "Məhsul",
      render: (_, product) => (
        <div className="admin-product-name">
          {product.imageUrl ? (
            <Image preview={false} src={getImageSrc(product.imageUrl)} alt={product.name} />
          ) : (
            <div className="admin-no-image">-</div>
          )}
          <div>
            <strong>{product.name}</strong>
            <span>SKU: {product.sku}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Kateqoriya",
      render: (_, product) => product.category?.name ?? "-",
    },
    {
      title: "Qiymət",
      render: (_, product) => `${Number(product.price).toFixed(2)} ₼`,
    },
    {
      title: "Stok",
      render: (_, product) => (
        <Tag color={product.stock ? "blue" : "red"}>{product.stock} ədəd</Tag>
      ),
    },
    {
      title: "Status",
      render: (_, product) => (
        <Tag color={product.isActive ? "success" : "default"}>
          {product.isActive ? "Aktiv" : "Passiv"}
        </Tag>
      ),
    },
    {
      title: "Əməliyyatlar",
      width: 205,
      render: (_, product) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => props.onEdit(product)}>
            Redaktə
          </Button>
          <Popconfirm
            title="Məhsulu silmək istəyirsiniz?"
            okText="Sil"
            cancelText="Ləğv et"
            okButtonProps={{ danger: true }}
            onConfirm={() => props.onDelete(product.id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={props.deletingId === product.id}
            >
              Sil
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table
      className="admin-products-table"
      columns={columns}
      dataSource={props.products}
      rowKey="id"
      loading={props.loading}
      scroll={{ x: 940 }}
      pagination={{
        current: props.page,
        pageSize: 10,
        total: props.total,
        showTotal: (count) => `Cəmi ${count} məhsul`,
        onChange: props.onPageChange,
      }}
    />
  );
}

export default ProductTable;
