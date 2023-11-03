import { sellOrdersResponse, changeOrderStatusResponse } from '../types';
import { loginClient, setToken } from './client';
import { client } from './client';

export const getSellOrders = async (page: number) => {
  return await loginClient.get<never, sellOrdersResponse>(
    `/orders/user/sell?page=${page}`
  );
};

export const changeOrderStatus = async (status: string, id: string) => {
  return await loginClient.patch<never, changeOrderStatusResponse>(
    `/orders/status/${id}`,
    { status: status }
  );
};
