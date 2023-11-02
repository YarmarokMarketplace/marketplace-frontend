import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct, editProduct } from '../../../../api/products';
import { AddAdvertInput } from 'src/types';

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

const EDIT_ADVERT_THUNK_TYPE = 'EDIT_ADVERT_THUNK_TYPE';

export const editAdvertFetch = createAsyncThunk(
  EDIT_ADVERT_THUNK_TYPE,
  async (
    values: { data: Partial<AddAdvertInput>; id: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await editProduct(values.data, values.id);
      return res.result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
