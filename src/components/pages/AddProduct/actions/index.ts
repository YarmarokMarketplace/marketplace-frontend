import { PayloadAction } from '@reduxjs/toolkit';
import { AddAdvertState, Images, initialState } from '../reducer';

export const resetAddAdvertState = (state: AddAdvertState) => {
  state.data = initialState.data;
};

export const saveAddAdvertImages = (
  state: AddAdvertState,
  action: PayloadAction<Images[]>
) => {
  state.images = action.payload;
};

export const resetAddSavedData = (state: AddAdvertState) => {
  state.images = [];
};
