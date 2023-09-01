import {
  RegisterResponse,
  RegisterBody,
  LoginResponse,
  LoginBody,
  CurrentResponse,
  ForgotPasswordBody,
  LogoutResponse,
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
    setToken(token);
    const data = await loginClient.get<never, CurrentResponse>('/auth/current');
    return data;
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
