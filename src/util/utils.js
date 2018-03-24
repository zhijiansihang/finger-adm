export const domain = () => {
  return encodeURIComponent(window.location.href.split('#')[0]);
};

export const portalTab = (type, name, url) => {
  parent.postMessage({msg: JSON.stringify({
    'type': type, // 操作类型： add-打开tab页  close-关闭tab refresh-刷新tab
    'data': {
      'name': name,
      'src': window.location.href.split('#')[0] + '/#' + url
    }
  })}, '*');
};
