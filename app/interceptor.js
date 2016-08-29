import Vue from 'vue';
import store from './vuex/store'
import { showDialog, hideDialog } from './vuex/actions/dialog'

export default function(router) {
    Vue.http.interceptors.push((request, next) => {
        next((response) => {
            if(response.status === 0){
                showDialog(store, {
                    title: '温馨提示',
                    message: '您还未登录，或登陆已超时，请重新登陆！',
                    handle: function () {
                        router.go('login');
                        hideDialog(store);
                    }
                })
            }
        });
    });
}
