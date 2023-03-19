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
    console.log("🚀 ~ file: ProductRequest.ts:17 ~ ProductRequest ~ getProductById ~ params:", params)
    const url = `${prefix}/${params}`;
    return this.get(url);
  }

}

export default ProductRequest;
