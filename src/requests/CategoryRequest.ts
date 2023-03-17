import BaseRequest from './BaseRequest';

const prefix = '/category'
 
class CategoryRequest extends BaseRequest {
    fetchCategories() {
        const url = `${prefix}/`;
        return this.get(url);
    }
}

export default CategoryRequest