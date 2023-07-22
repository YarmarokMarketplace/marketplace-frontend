import { PayloadAction } from "@reduxjs/toolkit";
import { ProductsState } from "../reducer";

export const currentPageSet = (
  state: ProductsState,
  action: PayloadAction<number>
) => {
  state.products.page = action.payload;
};
