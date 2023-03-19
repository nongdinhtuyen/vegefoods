import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

import { FETCH_COMMENT, GET_PRODUCT_TYPES, GET_PRODUCTS, CREATE_COMMENT, RATE, GET_PRODUCT_BY_ID } from '../actions/product';
import actions from '../actions/product';
import rf from '../../requests/RequestFactory';
import { unfoldSaga } from 'redux/redux_helper';

function* getListProducts(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ProductRequest').getListProducts(params), params);
        return data;
      },
      key: GET_PRODUCTS,
    },
    callbacks,
  );
}

function* getProductTypes(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ProductRequest').getProductTypes(params), params);
        return data;
      },
      key: GET_PRODUCT_TYPES,
    },
    callbacks,
  );
}

function* getProductById(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ProductRequest').getProductById(params), params);
        return data;
      },
      key: GET_PRODUCT_BY_ID,
    },
    callbacks,
  );
}

function* watchProduct() {
  yield takeLatest(GET_PRODUCTS, getListProducts);
  yield takeLatest(GET_PRODUCT_TYPES, getProductTypes);
  yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  // yield takeLatest(FETCH_COMMENT, fetchComment);
  // yield takeLatest(CREATE_COMMENT, createComment)
  // yield takeLatest(RATE,rate);
}

export default function* rootSaga() {
  yield all([fork(watchProduct)]);
}
