import BaseRequest from './BaseRequest';

const prefix = '/user';

class UserRequest extends BaseRequest {
  login(params) {
    const url = `${prefix}/login`;
    return this.post(url, params);
  }
  checkToken(params) {
    const url = `${prefix}/`;
    return this.get(url, params);
  }
  register(params) {
    const url = `${prefix}/register`;
    return this.post(url, params);
  }
  getUserInfo(params) {
    const url = `${prefix}/${params}`;
    return this.get(url);
  }
  updateProfile(params) {
    const url = `${prefix}/${params.id}`;
    delete params.id;
    return this.put(url, params);
  }
  updatePassword(params) {
    const url = `${prefix}/${params.id}/pass`;
    delete params.id;
    delete params.confirm;
    return this.post(url, params);
  }
  getRank(params) {
    const url = `${prefix}/${params.id}/rank`;
    return this.get(url);
  }
}

export default UserRequest;
