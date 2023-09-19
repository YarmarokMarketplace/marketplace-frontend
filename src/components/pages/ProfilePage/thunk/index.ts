import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserOwnProducts } from '../../../../api/products';
import { AxiosError } from 'axios';
import { resetOwnAdsStateAction } from '../reducer';

const USER_PRODUCTS_FETCH_THUNK_TYPE = 'USER_PRODUCTS_FETCH_THUNK_TYPE';

export const userProductsListFetch = createAsyncThunk(
  USER_PRODUCTS_FETCH_THUNK_TYPE,
  async (
    values: { page: number; limit: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      return await getUserOwnProducts(values.page, values.limit);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          dispatch(resetOwnAdsStateAction());
        }
      }
      return rejectWithValue(error);
    }
  }
);
