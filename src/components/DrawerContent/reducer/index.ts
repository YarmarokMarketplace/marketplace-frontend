import { createSlice } from '@reduxjs/toolkit';
import {
  userRegisterFetch,
  userLoginFetch,
  currentFetch,
  forgotPasswordFetch,
} from '../thunk';
import {
  emailErrorToggle,
  isAuthReset,
  isLoginReset,
  rememberLoginToggle,
  requestErrorToggle,
  requestLimitErrorToggle,
  notVerifiedErrorToggle,
  isEmailSendReset,
} from '../actions';

export interface UserAuthState {
  register: {
    loading: boolean;
    error: boolean;
    isAuth: boolean;
    emailError: boolean;
    requestLimitError: boolean;
  };
  login: {
    user: {
      name: string;
    };
    loading: boolean;
    error: boolean | null;
    isLogin: boolean;
    refreshToken: string;
    emailError: boolean;
    rememberLogin: boolean;
    requestError: boolean;
    notVerifiedError: boolean;
  };
  resetPassword: {
    loading: boolean;
    error: boolean | null;
    emailError: boolean;
    isEmailSend: boolean;
  };
  current: {
    user: {
      name: string;
    };
    loading: boolean;
    error: boolean | null;
    isLogin: boolean;
    accessToken: string;
  };
}

const initialState: UserAuthState = {
  register: {
    loading: false,
    error: false,
    isAuth: false,
    emailError: false,
    requestLimitError: false,
  },
  login: {
    user: {
      name: '',
    },
    loading: false,
    error: null,
    isLogin: false,
    refreshToken: '',
    emailError: false,
    rememberLogin: false,
    requestError: false,
    notVerifiedError: false,
  },
  resetPassword: {
    loading: false,
    error: null,
    emailError: false,
    isEmailSend: false,
  },
  current: {
    user: {
      name: '',
    },
    loading: false,
    error: null,
    isLogin: false,
    accessToken: '',
  },
};

const name = 'USER_AUTH';

export const userAuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    emailErrorToggle,
    isAuthReset,
    isLoginReset,
    rememberLoginToggle,
    requestErrorToggle,
    requestLimitErrorToggle,
    notVerifiedErrorToggle,
    isEmailSendReset,
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
      })
      .addCase(userLoginFetch.pending, (state, action) => {
        state.login.loading = true;
        state.login.error = false;
        state.login.emailError = false;
        state.login.requestError = false;
        state.login.notVerifiedError = false;
      })
      .addCase(userLoginFetch.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.user = payload.user;
        state.login.refreshToken = payload.refreshToken;
        state.login.isLogin = true;
        state.login.emailError = false;
        state.login.requestError = false;
        state.login.notVerifiedError = false;
      })
      .addCase(userLoginFetch.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = true;
      })
      .addCase(currentFetch.pending, (state, action) => {
        state.current.loading = true;
        state.current.error = false;
      })
      .addCase(currentFetch.fulfilled, (state, { payload }) => {
        state.current.loading = false;
        state.current.user = payload.user;
        state.current.accessToken = payload.accessToken;
        state.current.isLogin = true;
      })
      .addCase(currentFetch.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = true;
      })
      .addCase(forgotPasswordFetch.pending, (state, action) => {
        state.resetPassword.loading = true;
        state.resetPassword.error = false;
        state.resetPassword.emailError = false;
        state.resetPassword.isEmailSend = false;
      })
      .addCase(forgotPasswordFetch.fulfilled, (state, { payload }) => {
        state.resetPassword.loading = false;
        state.resetPassword.emailError = false;
        state.resetPassword.isEmailSend = true;
      })
      .addCase(forgotPasswordFetch.rejected, (state, action) => {
        state.resetPassword.loading = false;
        state.resetPassword.error = true;
      });
  },
});

export const {
  emailErrorToggle: emailErrorToggleAction,
  isAuthReset: isAuthResetAction,
  isLoginReset: isLoginResetAction,
  rememberLoginToggle: rememberLoginToggleAction,
  requestErrorToggle: requestErrorToggleAction,
  requestLimitErrorToggle: requestLimitErrorToggleAction,
  notVerifiedErrorToggle: notVerifiedErrorToggleAction,
  isEmailSendReset: isEmailSendResetAction,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
