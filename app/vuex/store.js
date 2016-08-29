import Vue from 'vue'
import Vuex from 'vuex'

import count from './modules/Count'
import other from './modules/Other'
import dialog from './modules/Dialog'

Vue.use(Vuex)

export default new Vuex.Store({
  // 开发模式下，开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  // 组合各个模块
  modules: {
    count,
    other,
    dialog
  }
})
