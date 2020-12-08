import request from "@/utils/request";
import { receiveOrder } from "./wakeupserve";

// 房型列表
export function GetHotelroomList(params) {
    return request({
        url: "hotel_room_type/hotel_room_type_list",
        method: "get",
        params
    });
}
// 房型详情
export function GetHotelroomDetail(params) {
    return request({
        url: "hotel_room_type/hotel_room_type_detail",
        method: "get",
        params
    });
}
// 房型新增
export function AddHotelroomType(data) {
    return request({
        url: "hotel_room_type/save_hotel_room_type",
        method: "post",
        data
    });
}
// 房型修改
export function EitHotelroomType(data) {
    return request({
        url: "hotel_room_type/update_hotel_room_type",
        method: "post",
        data
    });
}
// 房型删除
export function DelHotelroomType(data) {
    return request({
        url: "hotel_room_type/del_hotel_room_type",
        method: "post",
        data
    });
}
// 房型列表导出
export function HotelroomExport(params) {
    return request({
        url: "hotel_room/export_hotel_room_list",
        method: "get",
        params
    });
}
// 房间列表
export function GetHotelroomListM(params) {
    return request({
        url: "hotel_room/hotel_room_list",
        method: "get",
        params
    });
}
// 房型名称列表
export function GetHotelroomSelectM(params) {
    return request({
        url: "hotel_room_type/room_type_name_list",
        method: "get",
        params
    });
}
// 房间新增
export function AddHotelroomM(data) {
    return request({
        url: "hotel_room/save_hotel_room",
        method: "post",
        data
    });
}
// 房间修改
export function EitHotelroomM(data) {
    return request({
        url: "hotel_room/update_hotel_room",
        method: "post",
        data
    });
}
// 房间详情
export function GetHotelroomDetailM(params) {
    return request({
        url: "/hotel_room/hotel_room_detail",
        method: "get",
        params
    });
}
// 房间删除
export function DelHotelroomM(data) {
    return request({
        url: "/hotel_room/del_hotel_room",
        method: "post",
        data
    });
}

// 房间二维码导出--通过房型
export function downQrcodeByType(params) {
    return request({
        url: "/hotel_room/down_qrcode_by_type",
        method: "get",
        params,
        responseType: "blob",
        timeout: 20000
    });
}
// 房间二维码导出--通过勾选
export function downQrcodeByIds(data) {
    return request({
        url: "/hotel_room/down_qrcode_by_ids",
        method: "post",
        data,
        responseType: "blob",
        timeout: 60000
    });
}
// 房间导入模板下载
export function downRoomModel(params) {
    return request({
        url: "/hotel_room/template_download",
        method: "get",
        params,
        responseType: "blob",
        timeout: 20000
    });
}
// 房间批量新增
export function AddRoomModel(data) {
    return request({
        url: "/hotel_room/import_hotel_room",
        method: "post",
        data
    });
}
// 清扫订单列表/导出

export function GetCleanList(params) {
    return request({
        url: "/clean_orders/index",
        method: "get",
        params
    });
}
// 预定服务酒店相关下拉列表选项
export function GetBookingList(params) {
    return request({
        url: "/booking/hotel_item",
        method: "get",
        params
    });
}
// 清扫订单添加
export function AddBooking(data) {
    return request({
        url: "/clean_orders/create",
        method: "post",
        data
    });
}
// 清扫订单处理
export function ChangeBooking(data) {
    return request({
        url: "/clean_orders/operate",
        method: "post",
        data
    });
}
// 清扫订单取消
export function ChangeBookingCancel(data) {
    return request({
        url: "/clean_orders/cancel",
        method: "post",
        data
    });
}
// 清扫订单查看
export function BookingDetails(params) {
    return request({
        url: "/clean_orders/show",
        method: "get",
        params
    });
}
/**
 * 接受清理订单
 * @param {Number} orderId
 */
export function receiveCleanOrder(orderId) {
    return request({
        url: "/clean_orders/receive",
        method: "post",
        data: {
            OrderID: orderId,
            ReceiveOrderStatus: 2
        }
    });
}
// 维修订单列表/导出
export function GetRepairList(params) {
    return request({
        url: "/repair_orders/index",
        method: "get",
        params
    });
}
// 维修订单处理
export function ChangeRepair(data) {
    return request({
        url: "/repair_orders/operate",
        method: "post",
        data
    });
}
// 维修订单处理/取消
export function ChangeRepairCancel(data) {
    return request({
        url: "/repair_orders/cancel",
        method: "post",
        data
    });
}
// 创建维修订单
export function AddRepair(data) {
    return request({
        url: "/repair_orders/create",
        method: "post",
        data
    });
}
// 维修订单多图上传
export function uploadRepair(data) {
    return request({
        url: "/repair_orders/img_upload",
        method: "post",
        data
    });
}
// 维修订单查看
export function RepairDetails(params) {
    return request({
        url: "/repair_orders/show",
        method: "get",
        params
    });
}
// 设施订单列表/导出
export function GetFacilityList(params) {
    return request({
        url: "/facility_orders/index",
        method: "get",
        params
    });
}
/**
 * 设施预定接单
 * @param {Number} orderId
 * @return: {Promise}
 */
