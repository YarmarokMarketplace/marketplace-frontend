import { PayloadAction } from "@reduxjs/toolkit";
import { UserAuthState } from "../reducer";

export const emailErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.register.emailError = action.payload;
  state.login.emailError = action.payload;
};

export const isAuthReset = (state: UserAuthState) => {
  state.register.isAuth = false;
};

export const isLoginReset = (state: UserAuthState) => {
  state.login.isLogin = false;
};

export const rememberLoginToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.login.rememberLogin = action.payload;
};