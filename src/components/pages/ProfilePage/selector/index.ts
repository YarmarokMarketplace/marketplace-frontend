import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../store';

export const profileSliceStateSelector = (state: RootState) => state.profile;

export const ownAdsStateSelector = createSelector(
  profileSliceStateSelector,
  (profile) => profile.own
);
