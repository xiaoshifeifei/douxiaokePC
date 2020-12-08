/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-07-07 16:28:17
 * @LastEditors: ldh
 * @LastEditTime: 2020-07-09 14:39:07
 */
import request from '@/utils/request'
/*
 * 客房服务物品设置
 * 列表
 */
export function serviceGoodsIndex(params) {
  return request({
    url: 'service_goods/index',
    method: 'get',
    params
  })
}
// 创建
export function serviceGoodsCreate(data) {
  return request({
    url: 'service_goods/create',
    method: 'post',
    data
  })
}
// 图片上传
export function serviceGoodsCoverImgUpload(data) {
  return request({
    url: 'service_goods/cover_img_upload',
    method: 'post',
    data
  })
}
// 下拉选项
export function bookingServiceGoodsItem(params) {
  return request({
    url: 'booking/service_goods_item',
    method: 'get',
    params
  })
}
// 查看
export function serviceGoodsShow(params) {
  return request({
    url: 'service_goods/show',
    method: 'get',
    params
  })
}
// 更新
export function serviceGoodsUpdate(data) {
  return request({
    url: 'service_goods/update',
    method: 'post',
    data
  })
}
// 删除
export function serviceGoodsDelete(data) {
  return request({
    url: 'service_goods/delete',
    method: 'post',
    data
  })
}
// 上下架
export function serviceGoodsUpDown(data) {
  return request({
    url: 'service_goods/up_down',
    method: 'post',
    data
  })
}

/**
 * 提交审核 可批量
 * @param {Arrays} GoodsIDs
 * @return: {Promise}
 */
export function serviceGoodsCheck(GoodsIDs) {
  return request({
    url: '/service_goods/check',
    method: 'post',
    data: {
      GoodsIDs,
      OperateCheckStatus: 1
    }
  })
}
