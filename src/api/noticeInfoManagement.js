import request from '@/utils/request'

export function getData(params) {
  return request({
    url: '/notice/list',
    method: 'get',
    params
  })
}
export function getDetail(params) {
  return request({
    url: '/notice/detail',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/notice/create',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/notice/update',
    method: 'post',
    data
  })
}
export function commit(params) {
  return request({
    url: '/notice/commit',
    method: 'get',
    params
  })
}
export function upDown(params) {
  return request({
    url: '/notice/up_down',
    method: 'get',
    params
  })
}
export function del(data) {
  return request({
    url: '/notice/delete',
    method: 'post',
    data
  })
}
