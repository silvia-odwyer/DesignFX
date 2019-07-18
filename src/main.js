import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
window.blockstack = require('blockstack')
window.axios = require('axios')

Vue.config.productionTip = false
Vue.use(VueKonva)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
