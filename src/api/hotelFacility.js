import request from '@/utils/request'
// 酒店设施  列表
export function hotelFacilityIndex(params) {
  return request({
    url: 'hotel_facility/index',
    method: 'get',
    params
  })
}
// 查看
export function hotelFacilityShow(params) {
  return request({
    url: 'hotel_facility/show',
    method: 'get',
    params
  })
}
// 创建
export function hotelFacilityCreate(data) {
  return request({
    url: 'hotel_facility/create',
    method: 'post',
    data
  })
}
// 更新
export function hotelFacilityUpdate(data) {
  return request({
    url: 'hotel_facility/update',
    method: 'post',
    data
  })
}
// 图片上传
export function hotelFacilityImgUpload(data) {
  return request({
    url: 'hotel_facility/img_upload',
    method: 'post',
    data
  })
}
// 删除
export function hotelFacilityDelete(data) {
  return request({
    url: 'hotel_facility/delete',
    method: 'post',
    data
  })
}
// 上下架
export function hotelFacilityUpDown(data) {
  return request({
    url: 'hotel_facility/up_down',
    method: 'post',
    data
  })
}
export function hotelFacilityCheck(data) {
  return request({
    url: 'hotel_facility/check',
    method: 'post',
    data
  })
}
