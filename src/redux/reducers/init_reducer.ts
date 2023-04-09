import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/init';

import _ from 'lodash';

export interface ICartState {
  inited: boolean;
}

const initialState: ICartState = {
  inited: false,
};

const initReducer = createReducer(initialState, (builder) => {
  builder.addCase(actions.actionInitSuccedd, (state, { payload }: any) => {
    state.inited = true;
  });
});
export default initReducer;
