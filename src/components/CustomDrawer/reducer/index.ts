import { createSlice } from "@reduxjs/toolkit";
import { DrawerContent } from "../../../types";
import { openDrawer, setDrawerContent } from "../actions";

export interface DrawerState {
  open: boolean;
  content: DrawerContent;
}

const initialState: DrawerState = {
  open: false,
  content: DrawerContent.noContent,
};

const name = "DRAWER";

const drawerSlice = createSlice({
  name,
  initialState,
  reducers: {
    openDrawer,
    setDrawerContent,
  },
});

export const {
  openDrawer: openDrawerAction,
  setDrawerContent: setDrawerContentAction,
} = drawerSlice.actions;

export default drawerSlice.reducer;
