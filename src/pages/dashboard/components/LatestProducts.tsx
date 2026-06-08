import { Card, Col, Empty, Row } from "antd";
import { getImageSrc } from "../../../utils/image";
import type { LatestProduct } from "../types";

type Props = {
  products: LatestProduct[];
};

function LatestProducts({ products }: Props) {
  if (!products.length) {
    return <Empty description="Son məhsul tapılmadı" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {products.map((product) => (
        <Col xs={24} sm={12} lg={8} xl={6} key={product.id}>
          <Card
            className="dashboard-product"
            cover={
              <img
                src={getImageSrc(product.imageUrl)}
                alt={product.name}
                loading="lazy"
              />
            }
          >
            <h3>{product.name}</h3>
            <p>Qiymət: {product.price} ₼</p>
            <p>Stok: {product.stock}</p>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default LatestProducts;
