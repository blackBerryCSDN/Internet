const state = {
  userName: '',
  alarmTotal: 0, // 告警总数
  menuActiveIndex: 0, // 菜单那高亮显示索引
}

// 给 state 赋值
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  SET_ALARM_TOTAL(state, val) {
    state.alarmTotal = val
  }
}

// state 设置方法
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  },
  setAlarmTotal({ commit }, val) {
    commit('SET_USER_NAME', val)
  }
}
export default {
  state,
  mutations,
  actions
}
