import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllCategories } from "../../../../api/categories";

const CATEGORIES_FETCH_THUNK_TYPE = "CATEGORIES_FETCH_THUNK_TYPE";

export const categoryListFetch = createAsyncThunk(
  CATEGORIES_FETCH_THUNK_TYPE,
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllCategories();
      return res.result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
