import { DeleteOutlined, InboxOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Button, Image, message, Upload } from "antd";
import type { UploadFile } from "antd";
import { getImageSrc } from "../../../utils/image";
import type { ProductImage } from "../types";

type Props = {
  images: ProductImage[];
  pendingFiles: UploadFile[];
  onFilesChange: (files: UploadFile[]) => void;
  onMakeMain: (index: number) => void;
  onRemove: (index: number) => void;
};

function ProductImages(props: Props) {
  const freePlaces = 10 - props.images.length;

  return (
    <>
      {!!props.images.length && (
        <div className="admin-product-images">
          {props.images.map((image, index) => (
            <div className="admin-product-image" key={`${image.url}-${index}`}>
              <Image src={getImageSrc(image.url)} alt="Məhsul şəkli" />
              {image.isMain && <span>Əsas</span>}
              <div>
                <Button
                  type="text"
                  size="small"
                  icon={image.isMain ? <StarFilled /> : <StarOutlined />}
                  onClick={() => props.onMakeMain(index)}
                />
                <Button
                  danger
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={() => props.onRemove(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <Upload.Dragger
        accept="image/jpeg,image/png,image/webp"
        disabled={freePlaces <= 0}
        fileList={props.pendingFiles}
        maxCount={freePlaces}
        multiple
        beforeUpload={(file) => {
          if (file.size > 5 * 1024 * 1024) {
            message.error("Şəkil maksimum 5 MB ola bilər");
            return Upload.LIST_IGNORE;
          }
          return false;
        }}
        onChange={({ fileList }) => props.onFilesChange(fileList.slice(0, freePlaces))}
      >
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Şəkilləri seçin və ya bura sürükləyin</p>
        <p className="ant-upload-hint">
          Maksimum 10 şəkil, hər biri 5 MB-a qədər. Saxlayanda yüklənəcək.
        </p>
      </Upload.Dragger>
    </>
  );
}

export default ProductImages;
