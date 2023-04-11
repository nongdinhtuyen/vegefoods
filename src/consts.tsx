export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_SMALL_PAGE_SIZE = 5;

export default {
  TYPE_PAYMENT_OCD: 0,
  TYPE_PAYMENT_ONLINE: 1,

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
    1: 'Chờ phê duyệt',
    2: 'Đã phê duyệt',
    3: 'Chờ xuất kho',
    4: 'Đang giao hàng',
    5: 'Giao hàng thành công',
    6: 'Chờ duyệt hủy',
    7: 'Đã hủy',
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
