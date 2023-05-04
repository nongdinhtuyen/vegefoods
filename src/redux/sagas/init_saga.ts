import rf from '../../requests/RequestFactory';
import cartActions from '../actions/cart';
import initActions from '../actions/init';
import { GET_USER_INFO, LOGIN } from '../actions/user';
import userActions from '../actions/user';
import addressActions from '../actions/address';
import utils from 'common/utils';
import _ from 'lodash';
import { all, call, put, fork, takeLatest, take } from 'redux-saga/effects';
import { INIT } from 'redux/actions/init';
import { createActionTypeOnSuccess } from 'redux/redux_helper';

function* init() {
  const data = localStorage.getItem('provinces');
  if (!data) {
    const resp = yield call(async () => (await fetch('https://provinces.open-api.vn/api/p/1/?depth=3')).json());
    yield put(initActions.actionGetProvinces({ params: resp }));
    localStorage.setItem('provinces', JSON.stringify(resp));
  } else {
    yield put(initActions.actionGetProvinces({ params: JSON.parse(data!) }));
  }
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
  yield put(cartActions.actionGetCart({}));
  yield put(userActions.actionGetRank({ params: { id } }));
  yield put(addressActions.actionGetAddress({}));
  yield take(createActionTypeOnSuccess(addressActions.actionGetAddress))
  yield put(initActions.actionInitSucceed({}));
}

function* watchInit() {
  yield takeLatest(INIT, init);
}

export default function* rootSaga() {
  yield all([fork(watchInit)]);
}
