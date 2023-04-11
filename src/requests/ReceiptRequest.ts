import BaseRequest from './BaseRequest';

const prefix = '/receipt';

class ProductRequest extends BaseRequest {
  getReceipt(params) {
    const url = `${prefix}`;
    return this.get(url, params);
  }

  getReceiptId(params) {
    const url = `${prefix}/${params.id}`;
    return this.get(url);
  }

  createReceipt(params) {
    const url = `${prefix}`;
    return this.post(url, params);
  }
}

export default ProductRequest;
