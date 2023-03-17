export const FETCH_PRODUCTS = 'FETCH_PRODUCTS'
export const FETCH_PRODUCTS_SUCCEED = 'FETCH_PRODUCTS_SUCCEED'
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED'

export const FETCH_PRODUCT = 'FETCH_PRODUCT'
export const FETCH_PRODUCT_SUCCEED = 'FETCH_PRODUCT_SUCCEED'
export const FETCH_PRODUCT_FAILED = 'FETCH_PRODUCT_FAILED'

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCEED = 'FETCH_COMMENT_SUCCEED';
export const FETCH_COMMENT_FAILED = 'FETCH_COMMENT_FAILED';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED';

export const RATE = 'RATE';


export default {
  onFetchProducts: (data) => ({
    type: FETCH_PRODUCTS,
    data,
  }),
  onFetchProductsSucceed: (data) => ({
    type: FETCH_PRODUCTS_SUCCEED,
    data,
  }),
  onFetchProductsFailed: (err) => ({
    type: FETCH_PRODUCTS_FAILED,
    err,
  }),
  onFetchProduct: (data) => ({
    type: FETCH_PRODUCT,
    data,
  }),
  onFetchProductSucceed: (data) => ({
    type: FETCH_PRODUCT_SUCCEED,
    data,
  }),
  onFetchProductFailed: (err) => ({
    type: FETCH_PRODUCT_FAILED,
    err,
  }),
  onFetchComment: (data) => ({
    type: FETCH_COMMENT,
    data,
  }),
  onFetchCommentSucceed: (data) => ({
    type: FETCH_COMMENT_SUCCEED,
    data,
  }),
  onFetchCommentFailed: (err) => ({
    type: FETCH_COMMENT_FAILED,
    err,
  }),
  onCreateComment: (data) => ({
    type: CREATE_COMMENT,
    data
  }),
  onCreateCommentFailed: (err) => ({
    type: CREATE_COMMENT,
    err
  }),
  onRate: (data,callback) => ({
    type: RATE,
    data,
    callback,
  })
};