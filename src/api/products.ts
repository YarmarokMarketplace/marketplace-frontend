import {
  CreateOrderData,
  AddAdvertInput,
  ProductItem,
  UserFavProductsResponse,
  UserProductsResponse,
  SearchResponse,
  SingleProductItem,
} from '../types';
import { client, loginClient } from './client';

type ProductsResponse = {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[] | [];
  maxPriceInCategory: number;
  isGoodType: boolean;
};

type ProductResponse = {
  notice: SingleProductItem;
  sellerRating: number;
};
type AddProductResponse = {
  result: ProductItem;
};

export const getAllProducts = async (
  categoryName: string,
  sort: string,
  page: number,
  limit: number,
  filterBy: {
    goodtype: string;
    price: string;
    location: string;
    rating: string;
  }
) => {
  try {
    return await client.get<never, ProductsResponse>(
      `/notices/${categoryName}?page=${page}&limit=${limit}&sort=${sort}${filterBy.goodtype}${filterBy.price}${filterBy.location}${filterBy.rating}`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProduct = async (id: string) => {
  try {
    return await client.get<never, ProductResponse>(`/notices/notice/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addProduct = async (data: FormData) => {
  try {
    return await loginClient.post<never, AddProductResponse>(
      '/notices',
      (data = data),
      { headers: { 'Content-Type': 'multipart/ form-data' } }
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editProduct = async (
  data: Partial<AddAdvertInput>,
  id: string
) => {
  try {
    return await loginClient.patch<never, AddProductResponse>(
      `/notices/${id}`,
      data
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserOwnProducts = async (page: number, limit: number) => {
  try {
    return await loginClient.get<never, UserProductsResponse>(
      `/notices/user/notices?page=${page}&limit=${limit}`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

type AddFavProductResponse = {
  user: {
    _id: string;
    name: string;
    lastname: string;
    phone: string;
    email: string;
    favorite: string[];
  };
};

export const addFavoriteProduct = async (id: string) => {
  try {
    return await loginClient.post<never, AddFavProductResponse>(
      `/notices/favorites/${id}`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const removeFavoriteProduct = async (id: string) => {
  try {
    return await loginClient.delete<
      never,
      { message: string; favorite: string[] }
    >(`/notices/favorites/${id}`);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserFavoriteProducts = async () => {
  try {
    return await loginClient.get<never, { result: ProductItem[] }>(
      `/notices/user/favorites`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const activateOrDeactivateProduct = async (
  id: string,
  active: boolean
) => {
  return await loginClient.patch(`/notices/notice/${id}/active`, {
    active: active,
  });
};

export const deleteProduct = async (id: string) => {
  return await loginClient.delete(`/notices/notice/${id}`);
};

export const createOrder = async (id: string, data: CreateOrderData) => {
  return await loginClient.post(`/orders/${id}/order`, data);
};
export const getProductBySearch = async (
  keywords: string,
  sort: string,
  page: number,
  limit: number,
  filterBy: {
    goodtype: string;
    price: string;
    location: string;
    category: string;
    rating: string;
  }
) => {
  try {
    return await client.get<never, SearchResponse>(
      `/notices/search/search-notice/?keywords=${keywords}&page=${page}&limit=${limit}&sort=${sort}${filterBy.goodtype}${filterBy.price}${filterBy.location}${filterBy.category}${filterBy.rating}`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
