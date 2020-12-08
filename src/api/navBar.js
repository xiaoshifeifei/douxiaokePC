/*
 * @Author: your name
 * @Date: 2020-06-28 14:45:07
 * @LastEditTime: 2020-06-28 14:47:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zhiliao-hotel-b-web\src\api\navBar.js
 */
import request from '@/utils/request'
export function getOrderReminder(params) {
  return request({
    url: '/booking/order_reminder',
    method: 'get',
    params
  })
}
