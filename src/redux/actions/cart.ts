import { createAction } from '@reduxjs/toolkit';

export const GET_CART = 'GET_CART';
export const ADD_CART = 'ADD_CART';
export const REMOVE_CART = 'REMOVE_CART';
export const GET_CART_TOTAL = 'GET_CART_TOTAL';

export default {
  actionGetCart: createAction<ActionPayloadStandard>(GET_CART),
  actionAddCart: createAction<ActionPayloadStandard>(ADD_CART),
  actionRemoveCart: createAction<ActionPayloadStandard>(REMOVE_CART),
  actionGetCartTotal: createAction<ActionPayloadStandard>(GET_CART_TOTAL),
};
