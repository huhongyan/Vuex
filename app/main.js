import Vue from 'vue'
import Router from 'vue-router';
import routerMap from './router'
import App from './views/App'

Vue.use(Router);
var router = new Router({
  linkActiveClass: 'active'
});

routerMap(router);
router.start(App, 'body');