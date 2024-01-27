import { createSlice } from '@reduxjs/toolkit';
import { buyOrdersResponse, sellOrdersResponse } from '../../../types';
import { currentPageSet, setOrderId, currentSellPageSet } from '../actions';
import {
  getSellOrdersFetch,
  getBuyOrdersFetch,
  changeOrderStatusFetch,
} from '../thunk';

export interface OrdersState {
  loading: boolean;
  error: boolean | null;
  orders: buyOrdersResponse;
  orderId: string | null;
  sellOrders: sellOrdersResponse;
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
  sellOrders: {
    totalResult: 0,
    totalPages: 0,
    page: 1,
    limit: 3,
    result: {
      sell: [],
    },
  },
};

const name = 'ORDERS';

const ordersSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
    setOrderId,
    currentSellPageSet,
  },
  extraReducers(builder) {
    builder
      .addCase(getSellOrdersFetch.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getSellOrdersFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.sellOrders = action.payload;
      })
      .addCase(getSellOrdersFetch.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.sellOrders = initialState.sellOrders;
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
        const index = state.sellOrders.result.sell.findIndex(
          (order) => order._id === payload.result._id
        );
        if (index !== -1) {
          state.sellOrders.result.sell[index] = payload.result;
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
  currentSellPageSet: currentSellPageSetAction,
} = ordersSlice.actions;

export default ordersSlice.reducer;
