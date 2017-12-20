// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './style.scss';

Vue.use(ElementUI)
Vue.use(Vuex);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
	var requireAuth = to.meta.requireAuth;
	if(requireAuth) {
		if(sessionStorage.authStatus && sessionStorage.authStatus == 1) {
			next()
		} else {
			next({
				path: '/yunpos/login'
			})
		}
	} else {
		next()
	}
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
