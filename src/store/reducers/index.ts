import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import categories from "../../components/pages/HomePage/reducer";
import products from "../../components/pages/CategoryPage/reducer";
import drawer from "../../components/CustomDrawer/reducer";
import userAuth from "../../components/DrawerContent/reducer";
import modal from "../../components/CustomModal/reducer";
import userAuthReducer from "../../components/DrawerContent/reducer";

const persistConfig = {
  key: 'login',
  storage,
  whitelist: ['login']
}

const persistedAuthReducer = persistReducer(persistConfig, userAuthReducer);

export default combineReducers({
  categories,
  products,
  drawer,
  userAuth: persistedAuthReducer,
  modal
});
