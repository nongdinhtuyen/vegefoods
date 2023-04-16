import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/init';

import _ from 'lodash';

export interface IInitState {
  inited: boolean;
}

export const initialState: IInitState = {
  inited: false,
};

const initReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.actionInitSucceed, (state, { payload }: any) => {
    state.inited = true;
  });
});
export default initReducer;
