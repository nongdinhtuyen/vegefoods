import { createAction } from '@reduxjs/toolkit';

export const GET_ADDRESS = 'GET_ADDRESS';
export const DELETE_ADDRESS = 'DELETE_ADDRESS';
export const ADD_ADDRESS = 'ADD_ADDRESS';
export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export default {
  actionGetAddress: createAction<ActionPayloadStandard>(GET_ADDRESS),
  actionDeleteAddress: createAction<ActionPayloadStandard>(DELETE_ADDRESS),
  actionAddAddress: createAction<ActionPayloadStandard>(ADD_ADDRESS),
  actionUpdateAddress: createAction<ActionPayloadStandard>(UPDATE_ADDRESS),
};
