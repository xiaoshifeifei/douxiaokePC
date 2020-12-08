/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-14 10:24:34
 */
import request from '@/utils/request'
// 租车维护商品 列表
export function rentCarGoodsIndex(params) {
  return request({
    url: 'rent_car_goods/index',
    method: 'get',
    params
  })
}
// 查看
export function rentCarGoodsShow(params) {
  return request({
    url: 'rent_car_goods/show',
    method: 'get',
    params
  })
}
// 创建
export function rentCarGoodsCreate(data) {
  return request({
    url: 'rent_car_goods/create',
    method: 'post',
    data
  })
}
// 更新
export function rentCarGoodsUpdate(data) {
  return request({
    url: 'rent_car_goods/update',
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
export function rentCarGoodsDelete(data) {
  return request({
    url: 'rent_car_goods/delete',
    method: 'post',
    data
  })
}
// 租车维护商品审核状态修改
export function rentCarGoodsCheck(data) {
  return request({
    url: 'rent_car_goods/check',
    method: 'post',
    data
  })
}
// 上下架
export function rentCarGoodsUpDown(data) {
  return request({
    url: 'rent_car_goods/up_down',
    method: 'post',
    data
  })
}
/**
 * 获取租车协议
 */
export function getTreaty() {
  return request({
    url: 'hotel_treaty/treaty_info',
    method: 'get',
    params: {
      TreatyType: 1
    }
  })
}
/**
 * 保存更新租车协议
 * @param {String} url
 * @return {Promise}
 */
export function updateTreaty(url) {
  return request({
    url: 'hotel_treaty/save',
    method: 'post',
    data: {
      TreatyType: 1,
      Url: url
    }
  })
}
