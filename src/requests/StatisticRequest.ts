import BaseRequest from './BaseRequest';

const prefix = '/statistic'

export default class StatisticRequest extends BaseRequest {

    fetchTotalAcc(){
        const url = `${prefix}/total-acc`;
        return this.get(url);
    }
    fetchTotalOrder(){
        const url = `${prefix}/total-order`;
        return this.get(url);
    }
    fetchTotalRevenu(){
        const url = `${prefix}/total-revenu`;
        return this.get(url);
    }
    fetchTopSale(){
        const url = `${prefix}/total-top-sale`;
        return this.get(url);
    }
    fetchExportOrder(params){
        const url = `${prefix}/ex-order`;
        return this.download(url,params);
    }

}
