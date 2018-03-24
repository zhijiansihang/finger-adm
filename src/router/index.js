import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie';
import * as portal from 'adm-portal';
import * as mainConst from '../util/const';

import {LoadingBar} from 'iview';

Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    meta: {
      title: '首页 '
    },
    component: portal.layout,
    children: [{
      path: '/portal',
      meta: {
        title: 'portal'
      },
      component: portal.center
    }]
  }, {
    path: '/index',
    meta: {
      title: '首页'
    },
    component: (resolve) => require(['../views/index.vue'], resolve)
  }, {
    path: '/sys/resource',
    name: '资源管理',
    meta: {
      prevLevelName: '系统管理',
      title: '资源管理'
    },
    component: portal.resource
  }, {
    path: '/sys/user',
    name: '用户管理',
    meta: {
      prevLevelName: '系统管理',
      title: '用户管理'
    },
    component: portal.user
  }, {
    path: '/sys/role',
    name: '角色管理',
    meta: {
      prevLevelName: '系统管理',
      title: '角色管理'
    },
    component: portal.role
  }, {
    path: '/sys/roleResource',
    name: '角色权限',
    meta: {
      prevLevelName: '系统管理',
      title: '角色权限'
    },
    component: portal.roleResource
  }, {
    path: '/sys/log',
    name: '操作日志',
    meta: {
      prevLevelName: '系统管理',
      title: '操作日志'
    },
    component: portal.log
  }, {
    path: '/organization',
    name: 'organization',
    meta: {
      title: '机构管理'
    },
    component: (resolve) => require(['../views/organ/organization.vue'], resolve)
  }, {
    path: '/private',
    name: '发布私募产品',
    meta: {
      prevLevelName: '产品管理',
      title: '发布私募产品'
    },
    component: (resolve) => require(['../views/product/add/private.vue'], resolve)
  }, {
    path: '/public',
    name: '发布公募产品',
    meta: {
      prevLevelName: '产品管理',
      title: '发布公募产品'
    },
    component: (resolve) => require(['../views/product/add/public.vue'], resolve)
  }, {
    path: '/published',
    name: '已发布产品',
    meta: {
      prevLevelName: '产品管理',
      title: '已发布产品'
    },
    component: (resolve) => require(['../views/product/published.vue'], resolve)
  }, {
    path: '/publish',
    name: '已发布产品',
    meta: {
      prevLevelName: '产品管理',
      title: '已发布产品'
    },
    component: (resolve) => require(['../views/product/publish.vue'], resolve)
  }, {
    path: '/review',
    name: '待审核产品',
    meta: {
      prevLevelName: '产品管理',
      title: '待审核产品'
    },
    component: (resolve) => require(['../views/product/review.vue'], resolve)
  }, {
    path: '/product/edit/private',
    name: '编辑私募产品',
    meta: {
      prevLevelName: '产品管理',
      title: '编辑私募产品'
    },
    component: (resolve) => require(['../views/product/edit/private.vue'], resolve)
  }, {
    path: '/product/edit/public',
    name: '编辑公募产品',
    meta: {
      prevLevelName: '产品管理',
      title: '编辑公募产品'
    },
    component: (resolve) => require(['../views/product/edit/public.vue'], resolve)
  }, {
    path: '/product/detail/private',
    name: '待审核产品',
    meta: {
      prevLevelName: '产品管理',
      title: '待审核产品'
    },
    component: (resolve) => require(['../views/product/detail/private.vue'], resolve)
  }, {
    path: '/product/detail/public',
    name: '待审核产品',
    meta: {
      prevLevelName: '产品管理',
      title: '待审核产品'
    },
    component: (resolve) => require(['../views/product/detail/public.vue'], resolve)
  }, {
    path: '/banner',
    name: '首页banner',
    meta: {
      prevLevelName: '系统管理',
      title: '首页banner'
    },
    component: (resolve) => require(['../views/system/banner.vue'], resolve)
  }, {
    path: '/bannerAdd',
    name: '新增banner',
    meta: {
      prevLevelName: '系统管理',
      title: '新增banner'
    },
    component: (resolve) => require(['../views/system/bannerAdd.vue'], resolve)
  }, {
    path: '/bannerEdit',
    name: '编辑banner',
    meta: {
      prevLevelName: '系统管理',
      title: '编辑banner'
    },
    component: (resolve) => require(['../views/system/bannerEdit.vue'], resolve)
  }, {
    path: '/notice',
    name: '公告管理',
    meta: {
      prevLevelName: '系统管理',
      title: '公告管理'
    },
    component: (resolve) => require(['../views/system/notice.vue'], resolve)
  }, {
    path: '/noticeAdd',
    name: '发布公告',
    meta: {
      prevLevelName: '系统管理',
      title: '发布公告'
    },
    component: (resolve) => require(['../views/system/noticeAdd.vue'], resolve)
  }, {
    path: '/noticeEdit',
    name: '编辑公告',
    meta: {
      prevLevelName: '系统管理',
      title: '编辑公告'
    },
    component: (resolve) => require(['../views/system/noticeEdit.vue'], resolve)
  }, {
    path: '/noticeDetail',
    name: '公告详情',
    meta: {
      prevLevelName: '系统管理',
      title: '公告详情'
    },
    component: (resolve) => require(['../views/system/noticeDetail.vue'], resolve)
  }, {
    path: '/info',
    name: '行业资讯',
    meta: {
      prevLevelName: '系统管理',
      title: '行业资讯'
    },
    component: (resolve) => require(['../views/system/info.vue'], resolve)
  }, {
    path: '/infoAdd',
    name: '发布资讯',
    meta: {
      prevLevelName: '系统管理',
      title: '发布资讯'
    },
    component: (resolve) => require(['../views/system/infoAdd.vue'], resolve)
  }, {
    path: '/infoEdit',
    name: '编辑资讯',
    meta: {
      prevLevelName: '系统管理',
      title: '编辑资讯'
    },
    component: (resolve) => require(['../views/system/infoEdit.vue'], resolve)
  }, {
    path: '/fp',
    name: '理财师管理',
    meta: {
      prevLevelName: '用户管理',
      title: '理财师管理'
    },
    component: (resolve) => require(['../views/user/fp.vue'], resolve)
  }, {
    path: '/fbDetail',
    name: '平台用户管理',
    meta: {
      prevLevelName: '理财师详情',
      title: '平台用户管理'
    },
    component: (resolve) => require(['../views/user/fbDetail.vue'], resolve)
  }, {
    path: '/user',
    name: '平台用户管理',
    meta: {
      prevLevelName: '用户管理',
      title: '平台用户管理'
    },
    component: (resolve) => require(['../views/user/user.vue'], resolve)
  }, {
    path: '/userDetail',
    name: '平台用户管理',
    meta: {
      prevLevelName: '用户详情',
      title: '平台用户管理'
    },
    component: (resolve) => require(['../views/user/userDetail.vue'], resolve)
  }, {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['../views/login.vue'], resolve)
    // component: portal.login
  }, {
    path: '/404',
    name: '404',
    // component: (resolve) => require(['../views/404.vue'], resolve)
    component: portal._404
  }]
});

router.beforeEach((to, from, next) => {
  LoadingBar.start();

  if (to.query.sessionId) { // 存入sessionId
    Cookies.set('sessionId', to.query.sessionId);
  }
  let sessionId = Cookies.get('sessionId');
  if (sessionId) { // 如果是登陆状态
    // store.dispatch('addTab', to);
    if (window !== top) {
      (to.path === '/' || to.path === '/login') ? next({path: '/login'}) : next();
    } else {
      (to.path === '/' || to.path === '/login') ? next({path: mainConst.ADM_INDEX}) : next();
    }
  } else { // 不是登陆状态
    to.path !== '/login' ? next({path: '/login'}) : next();
  }
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

export default router;
