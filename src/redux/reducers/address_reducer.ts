import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/address';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

import _ from 'lodash';

export interface IAddressState {
  listAddress: any;
}

const initialState: IAddressState = {
  listAddress: [],
};

const addressReducer = createReducer(initialState, (builder) => {
  builder.addCase(createActionTypeOnSuccess(actions.actionGetAddress), (state, { payload }: any) => {
    state.listAddress = payload.data;
  });
});
export default addressReducer;
