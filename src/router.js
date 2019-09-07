import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './components/Landing.vue'
import AppDashboard from './views/AppDashboard.vue'
import Dashboard from './components/Dashboard.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: Home
    },
    {
      path:'/designs', 
      name: "DesignsDashboard", 
      component: AppDashboard,
    },
    {
      path: '/app', 
      name: "Designer",
      component: Dashboard
    },
    {
      path: '/app/:id', 
      name: "app",
      component: Dashboard
    }
  ]
})
