/*
 * @Author: your name
 * @Date: 2020-07-02 14:27:09
 * @LastEditTime: 2020-08-10 19:00:23
 * @LastEditors: ldh
 * @Description: In User Settings Edit
 * @FilePath: \zhiliao-hotel-b-web\src\store\modules\wsdata.js
 */
import { getOrderReminder } from '@/api/navBar.js'
const state = {
    statisticsData: '', // 首页 数据信息
    navBarData: {
        remindCountOfClear: 0,
        remindCountOfRepair: 0,
        remindCountOfService: 0,
        remindCountOfCheckOut: 0
    }, // navbar 数据信息
    homePageData: {
        CheckOutOrder: { // 退房
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        CleanOrder: { // 清扫
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        ContinueLiveOrder: { // 续住
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        FacilityOrder: { // 设施订单
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        InvoiceOrder: { // 发票订单
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        RentCarOrder: { // 租车订单
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        RepairOrder: { // 维修订单
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        ServiceOrder: { // 客房服务
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        },
        WakeOrder: { // 叫醒服务
            CompleteOrderCount: 0,
            HandleOrderCount: 0,
            ThisWeekOrderCount: 0,
            TodayOrderCount: 0
        }
    }
}
const mutations = {
    CHANGE_STATE: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}
const actions = {
    changeState({ commit }, data) {
        commit('CHANGE_STATE', data)
    },
    /**
     * 获取订单提醒
     */
    async getRemindInfo({ commit }) {
        // let res = await getOrderReminder()
        // let resData = res.data
        // let obj = {
        //   remindCountOfWake: +resData.Handle.WakeOrder.OrderCount || 0,
        //   remindCountOfContinueLive: +resData.Handle.ContinueLiveOrder.OrderCount || 0,
        //   remindCountOfFacility: +resData.Handle.FacilityOrder.OrderCount || 0,
        //   remindCountOfRentCar: +resData.Handle.RentCarOrder.OrderCount || 0,
        //   remindCountOfInvoice: +resData.Handle.InvoiceOrder.OrderCount || 0,
        //   remindCountOfClear: Number(resData.Handle.CleanOrder.OrderCount) || 0,
        //   remindCountOfRepair: Number(resData.Handle.RepairOrder.OrderCount) || 0,
        //   remindCountOfService: Number(resData.Handle.ServiceOrder.OrderCount) || 0,
        //   remindCountOfCheckOut: Number(resData.Handle.CheckOutOrder.OrderCount) || 0
        // }
        // commit('CHANGE_STATE', { key: 'navBarData', value: obj })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}