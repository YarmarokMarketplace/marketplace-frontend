import { PayloadAction } from '@reduxjs/toolkit';
import { UserAuthState } from '../reducer';

export const emailErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.register.emailError = action.payload;
  state.login.emailError = action.payload;
  state.forgotPassword.emailError = action.payload;
};

export const emailPatternErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.register.emailPatternError = action.payload;
};

export const emailPatternLoginErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.login.emailPatternError = action.payload;
};

export const isAuthReset = (state: UserAuthState) => {
  state.register.isAuth = false;
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
  state.forgotPassword.isEmailSend = false;
  state.changeLogin.isEmailSend = false;
};

interface UserUpdatePayload {
  id: string;
  email: string;
  name: string;
  lastname: string;
  patronymic: string;
  avatarURL: string;
  phone: string;
  favorite: string[];
}

export const updateUserState = (
  state: UserAuthState,
  action: PayloadAction<UserUpdatePayload>
) => {
  state.user = action.payload;
};

export const successMessageToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.statusMessages.successMessage = action.payload;
};

export const errorMessageToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.statusMessages.errorMessage = action.payload;
};

export const isResetPassReset = (state: UserAuthState) => {
  state.resetPassword.isReset = false;
};

export const isTokenExpiredToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.resetPassword.isTokenExpired = action.payload;
};

export const socialLoginUserSet = (
  state: UserAuthState,
  action: PayloadAction<{ name: string; email: string }>
) => {
  state.user.name = action.payload.name;
  state.user.email = action.payload.email;
};

export const isSocialLoginSet = (
  state: UserAuthState,
  action: PayloadAction<{ isLogin: boolean; accessToken: string }>
) => {
  state.isLogin = action.payload.isLogin;
  state.accessToken = action.payload.accessToken;
};

export const isPassChangedReset = (state: UserAuthState) => {
  state.changePassword.isChanged = false;
};

export const passWrongErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.changePassword.passWrongError = action.payload;
};

export const emailInUseErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.changeLogin.emailInUseError = action.payload;
};
