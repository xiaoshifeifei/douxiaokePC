/*
 * @Author: your name
 * @Date: 2020-05-25 14:21:19
 * @LastEditTime: 2020-06-05 10:04:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue_B_template\src\store\modules\dialog.js
 */
const state = {
  commonCheckDialogState: false, // 商超订单 基础查看对话框
  commonExportDialogState: false, // 基础导出对话框
  specialCheckDialogState: false, // 商超订单 特殊查看对话框
  createBreakageDialogState: false, // 商超订单 新建报损对话框
  breakCheckDialogState: false, // 商超订单 查看报损对话框
  breakExportDialogState: false, // 商超订单 报损导出对话框
  createRepairDialogState: false, // 商超订单 新建补单对话框
  repairCheckDialogState: false, // 商超订单 查看补单对话框
  repairExportDialogState: false, // 商超订单 补单导出对话框
  repertoryCheckDialogState: false, // 商超订单 库存查看对话框

  updatePasswordDialog: false, // 修改密码 对话框
  createHouseTypeDialogState: false, // 创建房型 对话框
  createHouseDialogState: false, // 创建房间 对话框
  createHousesDialogState: false, // 批量 创建房间 对话框
  GenerateCardDialogState: false, // 生成台卡 对话框
  generateMaterialDialogState: false, // 选择方案 对话框
  generateCheckInfoDialogState: false, // 确认台卡基本信息 对话框
  generatePayQRCodeDialogState: false // 台卡付款 二维码 对话框
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
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
