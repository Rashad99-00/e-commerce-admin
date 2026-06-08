import { getImageSrc } from "../../utils/image";
import type { Product, ProductForm, ProductImage } from "./types";

export const emptyProductForm = (): ProductForm => ({
  name: "",
  description: "",
  price: 0,
  stock: 0,
  sku: "",
  isActive: true,
  categoryId: undefined,
  images: [],
});

export function productToForm(product: Product): ProductForm {
  const images = product.images?.length
    ? product.images.map((image, index) => ({
      url: image.url,
      isMain: image.isMain ?? index === 0,
      sortOrder: image.sortOrder ?? index,
    }))
    : product.imageUrl
      ? [{ url: product.imageUrl, isMain: true, sortOrder: 0 }]
      : [];

  return {
    name: product.name,
    description: product.description ?? "",
    price: Number(product.price),
    stock: product.stock,
    sku: product.sku,
    isActive: product.isActive,
    categoryId: product.categoryId ?? product.category.id,
    images,
  };
}

export function validateProduct(form: ProductForm) {
  if (!form.name.trim()) {
    return "Məhsul adını daxil edin";
  }
  if (!form.categoryId) {
    return "Kateqoriya seçin";
  }
  if (!form.sku.trim()) {
    return "SKU daxil edin";
  }
  if (form.price <= 0 || form.stock < 0) {
    return "Qiymət və stok dəyərlərini yoxlayın";
  }
  return null;
}

export function createProductPayload(
  form: ProductForm,
  images: ProductImage[],
  editId: string | null,
  originalSku: string
) {
  const mainImage = images.find((image) => image.isMain)?.url ?? images[0]?.url;
  return {
    name: form.name.trim(),
    description: form.description.trim(),
    price: form.price,
    stock: form.stock,
    isActive: form.isActive,
    categoryId: form.categoryId,
    ...(mainImage ? { imageUrl: getImageSrc(mainImage), images } : {}),
    ...(!editId || form.sku.trim() !== originalSku
      ? { sku: form.sku.trim() }
      : {}),
  };
}
