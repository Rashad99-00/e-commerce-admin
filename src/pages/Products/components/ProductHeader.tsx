import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
  onCreate: () => void;
};

function ProductHeader({ onCreate }: Props) {
  return (
    <div className="admin-products-header">
      <div>
        <h1>Məhsullar</h1>
        <p>Məhsulları yaradın, redaktə edin və şəkillərini idarə edin.</p>
      </div>
      <Button type="primary" size="large" icon={<PlusOutlined />} onClick={onCreate}>
        Yeni məhsul əlavə et
      </Button>
    </div>
  );
}

export default ProductHeader;
