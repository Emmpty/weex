import VueRouter from 'vue-router'
import Vue from 'vue'

import test from './test.vue'
import test2 from './test2.vue'

Vue.use(VueRouter)

let routes = [
  {path: '/', component: test},
  {path: '/test2', component: test2}
]
export default new VueRouter({
  routes: routes
})
