import { createSelector } from 'reselect';
import { RootState } from '../../../store';

export const ordersStateSelector = (state: RootState) => state.orders;

// export const userRegisterStateSelector = createSelector(
//   ordersStateSelector,
//   (orders) => orders
// );
