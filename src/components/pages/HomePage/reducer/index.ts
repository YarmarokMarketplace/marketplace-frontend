import { createSlice } from "@reduxjs/toolkit";
import { CategoryItem } from "../../../../types";
import { categoryListFetch } from "../thunk";

export interface CategoriesState {
  loading: boolean;
  error: boolean | null;
  categories: CategoryItem[] | [];
}

export const initialState: CategoriesState = {
  loading: false,
  error: null,
  categories: [],
};

const name = "CATEGORIES";

const categorySlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(categoryListFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(categoryListFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(categoryListFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default categorySlice.reducer;
