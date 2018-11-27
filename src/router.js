import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import eventEdit from './views/event-edit.vue'
import eventDetails from './views/event-details.vue'
import signUp from './views/sign-up.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/event/edit',
      name: 'event-edit',
      component: eventEdit
    },
    {
      path: '/event/edit/:eventId',
      name: 'event-edit',
      component: eventEdit
    },
    {
      path: '/event/:eventId',
      name: 'event-details',
      component: eventDetails
    },
    {
      path: '/signup',
      name: 'signup',
      component: signUp
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
