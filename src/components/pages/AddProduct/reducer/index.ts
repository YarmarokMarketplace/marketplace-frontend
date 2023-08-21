import { ProductItem } from "../../../../types";
import { createSlice } from "@reduxjs/toolkit";
import { resetAddAdvertState } from "../actions";
import { addAdvertFetch } from "../thunk";

export interface AddAdvertState {
  loading: boolean;
  error: boolean | null;
  data: ProductItem | null;
}

export const initialState: AddAdvertState = {
  loading: false,
  error: null,
  data: null,
};

const name = "ADD_ADVERT";

const addAdvertSlice = createSlice({
  name,
  initialState,
  reducers: {
    resetAddAdvertState,
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
      });
  },
});
export const { resetAddAdvertState: resetAddAdvertStateAction } =
  addAdvertSlice.actions;
export default addAdvertSlice.reducer;
