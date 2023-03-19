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
}

export default UserRequest;
