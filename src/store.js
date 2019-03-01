import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [
        createPersistedState()
    ],
    state: {
        loggedIn: false,
        token: null,
        user: null
    },
    mutations: {
        setUser (state, user) {
            state.user = user
            state.loggedIn = !!user
        },
        setToken (state, token) {
            state.token = token
        }
    },
    actions: {
        setUser ({ commit }, user) {
            commit('setUser', user)
        },
        setToken ({ commit }, token) {
            commit('setToken', token)
        },
        logout({ commit }){
            commit('setUser', null)
            commit('setToken', null)
        }
    }
})