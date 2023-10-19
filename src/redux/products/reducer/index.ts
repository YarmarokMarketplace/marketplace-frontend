import { createSlice } from '@reduxjs/toolkit';

import { productListFetch, searchProductListFetch } from '../thunk';
import {
  currentPageSet,
  productSort,
  productFilterGoodtype,
  productFilterPrice,
  productStateReset,
  productFilterLocation,
  searchValueSet,
  currentSearchPageSet,
  searchProductStateReset,
  filterStateReset,
  productFilterCategory,
} from '../actions';
import { ProductItem, SearchResponse } from 'src/types';

export type ResponseProducts = {
  totalResult: number;
  totalPages: number;
  page: number;
  limit: number;
  result: ProductItem[] | [];
  maxPriceInCategory: number;
  isGoodType: boolean;
};
export interface ProductsState {
  sort: string;
  loading: boolean;
  error: boolean | null;
  search: string;
  products: ResponseProducts;
  searchProducts: SearchResponse;
  filterBy: {
    goodtype: string;
    price: string;
    location: string;
    category: string;
  };
}

export const initialState: ProductsState = {
  loading: false,
  error: null,
  sort: localStorage.getItem('sort') || 'newest',
  filterBy: {
    goodtype: localStorage.getItem('goodtype') || '',
    price: localStorage.getItem('price') || '',
    location: localStorage.getItem('location') || '',
    category: '',
  },
  search: localStorage.getItem('search') || '',
  products: {
    totalPages: 1,
    totalResult: 0,
    page: 1,
    limit: 12,
    result: [],
    maxPriceInCategory: 0,
    isGoodType: true,
  },
  searchProducts: {
    totalPages: 1,
    totalResult: 0,
    page: 1,
    limit: 12,
    maxPriceInSearchResult: 0,
    notices: [],
  },
};

const name = 'PRODUCTS';

const productsSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
    productSort,
    productStateReset,
    productFilterGoodtype,
    productFilterPrice,
    productFilterLocation,
    searchValueSet,
    currentSearchPageSet,
    searchProductStateReset,
    filterStateReset,
    productFilterCategory,
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
      })
      .addCase(searchProductListFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchProductListFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProducts = action.payload;
      })
      .addCase(searchProductListFetch.rejected, (state) => {
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
  productFilterLocation: productFilterLocationAction,
  searchValueSet: searchValueSetAction,
  currentSearchPageSet: currentSearchPageSetAction,
  searchProductStateReset: searchProductStateResetAction,
  filterStateReset: filterStateResetAction,
  productFilterCategory: productFilterCategoryAction,
} = productsSlice.actions;

export default productsSlice.reducer;
