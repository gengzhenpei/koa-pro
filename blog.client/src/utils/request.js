import axios from 'axios'
import qs from 'qs'
import { Base64 } from 'js-base64'
//import {
//baseURL,
//} from '@/config'
//import { Message, MessageBox, Notification } from 'element-ui'
//import store from '../store'
//import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
	baseURL: 'http://localhost:5000/api/v1', // api的base_url
	timeout: 15000, // 请求超时时间
	headers: {
		'Content-Type': 'application/json'
	},
})

// request拦截器
//service.interceptors.request.use(config => {
//	if(localStorage.getItem('token')) {
//		config.headers['token'] = localStorage.getItem('token') // 让每个请求携带自定义token 请根据实际情况自行修改 
//	}
//	return config
//}, error => {
//	// Do something with request error
//	console.log(error) // for debug
//	Promise.reject(error)
//})
/**
 * @description axios请求拦截器
 */
service.interceptors.request.use(
	(config) => {
		console.log('config', config)
		// 不规范写法 可根据setting.config.js tokenName配置随意自定义headers
		// if (token) config.headers[tokenName] = token
		const token = localStorage.getItem('token');
		const base64 = Base64.encode(`${token}:`)
		// 规范写法 不可随意自定义
		if(token) config.headers['Authorization'] = `Basic ${base64}` 

		if(
			config.data &&
			config.headers['Content-Type'] ===
			'application/x-www-form-urlencoded;charset=UTF-8'
		) {
			config.data = qs.stringify(config.data);
		}
		if(config.method == 'get') {
			config.params = qs.stringify(config.params);
			console.log('config.params', config.params)
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)
// respone拦截器
service.interceptors.response.use(
	response => {
		/**
		 * code为非20000是抛错 可结合自己业务进行修改
		 */
		const res = response.data
		if(res.code !== 200) {
			//			Message({
			//				message: res.message,
			//				type: 'error',
			//				duration: 5 * 1000
			//			})
			//			Notification({
			//				message: res.message,
			//				type: 'error',
			//				duration: 1500
			//			});
			// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
			if(res.error_code === 61025 || res.code === 50012 || res.code === 50014) {
				console.log('你已被登出，可以取消继续留在该页面，或者重新登录')
				window.location.href = '/login'
			}
			return response.data
		} else {
			return response.data
		}
	},
	error => {
		console.log('err' + error) // for debug
		return Promise.reject(error)
	}
)

export default service