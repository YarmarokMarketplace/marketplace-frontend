import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { getSellOrders, changeOrderStatus } from 'src/api/orders';

const USER_SELL_ORDERS_THUNK_TYPE = 'USER_RESET_PASSWORD_THUNK_TYPE';
const CHANGE_ORDER_STATUS_THUNK_TYPE = 'CHANGE_ORDER_STATUS_THUNK_TYPE';

export const getSellOrdersFetch = createAsyncThunk(
  USER_SELL_ORDERS_THUNK_TYPE,
  async (page: number, { rejectWithValue }) => {
    try {
      return await getSellOrders(page);
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
