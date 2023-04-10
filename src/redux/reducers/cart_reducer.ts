import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/cart';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

import _ from 'lodash';

export interface ICartState {
  cartData: any;
  cartDataTotal: any;
}

const initialState: ICartState = {
  cartData: {},
  cartDataTotal: {},
};

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(createActionTypeOnSuccess(actions.actionGetCart), (state, { payload }: any) => {
    state.cartData = payload.data;
  });
  builder.addCase(createActionTypeOnSuccess(actions.actionGetCartTotal), (state, { payload }: any) => {
    state.cartDataTotal = payload.data;
  });
});
export default cartReducer;
