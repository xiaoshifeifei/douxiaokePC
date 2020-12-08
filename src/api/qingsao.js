import request from '@/utils/request'
export function qingsao(params) {
  return request({
    url: 'clean_orders/index',
    method: 'get',
    params
  })
}

export function delet(data) {
  return request({
    url: 'clean_orders/delete',
    method: 'post',
    data
  })
}
export function repair(params) {
  return request({
    url: 'repair_orders/index',
    method: 'get',
    params
  })
}
export function repairDelet(data) {
  return request({
    url: 'repair_orders/delete',
    method: 'post',
    data
  })
}
export function facility(params) {
  return request({
    url: 'facility_orders/index',
    method: 'get',
    params
  })
}
export function facilityOrders(data) {
  return request({
    url: 'facility_orders/delete',
    method: 'post',
    data
  })
}
// 吐槽
export function comment(params) {
  return request({
    url: 'comment/list',
    method: 'get',
    params
  })
}
export function commentDetail(params) {
  return request({
    url: 'comment/detail',
    method: 'get',
    params
  })
}
export function commentDelete(data) {
  return request({
    url: 'comment/delete',
    method: 'post',
    data
  })
}
export function commentUpdate(data) {
  return request({
    url: 'comment/update',
    method: 'post',
    data
  })
}
export function commentCreate(data) {
  return request({
    url: 'comment/create',
    method: 'post',
    data
  })
}
