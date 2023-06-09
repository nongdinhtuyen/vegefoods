import { openNotification } from 'common/Notify';
import { LOGOUT } from 'redux/actions/user';
import store from 'redux/store';

class BaseRequest {
  async get(url, params = {}) {
    try {
      const response = await window.axios.get(`${url}`, { params });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }
  async put(url, data = {}) {
    try {
      const response = await window.axios.put(`${url}`, data);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data = {}) {
    try {
      const response = await window.axios.post(`${url}`, data);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async delete(url, params = {}) {
    try {
      const response = await window.axios.delete(`${url}`, { params });
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async _responseHandler(response) {
    const { code, msg } = response.data;
    if (msg === 'WrongPass') {
      openNotification({
        description: 'Sai mật khẩu hiện tại',
        type: 'error',
      });
      throw 'Request failed';
    }
    if (code >= 400) {
      openNotification({
        description: 'Request failed',
        type: 'error',
      });
      throw 'Request failed';
    }
    return response.data;
  }

  _errorHandler(err) {
    if (err.response && err.response.status === 401) {
      if (!window.axios.defaults.headers.common['apikey']) {
        openNotification({
          description: 'Bạn chưa đăng nhập',
          type: 'error',
        });
        window.navigate('login')
      } else {
        openNotification({
          description: 'Bạn không có quyền',
          type: 'error',
        });
        store.dispatch({
          type: LOGOUT,
        });
      }
    }
    throw err;
  }
}

export default BaseRequest;
