import { createSlice } from '@reduxjs/toolkit';
import { sellOrdersResponse } from '../../../types';
import { currentPageSet, setOrderId } from '../actions';
import {
  getSellOrdersFetch,
  getBuyOrdersFetch,
  changeOrderStatusFetch,
} from '../thunk';

export interface OrdersState {
  loading: boolean;
  error: boolean | null;
  orders: sellOrdersResponse;
  orderId: string | null;
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
  orderId: null,
};

const name = 'ORDERS';

const ordersSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
    setOrderId,
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
      .addCase(getBuyOrdersFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getBuyOrdersFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getBuyOrdersFetch.rejected, (state) => {
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

export const {
  currentPageSet: currentPageSetAction,
  setOrderId: setOrderIdAction,
} = ordersSlice.actions;

export default ordersSlice.reducer;
