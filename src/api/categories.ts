import { CategoryItem } from "../types";
import { client } from "./client";

type Response = {
  result: CategoryItem[];
};

export const getAllCategories = async () => {
  try {
    return await client.get<never, Response>("/main");
  } catch (error) {
    return Promise.reject(error);
  }
};
