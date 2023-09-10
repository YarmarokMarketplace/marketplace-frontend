import { PayloadAction } from '@reduxjs/toolkit';
import { UserAuthState } from '../reducer';

export const emailErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.register.emailError = action.payload;
  state.login.emailError = action.payload;
  state.resetPassword.emailError = action.payload;
};

export const isAuthReset = (state: UserAuthState) => {
  state.register.isAuth = false;
};

export const isLoginReset = (state: UserAuthState) => {
  state.isLogin = false;
};

export const rememberLoginToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.login.rememberLogin = action.payload;
};

export const requestErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.login.requestError = action.payload;
};

export const requestLimitErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.register.requestLimitError = action.payload;
};

export const notVerifiedErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.login.notVerifiedError = action.payload;
};

export const isEmailSendReset = (state: UserAuthState) => {
  state.resetPassword.isEmailSend = false;
};

interface UserUpdatePayload {
  id: string;
  email: string;
  name: string;
  lastname: string;
  patronymic: string;
  avatarURL: string;
  phone: string;
}

export const updateUserState = (
  state: UserAuthState,
  action: PayloadAction<UserUpdatePayload>
) => {
  console.log(action.payload);
  state.login.user = action.payload;
};
