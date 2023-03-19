import { combineReducers } from 'redux';
import category from './reducers/category';
import product from './reducers/product';
import userReducer from './reducers/user_reducer';
import cart from './reducers/cart';
import statistic from './reducers/statistic'

const allReducers = combineReducers({
  category,
  product,
  userReducer,
  cart,
  statistic,
});

export default allReducers;