import { ProductItem } from "../types";
import { client } from "./client";

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
  data: ProductItem;
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
  }
) => {
  try {
    return await client.get<never, ProductsResponse>(
      `/notices/${categoryName}?page=${page}&limit=${limit}&sort=${sort}${filterBy.goodtype}${filterBy.price}${filterBy.location}`
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