export function receiveFacilityOrder(orderId) {
    return request({
        url: "/facility_orders/receive",
        method: "post",
        data: {
            OrderID: orderId,
            ReceiveOrderStatus: 2
        }
    });
}
// 设施订单处理-已付款
export function ChangeFacility(data) {
    return request({
        url: "/facility_orders/operate",
        method: "post",
        data
    });
}
// 设施订单处理-未付款
export function ChangeFacilitypay(data) {
    return request({
        url: "/facility_orders/pay_status_operate",
        method: "post",
        data
    });
}
// 设施订单取消
export function ChangeFacilityCancel(data) {
    return request({
        url: "/facility_orders/cancel",
        method: "post",
        data
    });
}
// 设施订单查看
export function FacilityDetails(params) {
    return request({
        url: "/facility_orders/show",
        method: "get",
        params
    });
}
// 客房服务订单列表
export function serviceList(params) {
    return request({
        url: "/service_orders/index",
        method: "get",
        params
    });
}
// 客房服务订单批量导出数据
export function serviceExport(params) {
    return request({
        url: "/service_orders/export",
        method: "get",
        params
    });
}

// 客房服务订单查看
export function serviceDetail(params) {
    return request({
        url: "/service_orders/show",
        method: "get",
        params
    });
}
// 客房服务订单处理
export function serviceChange(data) {
    return request({
        url: "/service_orders/operate",
        method: "post",
        data
    });
}
/**
 * 接受客房服务订单
 * @param {Number} orderId
 * @return: {Promise}
 */
export function receiveServiceOrder(orderId) {
    return request({
        url: "/service_orders/receive",
        method: "post",
        data: {
            OrderID: orderId,
            ReceiveOrderStatus: 2
        }
    });
}
// 客房服务订单取消
export function serviceCancel(data) {
    return request({
        url: "/service_orders/cancel",
        method: "post",
        data
    });
}
// 续住订单列表
export function continueList(params) {
    return request({
        url: "/continue_live_order/index",
        method: "get",
        params
    });
}
// 续住订单导出数据
export function continueExport(params) {
    return request({
        url: "/continue_live_order/export",
        method: "get",
        params
    });
}

// 续住订单查看
export function continueDetail(params) {
    return request({
        url: "/continue_live_order/show",
        method: "get",
        params
    });
}
// 续住订单处理
export function continueChange(data) {
    return request({
        url: "/continue_live_order/operate",
        method: "post",
        data
    });
}
// 续住订单取消
export function continueCancel(data) {
    return request({
        url: "/continue_live_order/cancel",
        method: "post",
        data
    });
}
// 续住订单删除
export function continueDelete(data) {
    return request({
        url: "/continue_live_order/delete",
        method: "post",
        data
    });
}
// 租车订单列表
export function rentList(params) {
    return request({
        url: "/rent_car_order/index",
        method: "get",
        params
    });
}
// 租车订单导出数据
export function rentExport(params) {
    return request({
        url: "/rent_car_order/export",
        method: "get",
        params
    });
}

// 租车订单查看
export function rentDetail(params) {
    return request({
        url: "/rent_car_order/show",
        method: "get",
        params
    });
}
/**
 * 租车订单接单
 * @param {Number} orderId
 * @return: { Promise }
 */
export function receiveRentOrder(orderId) {
    return request({
        url: "/rent_car_order/receive",
        method: "post",
        data: {
            OrderID: orderId,
            ReceiveInvoiceStatus: 3
        }
    });
}
// 租车订单处理
export function rentChange(data) {
    return request({
        url: "/rent_car_order/complete",
        method: "post",
        data
    });
}
// 租车订单取消
export function rentCancel(data) {
    return request({
        url: "/rent_car_order/cancel",
        method: "post",
        data
    });
}
// 租车 已租赁
export function rentLease(data) {
    return request({
        url: "/rent_car_order/lease",
        method: "post",
        data
    });
}
// 退房订单列表
export function checkOutList(params) {
    return request({
        url: "/check_out_order/index",
        method: "get",
        params
    });
}
// 退房订单查看
export function checkOutDetail(params) {
    return request({
        url: "/check_out_order/show",
        method: "get",
        params
    });
}
// 退房订单处理/取消
export function checkOuttChange(data) {
    return request({
        url: "/check_out_order/complete",
        method: "post",
        data
    });
}