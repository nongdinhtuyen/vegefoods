import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/init';

import _ from 'lodash';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

export interface IInitState {
  inited: boolean;
  provinces: any;
}

export const initialState: IInitState = {
  inited: false,
  provinces: {},
};

const initReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.actionInitSucceed, (state, { payload }: any) => {
    state.inited = true;
  });
  builder.addCase(actions.actionGetProvinces, (state, { payload }: any) => {
    state.provinces = payload.params;
  });
});
export default initReducer;
