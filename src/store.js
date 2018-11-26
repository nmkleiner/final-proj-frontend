import Vue from 'vue'
import Vuex from 'vuex'
import playerModule from './modules/player.js'
import eventModule from './modules/event.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    playerModule,
    eventModule
  },
})
