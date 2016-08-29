import Vue from 'vue'
import Router from 'vue-router';
import VueResource from 'vue-resource';
import routerMap from './router'
import interceptor from './interceptor'
import App from './views/App'

Vue.use(Router);
Vue.use(VueResource);
var router = new Router({
  linkActiveClass: 'active'
});

routerMap(router);
interceptor(router);
router.start(App, 'body');
