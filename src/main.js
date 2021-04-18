import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import qs from 'querystring'

axios.defaults.baseURL = 'http://49.232.218.195:8080/bonusPoints/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use((config) => {
  const isFormData = config.data instanceof FormData
  if (isFormData) {
    config.headers['content-type'] = 'multipart/form-data'
  } else if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  }
  config.headers.Token = window.sessionStorage.getItem('token')
  return config
})

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
