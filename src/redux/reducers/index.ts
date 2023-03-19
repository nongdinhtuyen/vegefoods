import { combineReducers } from 'redux';
import category from './category';
import product from './product';
import user from './user_reducer';
import cart from './cart';
import statistic from './statistic'

const allReducers = combineReducers({
  category,
  product,
  user,
  cart,
  statistic,
});

export default allReducers;