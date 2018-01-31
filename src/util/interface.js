/**
 * Created by Shawn on 2017/6/23.
 */

const FINGER = '';

import {fetch} from './fetch';

// 登陆
export const login = (data, codeEvents) => fetch('/login', {
  reqParams: data,
  codeEvents: codeEvents
}, 'POST');

// cms模块
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

// 用户模块
export const userPage = (body) => fetch(FINGER + '/user/page', {
  reqBody: body
}, 'POST');

export const getUser = (body) => fetch(FINGER + '/user/get', {
  reqBody: body
}, 'POST');

export const getUserByMobile = (body) => fetch(FINGER + '/user/get/mobile', {
  reqBody: body
}, 'POST');

// 理财师 分页
export const fbPage = (body) => fetch(FINGER + '/user/fb/page', {
  reqBody: body
}, 'POST');
// 理财师 根据Id获取
export const fbGet = (body) => fetch(FINGER + '/user/fb/get', {
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

