/* eslint-disable camelcase */

import Home from '../Home.vue'


import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  base: './',
  routes: [

	  {
    	  path:'/',  name: 'Home', component: Home
      }

  ]
})
