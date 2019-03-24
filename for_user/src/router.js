import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import payment from './views/payment/index.vue'
import login from './views/login.vue'
import personal from './views/personal/index.vue'
import info from './views/personal/info.vue'
import apply from './views/personal/apply.vue'
import course from './views/course.vue'
import register from './views/register.vue'
import changePass from './views/changePass.vue'
import err from './views/404.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: {name: 'payment'},
      meta: {
        auth: true
      },
      children:[
        {
          path: 'payment',
          name: 'payment',
          component: payment,
          meta: {
            auth: true
          },
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal,
          meta: {
            auth: true
          },
        },
        {
          path: '/info',
          name: 'info',
          component: info,
          meta: {
            auth: true
          },
        },
        {
          path: '/apply',
          name: 'apply',
          component: apply,
          meta: {
            auth: true
          },
        },
        {
          path: '/course',
          name: 'course',
          component: course,
          meta: {
            auth: true
          },
        }
      ]
    },
    {
      path:'/login',
      name: 'login',
      component: login,
    },
    {
      path:'/register',
      name: 'register',
      component: register
    },
    {
      path:'/changePass',
      name: 'changePass',
      component: changePass
    },
    {
      path: '*',
      name: err,
      component : err
    }
  ]
})


router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('sessionToken') || sessionStorage.getItem('sessionToken')
  if (to.meta.auth) {
    if (!token) {
      return next({
        name: 'login'
      })
    }
  }
  next()
})


export default router