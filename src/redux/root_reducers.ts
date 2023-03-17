import { combineReducers } from 'redux';
import category from './reducers/category';
import product from './reducers/product';
import user from './reducers/user';
import cart from './reducers/cart';
import statistic from './reducers/statistic'

const allReducers = combineReducers({
  category,
  product,
  user,
  cart,
  statistic,
});

export default allReducers;