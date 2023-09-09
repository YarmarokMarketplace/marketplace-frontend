export interface CategoryItem {
  _id: string;
  name: string;
  photo: string;
  image?: string;
  isGoodType: boolean;
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
  contactName: string;
  contactNumber: string;
}

export interface ProductListResponse {
  totalResults: number;
  totalPages: number;
  page: number;
  limit: number;
  notices: ProductItem[];
  maxPriceInCategory: number;
  isGoodType: boolean;
}

export enum DrawerContent {
  login = 'login',
  register = 'register',
  resetPassword = 'resetPassword',
  chat = 'chat',
  password = 'password',
  noContent = 'noContent',
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

export enum ModalContent {
  exitProfile = 'exitProfile',
  deleteProfile = 'deleteProfile',
  confirmPurchase = 'confirmPurchase',
  cancel = 'cancel',
  noContent = 'noContent',
}

export interface LoginResponse {
  status: string;
  code: number;
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface CurrentResponse {
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
}

export interface ForgotPasswordBody {
  email: string;
}
export interface AddAdvertInput {
  title: string;
  description: string;
  category: string;
  location: string;
  price: string | undefined;
  contactName: string;
  contactNumber: string;
  goodtype?: string | undefined;
  photos?: string | undefined;
  free?: boolean | undefined;
  agree: boolean | undefined;
}

export interface FormDataAddAdvert {
  title: string;
  description: string;
  category: string;
  location: string;
  price: string;
  contactName: string;
  contactNumber: string;
  goodtype: string | undefined;
  photos: string | undefined;
  free: boolean | undefined;
  agree: boolean | undefined;
}
