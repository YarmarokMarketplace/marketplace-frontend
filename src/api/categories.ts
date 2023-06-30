import { CategoryItem } from "../types";
import { client } from "./client";

export const getAllCategories = async () => {
  try {
    return await client.get<never, CategoryItem[]>("/main");
  } catch (error) {
    return Promise.reject(error);
  }
};
