import { combineReducers } from "@reduxjs/toolkit";

import categories from "../../components/pages/HomePage/reducer";
import products from "../../components/pages/CategoryPage/reducer";

export default combineReducers({
  categories,
  products,
});
