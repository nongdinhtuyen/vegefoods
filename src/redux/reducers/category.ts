import {
    FETCH_CATEGORY_SUCCEED,
} from '../actions/category';


export default (
  state = {
    listCategory:[],
  },
  action,
) => {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCEED:{
        return  {
            ...state,
            listCategory: action.data,
        }
    }
    default:
      return {
        ...state,
      };
  }
};