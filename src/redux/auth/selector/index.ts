import { createSelector } from 'reselect';
import { RootState } from '../../../store';

export const userAuthStateSelector = (state: RootState) => state.userAuth;

export const userRegisterStateSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.register
);
export const userLoginStateSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => ({
    ...userAuth.login,
    isLogin: userAuth.isLogin,
  })
);

export const getUserStateSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.login.user
);

export const forgotPasswordStateSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.forgotPassword
);

export const statusMessagesSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.statusMessages
);

export const resetPasswordSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.resetPassword
);

export const changePasswordSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.changePassword
);

export const changeLoginSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.changeLogin
);
