import Vue from 'vue'
import App from './App.vue'
import router from './router' // 引入路由
import store from './store' // 引入vuex
import '@/assets/iconfont/iconfont.css' // 引入字体图标
import 'amfe-flexible' // 引入移动端适配
import Vant from 'vant' // 引入vant
import 'vant/lib/index.css' // 引入vant样式
import './styles/index.css' // 引入全局css样式
import mavonEditor from 'mavon-editor' // 引入mavon-editor 就是上面所安装的
import 'github-markdown-css/github-markdown.css' // 引入github-markdown-css
Vue.use(mavonEditor) // 让Vue使用mavonEditor
Vue.use(Vant) // 全局使用vant
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
