import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserOwnProducts,
  activateOrDeactivateProduct,
  deleteProduct,
} from '../../../../api/products';
import { AxiosError } from 'axios';
import { resetOwnAdsStateAction } from '../reducer';
import {
  addFavoriteProduct,
  getUserFavoriteProducts,
  removeFavoriteProduct,
} from 'src/api/products';
import { resetFavAdsStateAction } from '../reducer';
import { currentFetch } from 'redux/auth/thunk';

const USER_PRODUCTS_FETCH_THUNK_TYPE = 'USER_PRODUCTS_FETCH_THUNK_TYPE';

export const userProductsListFetch = createAsyncThunk(
  USER_PRODUCTS_FETCH_THUNK_TYPE,
  async (
    values: { page: number; limit: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      return await getUserOwnProducts(values.page, values.limit);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          dispatch(resetOwnAdsStateAction());
        }
      }
      return rejectWithValue(error);
    }
  }
);

const USER_FAVORITES_PRODUCTS_FETCH_THUNK_TYPE =
  'USER_FAVORITES_PRODUCTS_FETCH_THUNK_TYPE';

export const userFavoritesProductsListFetch = createAsyncThunk(
  USER_FAVORITES_PRODUCTS_FETCH_THUNK_TYPE,
  async (
    values: { page: number; limit: number },
    { rejectWithValue, dispatch }
  ) => {
    try {
      return await getUserFavoriteProducts(values.page, values.limit);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) {
          dispatch(resetFavAdsStateAction());
          dispatch(currentFetch());
        }
      }
      return rejectWithValue(error);
    }
  }
);

const ADD_FAVORITE_PRODUCT_FETCH_THUNK_TYPE =
  'ADD_FAVORITE_PRODUCT_FETCH_THUNK_TYPE';

export const addFavoriteProductFetch = createAsyncThunk(
  ADD_FAVORITE_PRODUCT_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await addFavoriteProduct(id);
      return res.user.favorite;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const REMOVE_FAVORITE_PRODUCT_FETCH_THUNK_TYPE =
  'REMOVE_FAVORITE_PRODUCT_FETCH_THUNK_TYPE';

export const removeFavoriteProductFetch = createAsyncThunk(
  REMOVE_FAVORITE_PRODUCT_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await removeFavoriteProduct(id);
      return res.favorite;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const DEACTIVATE_PRODUCT_THUNK_TYPE = 'DEACTIVATE_PRODUCT_THUNK_TYPE';

export const activateOrDeactivateProductFetch = createAsyncThunk(
  DEACTIVATE_PRODUCT_THUNK_TYPE,
  async (
    values: { productId: string; active: boolean },
    { rejectWithValue }
  ) => {
    try {
      return await activateOrDeactivateProduct(values.productId, values.active);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const DELETE_PRODUCT_FETCH_THUNK_TYPE = 'DELETE_PRODUCT_FETCH_THUNK_TYPE';

export const deleteProductFetch = createAsyncThunk(
  DELETE_PRODUCT_FETCH_THUNK_TYPE,
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteProduct(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
