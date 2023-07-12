import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProducts } from "../../../../api/products";

const PRODUCTS_FETCH_THUNK_TYPE = "PRODUCTS_FETCH_THUNK_TYPE";

export const productListFetch = createAsyncThunk(
  PRODUCTS_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getAllProducts();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
