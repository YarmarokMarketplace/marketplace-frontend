import { createSlice } from '@reduxjs/toolkit';
import { sellOrdersResponse, SellOrder } from '../../../types';
import { currentPageSet } from '../actions';
import { getSellOrdersFetch, changeOrderStatusFetch } from '../thunk';

export interface OrdersState {
  loading: boolean;
  error: boolean | null;
  orders: sellOrdersResponse;
}

export const initialState: OrdersState = {
  loading: false,
  error: null,
  orders: {
    totalResult: 0,
    totalPages: 0,
    page: 1,
    limit: 3,
    result: [],
  },
};

const name = 'ORDERS';

const ordersSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
  },
  extraReducers(builder) {
    builder
      .addCase(getSellOrdersFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSellOrdersFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getSellOrdersFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(changeOrderStatusFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(changeOrderStatusFetch.fulfilled, (state, { payload }) => {
        state.loading = false;
        const index = state.orders.result.findIndex(
          (order) => order._id === payload.result._id
        );
        if (index !== -1) {
          state.orders.result[index] = payload.result;
        }
      })
      .addCase(changeOrderStatusFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { currentPageSet: currentPageSetAction } = ordersSlice.actions;

export default ordersSlice.reducer;
