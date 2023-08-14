import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterBody } from "../../../types";
import { register } from "../../../api/user";
import { AxiosError } from "axios";
import { emailErrorToggleAction } from "../reducer";

const USER_REGISTER_THUNK_TYPE = "USER_REGISTER_THUNK_TYPE";

export const userRegisterFetch = createAsyncThunk(
  USER_REGISTER_THUNK_TYPE,
  async (data: RegisterBody, { rejectWithValue, dispatch }) => {
    try {
      return await register(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message == "Email in use") {
          dispatch(emailErrorToggleAction(true));
        }
        return rejectWithValue(error.response?.data);
      }
      return rejectWithValue(error);
    }
  }
);
