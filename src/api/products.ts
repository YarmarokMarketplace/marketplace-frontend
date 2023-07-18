import { ProductItem } from "../types";
import { client } from "./client";

type Response = {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[] | [];
};

export const getAllProducts = async (
  categoryName: string,
  sort: string,
  page: number,
  limit: number
) => {
  try {
    return await client.get<never, Response>(
      `/notices/${categoryName}?page=${page}&limit=${limit}&sort=${sort}`
    );
  } catch (error) {
    return Promise.reject(error);
  }
};
