import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct } from '../../../../api/products';

const ADD_ADVERT_THUNK_TYPE = 'ADD_ADVERT_THUNK_TYPE';

export const addAdvertFetch = createAsyncThunk(
  ADD_ADVERT_THUNK_TYPE,
  async (data: FormData, { rejectWithValue, dispatch }) => {
    try {
      const res = await addProduct(data);
      return res.result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
