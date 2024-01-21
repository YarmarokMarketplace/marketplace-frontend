import { PayloadAction } from '@reduxjs/toolkit';
import { ProductsState, initialState } from '../reducer';

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

export const productFilterGoodtype = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.filterBy.goodtype = action.payload;
};

export const productFilterPrice = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.filterBy.price = action.payload;
};

export const productFilterLocation = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.filterBy.location = action.payload;
};

export const searchValueSet = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.search = action.payload;
};

export const currentSearchPageSet = (
  state: ProductsState,
  action: PayloadAction<number>
) => {
  state.searchProducts.page = action.payload;
};

export const searchProductStateReset = (state: ProductsState) => {
  state.searchProducts = initialState.searchProducts;
};

export const filterStateReset = (state: ProductsState) => {
  state.filterBy = initialState.filterBy;
};

export const productFilterCategory = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.filterBy.category = action.payload;
};

export const productFilterRating = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.filterBy.rating = action.payload;
};

export const setSearchCategory = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.searchCategory = action.payload;
};
