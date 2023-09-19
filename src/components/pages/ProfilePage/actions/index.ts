import { PayloadAction } from '@reduxjs/toolkit';
import { ProfileState } from '../reducer';

export const currentPageSet = (
  state: ProfileState,
  action: PayloadAction<number>
) => {
  state.own.data.page = action.payload;
};

export const resetOwnAdsState = (state: ProfileState) => {
  state.own.data.notices = [];
};
