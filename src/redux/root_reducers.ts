import { combineReducers } from 'redux';
import category from './reducers/category';
import userReducer from './reducers/user_reducer';
import cartReducer from './reducers/cart_reducer';
import addressReducer from './reducers/address_reducer';
import initReducer from './reducers/init_reducer';
import { LOGOUT } from './actions/user';
import _ from 'lodash';

const allReducers = combineReducers({
  category,
  userReducer,
  cartReducer,
  initReducer,
  addressReducer
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = { initReducer: state.initReducer };
  }
  return allReducers(state, action);
};

export default rootReducer;
