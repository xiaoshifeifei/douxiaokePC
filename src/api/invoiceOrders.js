/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-18 16:15:56
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-24 10:50:41
 */
import request from '@/utils/request'
// 开票管理  列表
export function invoiceOrdersIndex(params) {
  return request({
    url: 'invoice_orders/index',
    method: 'get',
    params
  })
}
// 查看
export function invoiceOrdersShow(params) {
  return request({
    url: 'invoice_orders/show',
    method: 'get',
    params
  })
}
// 批量处理
export function invoiceOrdersOperate(data) {
  return request({
    url: 'invoice_orders/operate',
    method: 'post',
    data
  })
}
// 批量处理
export function cancelButton(data) {
  return request({
    url: 'invoice_orders/cancel',
    method: 'post',
    data
  })
}
/**
 * 发票订单接受
 * @param {Number} orderId
 * @return: {Promise}
 */
export function receiveOrder(orderId) {
  return request({
    url: 'invoice_orders/receive',
    method: 'post',
    data: {
      InvoiceOrderID: orderId,
      ReceiveInvoiceStatus: 3
    }
  })
}

