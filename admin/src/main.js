import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http


//一定要写在new Vue前面

//混入，给upload加入登录校验的方法
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'

    }
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization: `Bearer ${ localStorage.token || '' }`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
