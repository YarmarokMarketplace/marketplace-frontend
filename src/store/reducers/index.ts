import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categories from '../../components/pages/HomePage/reducer';
import products from '../../redux/products/reducer';
import drawer from '../../components/CustomDrawer/reducer';
import product from '../../components/pages/SingleProductPage/reducer';
import userAuth from 'redux/auth/reducer';
import modal from '../../components/CustomModal/reducer';
import userAuthReducer from 'redux/auth/reducer';
import addAdvert from '../../components/pages/AddProduct/reducer';
import profile from 'redux/profile/reducer';
import orders from 'redux/orders/reducer';

const persistConfig = {
  key: 'authData',
  storage,
  whitelist: ['accessToken', 'isLogin', 'user'],
};

const persistAdvertConfig = {
  key: 'advert',
  storage,
  whitelist: ['images'],
};
const persistedAuthReducer = persistReducer(persistConfig, userAuthReducer);
const persistedAdvertReducer = persistReducer(persistAdvertConfig, addAdvert);

export default combineReducers({
  categories,
  products,
  product,
  drawer,
  userAuth: persistedAuthReducer,
  modal,
  addAdvert: persistedAdvertReducer,
  profile,
  orders,
});
