import request from '@/utils/request'
// 系统设置---小程序管理--列表
export function GetTableList(params = {}) {
  return request({
    url: '/xcxmenu/list',
    method: 'get',
    params
  })
}
// 系统设置---小程序管理--详情
export function GetDetail(params = {}) {
  return request({
    url: '/xcxmenu/detail',
    method: 'get',
    params
  })
}
// 系统设置---小程序管理--更新
export function UpdateMini(data) {
  return request({
    url: '/xcxmenu/update',
    method: 'post',
    data
  })
}
// 系统设置---小程序管理--是否上架
export function IsUpDown(params = {}) {
  return request({
    url: '/xcxmenu/up_down',
    method: 'get',
    params
  })
}
// 系统设置---小程序管理--是否前台可见
export function IsShow(params = {}) {
  return request({
    url: '/xcxmenu/hide_show',
    method: 'get',
    params
  })
}
// 系统设置---小程序管理--删除
export function DeleteMenu(data) {
  return request({
    url: '/xcxmenu/delete',
    method: 'post',
    data
  })
}
// 系统设置---小程序管理--批量上架
export function UpBatch(data) {
  return request({
    url: '/xcxmenu/batch_up',
    method: 'post',
    data
  })
}
// 系统设置---小程序管理--批量下架
export function DownBatch(data) {
  return request({
    url: '/xcxmenu/batch_down',
    method: 'post',
    data
  })
}
