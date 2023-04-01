import axios from 'ts-axios-new'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
axios.defaults.withCredentials=true
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-chalk/index.css'
//import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './store'
import Vuex from 'vuex'

import router from './router'
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)





console.log('--->env='+JSON.stringify(process.env));

let env = process.env.NODE_ENV; // production

console.log('--->store='+store);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

