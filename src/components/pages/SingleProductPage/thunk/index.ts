import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct } from "../../../../api/products";

const PRODUCT_FETCH_THUNK_TYPE = "PRODUCT_FETCH_THUNK_TYPE";

export const productFetch = createAsyncThunk(
  PRODUCT_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await getProduct(id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
