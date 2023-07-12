import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../../../types";
import { productListFetch } from "../thunk";

export interface ProductsState {
  loading: boolean;
  error: boolean | null;
  products: ProductItem[] | [];
}

export const initialState: ProductsState = {
  loading: false,
  error: null,
  products: [],
};

const name = "PRODUCTS";

const productSlice = createSlice({
  name,
  initialState,
  reducers: {},
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

export default productSlice.reducer;
