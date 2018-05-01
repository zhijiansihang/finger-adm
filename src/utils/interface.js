/**
 * Created by Shawn on 2017/6/23.
 */

const FINGER = '';
const PLATFORM_SYS = 'platform-sys';

import {fetch} from './fetch';

// 登陆
export const login = (data, baseUrl) => fetch('/login', {
  reqParams: data,
  baseUrl: baseUrl
}, 'POST');

export const logout = (baseUrl) => fetch('/logout', {
  baseUrl: baseUrl
}, 'GET');

// 角色列表
export const roleSearch = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/list', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

// 角色增加
export const roleAdd = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/save', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

// 角色编辑
export const roleEdit = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/update', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

// 角色权限
export const roleResources = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/set', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

export const roleDelete = (data, baseUrl) => fetch(PLATFORM_SYS + '/role/delete/' + data.id, {baseUrl: baseUrl}, 'POST');

export const resourceList = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/list', {baseUrl: baseUrl, reqParams: data}, 'POST');

export const resourceGet = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/get/' + data.id, {baseUrl: baseUrl}, 'GET');

export const resourceChange = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/change/' + data.id, {
  reqParams: data,
  baseUrl: baseUrl
}, 'POST');

// export const resourceExport = (data, baseUrl) => download(PLATFORM_SYS + '/resource/export/' + data.id, {baseUrl: baseUrl}, 'GET');

export const resourceSave = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/save', {
  reqBody: data,
  baseUrl: baseUrl
}, 'POST');

export const resourceDelete = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/delete/' + data.id, {baseUrl: baseUrl}, 'POST');

// 系统菜单列表
export const menuList = (data, baseUrl) => fetch(PLATFORM_SYS + '/resource/menu/list', {
  reqParams: data,
  baseUrl: baseUrl
}, 'POST');

// 角色菜单数据
export const roleMenuList = (baseUrl, data) => fetch(PLATFORM_SYS + '/role/menus', {
  baseUrl: baseUrl,
  reqParams: data
}, 'GET');

export const userList = (data, body, baseUrl) => fetch(PLATFORM_SYS + '/user/page', {
  reqParams: data,
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const passResest = (data, body, baseUrl) => fetch(PLATFORM_SYS + '/user/resetPwd/' + data.id, {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const updatePwd = (body, baseUrl) => fetch(PLATFORM_SYS + '/user/updatePwd/', {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const lockUser = (data, baseUrl) => fetch(PLATFORM_SYS + '/user/lock/' + data.id, {baseUrl: baseUrl}, 'POST');

export const saveUser = (body, baseUrl) => fetch(PLATFORM_SYS + '/user/save', {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const updateUser = (body, baseUrl) => fetch(PLATFORM_SYS + '/user/update', {
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const logList = (data, body, baseUrl) => fetch(PLATFORM_SYS + '/syslog/page', {
  reqParams: data,
  reqBody: body,
  baseUrl: baseUrl
}, 'POST');

export const getUserInfo = (baseUrl) => fetch(PLATFORM_SYS + '/auth/info', {baseUrl: baseUrl}, 'GET');

// // 登陆
// export const login = (data, codeEvents) => fetch('/login', {
//   reqParams: data,
//   codeEvents: codeEvents
// }, 'POST');

/* *************系统管理模块-start*********** */
export const cmsPage = (body) => fetch(FINGER + '/cms/page', {
  reqBody: body
}, 'POST');

export const getCms = (body) => fetch(FINGER + '/cms/get', {
  reqBody: body
}, 'POST');

export const saveCms = (body) => fetch(FINGER + '/cms/save', {
  reqBody: body
}, 'POST');

export const updateCms = (body) => fetch(FINGER + '/cms/update', {
  reqBody: body
}, 'POST');

export const delCms = (body) => fetch(FINGER + '/cms/delete', {
  reqBody: body
}, 'POST');
/* *************系统管理模块-end*********** */

/* *************用户模块-start*********** */
export const getLoginUser = () => fetch(FINGER + '/user/loginuser', {}, 'GET');

export const resetPass = (body) => fetch(FINGER + '/user/reset', {
  reqBody: body
}, 'POST');

export const userPage = (body) => fetch(FINGER + '/user/page', {
  reqBody: body
}, 'POST');

export const getUser = (body) => fetch(FINGER + '/user/get', {
  reqBody: body
}, 'POST');

export const getUserDemand = (data) => fetch(FINGER + '/demand/list', {
  reqParams: data
}, 'GET');

export const getUserByMobile = (body) => fetch(FINGER + '/user/get/mobile', {
  reqBody: body
}, 'POST');

// 理财师 分页
export const fbPage = (body) => fetch(FINGER + '/user/fb/page', {
  reqBody: body
}, 'POST');
// 理财师 分页
export const fbList = (body) => fetch(FINGER + '/user/fb/list', {
  reqBody: body
}, 'POST');
// 理财师 根据Id获取
export const fbGet = (body) => fetch(FINGER + '/user/fb/get', {
  reqBody: body
}, 'POST');
// 理财师 根据Id获取
export const fbGetByUserIds = (body) => fetch(FINGER + '/user/fb/get/users', {
  reqBody: body
}, 'POST');
// 理财师 添加
export const fbAdd = (body) => fetch(FINGER + '/user/fb/add', {
  reqBody: body
}, 'POST');

// 机构 分页
export const institutionPage = (body) => fetch(FINGER + '/user/institution/page', {
  reqBody: body
}, 'POST');
// 机构 分页
export const institutionList = () => fetch(FINGER + '/user/institution/list', {}, 'GET');
// 机构 根据Id获取
export const institutionGet = (body) => fetch(FINGER + '/user/institution/get', {
  reqBody: body
}, 'POST');
// 机构 添加
export const addAuth = (body) => fetch(FINGER + '/user/institution/add', {
  reqBody: body
}, 'POST');
// 机构 删除
export const deleteAuth = (body) => fetch(FINGER + '/user/institution/delete', {
  reqBody: body
}, 'POST');
/* *************用户模块-end*********** */

/* *************标的管理模块-start*********** */
export const loanPage = (body) => fetch(FINGER + '/loan/page', {
  reqBody: body
}, 'POST');

export const loanPublicGet = (body) => fetch(FINGER + '/loan/public/get', {
  reqBody: body
}, 'POST');

export const loanPrivateGet = (body) => fetch(FINGER + '/loan/private/get', {
  reqBody: body
}, 'POST');

export const loanReview = (body) => fetch(FINGER + '/loan/review', {
  reqBody: body
}, 'POST');

export const loanEnd = (body) => fetch(FINGER + '/loan/end', {
  reqBody: body
}, 'POST');

export const loanPublish = (body) => fetch(FINGER + '/loan/publish', {
  reqBody: body
}, 'POST');

export const loanPublicAdd = (body) => fetch(FINGER + '/loan/public/add', {
  reqBody: body
}, 'POST');

export const loanPrivateAdd = (body) => fetch(FINGER + '/loan/private/add', {
  reqBody: body
}, 'POST');

export const loanPublicEdit = (body) => fetch(FINGER + '/loan/public/edit', {
  reqBody: body
}, 'POST');

export const loanPrivateEdit = (body) => fetch(FINGER + '/loan/private/edit', {
  reqBody: body
}, 'POST');

export const loanDelete = (body) => fetch(FINGER + '/loan/delete', {
  reqBody: body
}, 'POST');
/* *************标的管理模块-end*********** */

export const loanInvestorList = (body) => fetch(FINGER + '/loan/investor/list', {
  reqParams: body
}, 'POST');
