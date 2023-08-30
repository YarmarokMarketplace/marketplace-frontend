import { RegisterResponse, RegisterBody, LoginResponse, LoginBody, CurrentResponse } from "../types";
import { loginClient, setToken } from "./client";
import { client } from "./client";

export const register = async (data: RegisterBody) => {
  try {
    return await client.post<never, RegisterResponse>("/auth/signup", data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (data: LoginBody) => {
  // try {
  const result = await loginClient.post<never, LoginResponse>("/auth/login", data);
  setToken(result.accessToken);
  localStorage.setItem("refreshToken", result.refreshToken);
  return result;
  // } catch (error) {
  //   // console.log(error)
  //   return Promise.reject(error);
  // }
};

export const getCurrent = async (token: string) => {
  try {
    setToken(token);
    const data = await loginClient.get<never, CurrentResponse>("/auth/current");
    return data;
  }
  catch (error) {
    setToken();
    throw error;
  }
}
