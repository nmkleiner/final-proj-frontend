import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import eventEdit from './views/event-edit.vue'
import eventDetails from './views/event-details.vue'
import eventsPage from './views/events-page.vue'
import signUp from './views/sign-up.vue'
import loginPage from './views/login-page.vue'
import userProfile from './views/user-profile.vue'

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
      path: '/event',
      name: 'events-page',
      component: eventsPage
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
      path: '/login',
      name: 'login',
      component: loginPage
    },
    {
      path: '/user/:userId',
      name: 'userProfile',
      component: userProfile
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
