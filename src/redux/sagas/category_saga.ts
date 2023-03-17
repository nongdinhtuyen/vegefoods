import {
    all, call, put, fork, takeLatest,
} from 'redux-saga/effects';

import {
    FETCH_CATEGORY,
} from '../actions/category';
import actions from '../actions/category';
import rf from '../../requests/RequestFactory';

function* fetchCategories(action) {
    try {
        const { data, error } = yield call(
            () => rf.getRequest('CategoryRequest').fetchCategories(), {}
        );
        if (error.code === 200) {
            yield put(actions.onFetchCategorySucceed(data));
        }
        else {
            yield put(actions.onFetchCategoryFailed(error.message));
        }
    } catch (err) {
        console.log("=======", err)
        yield put(actions.onFetchCategoryFailed(err));
    }
}

function* watchCategory() {
    yield takeLatest(FETCH_CATEGORY, fetchCategories);

}

export default function* rootSaga() {
    yield all([fork(watchCategory)]);
}