// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import  { routes } from './routes'


Vue.use(VueRouter);
Vue.use(iView);

Vue.config.productionTip = false
window.Hls = require('hls.js');

const router = new VueRouter({
  routes,
  mode:'hash'
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
