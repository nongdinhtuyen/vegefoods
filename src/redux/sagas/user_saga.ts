import { all, call, put, fork, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { BASEURL } from '../../bootstrap';
import { GET_USER_INFO, INIT, LOGIN, LOGOUT, REGISTER, UPDATE_PROFILE } from '../actions/user';
import actions from '../actions/user';
import rf from '../../requests/RequestFactory';
import { createActionTypeOnSuccess, unfoldSaga } from 'redux/redux_helper';
import utils from 'common/utils';
import _ from 'lodash';

function* init(action) {
  if (!_.isEmpty(utils.getSessionJSON())) {
    try {
      const { token, id } = utils.getSessionJSON();
      window.axios.defaults.headers['token'] = token;
      const resp = yield call((params) => rf.getRequest('UserRequest').getUserInfo(params), id);
      yield put(createActionTypeOnSuccess(LOGIN)());
      yield put(createActionTypeOnSuccess(GET_USER_INFO)(resp));
      if (resp.error === 200) {
      }
    } catch (err) {
      console.log('=======', err);
    }
  }
}

function* login(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const resp = yield call((params) => rf.getRequest('UserRequest').login(params), params);
        window.axios.defaults.headers['token'] = resp.data.token;
        localStorage.setItem('session', JSON.stringify(resp.data));
        return resp;
      },
      key: LOGIN,
    },
    callbacks,
  );
}

// function* loginSucceed(action) {
//   window.localStorage.setItem('token', action.data.token);
//   yield (window.axios = axios.create({
//     baseURL: BASEURL,
//     headers: { token: action.data.token },
//   }));
// }

// function* logout(action) {
//   window.localStorage.removeItem('token');
//   yield (window.axios = axios.create({
//     baseURL: BASEURL,
//   }));
// }

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

function* watchUser() {
  yield takeLatest(INIT, init);
  yield takeLatest(LOGIN, login);
  yield takeLatest(REGISTER, register);
  yield takeLatest(GET_USER_INFO, getUsetInfo);
  yield takeLatest(UPDATE_PROFILE, updateProfile);
}

export default function* rootSaga() {
  yield all([fork(watchUser)]);
}
