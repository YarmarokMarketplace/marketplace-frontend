import { combineReducers } from "@reduxjs/toolkit";

import categories from "../../components/pages/HomePage/reducer";
import products from "../../components/pages/CategoryPage/reducer";
import drawer from "../../components/CustomDrawer/reducer";
import userAuth from "../../components/DrawerContent/reducer";
import modal from "../../components/CustomModal/reducer";

export default combineReducers({
  categories,
  products,
  drawer,
  userAuth,
  modal
});
