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
    redirect: '/welcome',
    component: () => import('@/pages/Home'),
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/pages/Welcome'),
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/pages/Users'),
      },
      {
        path: '/goods',
        name: 'GoodsLists',
        component: () => import('@/pages/Goods/GoodsLists.vue'),
      },
      {
        path: '/orders',
        name: 'OrdersLists',
        component: () => import('@/pages/Orders/OrdersLists.vue'),
      },
    ]
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



// 使用 路由守卫 来实现路由页面的权限管理
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = window.localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})






// 导出路由器
export default router