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
  photos: string[];
  location: string;
  price: number;
  comments?: string;
  createdAt: string;
  updatedAt: string;
  active?: boolean;
}

export interface ProductListResponse {
  totalResults: number;
  totalPages: number;
  page: number;
  limit: number;
  notices: ProductItem[];
}

export enum DrawerContent {
  login = "login",
  register = "register",
  chat = "chat",
  password = "password",
  noContent = "noContent",
}

export interface RegisterResponse {
  email: string;
  name: string;
  lastName: string;
}

export interface RegisterBody {
  email: string;
  name: string;
  password: string;
}
