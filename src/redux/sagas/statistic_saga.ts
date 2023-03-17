import { all, call, put, fork, takeLatest } from "redux-saga/effects";

import {
  FETCH_TOP_SALE,
} from "../actions/statistic";
import actions from "../actions/statistic";
import rf from "../../requests/RequestFactory";

function* fetchTopSale(action) {
  try {
    const { data, error } = yield call(
      (data) => rf.getRequest("StatisticRequest").fetchTopSale(),
      action.params
    );
    // if (resp.code === 200) {
    yield put(actions.onFetchTopSaleSucceed({ data }));
    // }
  } catch (err) {
    console.log("=======", err);
    yield put(actions.onFetchTopSaleFailed(err));
  }
}

function* watchVendors() {
  yield takeLatest(FETCH_TOP_SALE, fetchTopSale);
}

export default function* rootSaga() {
  yield all([fork(watchVendors)]);
}
