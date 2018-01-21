import Vue from 'vue';
import Router from 'vue-router';
import store from '../store/index';
import Cookies from 'js-cookie';
import * as portal from 'adm-portal';
import * as myconst from '../util/const';

Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    meta: {
      title: '首页 '
    },
    component: portal.layout,
    redirect: myconst.ADM_INDEX,
    children: [{
      path: '/iframe',
      meta: {
        title: 'iframe'
      },
      component: portal.iframe
    }]
  }, {
    path: '/index',
    meta: {
      title: '首页'
    },
    // component: index
    component: (resolve) => require(['../views/test.vue'], resolve)
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
    component: (resolve) => require(['../views/product/private.vue'], resolve)
  }, {
    path: '/public',
    name: '发布公募产品',
    meta: {
      prevLevelName: '产品管理',
      title: '发布公募产品'
    },
    component: (resolve) => require(['../views/product/public.vue'], resolve)
  }, {
    path: '/published',
    name: '已发布产品',
    meta: {
      prevLevelName: '产品管理',
      title: '已发布产品'
    },
    component: (resolve) => require(['../views/product/published.vue'], resolve)
  }, {
    path: '/review',
    name: '待审核产品',
    meta: {
      prevLevelName: '产品管理',
      title: '待审核产品'
    },
    component: (resolve) => require(['../views/product/review.vue'], resolve)
  }, {
    path: '/reviewEdit',
    name: '待审核产品',
    meta: {
      prevLevelName: '产品编辑',
      title: '待审核产品'
    },
    component: (resolve) => require(['../views/product/reviewEdit.vue'], resolve)
  }, {
    path: '/reviewDetail',
    name: '待审核产品',
    meta: {
      prevLevelName: '产品详情',
      title: '待审核产品'
    },
    component: (resolve) => require(['../views/product/reviewDetail.vue'], resolve)
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
    path: '/recommend',
    name: '贴心推荐',
    meta: {
      prevLevelName: '系统管理',
      title: '贴心推荐'
    },
    component: (resolve) => require(['../views/system/recommend.vue'], resolve)
  }, {
    path: '/recommendAdd',
    name: '发布推荐',
    meta: {
      prevLevelName: '系统管理',
      title: '发布推荐'
    },
    component: (resolve) => require(['../views/system/recommendAdd.vue'], resolve)
  }, {
    path: '/recommendEdit',
    name: '编辑推荐',
    meta: {
      prevLevelName: '系统管理',
      title: '编辑推荐'
    },
    component: (resolve) => require(['../views/system/recommendEdit.vue'], resolve)
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
  Cookies.set('refer', from.fullPath);

  if (to.query.sessionId) { // 存入sessionId
    Cookies.set('sessionId', to.query.sessionId);
  }
  let sessionId = Cookies.get('sessionId');
  if (sessionId) { // 如果是登陆状态
    store.dispatch('addTab', to);
    to.path === '/login' ? next({path: '/index'}) : next();
  } else { // 不是登陆状态
    to.path !== '/login' ? next({path: '/login'}) : next();
  }
});

router.afterEach(() => {
  window.scrollTo(0, 0);
});

export default router;
