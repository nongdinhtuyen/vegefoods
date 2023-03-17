import BaseRequest from './BaseRequest';

const prefix = '/cart'
 
class CartRequest extends BaseRequest {
    fetchCart() {
        const url = `${prefix}/`;
        return this.get(url);
    }

    addCart(data) {
        const url = `${prefix}/`
        return this.post(url,data);
    }
    deleteCart(data){
        const url = `${prefix}/`
        return this.delete(url,data)
    }
}

export default CartRequest