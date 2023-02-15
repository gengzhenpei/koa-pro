const jwt = require("jsonwebtoken")
const consts = require('./consts.js');
var config = require('../config/default.js')
var exception = require('./exception.js')
var utils = require('./utils.js')
/* 校验器 token
路由权限
 */

const auth = () => {
	return async function (ctx, next) {
		var access_token = ctx.header.access_token
		console.log('access_token', access_token)
		var app_name = ctx.header.app_name
		// console.log(consts.ROUTER)
		let errMeg = 'access_token不合法'
		try {
			let url = ctx.url.split('?')[0]
			let whiteUrl = ['/article/v1/user_add', '/article/v1/user_add', '/article/v1/login',]
			if (access_token) {
				// access_token = utils.base64decode(access_token)
				var user = jwt.verify(access_token, config.secretKey)
				// if (app_name == 'DOS' && access_token) {
				//白名单接口不需要验证
				if (whiteUrl.indexOf(url) < 0) {
					if (!user) {
						// throw new exception.erroeException(consts.ERROR_CODE.NO_ACCESS_TOKEN)
						ctx.body = {
							error_code: consts.ERROR_CODE.UNAUTHORIZED_ACCESS,
							error_message: 'token验证失败！',
						}
						return false;
					}
				}
				next();
			} else {
				ctx.body = {
					error_code: consts.ERROR_CODE.UNAUTHORIZED_ACCESS,
					error_message: 'token不存在！',
				}
				return false;
			}
		} catch (err) {
			if (err.name == 'TokenExpiredError') {
				throw new exception.erroeException(consts.ERROR_CODE.ACCOUNT_CODE_EXPIRED)
			} else {
				//  token 不存在   JsonWebTokenError
				throw new exception.erroeException(consts.ERROR_CODE.NO_ACCESS_TOKEN)
			}
		}
		/* 解析出后的 用户信息 存入 ctx.auth 共全局使用*/
		ctx.auth = {
			...user
		}

		await next()
	}
}


module.exports = auth
