import * as mainConst from './const';
import Cookies from 'js-cookie';

export const domain = () => {
  return encodeURIComponent(window.location.href.split('#')[0]);
};

export const portalTab = (type, name, url) => {
  parent.postMessage({msg: JSON.stringify({
    'type': type, // 操作类型： add-打开tab页  close-关闭tab refresh-刷新tab
    'data': {
      'name': name,
      'src': window.location.href.split('#')[0] + '#' + url
    }
  })}, '*');
};
export const isAdmin = () => {
  let userInfo = Cookies.get(mainConst.ADM_USER_INFO);
  let user = JSON.parse(userInfo);
  if (user && (user.authId === 'admin')) {
    return true;
  } else {
    false;
  }
};

/**
 * 将js对象拼接成url params字符串
 */
export const joint = (object) => {
  let dataStr = '';
  if (object) {
    Object.keys(object).forEach(key => {
      dataStr += key + '=' + object[key] + '&';
    });
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
  }
  return dataStr;
};

export const formator = (val, digits) => {
  let lessThanZero = false;
  if (isNaN(val)) {
    val = '0.0000';
  }
  if (val < 0) {
    val = Math.abs(val);
    lessThanZero = true;
  }
  val = Math.round(val * Math.pow(10, digits)) / Math.pow(10, digits);
  return (lessThanZero ? '-' : '') + val.toFixed(digits);
};

export const dateFormat = (date, fmt) => {
  if (!date) {
    return;
  }
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
};

/**
 * 获取两个日期之间的日期列表
 */
export const listDays = (begin, end) => {
  let arr = [];
  let ab = begin.split('-');
  let ae = end.split('-');
  let db = new Date();
  db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
  let de = new Date();
  de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
  let unixDb = db.getTime();
  let unixDe = de.getTime();
  for (let k = unixDb; k <= unixDe;) {
    arr.push(dateFormat(new Date(parseInt(k)), 'yyyy-MM-dd'));
    k = k + 24 * 60 * 60 * 1000;
  }
  return arr;
};

/**
 * 获取一个日期之前或者之后几天的日期
 */
export const pulsDays = (date, days) => {
  return new Date(date.getTime() + (days * 24 * 60 * 60 * 1000));
};
