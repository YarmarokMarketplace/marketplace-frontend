import { combineReducers } from "@reduxjs/toolkit";

import categories from "../../components/pages/HomePage/reducer";
import products from "../../components/pages/CategoryPage/reducer";
import drawer from "../../components/CustomDrawer/reducer";
import userAuth from "../../components/DrawerContent/reducer";
import product from "../../components/pages/SingleProductPage/reducer";

export default combineReducers({
  categories,
  products,
  product,
  drawer,
  userAuth,
});
