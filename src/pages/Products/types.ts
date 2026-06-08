export type ProductImage = {
  url: string;
  sortOrder: number;
  isMain: boolean;
};

export type CategoryOption = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: string | number;
  stock: number;
  sku: string;
  imageUrl: string | null;
  images?: ProductImage[];
  isActive: boolean;
  categoryId: string;
  category: CategoryOption;
};

export type ProductForm = {
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  isActive: boolean;
  categoryId?: string;
  images: ProductImage[];
};

export type ProductQuery = {
  page: number;
  search: string;
  categoryId?: string;
  minPrice: number | null;
  maxPrice: number | null;
};
