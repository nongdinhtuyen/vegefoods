import { all } from 'redux-saga/effects';
import watchCategory from './sagas/category_saga';
import watchProduct from './sagas/product_saga';
import watchUser from './sagas/user_saga';
import watchCart from './sagas/cart_saga';
import watchInit from './sagas/init_saga';
import watchAddress from './sagas/address_saga';
import watchReceipt from './sagas/receipt_saga';

function* rootSaga() {
  yield all([
    watchInit(),
    watchReceipt(),
    watchAddress(),
    // watchCategory(),
    watchProduct(),
    watchUser(),
    watchCart(),
    // watchStatistic(),

  ]);
}

export default rootSaga;