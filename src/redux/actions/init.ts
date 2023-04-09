import { createAction } from "@reduxjs/toolkit"

export const INIT = 'INIT'
export const INIT_SUCCEDD = 'INIT_SUCCEDD'

export default {
  actionInit: createAction<ActionPayloadStandard>(INIT),
  actionInitSuccedd: createAction<ActionPayloadStandard>(INIT_SUCCEDD),
};