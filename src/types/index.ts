import { changeOrderStatus } from 'src/api/orders';
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
  owner: {
    rating: number;
    createdAt: string;
  };
  createdAt: string;
  updatedAt: string;
  active?: boolean;
  contactName: string;
  contactNumber: string;
  contactsViews: number;
  views: number;
  reviews: [];
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
  changePassword = 'changePassword',
  changeLogin = 'changeLogin',
  chat = 'chat',
  password = 'password',
  noContent = 'noContent',
  googleAuthMessage = 'googleAuthMessage',
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
  logout = 'logout',
  deleteAccount = 'deleteAccount',
  deleteProduct = 'deleteProduct',
  confirmPurchase = 'confirmPurchase',
  confirmReceived = 'confirmReceived',
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
    lastname: string;
    patronymic: string;
    avatarURL: string;
    phone: string;
    favorite: string[];
  };
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface CurrentResponse {
  id: string;
  email: string;
  name: string;
  lastname: string;
  patronymic: string;
  avatarURL: string;
  phone: string;
  favorite: string[];
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

export interface LogoutResponse {
  accessToken: string;
}

export interface UpdateUserResponse {
  user: {
    _id: string;
    id: string;
    email: string;
    name: string;
    lastname: string;
    patronymic: string;
    avatarURL: string;
    phone: string;
    favorite: string[];
  };
}

export interface FormDataUpdateUser {
  email: string;
  name: string;
  lastname: string;
  patronymic: string;
  avatarURL: string;
  phone: string;
}

export interface UpdateUserInput {
  name: string;
  lastname?: string;
  patronymic?: string;
  avatarURL?: string | File;
  phone?: string;
}

export enum SuccessMessageContent {
  updateUserSuccess = 'updateUserSuccess',
  deleteAccountSuccess = 'deleteAccountSuccess',
  noContent = 'noContent',
}

export enum ErrorMessageContent {
  updateUserError = 'updateUserError',
  deleteAccountError = 'deleteAccountError',
  noContent = 'noContent',
}

export interface ResetPasswordBody {
  password: string;
}
export interface UserProductsResponse {
  totalPagesActive: number;
  totalPagesInactive: number;
  activeResult: number;
  inactiveResult: number;
  page: number;
  limit: number;
  activeNotices: ProductItem[];
  inactiveNotices: ProductItem[];
}

export interface UserFavProductsResponse {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[];
}

export interface SearchResponse {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  maxPriceInSearchResult: number;
  notices: ProductItem[] | [];
}

export interface ChangePasswordBody {
  password: string;
  newPassword: string;
}

export interface ChangeLoginBody {
  email: string;
}
export interface NovaPostSchema {
  typeOfNovaPostDelivery: {
    postOfficeSchema?: {
      postOfficeNumber?: string;
      city?: string;
    };
    addressSchema?: {
      city?: string;
      street?: string;
      house?: string;
      apartments?: string;
    };
    postBoxSchema?: {
      postBoxNumber?: string;
      city?: string;
    };
  };
}
export interface DeliveryData {
  otherSchema?: {
    typeOfOtherDelivery?: string;
  };
  ukrPostSchema?: {
    city?: string;
    index?: string;
    street?: string;
    house?: string;
    apartments?: string;
  };
  newPostSchema?: NovaPostSchema;
}

export interface CreateOrderData {
  buyerName: string;
  buyerLastname: string;
  buyerPatronymic?: string;
  deliveryType: string;
  buyerPhone: string;
  deliveryData: DeliveryData;
  comment?: string;
  saveData?: boolean;
}

export interface CreateOrderInput {
  firstName: string;
  lastName: string;
  patronymic?: string;
  phone: string;
  deliveryType: string;
  department?: string;
  city?: string;
  street?: string;
  house?: string;
  flat?: string;
  postOffice?: string;
  postCode?: string;
  saveData: boolean;
  comment?: string;
  novaPostType?: string;
}
export interface sellOrdersResponse {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: Order[];
}

export interface buyOrdersResponse {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: Order[];
}

export interface changeOrderStatusResponse {
  result: Order;
}

export interface Order {
  _id: string;
  buyerName: string;
  buyerLastname: string;
  buyerPatronymic: string;
  buyerPhone: string;
  deliveryData: {
    newPostSchema?: {
      typeOfNovaPostDelivery: {
        postOfficeSchema?: {
          postOfficeNumber: string;
          city: string;
        };
        addressSchema?: {
          city: string;
          street: string;
          house: string;
          apartments: string;
        };
        postBoxSchema?: {
          postBoxNumber: string;
          city: string;
        };
      };
    };
    ukrPostSchema?: {
      city: string;
      index: string;
      street: string;
      house: string;
      apartments: string;
    };
    otherSchema?: {
      typeOfOtherDelivery: string;
    };
    deliveryType: string;
  };
  comments: string;
  createdAt: string;
  product: ProductItem;
  status: string;
}

export interface BuyOrder {
  _id: string;
  buyerName: string;
  buyerLastname: string;
  buyerPatronymic: string;
  createdAt: string;
  product: ProductItem;
  status: string;
}
