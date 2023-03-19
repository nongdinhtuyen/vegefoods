import axios from 'axios';

export const BASEURL = 'http://192.168.0.104:4869/v1/orderfood';
// export const BASEURL = 'http://localhost:4869/v1/orderfood';

window.axios = axios.create({
  baseURL: BASEURL,
  headers: { token: localStorage.getItem('token') },
});
