import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserOwnProducts } from '../../../../api/products';

const USER_PRODUCTS_FETCH_THUNK_TYPE = 'USER_PRODUCTS_FETCH_THUNK_TYPE';

export const userProductsListFetch = createAsyncThunk(
  USER_PRODUCTS_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      return await getUserOwnProducts();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
