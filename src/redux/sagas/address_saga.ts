import rf from '../../requests/RequestFactory';
import { all, call, put, fork, takeLatest } from 'redux-saga/effects';
import { ADD_ADDRESS, DELETE_ADDRESS, GET_ADDRESS, GET_DISTRICT, GET_WARD, UPDATE_ADDRESS } from 'redux/actions/address';
import { unfoldSaga } from 'redux/redux_helper';

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

function* getDistrict(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('AddressRequest').getDistrict(params), params);
        return data;
      },
      key: GET_DISTRICT,
    },
    callbacks,
  );
}

function* getWard(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('AddressRequest').getWard(params), params);
        return data;
      },
      key: GET_WARD,
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

function* updateAddress(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('AddressRequest').updateAddress(params), params);
        return data;
      },
      key: UPDATE_ADDRESS,
    },
    callbacks,
  );
}

function* watchAddress() {
  yield takeLatest(DELETE_ADDRESS, deleteAddress);
  yield takeLatest(GET_ADDRESS, getAddress);
  yield takeLatest(GET_DISTRICT, getDistrict);
  yield takeLatest(GET_WARD, getWard);
  yield takeLatest(ADD_ADDRESS, addAddress);
  yield takeLatest(UPDATE_ADDRESS, updateAddress);
}

export default function* rootSaga() {
  yield all([fork(watchAddress)]);
}
