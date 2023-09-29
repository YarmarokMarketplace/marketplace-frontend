import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllProducts } from '../../../../api/products';
import { AxiosError } from 'axios';
import { productStateResetAction } from '../reducer';

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
