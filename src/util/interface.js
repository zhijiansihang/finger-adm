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
