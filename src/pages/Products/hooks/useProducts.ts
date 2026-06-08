import { message } from "antd";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../../utils/apiError";
import { getProductCategories, getProducts, removeProduct } from "../services";
import type { CategoryOption, Product } from "../types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string>();
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const query = { page, search, categoryId, minPrice, maxPrice };

  const refreshProducts = async () => {
    try {
      const result = await getProducts(query);
      setProducts(result.data);
      setTotal(result.total);
    } catch (error) {
      message.error(getApiErrorMessage(error, "Məhsulları yükləmək mümkün olmadı"));
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await getProducts({
          page,
          search,
          categoryId,
          minPrice,
          maxPrice,
        });
        setProducts(result.data);
        setTotal(result.total);
      } catch (error) {
        message.error(getApiErrorMessage(error, "Məhsulları yükləmək mümkün olmadı"));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [page, search, categoryId, minPrice, maxPrice]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategories(await getProductCategories());
      } catch (error) {
        message.error(getApiErrorMessage(error, "Kateqoriyaları yükləmək mümkün olmadı"));
      }
    };

    void loadCategories();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      setDeletingId(id);
      await removeProduct(id);
      await refreshProducts();
      message.success("Məhsul silindi");
    } catch (error) {
      message.error(getApiErrorMessage(error, "Silmək mümkün olmadı"));
    } finally {
      setDeletingId(null);
    }
  };

  const updateFilter = {
    search: (value: string) => {
      setPage(1);
      setSearch(value);
    },
    category: (value?: string) => {
      setPage(1);
      setCategoryId(value);
    },
    minPrice: (value: number | null) => {
      setPage(1);
      setMinPrice(value);
    },
    maxPrice: (value: number | null) => {
      setPage(1);
      setMaxPrice(value);
    },
  };

  return {
    products, categories, loading, deletingId, page, total, query,
    setPage, updateFilter, deleteProduct, refreshProducts,
  };
}
