// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import iView from 'iview';
Vue.use(iView);
import Cookies from 'js-cookie';
import store from './store/index';
import './assets/styles/layout.less'; // 引入布局样式
import './assets/styles/cover.less'; // 覆盖样式
import './assets/styles/common.less';
import 'font-awesome/css/font-awesome.min.css';
import 'jstree/dist/themes/default/style.min.css';

Cookies.set('menuTabs-指尖私行', '[{"title":"首页","path":"/index","query":{}},{"title":"平台用户管理","path":"/user","query":{}},{"title":"平台用户管理","path":"/userDetail","query":{}},{"title":"理财师管理","path":"/fp","query":{}},{"title":"平台用户管理","path":"/fbDetail","query":{}},{"title":"机构管理","path":"/organization","query":{}},{"title":"待审核产品","path":"/review","query":{}},{"title":"待审核产品","path":"/reviewDetail","query":{}},{"title":"已发布产品","path":"/published","query":{}},{"title":"发布公募产品","path":"/public","query":{}},{"title":"发布私募产品","path":"/private","query":{}},{"title":"首页banner","path":"/banner","query":{}},{"title":"公告管理","path":"/notice","query":{}},{"title":"贴心推荐","path":"/recommend","query":{}},{"title":"编辑推荐","path":"/recommendEdit","query":{}},{"title":"资源管理","path":"/sys/resource","query":{}}]');
var winWidth = document.documentElement.clientWidth;
if (winWidth <= 600) {
  store.commit('CLOSE_SLIDEBAR');
} else {
  store.commit('OPEN_SLIDEBAR');
}
window.onresize = function () {
  winWidth = document.documentElement.clientWidth;
  if (winWidth <= 600) {
    store.commit('CLOSE_SLIDEBAR');
  } else {
    store.commit('OPEN_SLIDEBAR');
  }
};

import zhLocale from 'iview/src/locale/lang/zh-CN';
import enLocale from 'iview/src/locale/lang/en-US';

let lang = Cookies.getJSON('lang');
if (lang && lang.type === 'CN') {
  Vue.config.lang = 'zh-CN';
  store.dispatch('setLang', {icon: '#icon-zhongguo', type: 'CN'});
} else if (lang && lang.type === 'EN') {
  store.dispatch('setLang', {icon: '#icon-yingguo', type: 'EN'});
  Vue.config.lang = 'en-US';
} else {
  Vue.config.lang = 'zh-CN';
  store.dispatch('setLang', {icon: '#icon-zhongguo', type: 'CN'});
}
Vue.locale('zh-CN', zhLocale);
Vue.locale('en-US', enLocale);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
