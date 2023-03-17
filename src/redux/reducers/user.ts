import {
  LOGIN_SUCCEED,
  LOGOUT
} from '../actions/user';


export default (
  state = {
    token: '',
    login: false,
  },
  action,
) => {
  switch (action.type) {
    case '@@INIT': {
      return {
        ...state,
        token: window.localStorage.getItem('token'),
      }
    }
    case LOGIN_SUCCEED: {
      return {
        ...state,
        token: action.data.token,
        login: true,
      }
    }
    case LOGOUT: {
      return {
        ...state,
        token: "",
        login: false,
      }
    }
    default:
      return {
        ...state,
      };
  }
};