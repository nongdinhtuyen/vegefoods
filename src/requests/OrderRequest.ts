import BaseRequest from './BaseRequest';

const prefix = '/order'
 
class OrderRequest extends BaseRequest {
    createOrder(data) {
        const url = `${prefix}/`;
        return this.post(url,data);
    }
}

export default OrderRequest