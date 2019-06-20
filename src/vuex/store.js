import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    menuId:1,
    userType:0,
    money:0,
    isFirst:1,
    CPUData:[],
    dateRange:1
  }
})

export default store
