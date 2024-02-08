import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getSellOrders, getBuyOrders, changeOrderStatus } from 'src/api/orders';

import { initialState } from '../reducer';

const USER_SELL_ORDERS_THUNK_TYPE = 'USER_SELL_ORDERS_THUNK_TYPE';
const USER_BUY_ORDERS_THUNK_TYPE = 'USER_BUY_PASSWORD_THUNK_TYPE';
const CHANGE_ORDER_STATUS_THUNK_TYPE = 'CHANGE_ORDER_STATUS_THUNK_TYPE';

export const getSellOrdersFetch = createAsyncThunk(
  USER_SELL_ORDERS_THUNK_TYPE,
  async (page: number, { rejectWithValue }) => {
    try {
      const response = await getSellOrders(page);
      return response ? response : initialState.sellOrders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getBuyOrdersFetch = createAsyncThunk(
  USER_BUY_ORDERS_THUNK_TYPE,
  async (page: number, { rejectWithValue }) => {
    try {
      return await getBuyOrders(page);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type changeOrderStatusArgs = {
  status: string;
  _id: string;
};

export const changeOrderStatusFetch = createAsyncThunk(
  CHANGE_ORDER_STATUS_THUNK_TYPE,
  async (value: changeOrderStatusArgs, { rejectWithValue }) => {
    try {
      const { status, _id } = value;
      return await changeOrderStatus(status, _id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
