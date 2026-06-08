export type LatestProduct = {
  id: string;
  name: string;
  price: string;
  stock: number;
  imageUrl: string;
};

export type DashboardStats = {
  totalCategories: number;
  totalProducts: number;
  totalUsers: number;
  totalStock: number;
  latestProducts: LatestProduct[];
};
