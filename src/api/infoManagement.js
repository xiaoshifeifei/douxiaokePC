import request from '@/utils/request'

export function upCoverImg(data) {
  return request({
    url: '/news/upload_cover',
    method: 'post',
    data
  })
}
export function getData(params) {
  return request({
    url: '/news/list',
    method: 'get',
    params
  })
}
export function getDetail(params) {
  return request({
    url: '/news/detail',
    method: 'get',
    params
  })
}
export function add(data) {
  return request({
    url: '/news/create',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/news/update',
    method: 'post',
    data
  })
}
export function commit(params) {
  return request({
    url: '/news/commit',
    method: 'get',
    params
  })
}
export function upDown(params) {
  return request({
    url: '/news/up_down',
    method: 'get',
    params
  })
}
export function del(data) {
  return request({
    url: '/news/delete',
    method: 'post',
    data
  })
}
