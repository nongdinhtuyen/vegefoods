import BaseRequest from './BaseRequest';

const prefix = '/cart';
export default class CartRequest extends BaseRequest {
  getCart() {
    const url = `${prefix}`;
    return this.get(url);
  }
  getCartTotal() {
    const url = `${prefix}/total`;
    return this.get(url);
  }
  addCart(params) {
    const url = `${prefix}/add?pid=${params.pid}&quantity=${params.quantity}`;
    return this.post(url);
  }
  removeCart(params) {
    const url = `${prefix}/remove?pid=${params.pid}&quantity=${params.quantity}`;
    return this.post(url);
  }
}
