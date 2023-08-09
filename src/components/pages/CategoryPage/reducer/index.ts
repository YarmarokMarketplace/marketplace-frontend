import { createSlice } from "@reduxjs/toolkit";
import { ProductItem } from "../../../../types";
import { productListFetch } from "../thunk";
import {
  currentPageSet,
  productSort,
  productFilterGoodtype,
  productFilterPrice,
  productStateReset,
  productFilterLocation
} from "../actions";

export type ResponseProducts = {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[] | [];
  maxPriceInCategory: number;
};
export interface ProductsState {
  sort: string;
  loading: boolean;
  error: boolean | null;
  products: ResponseProducts;
  filterBy: {
    goodtype: string,
    price: string,
    location: string
  }
}

export const initialState: ProductsState = {
  loading: false,
  error: null,
  sort: localStorage.getItem("sort") || "newest",
  filterBy: {
    goodtype: localStorage.getItem("goodtype") || '',
    price: localStorage.getItem("price") || '',
    location: localStorage.getItem("location") || ''
  },
  products: {
    totalPages: 1,
    totalResult: 0,
    page: 1,
    limit: 12,
    result: [],
    maxPriceInCategory: 0
  },
};

const name = "PRODUCTS";

const productsSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
    productSort,
    productStateReset,
    productFilterGoodtype,
    productFilterPrice,
    productFilterLocation
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
      .addCase(productListFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const {
  currentPageSet: currentPageSetAction,
  productSort: productSortAction,
  productStateReset: productStateResetAction,
  productFilterGoodtype: productFilterGoodtypeAction,
  productFilterPrice: productFilterPriceAction,
  productFilterLocation: productFilterLocationAction
} = productsSlice.actions;

export default productsSlice.reducer;
