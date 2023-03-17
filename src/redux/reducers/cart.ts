import {
    FETCH_CART_SUCCEED,
    CREATE_ORDER_SUCCEED,
} from '../actions/cart';


export default (
  state = {
    cart:[],
  },
  action,
) => {
  switch (action.type) {
    case FETCH_CART_SUCCEED:{
        return  {
            ...state,
            cart: action.data,
        }
    }
    case CREATE_ORDER_SUCCEED:{
        return {
            ...state,
            cart: [],
        }
    }
    default:
      return {
        ...state,
      };
  }
};