import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
const state = {
    username: '',
    desc: ''
}

const mutations = {
    change(state, value) {
        state.username = value;
    },
    changeDesc(state, value) {
        state.desc = value
    }
}
export default new Vuex.Store({
    state,
    mutations
})