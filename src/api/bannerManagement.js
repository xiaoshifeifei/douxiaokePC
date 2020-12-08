import request from '@/utils/request'
export function getData(params) {
  return request({
    url: '/banner/list',
    method: 'get',
    params
  })
}
export function getDetail(params) {
  return request({
    url: '/banner/detail',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/banner/create',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/banner/update',
    method: 'post',
    data
  })
}
export function commit(params) {
  return request({
    url: '/banner/commit',
    method: 'get',
    params
  })
}
export function upDown(params) {
  return request({
    url: '/banner/up_down',
    method: 'get',
    params
  })
}
export function del(data) {
  return request({
    url: '/banner/delete',
    method: 'post',
    data
  })
}
export function upload(data) {
  return request({
    url: '/banner/upload',
    method: 'post',
    data
  })
}
