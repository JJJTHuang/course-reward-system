import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import Element from 'element-ui'
import './registerServiceWorker'
import './plugins/element.js'
import tab_nav from '@/components/tab_nav.vue'
import excelHelper from '@/components/excel_helper.vue'
import year_option from '@/components/year_option.vue'
import department_option from '@/components/department_option.vue'
import whole_year from '@/components/whole_year.vue'
import VueDataTables from 'vue-data-tables'

Vue.use(VueDataTables)

Vue.config.productionTip = false
window.Bmob.initialize("566cb6b11b85b94302b521780a47e69e", "8e5832c1f9b2efdd9e684290b7fb2470","adecc8d6068c59049a579ced508b4faf")
Vue.prototype.Bmob = window.Bmob
Vue.prototype.api = api

Vue.component('tab-nav',tab_nav)
Vue.component('excel-helper',excelHelper)
Vue.component('year-option',year_option)
Vue.component('department-option',department_option)
Vue.component('whole-year',whole_year)

window.vm = new Vue({
  router,
  store,
  Element,
  render: h => h(App)
}).$mount('#app')

window.store = window.vm.$store