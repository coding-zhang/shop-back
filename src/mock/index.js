const Mock = require('mockjs')
const { adminData, vipData } = require('./usersData')
let { userList } = require('./userList')


Mock.mock('/login', 'post', (req) => {
  // console.log(33, req);
  const { username, password } = JSON.parse(req.body)
  // console.log(username, password);

  // 管理员
  if (username === 'admin' && password === '123456') {
    return {
      data: {
        username: 'admin',
        token: 'token-admin'
      },
      meta: {
        msg: 'success',
        status: 200
      }
    }
  } else if (username === 'vip' && password === '111') {
    // vip
    return {
      data: {
        username: 'vip',
        token: 'token-vip'
      },
      meta: {
        msg: 'success',
        status: 200
      }
    }
  } else {
    // 其它
    return {
      meta: {
        msg: 'fail',
        status: 0
      }
    }
  }

})

// 获取 菜单列表
Mock.mock('/getNavLists', 'get', (req) => {
  // console.log(33, req);
  const token = window.localStorage.getItem('token')
  // console.log(333, token);

  // admin 菜单
  if (token === 'token-admin') {
    return {
      data: adminData,
      meta: {
        msg: '获取菜单列表成功',
        status: 200
      }
    }
  }
  // vip 菜单
  if (token === 'token-vip') {
    return {
      data: vipData,
      meta: {
        msg: '获取菜单列表成功',
        status: 200
      }
    }
  }
})
// 获取 用户列表
Mock.mock('/getUserList', 'get', (req) => {
  
  const {query} = JSON.parse(req.body)
  // console.log(33, query);
  const result = userList.filter(item => {
    return item.username.includes(query)
  })
  // console.log(33, result);

  const token = window.localStorage.getItem('token')
  // console.log(333, token);

  // admin 菜单
  if (token === 'token-admin') {
    return {
      data: result,
      meta: {
        msg: '获取用户列表成功',
        status: 200
      }
    }
  }
})

// 添加新用户
Mock.mock('/addNewUser', 'post', (req) => {

  const user = JSON.parse(req.body)
  // console.log(33, user);
  const { username } = user

  const result = userList.filter(item => {
    return item.username === username
  })

  // console.log(44, result);

  if (result.length > 0) {
    return {
      data: userList,
      meta: {
        msg: '添加用户失败',
        status: 0
      }
    }
  } else {
    userList.push(
      {
        id: Date.now(),
        role_name: 'employee',
        mg_state: true,
        ...user
      }
    )
    return {
      data: userList,
      meta: {
        msg: '添加用户成功',
        status: 200
      }
    }
  }
})

// 获取需要修改的用户
Mock.mock('/getEditUser', 'get', (req) => {

  const user = JSON.parse(req.body)
  // console.log(33, user);
  const { id } = user

  const result = userList.filter(item => {
    return item.id === id
  })

  // console.log(44, result);

  if (result.length > 0) {
    return {
      data: result,
      meta: {
        msg: '获取用户成功',
        status: 200
      }
    }
  } else {    
    return {      
      meta: {
        msg: '获取用户失败',
        status: 0
      }
    }
  }
})

// 确定 修改用户
Mock.mock('/confirmEditUser', 'put', (req) => {

  const user = JSON.parse(req.body)
  // console.log(33, user);
  const { id, mobile } = user

  const result = userList.map(item => {
    if(item.id === id){
      item.mobile = mobile
    }
    return item
  })

  // console.log(44, result);

  if (result.length > 0) {
    return {
      data: result,
      meta: {
        msg: '修改用户成功',
        status: 200
      }
    }
  } else {    
    return {      
      meta: {
        msg: '修改用户失败',
        status: 0
      }
    }
  }
})

// 删除用户
Mock.mock('/deleteUserByID', 'delete', (req) => {

  const user = JSON.parse(req.body)
  // console.log(33, user);
  const { id } = user

  userList = userList.filter(item => {
    return item.id !== id
  })

  // console.log(44, userList);

  if (userList.length > 0) {
    return {
      data: userList,
      meta: {
        msg: '删除用户成功',
        status: 200
      }
    }
  } else {    
    return {      
      meta: {
        msg: '删除用户失败',
        status: 0
      }
    }
  }
})

// 修改用户状态
Mock.mock('/changeUserState', 'put', (req) => {

  const user = JSON.parse(req.body)
  // console.log(33, user);
  const { id, state } = user

  const result = userList.map(item => {
    if(item.id === id){
      item.mg_state = state
    }
    return item
  })

  // console.log(44, result);

  if (result.length > 0) {
    return {
      data: result,
      meta: {
        msg: '修改用户状态成功',
        status: 200
      }
    }
  } else {    
    return {      
      meta: {
        msg: '修改用户状态失败',
        status: 0
      }
    }
  }
})