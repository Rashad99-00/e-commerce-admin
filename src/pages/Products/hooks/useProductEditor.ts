import { message } from "antd";
import type { UploadFile } from "antd";
import { useState } from "react";
import { getApiErrorMessage } from "../../../utils/apiError";
import {
  createProduct,
  updateProduct,
  uploadProductImages,
} from "../services";
import type { Product, ProductForm, ProductImage } from "../types";
import {
  createProductPayload,
  emptyProductForm,
  productToForm,
  validateProduct,
} from "../utils";

export function useProductEditor(refreshProducts: () => Promise<void>) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [originalSku, setOriginalSku] = useState("");
  const [form, setForm] = useState<ProductForm>(emptyProductForm);
  const [pendingFiles, setPendingFiles] = useState<UploadFile[]>([]);
  const [saving, setSaving] = useState(false);

  const updateField = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditId(null);
    setOriginalSku("");
    setForm(emptyProductForm());
    setPendingFiles([]);
  };

  const openCreate = () => {
    closeModal();
    setModalOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditId(product.id);
    setOriginalSku(product.sku);
    setForm(productToForm(product));
    setPendingFiles([]);
    setModalOpen(true);
  };

  const addUploadedImages = async () => {
    if (!pendingFiles.length) {
      return form.images;
    }

    const urls = await uploadProductImages(pendingFiles);
    if (!urls.length) {
      throw new Error("Uploaded image URL was not returned");
    }

    return [
      ...form.images,
      ...urls.map((url, index) => ({
        url,
        sortOrder: form.images.length + index,
        isMain: form.images.length === 0 && index === 0,
      })),
    ];
  };

  const saveProduct = async () => {
    const validationError = validateProduct(form);
    if (validationError) {
      message.error(validationError);
      return;
    }

    try {
      setSaving(true);
      const images = await addUploadedImages();
      const payload = createProductPayload(form, images, editId, originalSku);

      if (editId) {
        await updateProduct(editId, payload);
        message.success("Məhsul yeniləndi");
      } else {
        await createProduct(payload);
        message.success("Məhsul əlavə edildi");
      }

      closeModal();
      await refreshProducts();
    } catch (error) {
      const fallback = editId ? "Yeniləmə uğursuz oldu" : "Əlavə etmə uğursuz oldu";
      message.error(getApiErrorMessage(error, fallback));
    } finally {
      setSaving(false);
    }
  };

  const makeMain = (selected: number) => {
    updateField("images", form.images.map((image, index) => ({
      ...image,
      isMain: selected === index,
    })));
  };

  const removeImage = (selected: number) => {
    const images: ProductImage[] = form.images
      .filter((_, index) => selected !== index)
      .map((image, index) => ({ ...image, sortOrder: index }));
    if (images.length && !images.some((image) => image.isMain)) {
      images[0].isMain = true;
    }
    updateField("images", images);
  };

  return {
    modalOpen, editId, form, pendingFiles, saving, setPendingFiles,
    updateField, closeModal, openCreate, openEdit, saveProduct, makeMain, removeImage,
  };
}
