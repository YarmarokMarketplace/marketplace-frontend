import { PayloadAction } from "@reduxjs/toolkit";
import { ProductsState } from "../reducer";

export const productSort = (
  state: ProductsState,
  action: PayloadAction<string>
) => {
  state.sort = action.payload;
};
