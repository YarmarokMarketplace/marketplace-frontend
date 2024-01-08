import { createSlice } from '@reduxjs/toolkit';
import { DrawerContent } from '../../../types';
import { openProfileDrawer } from '../actions';

export interface DrawerState {
  open: boolean;
}

const initialState: DrawerState = {
  open: false,
};

const name = 'PROFILE_DRAWER';

const profileDrawerSlice = createSlice({
  name,
  initialState,
  reducers: {
    openProfileDrawer,
  },
});

export const { openProfileDrawer: openProfileDrawerAction } =
  profileDrawerSlice.actions;

export default profileDrawerSlice.reducer;
