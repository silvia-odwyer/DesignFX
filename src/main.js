import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faVectorSquare, faImage, faImages, faAlignJustify, faShapes, faLayerGroup, faSquare, faSquareFull, faCircle, faChartLine, faEllipsisH, faArrowAltCircleDown, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

window.blockstack = require('blockstack')
window.axios = require('axios')

library.add(faVectorSquare, faImage, faImages, faAlignJustify, faShapes, faLayerGroup, faSquareFull, faCircle, faChartLine, faEllipsisH, 
            faArrowAltCircleDown, faSortDown, faSortUp)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueKonva)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
