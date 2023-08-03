import { PayloadAction } from "@reduxjs/toolkit";
import { ProductsState, initialState } from "../reducer";

export const currentPageSet = (
  state: ProductsState,
  action: PayloadAction<number>
) => {
  state.products.page = action.payload;
};

export const productSort = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.sort = action.payload;
};

export const productStateReset = (state: ProductsState) => {
  state.products = initialState.products;
};

export const productFilterGoodtype = (state: ProductsState, action: PayloadAction<string>) => {
  state.filterBy.goodtype = action.payload;
};

export const productFilterPrice = (state: ProductsState, action: PayloadAction<string>) => {
  state.filterBy.price = action.payload;
};
