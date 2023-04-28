import { createAction } from '@reduxjs/toolkit';

export const GET_RECEIPT = 'GET_RECEIPT';
export const GET_RECEIPT_ID = 'GET_RECEIPT_ID';
export const CREATE_RECEIPT = 'CREATE_RECEIPT';
export const CANCEL_RECEIPT = 'CANCEL_RECEIPT';

export default {
  actionGetReceipt: createAction<ActionPayloadStandard>(GET_RECEIPT),
  actionGetReceiptId: createAction<ActionPayloadStandard>(GET_RECEIPT_ID),
  actionCreateReceipt: createAction<ActionPayloadStandard>(CREATE_RECEIPT),
  actionCancelReceipt: createAction<ActionPayloadStandard>(CANCEL_RECEIPT),
};
