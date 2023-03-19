import { all } from 'redux-saga/effects';
import watchCategory from './sagas/category_saga';
import watchProduct from './sagas/product_saga';
import watchUser from './sagas/user_saga';
import watchCart from './sagas/cart_saga';
import watchStatistic from './sagas/statistic_saga';

function* rootSaga() {
  yield all([
    // watchCategory(),
    watchProduct(),
    watchUser(),
    // watchCart(),
    // watchStatistic(),
  ]);
}

export default rootSaga;