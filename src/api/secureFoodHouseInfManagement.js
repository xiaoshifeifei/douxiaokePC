import request from '@/utils/request'
export function getData(params) {
  return request({
    url: '/eatlive/list',
    method: 'get',
    params
  })
}
export function getDetail(params) {
  return request({
    url: '/eatlive/detail',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/eatlive/create',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/eatlive/update',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/eatlive/delete',
    method: 'post',
    data
  })
}
export function commit(params) {
  return request({
    url: '/eatlive/commit',
    method: 'get',
    params
  })
}
export function upDown(params) {
  return request({
    url: '/eatlive/up_down',
    method: 'get',
    params
  })
}
