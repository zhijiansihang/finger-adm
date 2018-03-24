/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 *
 */

let baseUrl = 'http://localhost:7031';
let loginUrl = 'http://localhost:8080#/login';
if (process.env.NODE_ENV === 'dev') { // 开发环境
  baseUrl = 'http://47.94.241.207:7031';
  // loginUrl = 'http://10.133.255.201:5001/pc/portal/index.html#/login';
} else if (process.env.NODE_ENV === 'test') { // 测试环境
  baseUrl = 'http://47.94.241.207:7031';
  loginUrl = 'http://47.94.241.207:7040/finger/index.html#/login';
  // baseUrl = 'https://api-test.zhijiansihang.com';
  // loginUrl = 'https://static-test.zhijiansihang.com/pc/portal/index.html#/login';
} else if (process.env.NODE_ENV === 'pre') { // 预生产环境
  baseUrl = 'https://api-pre.zhijiansihang.com';
  loginUrl = 'https://static-pre.zhijiansihang.com/pc/portal/index.html#/login';
} else if (process.env.NODE_ENV === 'prod') { // 生产环境
  baseUrl = 'https://api.zhijiansihang.com';
  loginUrl = 'https://static.zhijiansihang.com/pc/portal/index.html#/login';
}

export {baseUrl, loginUrl};
