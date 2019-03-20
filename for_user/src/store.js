import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    requestLoading: 0
  },
  mutations: {
    SET_LOADING: (state, boolean) => {
      boolean ? ++state.requestLoading : --state.requestLoading
    },
  },
  actions: {
    SetLoading ({ commit }, boolean) {
      commit('SET_LOADING', boolean)
    }
  },
  getters: {
    requestLoading: state => {
      return state.requestLoading
    }
  }
})
