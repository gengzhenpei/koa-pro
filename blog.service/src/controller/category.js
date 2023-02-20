const Category = require('../models').Category
const consts = require('../utils/consts.js');
const exception = require('../utils/exception.js')
const extend = require('../utils/extend.js');
const logs = require('../config/logConf.js')
const LogFile = logs.logFile(__dirname);

/**
 *查询文章
 */
 const categoryList = async ctx => {
	
	await Category.findAll()
		.then(su => {
			let res = {
				...extend.success(su),
			}
			ctx.body = res
		})
		.catch(ex => {
			LogFile.error(ex)
			// throw new exception.erroeException(consts.ERROR_CODE.INTERNAL_SERVER_ERROR, sequelizeUtils.validation(ex))
			ctx.body = extend.resultData(consts.ERROR_CODE.INTERNAL_SERVER_ERROR)
		})
}


module.exports = {
    ['POST category_list']: categoryList
}