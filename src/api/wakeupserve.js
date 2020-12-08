/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-23 15:29:33
 */
import request from '@/utils/request'
// 叫醒服务  订单 列表
export function wakeOrderIndex(params) {
  return request({
    url: 'wake_order/index',
    method: 'get',
    params
  })
}
// 查看
export function wakeOrderShow(params) {
  return request({
    url: 'wake_order/show',
    method: 'get',
    params
  })
}
// 订单处理
export function wakeOrderOperate(data) {
  return request({
    url: 'wake_order/operate',
    method: 'post',
    data
  })
}
// 订单取消
export function wakeOrderCancel(data) {
  return request({
    url: 'wake_order/cancel',
    method: 'post',
    data
  })
}

/**
 * 接受订单
 * @param {Object}
 * @return: {Promise}
 */
export function receiveOrder({ OrderID, ReceiveOrderStatus }) {
  return request({
    url: 'wake_order/receive',
    method: 'post',
    data: { OrderID, ReceiveOrderStatus }
  })
}
