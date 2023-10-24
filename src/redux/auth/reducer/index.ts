import { createSlice } from '@reduxjs/toolkit';
import {
  userRegisterFetch,
  userLoginFetch,
  currentFetch,
  forgotPasswordFetch,
  logoutFetch,
  updateUserFetch,
  deleteAccountFetch,
  resetPasswordFetch,
  changePasswordFetch,
  changeLoginFetch,
} from '../thunk';
import {
  emailErrorToggle,
  isAuthReset,
  rememberLoginToggle,
  requestErrorToggle,
  requestLimitErrorToggle,
  notVerifiedErrorToggle,
  isEmailSendReset,
  updateUserState,
  successMessageToggle,
  errorMessageToggle,
  isResetPassReset,
  isTokenExpiredToggle,
  socialLoginUserSet,
  isSocialLoginSet,
  isPassChangedReset,
  passWrongErrorToggle,
  emailInUseErrorToggle,
} from '../actions';
import { SuccessMessageContent, ErrorMessageContent } from '../../../types';

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
      id: string;
      name: string;
      email: string;
      lastname: string;
      patronymic: string;
      avatarURL: string;
      phone: string;
      favorite: string[];
    };
    loading: boolean;
    error: boolean | null;
    emailError: boolean;
    rememberLogin: boolean;
    requestError: boolean;
    notVerifiedError: boolean;
  };
  forgotPassword: {
    loading: boolean;
    error: boolean | null;
    emailError: boolean;
    isEmailSend: boolean;
  };
  current: {
    loading: boolean;
    error: boolean | null;
  };
  isLogin: boolean;
  accessToken: string;
  refreshToken: string;
  updateUser: {
    loading: boolean;
    error: boolean | null;
  };
  statusMessages: {
    successMessage: boolean;
    succMsgContent: SuccessMessageContent;
    errorMessage: boolean;
    errMsgContent: ErrorMessageContent;
  };
  deleteAccount: {
    loading: boolean;
    error: boolean | null;
  };
  resetPassword: {
    loading: boolean;
    error: boolean | null;
    isReset: boolean;
    isTokenExpired: boolean;
  };
  changePassword: {
    loading: boolean;
    error: boolean | null;
    isChanged: boolean;
    passWrongError: boolean;
  };
  changeLogin: {
    loading: boolean;
    error: boolean | null;
    isEmailSend: boolean;
    emailInUseError: boolean;
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
      id: '',
      name: '',
      email: '',
      lastname: '',
      patronymic: '',
      avatarURL: '',
      phone: '',
      favorite: [],
    },
    loading: false,
    error: null,
    emailError: false,
    rememberLogin: false,
    requestError: false,
    notVerifiedError: false,
  },
  forgotPassword: {
    loading: false,
    error: null,
    emailError: false,
    isEmailSend: false,
  },
  current: {
    loading: false,
    error: null,
  },
  isLogin: false,
  accessToken: '',
  refreshToken: '',
  updateUser: {
    loading: false,
    error: null,
  },
  statusMessages: {
    successMessage: false,
    succMsgContent: SuccessMessageContent.noContent,
    errorMessage: false,
    errMsgContent: ErrorMessageContent.noContent,
  },
  deleteAccount: {
    loading: false,
    error: null,
  },
  resetPassword: {
    loading: false,
    error: null,
    isReset: false,
    isTokenExpired: false,
  },
  changePassword: {
    loading: false,
    error: null,
    isChanged: false,
    passWrongError: false,
  },
  changeLogin: {
    loading: false,
    error: null,
    isEmailSend: false,
    emailInUseError: false,
  },
};

const name = 'USER_AUTH';

