import { PayloadAction } from "@reduxjs/toolkit";
import { DrawerState } from "../reducer";
import { DrawerContent } from "../../../types";

export const openDrawer = (
  state: DrawerState,
  action: PayloadAction<boolean>
) => {
  state.open = action.payload;
};

export const setDrawerContent = (
  state: DrawerState,
  action: PayloadAction<DrawerContent>
) => {
  state.content = action.payload;
};
