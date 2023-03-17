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
const getStatusQuestionPost = (startTime, endTime, isDistributed, typeQuestion, distributedAt = 0) => {
  const wrapStartTime = dayjs.unix(startTime);
  const wrapEndTime = dayjs.unix(endTime);
  const wrapDistributeAt = dayjs.unix(distributedAt);

  if (isDistributed) {
    return 'QUESTION_DISTRIBUTED';
  }
  if (wrapStartTime.isAfter(dayjs())) {
    return 'QUESTION_IN_COMMING_EVENT';
  }
  if (dayjs().isBetween(wrapStartTime, wrapEndTime)) {
    return 'QUESTION_LIVE';
  }
  if (dayjs().isAfter(wrapEndTime) && typeQuestion == '0') {
    return 'QUESTION_END';
  }
  if (dayjs().isAfter(wrapDistributeAt) && dayjs().isAfter(wrapEndTime) && typeQuestion != '0' && !isDistributed) {
    return 'QUESTION_NONE_DISTRIBUTED';
  }
  if (dayjs().isAfter(wrapEndTime) && typeQuestion != '0' && !isDistributed) {
    return 'QUESTION_IN_COMMING_DISTRIBUTE';
  }

  return 'SOME_THING_WRONG_HERE';
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

function UnMergedCell(arr) {
  return _.map(arr, (item, index: number) => {
    if (_.some(item, (value1) => _.isUndefined(value1) || _.isNull(value1))) {
      return {
        ...arr[index - 1],
        ..._.pickBy(item, (value2) => !_.isUndefined(value2) && !_.isNull(value2)),
      };
    }
    return item;
  });
}

const ExcelArrayToObject = (roa, sheetName) => {
  const result = {};
  result[sheetName] = [];
  const header: any = _.first(roa);
  roa = roa.slice(1);
  _.forEach(roa, (arr) => {
    const item = {};
    _.forEach(arr, (field, index) => {
      item[header[index]] = field;
    });

    result[sheetName].push(item);
  });
  return result;
};

function toJson(workbook) {
  try {
    let result = {};
    workbook.SheetNames.forEach((sheetName) => {
      const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        header: 1,
        blankrows: false,
      });

      if (roa.length) {
        result = ExcelArrayToObject(roa, sheetName);
      }
    });
    _.forEach(result, (sheetData, name) => {
      result[name] = UnMergedCell(sheetData);
    });
    return result;
  } catch (e) {
    console.log(e, ': src/common/utils.js:433');
  }
}

function processExcel(data) {
  const workbook = XLSX.read(data, {
    type: 'binary',
  });

  // const firstSheet = workbook.SheetNames[0];
  return toJson(workbook);
}

function importFileCsv(file, callback) {
  if (file) {
    const r = new FileReader();
    r.onload = (e: any) => {
      callback(processExcel(e.target.result));
    };
    r.readAsBinaryString(file);
  } else {
    console.log('Failed to load file');
  }
}

function upperCaseFirst(input) {
  return _.upperFirst(input);
}

const convertFieldsDescription = (fieldsDescription) => {
  const cloneFs = _.cloneDeep(fieldsDescription);
  _.forEach(Object.keys(fieldsDescription), (value, key) => {
    cloneFs[value] = _.get(fieldsDescription, [value, 'value'], {});
  });

  return cloneFs;
};

const revertFieldsDescription = (fieldsDescription) => {
  const cloneFs = _.cloneDeep(fieldsDescription);
  _.forEach(Object.keys(fieldsDescription || {}), (value, key) => {
    cloneFs[value]['value'] = fieldsDescription[value];
  });

  return cloneFs;
};

const wrapBodyRequest = (params) => {
  return {
    ...params,
    pubkey: getSessionJSON()?.pubkey,
  };
};

/**
 * Revert field description to old version
 * @param q
 */
const revertQuestion = (q) => {
  _.forEach(Object.keys(q.list_question), (value) => {
    q.list_question[value].fields_description = revertFieldsDescription(q.list_question[value].fields_description);
  });

  return q;
};

const revertListTemplateQuestion = (listTemplateQuestion) => {
  _.forEach(listTemplateQuestion, (q) => {
    revertTemplateQuestion(q);
  });
};

const revertTemplateQuestion = (q) => {
  q.fields_description = revertFieldsDescription(q.fields_description);

  return q;
};

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

export default {
  formatTimeFromUnix,
  getStatusQuestionPost,
  formatCurrency,
  showNotification,
  getSession,
  getSessionJSON,
  importFileCsv,
  isNumeric,
  trimDot,
  upperCaseFirst,
  convertFieldsDescription,
  revertFieldsDescription,
  getDp,
  formatCurrencyWithDecimal,
  UnMergedCell,
  ExcelArrayToObject,
  wrapBodyRequest,
  revertQuestion,
  revertTemplateQuestion,
  revertListTemplateQuestion,
  isImage,
  isVideo,
  imageSizeRequired,
  dumpRequest,
  formatCurrencyWithDecimalFloor,
  getExtension,
};
