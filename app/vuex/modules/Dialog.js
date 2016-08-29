/**
 * Created by Huhy on 2016/8/29.
 */
import * as type from '../constants/dialog'

const state = {
  title: '',
  message: '',
  handler: function () {},
  isShow: false
}

const mutations = {
  [type.TRIGGERDIAPLAY] (state, isShow) {
    state.isShow = isShow
  },
  [type.SETMESSAGE] (state, message) {
    state.message = message
  },
  [type.SETTITLE] (state, title) {
    state.title = title
  },
  [type.SETHANDLER] (state, handler) {
    state.handler = handler
  }
}

export default {
  state,
  mutations
}
