/*
 * @Author: your name
 * @Date: 2020-04-26 10:09:38
 * @LastEditTime: 2020-05-18 10:02:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Jdgj-system\src\store\modules\dialog.js
 */
const state = {
  multipleSelectionAll: [], // 导出列表
  isSeach: false
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
