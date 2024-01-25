import { PayloadAction } from '@reduxjs/toolkit';
import { OrdersState, initialState } from '../reducer';

export const currentPageSet = (
  state: OrdersState,
  action: PayloadAction<number>
) => {
  state.orders.page = action.payload;
};

export const currentSellPageSet = (
  state: OrdersState,
  action: PayloadAction<number>
) => {
  state.sellOrders.page = action.payload;
};

export const setOrderId = (
  state: OrdersState,
  action: PayloadAction<string>
) => {
  state.orderId = action.payload;
};
