import axios, { AxiosInstance, ParamsSerializerOptions } from 'axios';
import { parse, stringify, ParsedQs, IStringifyOptions } from 'qs';
import 'dayjs/locale/vi' // import locale
import dayjs from 'dayjs';


dayjs.locale('vi') // use locale

export const BASEURL = 'http://192.168.0.105:4869/v1/orderfood';
export const BASEURL_IMG = 'http://192.168.0.105:8089';

window.axios = axios.create({
  baseURL: BASEURL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    encode: (param: string): ParsedQs => parse(param),
    serialize: (
      params: Record<string, any>,
      options?: ParamsSerializerOptions | IStringifyOptions | any,
    ): string => stringify(params, options),
    indexes: false, // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
  },
});
