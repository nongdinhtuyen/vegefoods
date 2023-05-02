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

  getDistrict(params) {
    const url = `${prefix}/district`;
    return this.get(url, params);
  }

  getWard(params) {
    const url = `${prefix}/ward`;
    return this.get(url, params);
  }

  updateAddress(params) {
    const url = `${prefix}/${params.id}`;
    return this.put(url, params);
  }
}

export default ProductRequest;
