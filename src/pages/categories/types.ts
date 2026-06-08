export type Category = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  productsCount: number;
  createdAt: string;
};

export type CategoryForm = {
  name: string;
  description: string;
  isActive: boolean;
};
