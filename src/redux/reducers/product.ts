import { bindActionCreators } from 'redux';
import {
  FETCH_PRODUCT_SUCCEED,
  FETCH_COMMENT_SUCCEED,
} from '../actions/product';


export default (
  state = {
    listProducts: [],
    total_count: 0,
    current: {},
    comment: [],
  },
  action,
) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCEED: {
      return {
        ...state,
        current: action.data
      }
    }
    case FETCH_COMMENT_SUCCEED: {
      return{
        ...state,
        comment: action.data
      }
    }
    default:
      return {
        ...state,
      };
  }
};