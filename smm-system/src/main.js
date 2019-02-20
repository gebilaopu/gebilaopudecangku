import Vue from 'vue'
// 引入axios
import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
// 引入通用样式
import '@/styles/common.less'
// 引入左侧导航
// 把axios挂在vue原型上 所有vue的实例对象共享
Vue.prototype.axios=axios;
// 阻止生产提示
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
