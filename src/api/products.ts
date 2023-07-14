import { ProductItem } from "../types";
import { client } from "./client";

export const getAllProducts = async (categoryName: string) => {
    try {
        return await client.get<never, ProductItem[]>(`/notices/${categoryName}?page=1&limit=9&sort=newest`);
    } catch (error) {
        return Promise.reject(error);
    }
};