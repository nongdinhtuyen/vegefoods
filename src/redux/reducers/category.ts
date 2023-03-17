import {
    FETCH_CATEGORY_SUCCEED,
} from '../actions/category';


export default (
  state = {
    category:[],
  },
  action,
) => {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCEED:{
        return  {
            ...state,
            category: action.data,
        }
    }
    default:
      return {
        ...state,
      };
  }
};