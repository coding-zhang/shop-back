import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navLists: JSON.parse(window.localStorage.getItem('navLists')) || [],
    // token: ''
  },
  mutations: {
    setNavLists(state, data){
      state.navLists = data
      window.localStorage.setItem('navLists', JSON.stringify(data))
    }
  },
  actions:{

  },
  getters: {

  }
})