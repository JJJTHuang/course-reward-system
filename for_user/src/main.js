import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import './registerServiceWorker'
import 'normalize.css'
import Header from '@/components/header.vue'
import Card from '@/components/card.vue'

Vue.config.productionTip = false
window.Bmob.initialize("566cb6b11b85b94302b521780a47e69e", "8e5832c1f9b2efdd9e684290b7fb2470")
Vue.prototype.Bmob = window.Bmob
Vue.prototype.api = api

Vue.component('v-header', Header)
Vue.component('v-card', Card)
window.vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


window.store = window.vm.$store