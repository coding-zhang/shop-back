import request from '@/utils/request'


// 获取用户列表
export const getUserList = ()=> {
  return request({
    method: 'GET',
    url: '/getUserList'    
  })
}

// 添加新用户
export const addNewUser = (data)=> {
  return request({
    method: 'POST',
    url: '/addNewUser',
    data
  })
}