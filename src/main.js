import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueKonva from 'vue-konva'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faVectorSquare, faImage, faImages, faAlignJustify, faAdjust, faShapes, faLayerGroup, faSquare, faSquareFull, faCircle, faChartLine, faEllipsisH, faArrowAltCircleDown, faSortDown, faSortUp, faClone, faAngleDoubleUp, faBarcode, faCheckSquare, faChartPie, faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { store } from './store/store'

window.blockstack = require('blockstack')
window.axios = require('axios')

library.add(faVectorSquare, faImage, faImages, faAlignJustify, faShapes, faAngleDoubleUp, faBarcode, faCheckSquare, faChartPie, faChartBar, faLayerGroup, faSquareFull, faCircle, faChartLine, faEllipsisH, 
            faArrowAltCircleDown, faSortDown, faSortUp, faClone)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(VueKonva)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
