import api from "../../services/api";
import type { Category, CategoryForm } from "./types";

export async function getCategories(page: number, search: string) {
  const response = await api.get("/categories", {
    params: { page, pageSize: 10, name: search || undefined },
  });

  return {
    data: response.data.data.data as Category[],
    total: response.data.data.totalCount as number,
  };
}

export function createCategory(form: CategoryForm) {
  return api.post("/categories", form);
}

export function updateCategory(id: string, form: CategoryForm) {
  return api.patch(`/categories/${id}`, form);
}

export function removeCategory(id: string) {
  return api.delete(`/categories/${id}`);
}
