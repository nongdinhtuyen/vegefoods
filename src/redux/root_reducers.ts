import { combineReducers } from 'redux';
import category from './reducers/category';
import userReducer from './reducers/user_reducer';
import cartReducer from './reducers/cart_reducer';
import initReducer from './reducers/init_reducer';

const allReducers = combineReducers({
  category,
  userReducer,
  cartReducer,
  initReducer
});

export default allReducers;