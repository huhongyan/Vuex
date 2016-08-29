/**
 * Created by Huhy on 2016/8/29.
 */
import * as type from '../constants/dialog'
/**
 * 显示提示框
 * @param dispatch
 * @param params
 */
export const showDialog = function({ dispatch }, params){
  if(params.title) dispatch(type.SETTITLE, params.title);
  if(params.message) dispatch(type.SETMESSAGE, params.message);
  if(params.handler) dispatch(type.SETHANDLER, params.handler);

  dispatch(type.TRIGGERDIAPLAY, true);
}
/**
 * 隐藏提示框
 * @param dispatch
 */
export const hideDialog = function({ dispatch }){
  dispatch(type.TRIGGERDIAPLAY, false);
}
