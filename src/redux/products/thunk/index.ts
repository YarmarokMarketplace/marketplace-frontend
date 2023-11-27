import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts, getProductBySearch } from '../../../api/products';
import { AxiosError } from 'axios';
import {
  productStateResetAction,
  searchProductStateResetAction,
} from '../reducer';

const PRODUCTS_FETCH_THUNK_TYPE = 'PRODUCTS_FETCH_THUNK_TYPE';

type ProductsArgs = {
  categoryName: string;
  sort: string;
  page: number;
  limit: number;
  filterBy: {
    goodtype: string;
    price: string;
    location: string;
    rating: string;
  };
};

export const productListFetch = createAsyncThunk(
  PRODUCTS_FETCH_THUNK_TYPE,
  async (values: ProductsArgs, { dispatch, rejectWithValue }) => {
    try {
      const { categoryName, sort, page, limit, filterBy } = values;
      return await getAllProducts(categoryName, sort, page, limit, filterBy);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message == 'Notices not found') {
          dispatch(productStateResetAction());
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

const SEARCH_PRODUCTS_FETCH_THUNK_TYPE = 'SEARCH_PRODUCTS_FETCH_THUNK_TYPE';

type SearchArgs = {
  keywords: string;
  sort: string;
  page: number;
  limit: number;
  filterBy: {
    goodtype: string;
    price: string;
    location: string;
    category: string;
  };
};

export const searchProductListFetch = createAsyncThunk(
  SEARCH_PRODUCTS_FETCH_THUNK_TYPE,
  async (values: SearchArgs, { dispatch, rejectWithValue }) => {
    try {
      const { keywords, sort, page, limit, filterBy } = values;
      return await getProductBySearch(keywords, sort, page, limit, filterBy);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 400) {
          dispatch(searchProductStateResetAction());
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);
