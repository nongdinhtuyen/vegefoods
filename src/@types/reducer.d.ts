import { IUserState } from 'redux/reducers/user_reducer';
import { IUserBalanceState } from 'redux/reducers/user_balance_reducer';
declare global {
  interface IStateReducers {
    userReducer: IUserState;
  }
}
