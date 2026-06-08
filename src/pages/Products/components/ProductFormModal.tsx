import { Button, Form, Input, InputNumber, Modal, Select, Space, Switch } from "antd";
import type { CategoryOption, ProductForm } from "../types";
import type { useProductEditor } from "../hooks/useProductEditor";
import ProductImages from "./ProductImages";

type Editor = ReturnType<typeof useProductEditor>;
type Props = {
  categories: CategoryOption[];
  editor: Editor;
};

function ProductFormModal({ categories, editor }: Props) {
  const form = editor.form;
  const field = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) =>
    editor.updateField(key, value);

  return (
    <Modal
      className="admin-product-modal"
      destroyOnHidden
      open={editor.modalOpen}
      title={editor.editId ? "Məhsulu redaktə et" : "Yeni məhsul əlavə et"}
      width={760}
      onCancel={editor.closeModal}
      footer={[
        <Button key="cancel" onClick={editor.closeModal}>Ləğv et</Button>,
        <Button
          key="save"
          type="primary"
          loading={editor.saving}
          onClick={() => void editor.saveProduct()}
        >
          {editor.editId ? "Yadda saxla" : "Əlavə et"}
        </Button>,
      ]}
    >
      <Form className="admin-product-form" layout="vertical">
        <Form.Item label="Məhsul adı" required>
          <Input value={form.name} onChange={(event) => field("name", event.target.value)} />
        </Form.Item>
        <Form.Item label="Açıqlama">
          <Input.TextArea
            rows={3}
            value={form.description}
            onChange={(event) => field("description", event.target.value)}
          />
        </Form.Item>
        <div className="admin-product-form-grid">
          <Form.Item label="Qiymət (₼)" required>
            <InputNumber
              min={0}
              precision={2}
              value={form.price}
              onChange={(value) => field("price", value ?? 0)}
            />
          </Form.Item>
          <Form.Item label="Stok" required>
            <InputNumber
              min={0}
              precision={0}
              value={form.stock}
              onChange={(value) => field("stock", value ?? 0)}
            />
          </Form.Item>
          <Form.Item label="SKU" required>
            <Input value={form.sku} onChange={(event) => field("sku", event.target.value)} />
          </Form.Item>
        </div>
        <div className="admin-product-form-grid status-row">
          <Form.Item label="Kateqoriya" required>
            <Select
              placeholder="Kateqoriya seçin"
              value={form.categoryId}
              options={categories.map(({ id, name }) => ({ label: name, value: id }))}
              onChange={(value) => field("categoryId", value)}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Space>
              <Switch checked={form.isActive} onChange={(value) => field("isActive", value)} />
              {form.isActive ? "Aktiv" : "Passiv"}
            </Space>
          </Form.Item>
        </div>
        <Form.Item label="Şəkillər">
          <ProductImages
            images={form.images}
            pendingFiles={editor.pendingFiles}
            onFilesChange={editor.setPendingFiles}
            onMakeMain={editor.makeMain}
            onRemove={editor.removeImage}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ProductFormModal;
