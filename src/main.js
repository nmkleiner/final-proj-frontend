import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/main.scss'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueSocketIO from 'vue-socket.io'
import 'vue-event-calendar/dist/style.css'
import vueEventCalendar from 'vue-event-calendar'


Vue.use(vueEventCalendar, {locale: 'fr'}) 

var socketURL = 'http://localhost:3000'
if (process.env.NODE_ENV !== "development") {
  socketURL = "/";
}

// Vue.use(VueSocketio, socketio(socketURL), store);


Vue.use(new VueSocketIO({
    debug: true,
    connection: socketURL,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}))

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC1FhnnrcBKyOeZF9as6Qw89mBzjul9jU4',
    libraries: 'places'
  },
})

import VueGlide from 'vue-glide-js'
Vue.use(VueGlide)
import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

Vue.config.productionTip = false

Vue.use(ElementUI);
// Vue.crossorigin = true;
Vue.crossOrigin = 'true'

// import {Button} from 'element-ui';
// Vue.use(Button);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
