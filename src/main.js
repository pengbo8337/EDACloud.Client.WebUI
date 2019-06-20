// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import store from './vuex/store'
import echarts from "echarts"
import fetch from './config/api'


Vue.use(ElementUI)

Vue.prototype.$echarts = echarts 
Vue.config.productionTip = false
Vue.prototype.$ajaxs = fetch

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  methods:{
    setHeaderStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:#f2f2f2;color:#004881;font-weight: bold;";
      } else {
        return "";
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex%2) {
        return 'normal-row';
      }
      return '';
    }
  }
})
