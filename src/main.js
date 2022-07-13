import Vue from 'vue'
import App from './App.vue'
import router from './router'// 引入路由
import store from './store'// 引入vuex
import '@/assets/iconfont/iconfont.css'// 引入字体图标
import 'amfe-flexible'// 引入移动端适配
import Vant from 'vant' // 引入vant
import 'vant/lib/index.css' // 引入vant样式
Vue.use(Vant) // 全局使用vant
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
