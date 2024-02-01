import { createSlice } from '@reduxjs/toolkit';
import { ProductItem, SingleProductItem } from '../../../../types';
import { productFetch } from '../thunk';

export interface ProductState {
  loading: boolean;
  error: boolean | null;
  product: { notice: SingleProductItem; sellerRating: number } | null;
}

export const initialState: ProductState = {
  loading: true,
  error: null,
  product: null,
};

const name = 'PRODUCT';

const productSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(productFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(productFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(productFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default productSlice.reducer;
