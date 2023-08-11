import { RegisterResponse, RegisterBody } from "../types";
import { client } from "./client";

export const register = async (data: RegisterBody) => {
  try {
    return await client.post<never, RegisterResponse>("/auth/signup", data);
  } catch (error) {
    return Promise.reject(error);
  }
};
