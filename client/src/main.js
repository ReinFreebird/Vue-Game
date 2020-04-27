import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';
import VueRouter from 'vue-router';
import { routes } from './routes';
import { store } from './store/store';


Vue.config.productionTip = false;

axios.defaults.baseURL = 'http://localhost:7000/api/v1';
// TODO use auth header
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('idToken');
axios.defaults.headers.get['Accepts'] = 'application/json';

const reqInterceptor = axios.interceptors.request.use(config => {
  console.log('Request Interceptor', config);
  return config;
});
const resInterceptor = axios.interceptors.response.use(res => {
  console.log('Response Interceptor', res);
  return res;
});

axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);

export const eventBus = new Vue();

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
