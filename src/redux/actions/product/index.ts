import { createAction } from "@reduxjs/toolkit"

export const GET_PRODUCTS = 'GET_PRODUCTS'

export const GET_PRODUCT_BY_ID = 'GET_PRODUCTS_BY_D'

export const GET_PRODUCT_TYPES = 'GET_PRODUCT_TYPES'
export const FETCH_PRODUCT_SUCCEED = 'FETCH_PRODUCT_SUCCEED'
export const FETCH_PRODUCT_FAILED = 'FETCH_PRODUCT_FAILED'

export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCEED = 'FETCH_COMMENT_SUCCEED';
export const FETCH_COMMENT_FAILED = 'FETCH_COMMENT_FAILED';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const CREATE_COMMENT_FAILED = 'CREATE_COMMENT_FAILED';

export const RATE = 'RATE';


export default {
  actionGetProducts: createAction<ActionPayloadStandard>(GET_PRODUCTS),
  actionGetProductTypes: createAction<ActionPayloadStandard>(GET_PRODUCT_TYPES),
  actionGetProductById: createAction<ActionPayloadStandard>(GET_PRODUCT_BY_ID),
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