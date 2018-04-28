import Vue from 'vue';
import Vuex from 'vuex';
import myapp from './app';
import {app} from 'adm-portal';
import {baseUrl, loginUrl} from '../utils/env';

Vue.use(Vuex);

app.state.baseUrl = baseUrl;
app.state.loginUrl = loginUrl;
app.state.system = '指尖私行';
const store = new Vuex.Store({
  modules: {
    app: app,
    myapp: myapp
  }
});

export default store;
