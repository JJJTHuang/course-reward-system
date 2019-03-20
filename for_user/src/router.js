import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import payment from './views/payment/index.vue'
import login from './views/login.vue'
import personal from './views/personal/index.vue'
import info from './views/personal/info.vue'
import apply from './views/personal/apply.vue'
import course from './views/course.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'payment',
          name: 'payment',
          component: payment,
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal,
          // children:[
          //   {
          //     path: '/info',
          //     name: 'info',
          //     component: info
          //   }
          // ]
        },
        {
          path: '/info',
          name: 'info',
          component: info
        },
        {
          path: '/apply',
          name: 'apply',
          component: apply
        },
        {
          path: '/course',
          name: 'course',
          component: course
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: login
    },
  ]
})
