import {
  FETCH_TOP_SALE_SUCCEED,
} from "../actions/statistic";

export default (
  state = {
    topsale: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_TOP_SALE_SUCCEED: {
      return {
        ...state,
        topsale: action.data.data,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
