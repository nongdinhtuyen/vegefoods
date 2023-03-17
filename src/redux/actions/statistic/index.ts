export const FETCH_TOTAL_ACC = 'FETCH_TOTAL_ACC'
export const FETCH_TOTAL_ACC_SUCCEED = 'FETCH_TOTAL_ACC_SUCCEED'
export const FETCH_TOTAL_ACC_FAILED = 'FETCH_TOTAL_ACC_FAILED'

export const FETCH_TOTAL_ORDER = 'FETCH_TOTAL_ORDER'
export const FETCH_TOTAL_ORDER_SUCCEED = 'FETCH_TOTAL_ORDER_SUCCEED'
export const FETCH_TOTAL_ORDER_FAILED = 'FETCH_TOTAL_ORDER_FAILED'

export const FETCH_TOTAL_REVENU = 'FETCH_TOTAL_REVENU'
export const FETCH_TOTAL_REVENU_SUCCEED = 'FETCH_TOTAL_REVENU_SUCCEED'
export const FETCH_TOTAL_REVENU_FAILED = 'FETCH_TOTAL_REVENU_FAILED'

export const FETCH_TOP_SALE = 'FETCH_TOP_SALE'
export const FETCH_TOP_SALE_SUCCEED = 'FETCH_TOP_SALE_SUCCEED'
export const FETCH_TOP_SALE_FAILED = 'FETCH_TOP_SALE_FAILED'

export const FETCH_EXPORT_ORDER = 'FETCH_EXPORT_ORDER'
export const FETCH_EXPORT_ORDER_SUCCEED = 'FETCH_EXPORT_ORDER_SUCCEED'
export const FETCH_EXPORT_ORDER_FAILED = 'FETCH_EXPORT_ORDER_FAILED'

export default {
  onFetchTotalAcc: (params, callback) =>  ({
    type: FETCH_TOTAL_ACC,
    params, 
    callback
  }),
  onFetchTotalAccSucceed: (data) => ({
    type: FETCH_TOTAL_ACC_SUCCEED,
    data,
  }),
  onFetchTotalAccFailed: (err) => ({
    type: FETCH_TOTAL_ACC_FAILED,
    err,
  }),
  onFetchTotalOrder: (params, callback) =>  ({
    type: FETCH_TOTAL_ORDER,
    params, 
    callback
  }),
  onFetchTotalOrderSucceed: (data) => ({
    type: FETCH_TOTAL_ORDER_SUCCEED,
    data,
  }),
  onFetchTotalOrderFailed: (err) => ({
    type: FETCH_TOTAL_ORDER_FAILED,
    err,
  }),
  onFetchTotalRevenu: (params, callback) =>  ({
    type: FETCH_TOTAL_REVENU,
    params, 
    callback
  }),
  onFetchTotalRevenuSucceed: (data) => ({
    type: FETCH_TOTAL_REVENU_SUCCEED,
    data,
  }),
  onFetchTotalRevenuFailed: (err) => ({
    type: FETCH_TOTAL_REVENU_FAILED,
    err,
  }),
  onFetchTopSale: (params, callback) =>  ({
    type: FETCH_TOP_SALE,
    params, 
    callback
  }),
  onFetchTopSaleSucceed: (data) => ({
    type: FETCH_TOP_SALE_SUCCEED,
    data,
  }),
  onFetchTopSaleFailed: (err) => ({
    type: FETCH_TOP_SALE_FAILED,
    err,
  }),
  onFetchExportOrder: (params, callback) =>  ({
    type: FETCH_EXPORT_ORDER,
    params, 
    callback
  }),
  onFetchExportOrderSucceed: (data) => ({
    type: FETCH_EXPORT_ORDER_SUCCEED,
    data,
  }),
  onFetchExportOrderFailed: (err) => ({
    type: FETCH_EXPORT_ORDER_FAILED,
    err,
  }),
  
};
