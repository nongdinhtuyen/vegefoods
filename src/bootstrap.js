import axios from 'axios'

export const BASEURL = 'http://192.168.0.108:8080/v1'

window.axios = axios.create({
    baseURL: BASEURL,
    headers: {token: window.localStorage.getItem('token')}
  });