import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../store';

export const productsStateSelector = (state: RootState) => state.products;

export const productsResultStateSelector = createSelector(
  productsStateSelector,
  (products) => products.products
);

export const searchResultStateSelector = createSelector(
  productsStateSelector,
  (products) => products.searchProducts
);
