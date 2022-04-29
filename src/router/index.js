import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)


// 路由表
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login'),
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/pages/Home'),
  },

  {
    path: '/',
    redirect: '/login'
  }
]

// 路由器实例
const router = new VueRouter({
  routes
})

// 导出路由器
export default router