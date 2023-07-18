import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../../../api/products";

const PRODUCTS_FETCH_THUNK_TYPE = "PRODUCTS_FETCH_THUNK_TYPE";

type ProductsArgs = {
  categoryName: string;
  sort: string;
  limit: number;
  page: number;
};

export const productListFetch = createAsyncThunk(
  PRODUCTS_FETCH_THUNK_TYPE,
  async (values: ProductsArgs, { rejectWithValue }) => {
    try {
      const { categoryName, sort, page, limit } = values;
      return await getAllProducts(categoryName, sort, page, limit);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
