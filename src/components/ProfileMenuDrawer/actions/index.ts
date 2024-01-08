import { PayloadAction } from '@reduxjs/toolkit';
import { DrawerState } from '../reducer';

export const openProfileDrawer = (
  state: DrawerState,
  action: PayloadAction<boolean>
) => {
  state.open = action.payload;
};

// export const setDrawerContent = (
//   state: DrawerState,
//   action: PayloadAction<DrawerContent>
// ) => {
//   state.content = action.payload;
// };
