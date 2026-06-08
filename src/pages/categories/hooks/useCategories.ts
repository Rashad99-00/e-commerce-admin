import { message } from "antd";
import { useEffect, useState } from "react";
import { getApiErrorMessage } from "../../../utils/apiError";
import {createCategory, getCategories,removeCategory,updateCategory,} from "../services";
import type { Category, CategoryForm } from "../types";

const emptyForm = (): CategoryForm => ({
  name: "",
  description: "",
  isActive: true,
});

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const refresh = async () => {
    try {
      const result = await getCategories(page, search);
      setCategories(result.data);
      setTotal(result.total);
    } catch (error) {
      message.error(getApiErrorMessage(error, "Kateqoriyaları yükləmək mümkün olmadı"));
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const result = await getCategories(page, search);
        setCategories(result.data);
        setTotal(result.total);
      } catch (error) {
        message.error(getApiErrorMessage(error, "Kateqoriyaları yükləmək mümkün olmadı"));
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, [page, search]);

  const updateField = <K extends keyof CategoryForm>(key: K, value: CategoryForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(emptyForm());
  };

  const openCreate = () => {
    closeModal();
    setModalOpen(true);
  };

  const openEdit = (category: Category) => {
    setEditId(category.id);
    setForm({
      name: category.name,
      description: category.description ?? "",
      isActive: category.isActive,
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name.trim()) {
      message.error("Kateqoriya adını daxil edin");
      return;
    }
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      isActive: form.isActive,
    };

    try {
      setSaving(true);
      if (editId) {
        await updateCategory(editId, payload);
        message.success("Kateqoriya yeniləndi");
      } else {
        await createCategory(payload);
        message.success("Kateqoriya əlavə edildi");
      }
      closeModal();
      await refresh();
    } catch (error) {
      const fallback = editId ? "Yeniləmə uğursuz oldu" : "Əlavə etmə uğursuz oldu";
      message.error(getApiErrorMessage(error, fallback));
    } finally {
      setSaving(false);
    }
  };

  const remove = async (category: Category) => {
    try {
      setDeletingId(category.id);
      await removeCategory(category.id);
      await refresh();
      message.success("Kateqoriya silindi");
    } catch (error) {
      const text = getApiErrorMessage(error, "Silmək mümkün olmadı");
      message.error(
        text.includes("still has products")
          ? "Bu kateqoriyada məhsullar olduğu üçün silinə bilməz"
          : text
      );
    } finally {
      setDeletingId(null);
    }
  };

  const changeSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  return {
    categories, search, page, total, loading, modalOpen, editId, form, saving,
    deletingId, setPage, changeSearch, updateField, closeModal, openCreate,
    openEdit, save, remove,
  };
}
