import { PayloadAction } from "@reduxjs/toolkit";
import { UserAuthState } from "../reducer";

export const emailErrorToggle = (
  state: UserAuthState,
  action: PayloadAction<boolean>
) => {
  state.register.emailError = action.payload;
};

export const isAuthReset = (state: UserAuthState) => {
  state.register.isAuth = false;
};
