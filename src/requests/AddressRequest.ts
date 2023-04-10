import BaseRequest from './BaseRequest';

const prefix = '/address';

class ProductRequest extends BaseRequest {
  addAddress(params) {
    const url = `${prefix}`;
    return this.post(url, params);
  }

  deleteAddress(params) {
    const url = `${prefix}/${params.id}`;
    return this.delete(url, params);
  }

  getAddress(params) {
    const url = `${prefix}`;
    return this.get(url);
  }
}

export default ProductRequest;
