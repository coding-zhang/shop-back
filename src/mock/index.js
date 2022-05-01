const Mock = require('mockjs')
const { adminData, vipData } = require('./usersData')
const { userList } = require('./userList')


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
Mock.mock('/getUserList', 'get', () => {

  const token = window.localStorage.getItem('token')
  // console.log(333, token);

  // admin 菜单
  if (token === 'token-admin') {
    return {
      data: userList,
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