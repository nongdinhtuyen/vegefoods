import { all, call, put, fork, takeLatest, takeEvery } from 'redux-saga/effects';

import { GET_PRODUCT_TYPES, GET_PRODUCTS, GET_PRODUCT_BY_ID, GET_COMMENTS, ADD_COMMENT, GET_PRODUCT_IMAGE_BY_ID } from '../actions/product';
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
      key: GET_COMMENTS,
    },
    callbacks,
  );
}

function* getProductImageById(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ProductRequest').getProductImageById(params), params);
        return data;
      },
      key: GET_PRODUCT_IMAGE_BY_ID,
    },
    callbacks,
  );
}

function* getComments(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ProductRequest').getListComments(params), params);
        return data;
      },
      key: GET_COMMENTS,
    },
    callbacks,
  );
}

function* addComment(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('ProductRequest').addComment(params), params);
        return data;
      },
      key: GET_PRODUCT_BY_ID,
    },
    callbacks,
  );
}

function* watchProduct() {
  yield takeEvery(GET_PRODUCTS, getListProducts);
  yield takeLatest(GET_PRODUCT_TYPES, getProductTypes);
  yield takeLatest(GET_PRODUCT_BY_ID, getProductById);
  yield takeLatest(GET_PRODUCT_IMAGE_BY_ID, getProductImageById);
  yield takeLatest(GET_COMMENTS, getComments);
  yield takeLatest(ADD_COMMENT, addComment)
}

export default function* rootSaga() {
  yield all([fork(watchProduct)]);
}
