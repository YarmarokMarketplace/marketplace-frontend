import { createSelector } from "reselect";
import { RootState } from "../../../store";

export const userAuthStateSelector = (state: RootState) => state.userAuth;

export const userRegisterStateSelector = createSelector(
  userAuthStateSelector,
  (userAuth) => userAuth.register
);
