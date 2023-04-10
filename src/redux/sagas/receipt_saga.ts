import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

import rf from '../../requests/RequestFactory';
import { unfoldSaga } from 'redux/redux_helper';
import { CREATE_RECEIPT, GET_RECEIPT, GET_RECEIPT_ID } from 'redux/actions/receipt';

function* getReceipt(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ReceiptRequest').getReceipt(params), params);
        return data;
      },
      key: GET_RECEIPT,
    },
    callbacks,
  );
}

function* getReceiptId(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ReceiptRequest').getReceiptId(params), params);
        return data;
      },
      key: GET_RECEIPT,
    },
    callbacks,
  );
}

function* createReceipt(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ReceiptRequest').createReceipt(params), params);
        return data;
      },
      key: CREATE_RECEIPT,
    },
    callbacks,
  );
}


function* watchAddress() {
  yield takeLatest(GET_RECEIPT, getReceipt);
  yield takeLatest(GET_RECEIPT_ID, getReceiptId);
  yield takeLatest(CREATE_RECEIPT, createReceipt);
}

export default function* rootSaga() {
  yield all([fork(watchAddress)]);
}
