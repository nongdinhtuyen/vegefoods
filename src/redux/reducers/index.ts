import { combineReducers } from 'redux';
import category from './category';
import userReducer from './user_reducer';
import cartReducer from './cart_reducer';
import initReducer from './init_reducer';

const allReducers = combineReducers({
  category,
  userReducer,
  cartReducer,
  initReducer,
});

export default allReducers;