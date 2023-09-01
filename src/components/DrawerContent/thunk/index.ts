import { createAsyncThunk } from '@reduxjs/toolkit';
import { RegisterBody, LoginBody, LoginResponse } from '../../../types';
import { register, login, getCurrent } from '../../../api/user';
import { AxiosError } from 'axios';
import {
  emailErrorToggleAction,
  requestErrorToggleAction,
  requestLimitErrorToggleAction,
  notVerifiedErrorToggleAction,
} from '../reducer';
import { RootState } from '../../../store';
import { setToken } from '../../../api/client';

const USER_REGISTER_THUNK_TYPE = 'USER_REGISTER_THUNK_TYPE';
const USER_LOGIN_THUNK_TYPE = 'USER_LOGIN_THUNK_TYPE';
const USER_CURRENT_THUNK_TYPE = 'USER_CURRENT_THUNK_TYPE';

export const userRegisterFetch = createAsyncThunk(
  USER_REGISTER_THUNK_TYPE,
  async (data: RegisterBody, { rejectWithValue, dispatch }) => {
    try {
      return await register(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message == 'Email in use') {
          dispatch(emailErrorToggleAction(true));
        }
        if (error.response?.status === 429) {
          dispatch(requestLimitErrorToggleAction(true));
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const userLoginFetch = createAsyncThunk(
  USER_LOGIN_THUNK_TYPE,
  async (data: LoginBody, { rejectWithValue, dispatch }) => {
    try {
      const result: LoginResponse = await login(data);
      return result;
    } catch (error) {
      if (error instanceof AxiosError) {
        const { message } = error.response?.data;
        console.log(message)
        if (message === "Email or password is wrong") {
          dispatch(emailErrorToggleAction(true));
        }
        if (message === "Too many requests, please try again in 1 minute") {
          dispatch(requestErrorToggleAction(true));
        }
        if (message === "Email is not verified") {
          dispatch(notVerifiedErrorToggleAction(true));
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const currentFetch = createAsyncThunk(
  USER_CURRENT_THUNK_TYPE,
  async (_, { rejectWithValue, getState }) => {
    try {
      const { accessToken } = (getState() as RootState).userAuth.current;
      console.log(accessToken);
      const data = await getCurrent(accessToken);
      return data;
    } catch ({ response }: any) {
      return rejectWithValue(response);
    }
  },
  {
    condition: (_, { getState }) => {
      const { accessToken } = (getState() as RootState).userAuth.current;
      if (!accessToken) {
        return false;
      }
    },
  }
);
