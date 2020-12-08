import request from '@/utils/request'
export function getHotelStatistics(params) {
  return request({
    url: 'booking/statistics',
    method: 'get',
    params
  })
}
export function getHotelItem(params) {
  return request({
    url: 'booking/hotel_item',
    method: 'get',
    params
  })
}
export function addCleanOrders(data) {
  return request({
    url: 'clean_orders/create',
    method: 'post',
    data
  })
}
export function addRepairOrders(data) {
  return request({
    url: 'repair_orders/create',
    method: 'post',
    data
  })
}
