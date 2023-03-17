import BaseRequest from './BaseRequest';

const prefix = '/rate'
 
class RateRequest extends BaseRequest {
    rateProduct(data) {
        const url = `${prefix}/`;
        return this.post(url,data);
    }
}

export default RateRequest