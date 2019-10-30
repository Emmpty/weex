import index from './index.vue'
import list from './product/list.vue'
const detail = resolve => require(['./pages/product/detail.vue'], resolve)

const routes = [
  { path: '/', component: index },
  { path: '/list/:id', component: list },
  { path: '/product/:id', component: detail }
]
export default routes
