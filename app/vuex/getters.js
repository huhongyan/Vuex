// 这个 getter 函数会返回 count 的值
// 在 ES6 里你可以写成：
// export const getCount = state => state.count

export function getCount (state) {
  return state.count.count
}
/**
 * 获取dialog的title
 * @param state
 */
export const getDialogTitle = state => state.dialog.title;
/**
 * 获取dialog的message
 * @param state
 */
export const getDialogMsg = state => state.dialog.message;
/**
 * 获取dialog的submit回调函数
 * @param state
 */
export const getDialogHandler = state => state.dialog.handler;
/**
 * 是否显示dialog
 * @param state
 */
export const dialogIsShow = state => state.dialog.isShow;
