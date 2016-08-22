/**
 * Created by Huhy on 2016/8/17.
 */

import { INCREMENT, DECREMENT } from '../constants/count'

// action 会收到 store 作为它的第一个参数
// 既然我们只对事件的分发（dispatch 对象）感兴趣。（state 也可以作为可选项放入）
// 我们可以利用 ES6 的解构（destructuring）功能来简化对参数的导入
export const incrementCounter = function ({ dispatch, state }, value) {
		dispatch(INCREMENT, value || 1)
}
export const decrementCounter = function ({ dispatch, state }, value) {
		dispatch(DECREMENT, value || 1)
}