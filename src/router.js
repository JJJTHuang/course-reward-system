import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import login from './views/login.vue'
import about from './views/About.vue'
import teachingTask from './views/teachingTask/teachingTask.vue'
import course from './views/course/course.vue'
import remuneration from './views/remuneration/remuneration.vue'
import teacherInfo from './views/teacherInfo/teacherInfo.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: '/teachingTask',
      children:[
        {
          path: '/teachingTask',
          name: 'teachingTask',
          component: teachingTask,
          meta: {
            auth: true
          }
        },
        {
          path: '/course',
          name: 'course',
          component: course,
          meta: {
            auth: true
          }
        },
        {
          path: '/remuneration',
          name: 'remuneration',
          component: remuneration,
          meta: {
            auth: true
          }
        },
        {
          path: '/teacherInfo',
          name: 'teacherInfo',
          component: teacherInfo,
          meta: {
            auth: true
          }
        },
        {
          path: '/about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: about,
          meta: {
            auth: true
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
  // return next({name:'login'})
})

export default router