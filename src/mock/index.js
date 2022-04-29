const Mock = require('mockjs')


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