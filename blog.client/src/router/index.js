/*
 * @Author: yanJ
 * @Date: 2021-04-15 11:47:01
 * @message: pageName
 * @FilePath: \test-vue\src\router\index.js
 */
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [{
			path: '/',
			component: resolve => require(['../view/main.vue'], resolve),
			children: [{
					path: '/',
					name: 'index',
					component: resolve => require(['../view/index/index.vue'], resolve)
				}, {
					path: '/about',
					component: resolve => require(['../components/about.vue'], resolve)
				}, {
					path: '/article/:id(\\d+)',
					component: resolve => require(['../view/article/details.vue'], resolve)
				}, {
					path: '/write',
					component: resolve => require(['../view/article/postedit.vue'], resolve),
					/*beforeEnter:(to,from,next) => {
						console.log(to)
							console.log("=======上是to下是from==========")
						console.log(from)
						/ next({path:'/index'})/可以执行  里面有trun  false打不开   可执行和不
						/执行路径  还可以匿名函数
					}*/
				}, {
					path: '/tools',
					component: resolve => require(['../view/article/tools.vue'], resolve)
				}, {
					path: '/history',
					component: resolve => require(['../view/article/history.vue'], resolve)
				}, {
					path: '/regular',
					component: resolve => require(['../view/test/regular.vue'], resolve)
				}, {
					path: '/search',
					component: resolve => require(['../view/search/search.vue'], resolve)
				},
				{
					path: '/register',
					component: resolve => require(['../view/login/register.vue'], resolve)
				},
				{
					path: '/login',
					component: resolve => require(['../view/login/login.vue'], resolve)
				},
				{
					path: '/404',
					component: resolve => require(['../error/404.vue'], resolve)
				},
			]
		},
		{
			/*404页面*/
			path: '*',
			redirect: '/404'
		}
	]
})