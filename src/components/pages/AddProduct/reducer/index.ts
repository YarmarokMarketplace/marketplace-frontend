import { ProductItem } from '../../../../types';
import { createSlice } from '@reduxjs/toolkit';
import {
  resetAddAdvertState,
  saveAddAdvertImages,
  resetAddSavedData,
} from '../actions';
import { addAdvertFetch, editAdvertFetch } from '../thunk';

export type Images = {
  name: string;
  type: string;
  data: string | ArrayBuffer | null;
};

export interface AddAdvertState {
  loading: boolean;
  error: boolean | null;
  data: ProductItem | null;
  images: Images[] | [];
}

export const initialState: AddAdvertState = {
  loading: false,
  error: null,
  data: null,
  images: [],
};

const name = 'ADD_ADVERT';

const addAdvertSlice = createSlice({
  name,
  initialState,
  reducers: {
    resetAddAdvertState,
    saveAddAdvertImages,
    resetAddSavedData,
  },
  extraReducers(builder) {
    builder
      .addCase(addAdvertFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addAdvertFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addAdvertFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(editAdvertFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(editAdvertFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(editAdvertFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
export const {
  resetAddAdvertState: resetAddAdvertStateAction,
  saveAddAdvertImages: saveAddAdvertImagesAction,
  resetAddSavedData: resetAddSavedDataAction,
} = addAdvertSlice.actions;
export default addAdvertSlice.reducer;
