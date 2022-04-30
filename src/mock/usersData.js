export const usersData = [
  {
    id: 125,
    authName: '用户管理',
    children: [
      {
        id: 110,
        authName: '用户列表',
        path: 'users'
      }

    ],
    path: 'users',
    order: 1
  },
  {
    id: 101,
    authName: '商品管理',
    children: [
      {
        id: 104,
        authName: '商品列表',
        path: 'goods'
      }

    ],
    path: 'goods',
    order: 2
  },
  {
    id: 102,
    authName: '订单管理',
    children: [
      {
        id: 107,
        authName: '订单列表',
        path: 'orders'
      }

    ],
    path: 'orders',
    order: 3
  },
]