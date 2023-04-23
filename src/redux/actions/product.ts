import { createAction } from "@reduxjs/toolkit"

export const GET_PRODUCTS = 'GET_PRODUCTS'

export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const GET_PRODUCT_IMAGE_BY_ID = 'GET_PRODUCT_IMAGE_BY_ID'

export const GET_PRODUCT_TYPES = 'GET_PRODUCT_TYPES'

export const GET_COMMENTS = 'GET_COMMENTS';

export const ADD_COMMENT = 'ADD_COMMENT';

export const RATE = 'RATE';

export default {
  actionGetProducts: createAction<ActionPayloadStandard>(GET_PRODUCTS),
  actionGetProductTypes: createAction<ActionPayloadStandard>(GET_PRODUCT_TYPES),
  actionGetProductImageById: createAction<ActionPayloadStandard>(GET_PRODUCT_IMAGE_BY_ID),
  actionGetProductById: createAction<ActionPayloadStandard>(GET_PRODUCT_BY_ID),
  actionGetComments: createAction<ActionPayloadStandard>(GET_COMMENTS),
  actionAddComment: createAction<ActionPayloadStandard>(ADD_COMMENT)
};