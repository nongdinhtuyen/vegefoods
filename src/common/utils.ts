import dayjs from 'dayjs';
import _ from 'lodash';
import BigNumber from 'bignumber.js';
import { openNotification } from './Notify';
import axios, { ParamsSerializerOptions } from 'axios';
import { parse, stringify, ParsedQs, IStringifyOptions } from 'qs';
import humanizeDuration from 'humanize-duration';

// let timeoutID;

const getSession = (): string | undefined | any => localStorage.getItem('session');
const getSessionJSON = () => JSON.parse(getSession() || '{}');

const formatTimeFromUnix = (unixTime, format = 'DD/MM/YYYY', def = '--') => {
  if (unixTime === 0) {
    return def;
  }

  return dayjs.unix(parseInt(`${unixTime}`.substr(0, 10))).format(format);
};

const formatCurrencyWithDecimal = (currency, symbol = '--', precision = 8, decimal = 18) =>
  _.isNaN(currency) ? symbol : trimRightZeroAndDot(new BigNumber(currency).div(10 ** decimal).toFormat(precision));
const formatCurrency = (currency, decimal = 8) => {
  if (!isNumeric(decimal)) {
    decimal = 8;
  }

  return trimRightZeroAndDot(new BigNumber(currency).toFormat(decimal));
};
const trimRightZero = (num) => (`${num}`.split('.').length === 2 ? _.trimEnd(num, '0') : `${num}`);
const trimDot = (num) => _.trimEnd(`${num}`, '.');
const trimRightZeroAndDot = (num) => trimDot(trimRightZero(num));
function isNumeric(value) {
  return /^\d+$/.test(value);
}
const formatCurrencyWithDecimalFloor = (currency, symbol = '--', precision = 8, decimal = 18) =>
  _.isNaN(currency) ? symbol : trimRightZeroAndDot(new BigNumber(currency).div(10 ** decimal).toFormat(precision, BigNumber.ROUND_FLOOR));

const showNotification = openNotification;

const getDp = (num) => {
  const cloneNum = new BigNumber(num).toFixed();
  if (`${cloneNum}`.includes('.')) {
    return `${cloneNum}`.split('.')[1].length;
  }
  return 0;
};

const isImage = (filename) => {
  const ext = getExtension(filename);
  if (!ext) return false;
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'gif':
    case 'bmp':
    case 'png':
    case 'svg':
    case 'jpeg':
      return true;
  }
  return false;
};

function isVideo(filename) {
  var ext = getExtension(filename);
  if (!ext) return false;
  switch (ext.toLowerCase()) {
    case 'm4v':
    case 'mkv':
    case 'avi':
    case 'mpg':
    case 'mp4':
    case 'webm':
    case 'mov':
    case 'wmv':
      // etc
      return true;
  }
  return false;
}

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

const imageSizeRequired = (file, value) => {
  const isLt = new BigNumber(file.size).div(1024).div(1024).isLessThan(value);
  return isLt;
};

const dumpRequest = ({ file, onSuccess }, callback) => {
  const formData = new FormData();
  formData.append('files', file);
  const customAxios = axios.create({
    baseURL: 'https://upload.mediacloud.mobilelab.vn',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    paramsSerializer: {
      encode: (param: string): ParsedQs => parse(param),
      serialize: (params: Record<string, any>, options?: ParamsSerializerOptions | IStringifyOptions | any): string => stringify(params, options),
      indexes: false, // array indexes format (null - no brackets, false (default) - empty brackets, true - brackets with indexes)
    },
  });

  customAxios.post('upload', formData).then((resp) => {
    if (resp.data.uploaded_files.length > 0) {
      if (_.isFunction(callback)) {
        callback(resp.data.uploaded_files[0]);
      }
    }
  });
  onSuccess('ok');
};

const baseUrlImage = (img) => {
  return `http://192.168.0.104:8089/raw/${img}`
}

export default {
  baseUrlImage,
  formatTimeFromUnix,
  formatCurrency,
  showNotification,
  getSession,
  getSessionJSON,
  isNumeric,
  trimDot,
  getDp,
  formatCurrencyWithDecimal,
  isImage,
  isVideo,
  imageSizeRequired,
  dumpRequest,
  formatCurrencyWithDecimalFloor,
  getExtension,
};
