import { createSlice } from '@reduxjs/toolkit';
import { UserProductsResponse } from '../../../../types';
import { userProductsListFetch } from '../thunk';

export interface ProfileState {
  own: {
    loading: boolean;
    error: boolean | null;
    data: UserProductsResponse | null;
  };
}

export const initialState: ProfileState = {
  own: {
    loading: false,
    error: null,
    data: null,
  },
};

const name = 'PROFILE';

const profileSlice = createSlice({
  name,
  initialState,
  reducers: {},
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

export default profileSlice.reducer;
