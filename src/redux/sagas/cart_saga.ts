import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

import { ADD_CART, GET_CART, GET_CART_TOTAL, REMOVE_CART } from '../actions/cart';
import rf from '../../requests/RequestFactory';
import { unfoldSaga } from 'redux/redux_helper';

function* getCart(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('CartRequest').getCart(params), params);
        return data;
      },
      key: GET_CART,
    },
    callbacks,
  );
}

function* addCart(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('CartRequest').addCart(params), params);
        return data;
      },
      key: ADD_CART,
    },
    callbacks,
  );
}

function* removeCart(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('CartRequest').removeCart(params), params);
        return data;
      },
      key: REMOVE_CART,
    },
    callbacks,
  );
}

function* getCartTotal(action) {
  const { params, callbacks } = action.payload;
  yield unfoldSaga(
    {
      *handler() {
        const data = yield call((params) => rf.getRequest('CartRequest').getCartTotal(params), params);
        return data;
      },
      key: GET_CART_TOTAL,
    },
    callbacks,
  );
}

function* watchCart() {
  yield takeLatest(GET_CART, getCart);
  yield takeLatest(ADD_CART, addCart);
  yield takeLatest(GET_CART_TOTAL, getCartTotal);
  yield takeLatest(REMOVE_CART, removeCart);
}

export default function* rootSaga() {
  yield all([fork(watchCart)]);
}
