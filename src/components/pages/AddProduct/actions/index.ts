import { AddAdvertState, initialState } from "../reducer";

export const resetAddAdvertState = (state: AddAdvertState) => {
  state.data = initialState.data;
};
