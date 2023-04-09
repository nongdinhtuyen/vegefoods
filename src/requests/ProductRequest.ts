import BaseRequest from './BaseRequest';

const prefix = '/product';

class ProductRequest extends BaseRequest {
  getListProducts(params) {
    const url = `${prefix}`;
    return this.get(url, params);
  }

  getProductTypes(params) {
    const url = `${prefix}/type`;
    return this.get(url, params);
  }

  getProductById(params) {
    const url = `${prefix}/${params}`;
    return this.get(url);
  }

  getListComments(params) {
    const url = `${prefix}/${params.id}/comment`;
    return this.get(url, params);
  }

  addComment(params) {
    const url = `${prefix}/${params.id}/comment`;
    delete params.id
    return this.post(url, params);
  }
}

export default ProductRequest;
