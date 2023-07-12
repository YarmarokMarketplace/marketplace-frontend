export interface CategoryItem {
  _id: string;
  name: string;
  photo: string;
  image?: string;
}

export interface ProductItem {
  _id: string;
  category: string;
  goodtype?: string;
  title: string;
  description: string;
  photos: string;
  location: string;
  price: number;
  comments?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  totalResults: number;
  totalPages: number;
  page: number;
  limit: number;
  notices: ProductItem[];
}