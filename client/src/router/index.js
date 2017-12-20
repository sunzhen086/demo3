import Vue from 'vue'
import Router from 'vue-router'
import { Loading  } from 'element-ui'

const Hello = resolve => {
	var loading = Loading.service({ fullscreen: true,text:'加载中' })
	require.ensure(['@/components/Hello'], () => {
		resolve(require('@/components/Hello'))
		loading.close();
	})
}

const RealTime = resolve => {
	var loading = Loading.service({ fullscreen: true,text:'加载中' })
	require.ensure(['@/components/yunpos/realtime/realtime'], () => {
		resolve(require('@/components/yunpos/realtime/realtime'))
		loading.close();
	})
}

const BehaviorAnalysis = resolve => {
	var loading = Loading.service({ fullscreen: true,text:'加载中' })
	require.ensure(['@/components/yunpos/behavioranalysis/behavioranalysis'], () => {
		resolve(require('@/components/yunpos/behavioranalysis/behavioranalysis'))
		loading.close();
	})
}

const BrandMarket = resolve => {
	var loading = Loading.service({ fullscreen: true,text:'加载中' })
	
	require.ensure(['@/components/yunpos/brandmarket/brandmarket'], () => {
		resolve(require('@/components/yunpos/brandmarket/brandmarket'))
		loading.close();
	})
}

const Login = resolve => {
	var loading = Loading.service({ fullscreen: true,text:'加载中' })
	require.ensure(['@/components/yunpos/login/login'], () => {
		resolve(require('@/components/yunpos/login/login'))
		loading.close();
	})
}

const Main = resolve => {
	var loading = Loading.service({ fullscreen: true,text:'加载中' })
	require.ensure(['@/components/yunpos/main/main'], () => {
		resolve(require('@/components/yunpos/main/main'))
		loading.close();
	})
}

//import Hello from '@/components/Hello'
//import RealTime from '@/components/yunpos/realtime/realtime'
//import BehaviorAnalysis from '@/components/yunpos/behavioranalysis/behavioranalysis'
//import BrandMarket from '@/components/yunpos/brandmarket/brandmarket'
//import Login from '@/components/yunpos/login/login'
//import Main from '@/components/yunpos/main/main'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'Hello',
			component: Hello,
			redirect: {
				path: 'yunpos/main'
			}
		},
		{
			path: '/yunpos/realtime',
			name: 'RealTime',
			component: RealTime,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/yunpos/behavioranalysis',
			name: 'BehaviorAnalysis',
			component: BehaviorAnalysis,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/yunpos/brandmarket',
			name: 'BrandMarket',
			component: BrandMarket,
			meta: {
				requireAuth: true
			}
		},
		{
			path: '/yunpos/login',
			name: 'Login',
			component: Login,
			meta: {
				requireAuth: false
			}
		},
		{
			path: '/yunpos/main',
			name: 'Main',
			component: Main,
			meta: {
				requireAuth: true
			}
		}
	]
})