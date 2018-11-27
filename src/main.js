import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/scss/main.scss'

// import VueCarousel from 'vue-carousel';
// Vue.use(VueCarousel);

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
