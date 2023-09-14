import { createSlice } from '@reduxjs/toolkit';
import { UserProductsResponse } from '../../../../types';
import { userProductsListFetch } from '../thunk';
import { currentPageSet } from '../actions';

export interface ProfileState {
  own: {
    loading: boolean;
    error: boolean | null;
    data: UserProductsResponse;
  };
}

export const initialState: ProfileState = {
  own: {
    loading: false,
    error: null,
    data: {
      totalPages: 0,
      totalResult: 0,
      page: 1,
      limit: 3,
      notices: [],
    },
  },
};

const name = 'PROFILE';

const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
  },
  extraReducers(builder) {
    builder
      .addCase(userProductsListFetch.pending, (state) => {
        state.own.loading = true;
        state.own.error = false;
      })
      .addCase(userProductsListFetch.fulfilled, (state, action) => {
        state.own.loading = false;
        state.own.data = action.payload;
      })
      .addCase(userProductsListFetch.rejected, (state) => {
        state.own.loading = false;
        state.own.error = true;
      });
  },
});

export const { currentPageSet: currentPageSetAction } = profileSlice.actions;

export default profileSlice.reducer;
