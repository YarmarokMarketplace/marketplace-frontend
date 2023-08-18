import { ProductItem } from "../types";
import { client } from "./client";

type Response = {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[] | [];
  maxPriceInCategory: number;
  isGoodType: boolean;
};

export const getAllProducts = async (
  categoryName: string,
  sort: string,
  page: number,
  limit: number,
  filterBy: {
    goodtype: string,
    price: string,
    location: string
  },
) => {
  try {
    return await client.get<never, Response>(
      `/notices/${categoryName}?page=${page}&limit=${limit}&sort=${sort}${filterBy.goodtype}${filterBy.price}${filterBy.location}`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
