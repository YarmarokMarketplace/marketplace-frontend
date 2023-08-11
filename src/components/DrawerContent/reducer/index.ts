import { createSlice } from "@reduxjs/toolkit";
import { userRegisterFetch } from "../thunk";
import { emailErrorToggle, isAuthReset } from "../actions";

export interface UserAuthState {
  register: {
    loading: boolean;
    error: boolean;
    isAuth: boolean;
    emailError: boolean;
  };
  login: unknown;
  resetPassword: unknown;
}

const initialState: UserAuthState = {
  register: {
    loading: false,
    error: false,
    isAuth: false,
    emailError: false,
  },
  login: {},
  resetPassword: {},
};

const name = "USER_AUTH";

export const userAuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    emailErrorToggle,
    isAuthReset,
  },
  extraReducers(builder) {
    builder
      .addCase(userRegisterFetch.pending, (state) => {
        state.register.loading = true;
        state.register.error = false;
        state.register.emailError = false;
      })
      .addCase(userRegisterFetch.fulfilled, (state) => {
        state.register.loading = false;
        state.register.isAuth = true;
        state.register.emailError = false;
      })
      .addCase(userRegisterFetch.rejected, (state) => {
        state.register.loading = false;
        state.register.error = true;
      });
  },
});
export const {
  emailErrorToggle: emailErrorToggleAction,
  isAuthReset: isAuthResetAction,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
