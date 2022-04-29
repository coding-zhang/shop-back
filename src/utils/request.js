// 封装的 axios
import axios from 'axios'
// import router from '@/router'

// 请求方式 和 操作行为 的映射
// const actionMapping = {
//   'get': 'view',
//   'post': 'add',
//   'put': 'edit',
//   'delete': 'delete'
// }

// 创建一个新的 axios 实例
const request = axios.create({
  // 配置基础路径和超时限制；
  // json-server 模拟服务器
  // 使用 mockjs，不要配置 baseURL
  // baseURL: '/api',
  // baseURL: 'http://localhost:8080',
  // baseURL: 'http://localhost:3000',
  // timeout: 2000
});

// 配置 请求拦截器
request.interceptors.request.use((config) => {
  // 拦截成功
  // console.log(config);
  // if(config.url !== '/login'){
  //   // 获取 token
  //   const token = localStorage.token
  //   // 将 token 添加到请求头的 Authorization 属性中
  //   config.headers.Authorization = 'Bearer ' + token

  //   // 判断非权限范围内的请求

  //   // 获取当前请求的 请求方式
  //   const action = actionMapping[config.method]
  //   // console.log(11, action);
  //   // 判断此 请求方式 是否和当前用户的路由权限一致
  //   const currentRight = router.currentRoute.meta
  //   // console.log('cur', currentRight);
  //   if(currentRight && currentRight.indexOf(action) === -1){
  //     // 没有 此种请求方式 的权限
  //     alert('没有权限')
  //     return
  //   }
  // }
  return config
}, (err) => {
  // 拦截失败
  return err;
})

// 配置 响应拦截器
request.interceptors.response.use((res) => {
  // 响应成功

  // 如果服务器返回的状态码 为 401 ，强制跳转到 login 页面，并且清空本地存储，刷新页面，清空 store 中的数据
  if(res.status === 401){
    // console.log(555);
    router.push('/login')
    window.localStorage.clear()
    window.location.reload()
  }

  return res
}, (err) => {
  // 响应失败
  // 判断错误类型
  if (err && err.response) {
    switch (err.response.status) {
      case 400: err.message = '请求错误（400）'; break;
      case 401: err.message = '身份认证失败（401）'; break;
      case 403: err.message = '拒绝访问（403）'; break;
      case 408: err.message = '请求超时（408）'; break;
      case 500: err.message = '服务器错误（500）'; break;
      case 501: err.message = '服务未实现（501）'; break;
      case 502: err.message = '网络错误（502）'; break;
      case 503: err.message = '服务不可用（503）'; break;
      case 504: err.message = '网络超时（504）'; break;
      case 505: err.message = 'HTTP版本不受支持（505）'; break;
      default: err.message = `连接错误(${err.response.status})`; break;
    }
    return {
      data: {
        status: 0,
        type: err.response.status,
        message: err.message
      }
    }
  } else {
    err.message = '服务器连接失败'
    return {
      data: {
        status: 0,
        message: err.message
      }
    }
  }
})


// 导出 request
export default request