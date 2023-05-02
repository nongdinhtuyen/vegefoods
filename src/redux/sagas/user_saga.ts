import { all, call, put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { BASEURL } from '../../bootstrap';
import { GET_USER_INFO, LOGIN, LOGOUT, REGISTER, UPDATE_PASSWORD, GET_RANK, UPDATE_PROFILE, FORGET_PASSWORD } from '../actions/user';
import actions from '../actions/user';
import rf from '../../requests/RequestFactory';
import { createActionTypeOnSuccess, unfoldSaga } from 'redux/redux_helper';
import utils from 'common/utils';
import _ from 'lodash';
import { saveMasterData } from './init_saga';

function* login(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const resp = yield call((params) => rf.getRequest('UserRequest').login(params), params);
        window.axios.defaults.headers['apikey'] = resp.data.token;
        localStorage.setItem('session', JSON.stringify(resp.data));
        yield saveMasterData(resp.data.id);
        return resp;
      },
      key: LOGIN,
    },
    callbacks,
  );
}

function* register(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').register(params), params);
        return data;
      },
      key: REGISTER,
    },
    callbacks,
  );
}

function* getUsetInfo(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').getUserInfo(params), params);
        return data;
      },
      key: GET_USER_INFO,
    },
    callbacks,
  );
}

function* updateProfile(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').updateProfile(params), params);
        return data;
      },
      key: UPDATE_PROFILE,
    },
    callbacks,
  );
}

function* updatePassword(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').updatePassword(params), params);
        return data;
      },
      key: UPDATE_PASSWORD,
    },
    callbacks,
  );
}

function* getRank(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').getRank(params), params);
        return data;
      },
      key: GET_RANK,
    },
    callbacks,
  );
}

function* forgetPassword(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('UserRequest').forgetPassword(params), params);
        return data;
      },
      key: GET_RANK,
    },
    callbacks,
  );
}

function* watchUser() {
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
  yield takeLatest(GET_USER_INFO, getUsetInfo);
  yield takeLatest(UPDATE_PROFILE, updateProfile);
  yield takeLatest(UPDATE_PASSWORD, updatePassword);
  yield takeLatest(GET_RANK, getRank);
  yield takeLatest(FORGET_PASSWORD, forgetPassword);
}

export default function* rootSaga() {
  yield all([fork(watchUser)]);
}
