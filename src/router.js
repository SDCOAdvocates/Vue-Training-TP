import Vue from 'vue'
import Router from 'vue-router'
import LoginForm from './views/LoginForm.vue'
import SearchFilm from './views/SearchFilm.vue'
import store from "./store.js";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/search'
    },
    {
      path: '/search',
      name: 'search',
      component: SearchFilm,
      beforeEnter: (to, from, next) => {
        if(!store.state.loggedIn) next('/login')
        else next()
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm
    }
  ]
})
