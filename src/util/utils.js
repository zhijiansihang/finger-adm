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
