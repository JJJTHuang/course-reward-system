import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import login from './views/login.vue'
import about from './views/About.vue'
import calculation from "./views/calculation.vue"
import teachingTask from './views/teachingTask/teachingTask.vue'
import summarizing from './views/teachingTask/summarizing.vue'
import course from './views/course/course.vue'
import remuneration from './views/remuneration/remuneration.vue'
import teacherInfo from './views/teacherInfo/teacherInfo.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'index',
      component: index,
      redirect: '/teachingTask',
      meta: {
        auth: true
      },
      children: [{
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
          path: '/summarizing',
          name: 'summarizing',
          component: summarizing,
          meta: {
            auth: true
          }
        },
        {
          path: '/calculation',
          name: 'calculation',
          component: calculation,
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
    },
    {
      path: '*',
      redirect: '/404'
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