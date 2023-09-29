import { createSlice } from '@reduxjs/toolkit';
import {
  UserFavProductsResponse,
  UserProductsResponse,
} from '../../../../types';
import {
  currentPageSet,
  resetOwnAdsState,
  resetFavAdsState,
  currentFavPageSet,
  resetFavoriteList,
} from '../actions';
import {
  addFavoriteProductFetch,
  removeFavoriteProductFetch,
  userFavoritesProductsListFetch,
  userProductsListFetch,
  activateOrDeactivateProductFetch,
  deleteProductFetch,
} from '../thunk';

export interface ProfileState {
  own: {
    loading: boolean;
    error: boolean | null;
    data: UserProductsResponse;
  };
  favorites: string[];
  fav: {
    toggle: {
      loading: boolean;
      error: boolean | null;
    };
    loading: boolean;
    error: boolean | null;
    data: UserFavProductsResponse;
  };
}

export const initialState: ProfileState = {
  own: {
    loading: false,
    error: null,
    data: {
      totalPagesActive: 0,
      totalPagesInactive: 0,
      activeResult: 0,
      inactiveResult: 0,
      page: 1,
      limit: 3,
      activeNotices: [],
      inactiveNotices: [],
    },
  },
  favorites: [],
  fav: {
    toggle: {
      loading: false,
      error: null,
    },
    loading: false,
    error: null,
    data: {
      totalPages: 0,
      totalResult: 0,
      page: 1,
      limit: 8,
      result: [],
    },
  },
};

const name = 'PROFILE';

const profileSlice = createSlice({
  name,
  initialState,
  reducers: {
    currentPageSet,
    resetOwnAdsState,
    resetFavAdsState,
    currentFavPageSet,
    resetFavoriteList,
  },
  extraReducers(builder) {
    builder
      .addCase(userProductsListFetch.pending, (state) => {
        state.own.loading = true;
        state.own.error = false;
      })
      .addCase(userProductsListFetch.fulfilled, (state, action) => {
        state.own.loading = false;
        state.own.data = action.payload;
      })
      .addCase(userProductsListFetch.rejected, (state) => {
        state.own.loading = false;
        state.own.error = true;
      })
      .addCase(userFavoritesProductsListFetch.pending, (state) => {
        state.fav.loading = true;
        state.fav.error = false;
      })
      .addCase(userFavoritesProductsListFetch.fulfilled, (state, action) => {
        state.fav.loading = false;
        state.fav.data = action.payload;
      })
      .addCase(userFavoritesProductsListFetch.rejected, (state) => {
        state.fav.loading = false;
        state.fav.error = true;
      })
      .addCase(addFavoriteProductFetch.pending, (state) => {
        state.fav.toggle.loading = true;
        state.fav.toggle.error = false;
      })
      .addCase(addFavoriteProductFetch.fulfilled, (state, action) => {
        state.fav.toggle.loading = false;
        state.favorites = action.payload;
      })
      .addCase(addFavoriteProductFetch.rejected, (state) => {
        state.fav.toggle.loading = false;
        state.fav.toggle.error = true;
      })
      .addCase(removeFavoriteProductFetch.pending, (state) => {
        state.fav.toggle.loading = true;
        state.fav.toggle.error = false;
      })
      .addCase(removeFavoriteProductFetch.fulfilled, (state, action) => {
        state.fav.toggle.loading = false;
        state.favorites = action.payload;
      })
      .addCase(removeFavoriteProductFetch.rejected, (state) => {
        state.fav.toggle.loading = false;
        state.fav.toggle.error = true;
      })
      .addCase(activateOrDeactivateProductFetch.pending, (state) => {
        state.own.loading = true;
        state.own.error = false;
      })
      .addCase(
        activateOrDeactivateProductFetch.fulfilled,
        (state, { payload }) => {
          state.own.loading = false;
          const productId = payload.data.result._id;
          const isActive = payload.data.result.active;
          isActive
            ? (state.own.data.inactiveNotices =
                state.own.data.inactiveNotices.filter(
                  (product) => product._id !== productId
                ))
            : (state.own.data.activeNotices =
                state.own.data.activeNotices.filter(
                  (product) => product._id !== productId
                ));
        }
      )
      .addCase(activateOrDeactivateProductFetch.rejected, (state) => {
        state.own.loading = false;
        state.own.error = true;
      })
      .addCase(deleteProductFetch.pending, (state) => {
        state.own.loading = true;
        state.own.error = false;
      })
      .addCase(deleteProductFetch.fulfilled, (state) => {
        state.own.loading = false;
      })
      .addCase(deleteProductFetch.rejected, (state) => {
        state.own.loading = false;
        state.own.error = true;
      });
  },
});

export const {
  currentPageSet: currentPageSetAction,
  resetOwnAdsState: resetOwnAdsStateAction,
  resetFavAdsState: resetFavAdsStateAction,
  currentFavPageSet: currentFavPageSetAction,
  resetFavoriteList: resetFavoriteListAction,
} = profileSlice.actions;

export default profileSlice.reducer;
