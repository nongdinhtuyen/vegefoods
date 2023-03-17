import BaseRequest from './BaseRequest';

const prefix = '/comment'
 
class OrderRequest extends BaseRequest {
    fetchComment(data) {
        const url = `${prefix}/`;
        return this.get(url,data);
    }

    postCommnet(data) {
        const url = `${prefix}/`;
        return this.post(url,data);
    }
}

export default OrderRequest