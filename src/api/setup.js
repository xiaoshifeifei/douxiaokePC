/*
 * @Descripttion: des
 * @version: v
 * @Author: ldh
 * @Date: 2020-08-12 09:36:02
 * @LastEditors: ldh
 * @LastEditTime: 2020-08-14 18:51:21
 */
import request from '@/utils/request'

/**
 * 获取启动流程步骤
 */
export const reqSetupStep = () => {
  return request({
    url: '/start_guide/get_start_step'
  })
}
/**
 * 修改密码
 * @param {Object} data  {AdminPassword,NewAdminPassword,ConfirmPassword}
 * @return {Promise}
 */
export const updatePassword = (data) => {
  return request({
    url: '/admin/update_password',
    method: 'POST',
    data
  })
}
/**
 * 获取酒店配置基本信息
 * @param {Number} HotelID
 * @return {Promise}
 */
export const reqHotelBasicInfo = () => {
  return request({
    url: '/hotel/hotel_detail'
  })
}
/**
 * 完善酒店信息
 */
export const updateHotelInfo = (data) => {
  return request({
    url: '/hotel/info_complete',
    method: 'POST',
    data
  })
}

/**
 * 新增 房型
 */
export const reqAddRoomType = (data) => {
  return request({
    url: '/hotel_room_type/save_hotel_room_type',
    method: 'POST',
    data
  })
}
/**
 * 房型详情
 */
export const reqRoomyTypeDetail = (id) => {
  return request({
    url: '/hotel_room_type/hotel_room_type_detail',
    params: { RoomTypeID: id }
  })
}
/**
 * 房型修改
 */
export const reqUpdateRoomType = (data) => {
  return request({
    url: '/hotel_room_type/update_hotel_room_type',
    method: 'POST',
    data
  })
}
/**
 * 房型删除
 * @param {Array}  RoomTypeIDs
 * @return {Promise} {}
 */
export const reqDeleteRoomType = (RoomTypeIDs) => {
  return request({
    url: '/hotel_room_type/del_hotel_room_type',
    method: 'POST',
    data: { RoomTypeIDs }
  })
}
/**
 * 获取房型列表
 */
export const reqRoomTypes = (data) => {
  return request({
    url: '/hotel_room_type/hotel_room_type_list',
    params: data
  })
}
/**
 * 批量导入房间
 */
export const uploadRooms = (rooms) => {
  return request({
    url: '/hotel_room/import_start',
    method: 'POST',
    data: { HotelRooms: rooms }
  })
}
/**
 * 新增房间
 */
export const reqAddRoom = (data) => {
  return request({
    url: '/hotel_room/create_start',
    method: 'POST',
    data
  })
}
/**
 * 房间更改
 */
export const reqUpdateRoom = (data) => {
  return request({
    url: '/hotel_room/update_start',
    method: 'POST',
    data
  })
}
/**
 * 台卡样式列表
 */
export const reqCardStyles = () => {
  return request({
    url: '/hotel_room_qrcode_record/list'
  })
}
/**
 * 保存样式
 */
export const reqSaveCardStyle = (QrcodeRecID) => {
  return request({
    url: '/hotel/choose_record',
    method: 'POST',
    data: { QrcodeRecID }
  })
}
/**
 * 台卡材料列表
 */
export const reqMaterialCards = () => {
  return request({
    url: '/qrcode_material/list'
  })
}
/**
 * 保存台卡制作订单
 */
export const reqSaveOrder = (data) => {
  return request({
    url: '/qrcode_order/save',
    method: 'POST',
    data
  })
}
/**
 * 支付订单
 */
export const reqOrderPay = (OrderID) => {
  return request({
    url: '/qrcode_order/pay',
    params: { OrderID }
  })
}
