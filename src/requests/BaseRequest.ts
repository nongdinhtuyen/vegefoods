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
            const response = await window.axios.delete(`${url}`, {params});
            return this._responseHandler(response);
        } catch (error) {
            this._errorHandler(error);
        }
    }

    async _responseHandler(response) {
        const { data } = response;
        return {
            data: data.data,
            total_count: data.total_count,
            error: data.error,
        } || {};
    }

    _errorHandler(err) {
        if (err.response && err.response.status === 401) {
          window.location.href = '/';
        }
        throw err;
      }
}

export default BaseRequest;