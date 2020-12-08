/*
 * @Author: your name
 * @Date: 2020-06-01 09:46:58
 * @LastEditTime: 2020-06-01 17:09:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\api\supermarket.js
 */
import request from '@/utils/request'

// 获取全部订单
export function GetAllOrder(params) {
  return request({
    url: '/supermarket/order/goods',
    method: 'get',
    params
  })
}
// 获取便利店订单
export function GetConveniencestore(params) {
  return request({
    url: '/supermarket_order/index',
    method: 'get',
    params
  })
}
// 获取便利店订单详情
export function GetConveniencestoreDetail(params) {
  return request({
    url: '/supermarket_order/show',
    method: 'get',
    params
  })
}
// 便利店订单接单
export function GetConveniencestoreAccept(params) {
  return request({
    url: '/supermarket_order/receive',
    method: 'POST',
    params
  })
}
// 便利店订单拒绝
export function GetConveniencestoreRefused(params) {
  return request({
    url: '/supermarket_order/cancel',
    method: 'POST',
    params
  })
}
// 酒店客房数据
export function GetConveniencestoreRoom(params) {
  return request({
    url: '/supermarket/order/hotelroom',
    method: 'get',
    params
  })
}
// 订单商品数据
export function GetConveniencestoreGoods(params) {
  return request({
    url: '/supermarket/order/goods',
    method: 'get',
    params
  })
}
// 便利店新建补单
export function GetConveniencestoreNew(data) {
  return request({
    url: '/supermarket_order/create',
    method: 'post',
    data
  })
}
// 便利店待配送(完成)
export function GetConveniencestoreFinish(params) {
  return request({
    url: '/supermarket_order/delivery',
    method: 'post',
    params
  })
}
// 便利店待配送(退款)
export function GetConveniencestoreOut(params) {
  return request({
    url: '/supermarket_order/refund',
    method: 'post',
    params
  })
}
// 获取送餐服务订单
export function GetFoodDelivered(params) {
  return request({
    url: '/getFoodDelivered',
    method: 'get',
    params
  })
}
// 获取土特产订单
export function GetLocalspecialty(params) {
  return request({
    url: '/getLocalspecialty',
    method: 'get',
    params
  })
}
// 获取情趣用品订单
export function GetSextoy(params) {
  return request({
    url: '/getSextoy',
    method: 'get',
    params
  })
}
export function GetOneOrder(params) {
  return request({
    url: '/getOneOrder',
    method: 'get',
    params
  })
}
export function Check(params) {
  return request({
    url: '/check',
    method: 'get',
    params
  })
}
