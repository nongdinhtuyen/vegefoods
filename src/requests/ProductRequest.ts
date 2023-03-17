import BaseRequest from './BaseRequest';

const prefix = '/product'
 
class ProductRequest extends BaseRequest {
    fetchProducts(data) {
        const url = `${prefix}/list`;
        return this.get(url,data);
    }
    fetchProduct(id) {
        const url = `${prefix}/${id}`
        return this.get(url)
    }
}

export default ProductRequest