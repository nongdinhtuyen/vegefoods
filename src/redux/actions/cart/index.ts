export const FETCH_CART = 'FETCH_CART';
export const FETCH_CART_SUCCEED = 'FETCH_CART_SUCCEED';
export const FETCH_CART_FAILED = 'FETCH_CART_FAILED';
export const ADD_CART = 'ADD_CART';
export const ADD_CART_FAILED = 'ADD_CART_FAILED';
export const DELETE_CART = 'DELETE_CART';
export const DELETE_CART_FAILED = 'DELETE_CART_FAILED';

export const CREATE_ORDER = 'CREATE_ORDER';
export const CREATE_ORDER_SUCCEED = 'CREATE_ORDER_SUCCEED';
export const CREATE_ORDER_FAILED = 'CREATE_ORDER_FAILED';

export default {
    onFetchCart: (data,callback) => ({
      type: FETCH_CART,
      data,
      callback,
    }),
    onFetchCartSucceed: (data) => ({
      type: FETCH_CART_SUCCEED,
      data,
    }),
    onFetchCartFailed: (err) => ({
      type: FETCH_CART_FAILED,
      err,
    }),
    onAddCart: (data,callback) => ({
        type:ADD_CART,
        data,
        callback
      }),
      onAddCartFailed: (err) => ({
          type: ADD_CART_FAILED,
          err
      }),
    onDeleteCart: (data) => ({
      type:DELETE_CART,
      data,
    }),
    onDeleteCartFailed: (err) => ({
        type: DELETE_CART_FAILED,
        err
    }),
    onCreateOrder: (data) => ({
        type:CREATE_ORDER,
        data,
    }),
    onCreateOrderSucceed: (data) => ({
        type:CREATE_ORDER_SUCCEED,
        data,
    }),
    onCreateOrderFailed: (data) => ({
        type:CREATE_ORDER_FAILED,
        data,
    })
  };