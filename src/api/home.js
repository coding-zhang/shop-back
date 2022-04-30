import request from '@/utils/request'


// 获取左侧导航菜单
export const getNavLists = (data)=> {
  return request({
    method: 'GET',
    url: '/getNavLists'
  })
}