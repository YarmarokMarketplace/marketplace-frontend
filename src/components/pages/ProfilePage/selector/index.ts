import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

export const profileStateSelector = (state: RootState) => state.profile;

export const ownAdsStateSelector = createSelector(
  profileStateSelector,
  (profile) => profile.own
);

export const favAdsStateSelector = createSelector(
  profileStateSelector,
  (profile) => profile.fav
);
