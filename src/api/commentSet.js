import request from '@/utils/request'

// 评论列表
export function GetCommentList(params = {}) {
  return request({
    url: '/comment/list',
    method: 'get',
    params
  })
}
// 评论详情
export function GetCommentDetail(params = {}) {
  return request({
    url: '/comment/detail',
    method: 'get',
    params
  })
}
// 评论回复
export function ToCommentReply(data) {
  return request({
    url: '/comment/reply',
    method: 'post',
    data
  })
}
// 删除评论
export function ToCommentDelete(data) {
  return request({
    url: '/comment/delete',
    method: 'post',
    data
  })
}
