import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)



// 配置动态路由
const usersRule = {
  path: '/users',
  name: 'Users',
  component: () => import('@/pages/Users'),
}

const goodsRule = {
  path: '/goods',
  name: 'GoodsLists',
  component: () => import('@/pages/Goods/GoodsLists.vue'),
}

const ordersRule = {
  path: '/orders',
  name: 'OrdersLists',
  component: () => import('@/pages/Orders/OrdersLists.vue'),
}

// url 和 路由规则 的映射
const ruleMapping = {
  'users': usersRule,
  'goods': goodsRule,
  'orders': ordersRule
}



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
      }      
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
  const token = window.localStorage.getItem('token')
  if (to.path === '/login') {
    if(token){
      next('/home')
    }else{
      next()
    }    
  } else {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }  
})


// 导出 动态添加路由的方法
export function initDynamicRoutes() {
  // 根据用户拥有的权限，对路由规则进行动态添加
  // console.log(router);
  const currentRoutes = router.options.routes
  // currentRoutes[0].children.push()

  // console.log(22, currentRoutes);
  // const navLists = store.state.navLists
  const menuList = JSON.parse(window.localStorage.getItem('menuList'))
  // console.log('router',menuList);
  if(!menuList) return;

  menuList.forEach(item => {
    const temp = ruleMapping[item.children[0].path]
    // console.log('temp', temp);
    // temp.meta = item.rights
    currentRoutes[1].children.push(temp)
    
    if(currentRoutes[currentRoutes.length-1].path !== '*'){
      // 404 页面要在 添加 动态路由 时，最后 push 进去，
      // 不能在初始化路由表中写，否则会发生 匹配不到新添加路由规则，
      // 因为 路由守卫 是异步执行的，在动态路由添加前，浏览器地址栏 已经发生了跳转；
      currentRoutes.push(
        {
          path: '*',
          component: () => import('@/pages/Other'),
        }
      )
    }
  })
  // console.log(33, currentRoutes);

  // // 把 动态路由规则 添加到 路由表 中
  router.addRoutes(currentRoutes)

  // console.log(44, router);

}





// 导出路由器
export default router