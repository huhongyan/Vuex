import Vue from 'vue'
import Vuex from 'vuex'
// 导入各个模块的初始状态和 mutations
import  count from './modules/Count'
import  other from './modules/Other'

// 告诉 vue “使用” vuex
Vue.use(Vuex)

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
		// 开发模式下，开启严格模式
		strict: process.env.NODE_ENV !== 'production',
		// 组合各个模块
		modules: {
				// count 模块的初始状态会作为 store.state.count 被设置到底层 state 树上
				// 所有在子模块上定义的 mutations 都只能改变当前相关联子模块上的 state 子树
				// 所以在 count 模块上定义的 mutations 接收到的第一个参数将会是 store.state.count
				count,
				other
		}
})