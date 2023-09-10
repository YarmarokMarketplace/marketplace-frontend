import { combineReducers } from '@reduxjs/toolkit';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categories from '../../components/pages/HomePage/reducer';
import products from '../../components/pages/CategoryPage/reducer';
import drawer from '../../components/CustomDrawer/reducer';
import product from '../../components/pages/SingleProductPage/reducer';
import userAuth from '../../components/DrawerContent/reducer';
import modal from '../../components/CustomModal/reducer';
import userAuthReducer from '../../components/DrawerContent/reducer';
import addAdvert from '../../components/pages/AddProduct/reducer';

const persistConfig = {
  key: 'accessToken',
  storage,
  whitelist: ['accessToken'],
  // serialize: true
};

const persistedAuthReducer = persistReducer(persistConfig, userAuthReducer);

export default combineReducers({
  categories,
  products,
  product,
  drawer,
  userAuth: persistedAuthReducer,
  modal,
  addAdvert,
});
