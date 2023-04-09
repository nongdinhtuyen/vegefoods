export const FETCH_CATEGORY = 'FETCH_CATEGORY'
export const FETCH_CATEGORY_SUCCEED = 'FETCH_CATEGORY_SUCCEED'
export const FETCH_CATEGORY_FAILED = 'FETCH_CATEGORY_FAILED'


export default {
  onFetchCategory: () => ({
    type: FETCH_CATEGORY,
  }),
  onFetchCategorySucceed: (data) => ({
    type: FETCH_CATEGORY_SUCCEED,
    data,
  }),
  onFetchCategoryFailed: (err) => ({
    type: FETCH_CATEGORY_FAILED,
    err,
  }),
};