import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

import rf from '../../requests/RequestFactory';
import { unfoldSaga } from 'redux/redux_helper';
import { ADD_ADDRESS, DELETE_ADDRESS, GET_ADDRESS } from 'redux/actions/address';

function* deleteAddress(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('AddressRequest').deleteAddress(params), params);
        return data;
      },
      key: DELETE_ADDRESS,
    },
    callbacks,
  );
}

function* getAddress(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('AddressRequest').getAddress(params), params);
        return data;
      },
      key: GET_ADDRESS,
    },
    callbacks,
  );
}

function* addAddress(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('AddressRequest').addAddress(params), params);
        return data;
      },
      key: ADD_ADDRESS,
    },
    callbacks,
  );
}

function* watchAddress() {
  yield takeLatest(DELETE_ADDRESS, deleteAddress);
  yield takeLatest(GET_ADDRESS, getAddress);
  yield takeLatest(ADD_ADDRESS, addAddress);
}

export default function* rootSaga() {
  yield all([fork(watchAddress)]);
}
