/**
 * Created by Huhy on 2016/8/17.
 */
import { INCREMENT, DECREMENT } from '../comstants/count'

// 该模块的初始状态
// 创建一个对象来保存应用启动时的初始状态
const state = {
		// 应用启动时，count 置为0
		count: 0
}

// 相关的 mutations
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
		// mutation 的第一个参数是当前的 state
		// 你可以在函数里修改 state
		[INCREMENT] (state, amount) {
				state.count = state.count + amount
		},
		[DECREMENT] (state, amount) {
				state.count = state.count - amount
		}
}

export default {
		state,
		mutations
}