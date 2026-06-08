import type { UploadFile } from "antd";
import api from "../../services/api";
import type { CategoryOption, Product, ProductQuery } from "./types";

export async function getProducts(query: ProductQuery) {
  const response = await api.get("/products", {
    params: {
      page: query.page,
      pageSize: 10,
      name: query.search || undefined,
      categoryId: query.categoryId,
      minPrice: query.minPrice ?? undefined,
      maxPrice: query.maxPrice ?? undefined,
    },
  });

  return {
    data: response.data.data as Product[],
    total: (response.data.totalCount ?? response.data.data.length) as number,
  };
}

export async function getProductCategories() {
  const response = await api.get("/categories", {
    params: { page: 1, pageSize: 100 },
  });
  return response.data.data.data as CategoryOption[];
}

export function createProduct(payload: object) {
  return api.post("/products", payload);
}

export function updateProduct(id: string, payload: object) {
  return api.patch(`/products/${id}`, payload);
}

export function removeProduct(id: string) {
  return api.delete(`/products/${id}`);
}

export async function uploadProductImages(files: UploadFile[]) {
  const data = new FormData();
  files.forEach((file) => {
    if (file.originFileObj) {
      data.append("images", file.originFileObj);
    }
  });

  const response = await api.post("/uploads/product-images", data);
  return (response.data.urls ?? response.data.data?.urls ?? []) as string[];
}
