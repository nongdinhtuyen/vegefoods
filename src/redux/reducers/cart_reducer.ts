import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/cart';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

import _ from 'lodash';

export interface ICartState {
  cartData: any;
}

const initialState: ICartState = {
  cartData: [],
};

const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase(createActionTypeOnSuccess(actions.actionGetCart), (state, { payload }: any) => {
    state.cartData = payload;
  });
});
export default cartReducer;
