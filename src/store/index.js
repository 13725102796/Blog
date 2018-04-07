import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const createStore = () => {
  return new Vuex.Store({
    state: {

    },
    getters,
    actions,
    mutations,

    strict: debug
  })
}

export default createStore