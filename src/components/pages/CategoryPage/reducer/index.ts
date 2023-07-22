import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../../../types";
import { productListFetch } from "../thunk";
import { currentPageSet } from "../actions";

type ResponseProducts = {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[] | [];
};
export interface ProductsState {
  sort: string;
  loading: boolean;
  error: boolean | null;
  products: ResponseProducts;
}

export const initialState: ProductsState = {
  loading: false,
  error: null,
  sort: "newest",
  products: {
    totalPages: 0,
    totalResult: 0,
    page: 1,
    limit: 12,
    result: [],
  },
};

const name = "PRODUCTS";

const productSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
  },
  extraReducers(builder) {
    builder
      .addCase(productListFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productListFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(productListFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { currentPageSet: currentPageSetAction } = productSlice.actions;

export default productSlice.reducer;
