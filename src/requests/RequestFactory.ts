import CategoryRequest from './CategoryRequest';
import ProductRequest from './ProductRequest';
import UserRequest from './UserRequest';
import CartRequest from './CartRequest';
import OrderRequest from './OrderRequest';
import CommentRequest from './CommentRequest';
import RateRequest from './RateRequest';
import StatisticRequest from './StatisticRequest';
import AddressRequest from './AddressRequest';
import ReceiptRequest from './ReceiptRequest';

const requestMap = {
  CategoryRequest,
  ProductRequest,
  UserRequest,
  CartRequest,
  OrderRequest,
  CommentRequest,
  RateRequest,
  StatisticRequest,
  AddressRequest,
  ReceiptRequest,
};

const instances = {};

export default class RequestFactory {
  static getRequest(classname) {
    const RequestClass = requestMap[classname];
    if (!RequestClass) {
      throw new Error(`Invalid request class name: ${classname}`);
    }

    let requestInstance = instances[classname];
    if (!requestInstance) {
      requestInstance = new RequestClass();
      instances[classname] = requestInstance;
    }
    return requestInstance;
  }
}
