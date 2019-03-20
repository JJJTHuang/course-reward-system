import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'
import login from './views/login.vue'
import calculation from "./views/calculation.vue"
import teachingTask from './views/teachingTask/teachingTask.vue'
import summarizing from './views/teachingTask/summarizing.vue'
import courseCt from './views/course/course.vue'
import remuneration from './views/remuneration/remuneration.vue'
import workload from './views/remuneration/workload.vue'
import teacherInfo from './views/teacherInfo/teacherInfo.vue'
import dataIO from './views/dataIO.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: {name:'teachingTaskCt'},
      meta: {
        auth: true
      },
      children: [
        {
          path: '/teachingTaskCt',
          name: 'teachingTaskCt',
          component: teachingTask,
          meta: {
            auth: true
          }
        },
        {
          path: '/teachingTaskZs',
          name: 'teachingTaskZs',
          component: () => import('@/views/teachingTask/teachingTaskZs.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/teachingTaskYf',
          name: 'teachingTaskYf',
          component: () => import('@/views/teachingTask/teachingTaskYf.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/teachingTaskCg',
          name: 'teachingTaskCg',
          component: () => import('@/views/teachingTask/teachingTaskCg.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/courseCt',
          name: 'courseCt',
          component: courseCt,
          meta: {
            auth: true
          }
        },
        {
          path: '/courseZs',
          name: 'courseZs',
          component: () => import('@/views/course/courseZs.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/courseYf',
          name: 'courseYf',
          component: () => import('@/views/course/courseYf.vue'),
          meta: {
            auth: true
          }
        },
        {
          path: '/courseCg',
          name: 'courseCg',
          component: () => import('@/views/course/courseCg.vue'),
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
          path: '/remuneration/workload',
          name: 'workload',
          component: workload,
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
          path: '/dataIO',
          name: 'dataIO',
          component: dataIO,
          meta: {
            auth: true
          }
        }
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