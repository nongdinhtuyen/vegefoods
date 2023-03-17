import {
    all, call, put, fork, takeLatest,
} from 'redux-saga/effects';

import {
    FETCH_CART,
    ADD_CART,
    DELETE_CART,
    CREATE_ORDER,
} from '../actions/cart';
import actions from '../actions/cart';
import rf from '../../requests/RequestFactory';

function* fetchCart(action) {
    try {
        const { data, error } = yield call(
            () => rf.getRequest('CartRequest').fetchCart(), {}
        );
        if (error.code === 200) {
            yield put(actions.onFetchCartSucceed(data));
        }
        else {
            yield put(actions.onFetchCartFailed(error.message));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onFetchCartFailed(err));
    }
}

function* addCart(action) {
    try {
        const { data, error } = yield call(
            (data) => rf.getRequest('CartRequest').addCart(data), action.data
        );
        if (error.code === 200) {
            yield call(action.callback());
            yield put(actions.fetchCart());
        }
        else {
            yield put(actions.onAddCartFailed(error.message));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onAddCartFailed(err));
    }
}

function* deleteCart(action) {
    try {
        const { error } = yield call(
            (data) => rf.getRequest('CartRequest').deleteCart(data), action.data
        );
        if (error.code === 200) {
            yield put(actions.onFetchCart());
        }
        else {
            yield put(actions.onDeleteCartFailed(error.message));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onDeleteCartFailed(err));
    }
}

function* createOrder(action) {
    try {
        const { data, error } = yield call(
            (data) => rf.getRequest('OrderRequest').createOrder(data), action.data
        );
        if (error.code === 200) {
            yield put(actions.onCreateOrderSucceed());
        }
        else {
            yield put(actions.onCreateOrderFailed(error.message));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onCreateOrderFailed(err));
    }
}

function* watchCart() {
    yield takeLatest(FETCH_CART, fetchCart);
    yield takeLatest(ADD_CART, addCart);
    yield takeLatest(DELETE_CART, deleteCart);
    yield takeLatest(CREATE_ORDER, createOrder);
}

export default function* rootSaga() {
    yield all([fork(watchCart)]);
}