import { PayloadAction } from '@reduxjs/toolkit';
import { ProfileState, initialState } from '../reducer';

export const currentPageSet = (
  state: ProfileState,
  action: PayloadAction<number>
) => {
  state.own.data.page = action.payload;
};

export const resetOwnAdsState = (state: ProfileState) => {
  state.own.data = initialState.own.data;
};

export const resetFavAdsState = (state: ProfileState) => {
  state.fav = initialState.fav;
};

export const currentFavPageSet = (
  state: ProfileState,
  action: PayloadAction<number>
) => {
  state.fav.data.page = action.payload;
};

export const resetFavoriteList = (state: ProfileState) => {
  state.favorites = [];
};

export const setProductId = (
  state: ProfileState,
  action: PayloadAction<string | null>
) => {
  state.productId = action.payload;
};
