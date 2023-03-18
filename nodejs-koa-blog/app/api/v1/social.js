/**
 * @description 用户的路由 API 接口
 * @author 梁凤波, Peter Liang
 */

const Router = require('koa-router')
const { createCaptcha } = require('@core/util.js')
const { setString, getString } = require('@core/redis.js')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

const {
    RegisterValidator,
    PositiveIdParamsValidator,
    UserLoginValidator
} = require('@validators/user')

const { UserDao } = require('@dao/user');
const { SocialDao } = require('@dao/social');

const { Auth } = require('@middlewares/auth');
const { LoginManager } = require('@service/login');
const { Resolve } = require('@lib/helper');
const res = new Resolve();

const AUTH_USER = 8;
const AUTH_ADMIN = 16;

const router = new Router({
    prefix: '/api/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new RegisterValidator().validate(ctx);
    const email = v.get('body.email');
    const password = v.get('body.password');
    const username = v.get('body.username');

    // 创建用户
    const [err, data] = await UserDao.create({
        password,
        email,
        username
    });

    if (!err) {
        const [errToken, token, id] = await LoginManager.userLogin({
            email,
            password
        });
        if (!errToken) {
            data.token = token
            data.id = id
        }
        // 返回结果
        ctx.response.status = 200;
        ctx.body = res.json(data);

    } else {
        ctx.body = res.fail(err)
    }

})

// 登录
router.post('/login', async (ctx) => {
    try {
        let captcha = ctx.request.body.captcha;
        let captcha_key = ctx.request.body.captcha_key;
        let captcha_key_val = await getString(captcha_key)
        //过期
        if(!captcha_key_val) {
            ctx.body = res.fail({ errCode: 10004, msg: '验证码过期'}, '验证码过期');
            return false;
        // 不区分大小写
        } else if(captcha.toLowerCase()!==captcha_key_val.toLowerCase()) {
            ctx.body = res.fail({errCode: 10004, msg: '验证码错误'}, '验证码错误');
            return false;
        }
        
        const v = await new UserLoginValidator().validate(ctx);
        let [err, token, id] = await LoginManager.userLogin({
            email: v.get('body.email'),
            password: v.get('body.password')
        });

        if (!err) {
            let [err, data] = await UserDao.detail(id);
            if (!err) {
                data.setDataValue('token', token)
                ctx.response.status = 200;
                ctx.body = res.json(data);
            }
        } else {
            ctx.body = res.fail(err, err.msg);
        }
    } catch (error) {
        ctx.body = res.fail(error, error.msg);
    }

});

// google登录
router.post('/socilaLogin', async (ctx) => {
    try {
        // let captcha = ctx.request.body.captcha;
        // let captcha_key = ctx.request.body.captcha_key;
        // let captcha_key_val = await getString(captcha_key)
        // //过期
        // if(!captcha_key_val) {
        //     ctx.body = res.fail({ errCode: 10004, msg: '验证码过期'}, '验证码过期');
        //     return false;
        // // 不区分大小写
        // } else if(captcha.toLowerCase()!==captcha_key_val.toLowerCase()) {
        //     ctx.body = res.fail({errCode: 10004, msg: '验证码错误'}, '验证码错误');
        //     return false;
        // }
        let body = ctx.request.body
        let [] = await SocialDao.socialLogin(body);

        const v = await new UserLoginValidator().validate(ctx);
        let [err, token, id] = await LoginManager.userLogin({
            email: v.get('body.email'),
            password: v.get('body.password')
        });

        if (!err) {
            let [err, data] = await UserDao.detail(id);
            if (!err) {
                data.setDataValue('token', token)
                ctx.response.status = 200;
                ctx.body = res.json(data);
            }
        } else {
            ctx.body = res.fail(err, err.msg);
        }
    } catch (error) {
        ctx.body = res.fail(error, error.msg);
    }

});

// 获取用户信息
router.get('/auth', new Auth(AUTH_USER).m, async (ctx) => {
    // 获取用户ID
    const id = ctx.auth.uid;

    // 查询用户信息
    let [err, data] = await UserDao.detail(id, 1);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.response.status = 401;
        ctx.body = res.fail(err, err.msg)
    }
})

// 获取用户列表
// 需要管理员及以上才能操作
router.get('/list', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 查询用户信息
    let [err, data] = await UserDao.list(ctx.query);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})


// 获取用户信息
// 需要管理员及以上才能操作
router.get('/detail/:id', new Auth(AUTH_USER).m, async (ctx) => {
    // 获取用户ID
    const v = await new PositiveIdParamsValidator().validate(ctx);
    const id = v.get('path.id');
    // 查询用户信息
    let [err, data] = await UserDao.detail(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.json(data)
    } else {
        ctx.body = res.fail(err)
    }
})


// 获取用户列表
// 需要管理员及以上才能操作
router.delete('/delete/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取用户ID参数
    const id = v.get('path.id');
    // 删除用户
    const [err, data] = await UserDao.destroy(id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('删除用户成功');
    } else {
        ctx.body = res.fail(err);
    }
})

// 获取更新用户信息
// 需要管理员及以上才能操作
router.put('/update/:id', new Auth(AUTH_ADMIN).m, async (ctx) => {
    // 通过验证器校验参数是否通过
    const v = await new PositiveIdParamsValidator().validate(ctx);

    // 获取用户ID参数
    const id = v.get('path.id');
    // 删除用户
    const [err, data] = await UserDao.update(id, v);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = res.success('更新用户成功');
    } else {
        ctx.body = res.fail(err);
    }
})

// 获取图形验证码
router.get('/captcha', async (ctx) => {
    // 获取用户传递过来的唯一key
    const captchaKey = uuidv4();
    console.log('captchaKey', captchaKey)
    //  const { sid: captchaKey } = ctx.request.body;
    // 生成验证码
    const code = createCaptcha();
    // 存储在redis中 设置过期事件 过期取出来的值为null
    if (code.text) {
        await setString(captchaKey, code.text, 60 * 3);
        const a2 = await getString(captchaKey);
        console.log('a2:', a2, "captchaKey:", captchaKey)
        ctx.response.status = 200;
        ctx.body = res.json({ captcha: code.data, captchaKey: captchaKey })
    } else {
        ctx.body = res.fail('生成图形码失败')
    }

})

/**
 * 邮箱激活
 * 带邮箱校验码 校验
 */
router.get('/email_activate', async (ctx) => {
    console.log('ctx.request.query', ctx.request.query)
    const user_id = ctx.request.query.id
    const verify_key = ctx.request.query.verify_key
    console.log('verify_key', verify_key)
    try {
        const user = await UserDao.detail_by_verify_key(user_id, verify_key)
        console.log('user', user)
        if(user.id) {
            const update_user = await UserDao.update_status(user.id);
            if(update_user) {
                ctx.response.redirect('http://127.0.0.1:8080/email_activate_suc');//发出一个跳转，将用户导向另一个路由。
            } else {
                ctx.response.redirect('http://127.0.0.1:8080/email_activate_err');
            }
        } else {
            ctx.response.redirect('/email_activate_err');
        }
    } catch (error) {
        this.redirect('/email_activate_err')
    }
    
})

module.exports = router
