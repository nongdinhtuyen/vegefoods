export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_LARGE_PAGE_SIZE = 20;
export const DEFAULT_SMALL_PAGE_SIZE = 5;

// export const SITE_KEY_FISEBASE = '6LcMZR0UAAAAALgPMcgHwga7gY5p8QMg1Hj-bmUv';

export default {

  TOO_MANY_REQUESTS_STR: 'auth/too-many-requests',
  INVALID_PHONE_NUMBER: 'auth/invalid-phone-number',
  CODE_EXPIRED: 'auth/code-expired',
  MISSING_VERIFICATION_CODE: 'auth/missing-verification-code',
  INVALID_VERIFICATION_CODE: 'auth/invalid-verification-code',
  VERIFICATION_ERROR: 'ekyc.verification-error',

  TYPE_PAYMENT_ONLINE: 0,
  TYPE_PAYMENT_COD: 1,

  PRODUCT_STATUS: {
    WAITING_FOR_APPROVAL: 0,
    APPROVED: 1,
    WAITING_FOR_DELIVERY: 2,
    DELIVERING: 3,
    DELIVERY_SUCCESSFUL: 4,
    WAITING_FOR_APPROVAL_TO_CANCEL: 5,
    CANCELED: 6,
  },

  PRODUCT_STATUS_STRING: {
    0: 'Chờ phê duyệt',
    1: 'Đã phê duyệt',
    2: 'Chờ vận chuyển',
    3: 'Đang giao hàng',
    4: 'Giao hàng thành công',
    5: 'Chờ duyệt hủy',
    6: 'Đã hủy',
  },

  PRODUCT_STATUS_STRING_ONLINE: {
    0: 'Chờ thanh toán',
    1: 'Đã thanh toán',
    2: 'Chờ vận chuyển',
    3: 'Đang giao hàng',
    4: 'Giao hàng thành công',
    5: 'Chờ duyệt hủy',
    6: 'Đã hủy',
  },
};
// Status
// 0 – Chờ phê duyệt - 1
// 1 – Đã phê duyệt - 1
// 2 – Chờ xuất kho - 1
// 3 – Đang giao hàng - 1
// 4 – Giao hàng thành công - 2
// 5 – Chờ duyệt hủy - 1
// 6 – Đã hủy - 3
