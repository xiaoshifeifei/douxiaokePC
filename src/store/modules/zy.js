const state = {
  GoodsCategoryID: ''
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
