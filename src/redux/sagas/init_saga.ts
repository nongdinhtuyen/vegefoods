import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { GET_USER_INFO, LOGIN } from '../actions/user';
import cartActions from '../actions/cart';
import initActions from '../actions/init';
import userActions from '../actions/user';
import rf from '../../requests/RequestFactory';
import { createActionTypeOnSuccess } from 'redux/redux_helper';
import utils from 'common/utils';
import _ from 'lodash';
import { INIT } from 'redux/actions/init';

function* init() {
  if (!_.isEmpty(utils.getSessionJSON())) {
    try {
      const { token, id } = utils.getSessionJSON();
      window.axios.defaults.headers.common['apikey'] = token;
      yield saveMasterData(id);
    } catch (err) {
      yield put(initActions.actionInitSucceed({}));
      console.log('=======', err);
    }
  } else {
    yield put(initActions.actionInitSucceed({}));
  }
}

export function* saveMasterData(id) {
  const resp = yield call((params) => rf.getRequest('UserRequest').getUserInfo(params), id);
  yield put(createActionTypeOnSuccess(LOGIN)());
  yield put(createActionTypeOnSuccess(GET_USER_INFO)(resp));
  yield put(cartActions.actionGetCartTotal({}));
  yield put(userActions.actionGetRank({ params: { id } }));
  yield put(initActions.actionInitSucceed({}));
}

function* watchInit() {
  yield takeLatest(INIT, init);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
