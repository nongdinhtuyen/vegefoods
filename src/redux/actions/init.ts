import { createAction } from "@reduxjs/toolkit"

export const INIT = 'INIT'
export const INIT_SUCCEED = 'INIT_SUCCEED'
export const GET_PROVINCES = 'GET_PROVINCES'

export default {
  actionInit: createAction<ActionPayloadStandard>(INIT),
  actionInitSucceed: createAction<ActionPayloadStandard>(INIT_SUCCEED),
  actionGetProvinces: createAction<ActionPayloadStandard>(GET_PROVINCES),
};