import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  RegisterBody,
  LoginBody,
  LoginResponse,
  ForgotPasswordBody,
  ResetPasswordBody,
} from '../../../types';
import {
  register,
  login,
  getCurrent,
  forgotPassword,
  logout,
  updateUser,
  deleteAccount,
  resetPassword,
} from '../../../api/user';
import { AxiosError } from 'axios';
import {
  emailErrorToggleAction,
  requestErrorToggleAction,
  requestLimitErrorToggleAction,
  notVerifiedErrorToggleAction,
  isTokenExpiredToggleAction,
} from '../reducer';
import { RootState } from '../../../store';
import { setToken } from '../../../api/client';
import { resetAddSavedDataAction } from 'src/components/pages/AddProduct/reducer';
import { advertInitialData } from 'src/components/pages/AddProduct/utils';

const USER_REGISTER_THUNK_TYPE = 'USER_REGISTER_THUNK_TYPE';
const USER_LOGIN_THUNK_TYPE = 'USER_LOGIN_THUNK_TYPE';
const USER_CURRENT_THUNK_TYPE = 'USER_CURRENT_THUNK_TYPE';
const USER_FORGOT_PASSWORD_THUNK_TYPE = 'USER_FORGOT_PASSWORD_THUNK_TYPE';
const USER_LOGOUT_THUNK_TYPE = 'USER_LOGOUT_THUNK_TYPE';
const UPDATE_USER_THUNK_TYPE = 'UPDATE_USER_THUNK_TYPE';
const DELETE_USER_THUNK_TYPE = 'DELETE_USER_THUNK_TYPE';
const USER_RESET_PASSWORD_THUNK_TYPE = 'USER_RESET_PASSWORD_THUNK_TYPE';

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
        console.log(message);
        if (message === 'Email or password is wrong') {
          dispatch(emailErrorToggleAction(true));
        }
        if (message === 'Too many requests, please try again in 1 minute') {
          dispatch(requestErrorToggleAction(true));
        }
        if (message === 'Email is not verified') {
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
    const { accessToken } = (getState() as RootState).userAuth;
    try {
      setToken(accessToken);
      const data = await getCurrent(accessToken);
      return data;
    } catch ({ response }: any) {
      setToken();
      return rejectWithValue(response);
    }
  },
  {
    condition: (_, { getState }) => {
      const { accessToken } = (getState() as RootState).userAuth;
      if (!accessToken) {
        return false;
      }
    },
  }
);

export const forgotPasswordFetch = createAsyncThunk(
  USER_FORGOT_PASSWORD_THUNK_TYPE,
  async (data: ForgotPasswordBody, { rejectWithValue, dispatch }) => {
    try {
      return await forgotPassword(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message == 'User not found') {
          dispatch(emailErrorToggleAction(true));
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);

export const logoutFetch = createAsyncThunk(
  USER_LOGOUT_THUNK_TYPE,
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const result = await logout();
      localStorage.setItem('advertData', JSON.stringify(advertInitialData));
      dispatch(resetAddSavedDataAction());
      return result;
    } catch ({ response }: any) {
      const { status, data } = response;
      const error = {
        status,
        message: data.message,
      };
      return rejectWithValue(error);
    }
  }
);

type UserArgs = {
  data: FormData;
  id: string;
};

export const updateUserFetch = createAsyncThunk(
  UPDATE_USER_THUNK_TYPE,
  async (values: UserArgs, { rejectWithValue }) => {
    try {
      const res = await updateUser(values.data, values.id);
      return res.user;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const deleteAccountFetch = createAsyncThunk(
  DELETE_USER_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const result = await deleteAccount(id);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

type resetPasswordArgs = {
  data: ResetPasswordBody;
  resetId: string;
  resetToken: string;
};

export const resetPasswordFetch = createAsyncThunk(
  USER_RESET_PASSWORD_THUNK_TYPE,
  async (values: resetPasswordArgs, { rejectWithValue, dispatch }) => {
    try {
      const { data, resetId, resetToken } = values;
      return await resetPassword(data, resetId, resetToken);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message == 'Reset token is expired') {
          dispatch(isTokenExpiredToggleAction(true));
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);
