import { createReducer } from '@reduxjs/toolkit';
import actions from 'redux/actions/user';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

import _ from 'lodash';

export interface IUserState {
  profile: any;
  isLogin: boolean;
  rank: any;
}

const initialState: IUserState = {
  profile: {},
  isLogin: false,
  rank: {},
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(createActionTypeOnSuccess(actions.actionLogin), (state, { payload }: any) => {
    state.isLogin = true;
  });
  builder.addCase(actions.actionLogout, (state, { payload }: any) => {
    localStorage.removeItem('session');
    window.axios.defaults.headers.common['apikey'] = '';
    state.profile = {};
    state.isLogin = false;
  });
  builder.addCase(createActionTypeOnSuccess(actions.actionGetUserInfo), (state, { payload }: any) => {
    state.profile = payload.data;
  });
  builder.addCase(createActionTypeOnSuccess(actions.actionGetRank), (state, { payload }: any) => {
    state.rank = payload.data;
  });
});

export default userReducer;
