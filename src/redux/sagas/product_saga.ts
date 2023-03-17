import {
    all, call, put, fork, takeLatest,
} from 'redux-saga/effects';

import {
    FETCH_COMMENT,
    FETCH_PRODUCT,
    FETCH_PRODUCTS,
    CREATE_COMMENT,
    RATE,
} from '../actions/product';
import actions from '../actions/product';
import rf from '../../requests/RequestFactory';

function* fetchProducts(action) {
    try {
        const { data, total_count, error } = yield call(
            (data) => rf.getRequest('ProductRequest').fetchProducts(data), action.data
        );
        if (error.code === 200) {
            yield put(actions.onFetchProductsSucceed({ data, total_count }));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onFetchProductsFailed(err));
    }
}

function* fetchProduct(action) {
    try {
        const { data,error } = yield call(
            (data) => rf.getRequest('ProductRequest').fetchProduct(data), action.data
        );
        if (error.code === 200) {
        yield put(actions.onFetchProductSucceed(data));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onFetchProductFailed(err));
    }
}

function* fetchComment(action) {
    try {
        const { data, error } = yield call(
            (data) => rf.getRequest('CommentRequest').fetchComment(data), action.data
        );
        if (error.code === 200) {
        yield put(actions.onFetchCommentSucceed(data));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onFetchCommentFailed(err));
    }
}


function* createComment(action) {
    try {
        const { error } = yield call(
            (data) => rf.getRequest('CommentRequest').postCommnet(data), action.data
        );
        if (error.code === 200) {
        yield put(actions.onFetchComment({pid:action.data.product_id}));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onCreateCommentFailed(err));
    }
}

function* rate(action) {
    try {
        const { error } = yield call(
            (data) => rf.getRequest('RateRequest').rateProduct(data), action.data
        );
        if (error.code === 200) {
            action.callback();
        }
    } catch (err) {
        console.log("=======", err)
    }
}

function* watchProduct() {
    yield takeLatest(FETCH_PRODUCTS, fetchProducts);
    yield takeLatest(FETCH_PRODUCT, fetchProduct);
    yield takeLatest(FETCH_COMMENT, fetchComment);
    yield takeLatest(CREATE_COMMENT, createComment)
    yield takeLatest(RATE,rate);
}

export default function* rootSaga() {
    yield all([fork(watchProduct)]);
}