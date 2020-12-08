/*
 * @Author: your name
 * @Date: 2020-06-30 14:46:53
 * @LastEditTime: 2020-06-30 15:04:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhiliao-hotel-b-web\src\api\firstLogin.js
 */
import request from '@/utils/request'

// 评论列表
export function firstLoginState(params) {
  return request({
    url: '/start_guide/get_start_step',
    method: 'get',
    params
  })
}
