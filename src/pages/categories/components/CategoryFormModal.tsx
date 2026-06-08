import { Button, Form, Input, Modal, Space, Switch } from "antd";
import type { useCategories } from "../hooks/useCategories";

type CategoryState = ReturnType<typeof useCategories>;
type Props = { state: CategoryState };

function CategoryFormModal({ state }: Props) {
  const form = state.form;

  return (
    <Modal
      className="admin-category-modal"
      destroyOnHidden
      open={state.modalOpen}
      title={state.editId ? "Kateqoriyanı redaktə et" : "Yeni kateqoriya əlavə et"}
      onCancel={state.closeModal}
      footer={[
        <Button key="cancel" onClick={state.closeModal}>Ləğv et</Button>,
        <Button key="save" type="primary" loading={state.saving} onClick={() => void state.save()}>
          {state.editId ? "Yadda saxla" : "Əlavə et"}
        </Button>,
      ]}
    >
      <Form className="admin-category-form" layout="vertical">
        <Form.Item label="Kateqoriya adı" required>
          <Input
            placeholder="Məsələn, Elektronika"
            value={form.name}
            onChange={(event) => state.updateField("name", event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Açıqlama">
          <Input.TextArea
            placeholder="Kateqoriya haqqında qısa məlumat"
            rows={4}
            value={form.description}
            onChange={(event) => state.updateField("description", event.target.value)}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Space>
            <Switch
              checked={form.isActive}
              onChange={(checked) => state.updateField("isActive", checked)}
            />
            {form.isActive ? "Aktiv" : "Passiv"}
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CategoryFormModal;
