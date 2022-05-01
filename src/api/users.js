import request from '@/utils/request'


// 获取用户列表
export const getUserList = (data)=> {
  return request({
    method: 'GET',
    url: '/getUserList',
    data   
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

// 获取需要修改的用户
export const getEditUser = (data)=> {
  return request({
    method: 'GET',
    url: '/getEditUser',
    data
  })
}

// 确认修改用户
export const confirmEditUser = (data)=> {
  return request({
    method: 'PUT',
    url: '/confirmEditUser',
    data
  })
}

// 删除用户
export const deleteUserByID = (data)=> {
  return request({
    method: 'DELETE',
    url: '/deleteUserByID',
    data
  })
}

// 修改用户状态
export const changeUserState = (data)=> {
  return request({
    method: 'PUT',
    url: '/changeUserState',
    data
  })
}