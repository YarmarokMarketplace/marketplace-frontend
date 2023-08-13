import { createSlice } from "@reduxjs/toolkit";
import { userRegisterFetch, userLoginFetch, currentFetch } from "../thunk";
import { emailErrorToggle, isAuthReset, isLoginReset } from "../actions";

export interface UserAuthState {
  register: {
    loading: boolean;
    error: boolean;
    isAuth: boolean;
    emailError: boolean;
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
  };
  resetPassword: unknown;
  current: {
    user: {
      name: string;
    };
    loading: boolean;
    error: boolean | null;
    isLogin: boolean;
    accessToken: string;
  }
}

const initialState: UserAuthState = {
  register: {
    loading: false,
    error: false,
    isAuth: false,
    emailError: false,
  },
  login: {
    user: {
      name: ''
    },
    loading: false,
    error: null,
    isLogin: false,
    refreshToken: "",
    emailError: false,
  },
  resetPassword: {},
  current: {
    user: {
      name: ''
    },
    loading: false,
    error: null,
    isLogin: false,
    accessToken: ''
  }
}

const name = "USER_AUTH";

export const userAuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    emailErrorToggle,
    isAuthReset,
    isLoginReset,
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
      })
      .addCase(userLoginFetch.fulfilled, (state, { payload }) => {
        state.login.loading = false;
        state.login.user = payload.user;
        state.login.refreshToken = payload.refreshToken;
        state.login.isLogin = true;
        state.login.emailError = false;
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
      });
  },
});
export const {
  emailErrorToggle: emailErrorToggleAction,
  isAuthReset: isAuthResetAction,
  isLoginReset: isLoginResetAction,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;