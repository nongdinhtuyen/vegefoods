import { all } from 'redux-saga/effects';
import watchCategory from './category_saga';
import watchProduct from './product_saga';
import watchUser from './user_saga';
import watchCart from './cart_saga';
import watchStatistic from './statistic_saga';

function* rootSaga() {
  yield all([
    watchCategory(),
    watchProduct(),
    watchUser(),
    watchCart(),
    watchStatistic(),
  ]);
}

export default rootSaga;