export const userAuthSlice = createSlice({
  name,
  initialState,
  reducers: {
    emailErrorToggle,
    isAuthReset,
    rememberLoginToggle,
    requestErrorToggle,
    requestLimitErrorToggle,
    notVerifiedErrorToggle,
    isEmailSendReset,
    updateUserState,
    successMessageToggle,
    errorMessageToggle,
    isResetPassReset,
    isTokenExpiredToggle,
    socialLoginUserSet,
    isSocialLoginSet,
    isPassChangedReset,
    passWrongErrorToggle,
    emailInUseErrorToggle,
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
        state.refreshToken = payload.refreshToken;
        state.accessToken = payload.accessToken;
        state.isLogin = true;
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
        state.login.user = payload.user;
        state.accessToken = payload.accessToken;
        state.isLogin = true;
      })
      .addCase(currentFetch.rejected, (state, action) => {
        state.current.loading = false;
        state.current.error = true;
        state.accessToken = '';
      })
      .addCase(forgotPasswordFetch.pending, (state, action) => {
        state.forgotPassword.loading = true;
        state.forgotPassword.error = false;
        state.forgotPassword.emailError = false;
        state.forgotPassword.isEmailSend = false;
      })
      .addCase(forgotPasswordFetch.fulfilled, (state, { payload }) => {
        state.forgotPassword.loading = false;
        state.forgotPassword.emailError = false;
        state.forgotPassword.isEmailSend = true;
      })
      .addCase(forgotPasswordFetch.rejected, (state, action) => {
        state.forgotPassword.loading = false;
        state.forgotPassword.error = true;
      })
      .addCase(logoutFetch.pending, (state, action) => {
        state.login.loading = true;
        state.login.error = false;
      })
      .addCase(logoutFetch.fulfilled, (state) => {
        state.login.loading = false;
        state.login.user = {
          id: '',
          name: '',
          email: '',
          lastname: '',
          patronymic: '',
          avatarURL: '',
          phone: '',
          favorite: [],
        };
        state.refreshToken = '';
        state.accessToken = '';
        state.isLogin = false;
      })
      .addCase(logoutFetch.rejected, (state) => {
        state.login.loading = false;
        state.login.error = true;
      })
      .addCase(updateUserFetch.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = false;
      })
      .addCase(updateUserFetch.fulfilled, (state, { payload }) => {
        state.updateUser.loading = false;
        state.login.user = payload;
        state.login.user = {
          ...payload,
          id: payload._id,
        };
        state.statusMessages.successMessage = true;
        state.statusMessages.succMsgContent =
          SuccessMessageContent.updateUserSuccess;
      })
      .addCase(updateUserFetch.rejected, (state) => {
        state.updateUser.loading = false;
        state.updateUser.error = true;
        state.statusMessages.errorMessage = true;
        state.statusMessages.errMsgContent =
          ErrorMessageContent.updateUserError;
      })
      .addCase(deleteAccountFetch.pending, (state) => {
        state.updateUser.loading = true;
        state.updateUser.error = false;
      })
      .addCase(deleteAccountFetch.fulfilled, (state) => {
        state.login.loading = false;
        state.login.user = {
          id: '',
          name: '',
          email: '',
          lastname: '',
          patronymic: '',
          avatarURL: '',
          phone: '',
          favorite: [],
        };
        state.refreshToken = '';
        state.accessToken = '';
        state.isLogin = false;
        state.statusMessages.successMessage = true;
        state.statusMessages.succMsgContent =
          SuccessMessageContent.deleteAccountSuccess;
      })
      .addCase(deleteAccountFetch.rejected, (state) => {
        state.updateUser.loading = false;
        state.updateUser.error = true;
        state.statusMessages.errorMessage = true;
        state.statusMessages.errMsgContent =
          ErrorMessageContent.deleteAccountError;
      })
      .addCase(resetPasswordFetch.pending, (state) => {
        state.resetPassword.loading = true;
        state.resetPassword.error = false;
      })
      .addCase(resetPasswordFetch.fulfilled, (state) => {
        state.resetPassword.loading = false;
        state.resetPassword.isReset = true;
      })
      .addCase(resetPasswordFetch.rejected, (state) => {
        state.resetPassword.loading = false;
        state.resetPassword.error = true;
      })
      .addCase(changePasswordFetch.pending, (state) => {
        state.changePassword.loading = true;
        state.changePassword.error = false;
      })
      .addCase(changePasswordFetch.fulfilled, (state) => {
        state.changePassword.loading = false;
        state.changePassword.isChanged = true;
      })
      .addCase(changePasswordFetch.rejected, (state) => {
        state.changePassword.loading = false;
        state.changePassword.error = true;
      })
      .addCase(changeLoginFetch.pending, (state) => {
        state.changeLogin.loading = true;
        state.changeLogin.error = false;
      })
      .addCase(changeLoginFetch.fulfilled, (state) => {
        state.changeLogin.loading = false;
        state.changeLogin.isEmailSend = true;
      })
      .addCase(changeLoginFetch.rejected, (state) => {
        state.changeLogin.loading = false;
        state.changeLogin.error = true;
      });
  },
});

export const {
  emailErrorToggle: emailErrorToggleAction,
  isAuthReset: isAuthResetAction,
  rememberLoginToggle: rememberLoginToggleAction,
  requestErrorToggle: requestErrorToggleAction,
  requestLimitErrorToggle: requestLimitErrorToggleAction,
  notVerifiedErrorToggle: notVerifiedErrorToggleAction,
  isEmailSendReset: isEmailSendResetAction,
  updateUserState: updateUserStateAction,
  successMessageToggle: successMessageToggleAction,
  errorMessageToggle: errorMessageToggleAction,
  isResetPassReset: isResetPassResetAction,
  isTokenExpiredToggle: isTokenExpiredToggleAction,
  socialLoginUserSet: socialLoginUserSetAction,
  isSocialLoginSet: isSocialLoginSetAction,
  isPassChangedReset: isPassChangedResetAction,
  passWrongErrorToggle: passWrongErrorToggleAction,
  emailInUseErrorToggle: emailInUseErrorToggleAction,
} = userAuthSlice.actions;

export default userAuthSlice.reducer;
