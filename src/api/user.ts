import {
  RegisterResponse,
  RegisterBody,
  LoginResponse,
  LoginBody,
  CurrentResponse,
  ForgotPasswordBody,
  LogoutResponse,
  UpdateUserResponse,
  ResetPasswordBody,
  ChangePasswordBody,
  ChangeLoginBody,
} from '../types';
import { loginClient, setToken } from './client';
import { client } from './client';

export const register = async (data: RegisterBody) => {
  try {
    return await client.post<never, RegisterResponse>('/auth/signup', data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (data: LoginBody) => {
  const result = await loginClient.post<never, LoginResponse>(
    '/auth/login',
    data
  );
  setToken(result.accessToken);
  localStorage.setItem('refreshToken', result.refreshToken);
  return result;
};

export const logout = async () => {
  const data = await loginClient.post<never, LogoutResponse>('/auth/logout');
  setToken();
  return data;
};

export const getCurrent = async (token: string) => {
  try {
    // setToken(token);
    const response = await loginClient.get<never, CurrentResponse>(
      '/auth/current'
    );
    let accessToken: string = '';
    if (
      typeof loginClient.defaults.headers.common['Authorization'] === 'string'
    ) {
      accessToken =
        loginClient.defaults.headers.common['Authorization'].split(' ')[1];
    }
    return { user: response, accessToken };
  } catch (error) {
    setToken();
    throw error;
  }
};

export const forgotPassword = async (data: ForgotPasswordBody) => {
  try {
    return await client.post('auth/forgot-password', data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async (data: FormData, id: string) => {
  try {
    return await loginClient.patch<never, UpdateUserResponse>(
      `/user/${id}`,
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteAccount = async (id: string) => {
  const response = await loginClient.delete(`user/${id}`);
  setToken();
  return response;
};

export const resetPassword = async (
  data: ResetPasswordBody,
  id: string,
  resetToken: string
) => {
  return await client.post(`/auth/reset-password/${id}/${resetToken}`, data);
};

export const changePassword = async (data: ChangePasswordBody) => {
  return await loginClient.patch('/user/user/change-password', data);
};

export const changeLogin = async (data: ChangeLoginBody) => {
  return await loginClient.post(`/user/email`, data);
};
