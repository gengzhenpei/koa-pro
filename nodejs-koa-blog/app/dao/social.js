/**
 * @description 用户的数据访问对象
 * @description Data Access Objects for Useristrators
 * @author 梁凤波, Peter Liang
 */
const { Op } = require('sequelize')
const { User } = require('@models/user')
const { Social } = require('@models/social')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const { sendRegisterEmail } = require('@app/service/email.js')

class SocialDao {
  //google登录 注册
  static async socialLogin(params) {
    let { id, email, name, given_name, family_name, locale } = params
    const hasId = await Social.findOne({
      where: {
        social_id: id,
        deleted_at: null
      }
    });
    if (hasId) {
      // throw new global.errs.Existing('用户google账号没注册');
      // 用户已经google注册过，直接返回用户信息，生成token
    } else {
      //user表创建用户
      const user = new User();
      user.verify_key = verify_key
      user.status = 0 //默认禁用 激活邮箱后才能用
      user.password = password
      user.username = username
      user.email = email
      try {
        const user_res = await user.save();
      } catch (err) {
      }
      //新增用户
      console.log('email', email)
      const social = new Social();
      social.social_id = id
      social.user_id = user_res.id
      social.platform = 'google'
      social.name = name
      social.email = email
      social.given_name = given_name
      social.family_name = family_name
      social.locale = locale
      social.picture = picture
      
      try {
        const res = await social.save();
        const data = {
          code: 200,
          email: res.email,
          username: res.name
        }
        return [null, data]
      } catch (err) {
        return [err, null]
      }
    }
  }
  // 创建用户
  static async create(params) {
    let { id, email, password, username } = params
    console.log('email1', email)
    const hasId = await Social.findOne({
      where: {
        social_id: id,
        deleted_at: null
      }
    });

    if (hasId) {
      // throw new global.errs.Existing('用户google账号没注册');

    }
    const hasUsername = await Social.findOne({
      where: {
        username,
        deleted_at: null
      }
    });

    if (hasUsername) {
      throw new global.errs.Existing('用户名已存在');
    }

    //生成邮箱校验码
    const verify_key = uuidv4();
    if (hasEmail && hasEmail.status == 0) {
      //已经存在用户数据了,但是该用户没有验证,所以重新发送一封邮件让用户验证
      hasEmail.verify_key = verify_key;
      await hasEmail.save();
      await updateUserInfo({
        user_id: data.user_id,
        verify_key,
      });

      await sendRegisterEmail({ user_id: hasEmail.id, email: hasEmail.email, verify_key }); //发送校验邮箱
    }
    //新增用户
    console.log('email', email)
    const user = new User();
    user.verify_key = verify_key
    user.status = 0 //默认禁用 激活邮箱后才能用
    user.password = password
    user.username = username
    user.email = email
    try {
      const res = await user.save();
      await sendRegisterEmail({ user_id: res.id, email: res.email, verify_key }); //发送校验邮箱
      const data = {
        code: 200,
        email: res.email,
        username: res.username
      }
      return [null, data]
    } catch (err) {
      return [err, null]
    }


    // result = await addUser({
    //   user_name,
    //   password: md5(password),
    //   email,
    //   verify_key,//随机生成字符串
    // });
    // const { user_id, email, verify_key } = result;
    // sendRegisterEmail({ user_id, email, verify_key }); //发送校验邮箱

    // const user = new User();
    // user.username = username
    // user.email = email
    // user.password = password
    // user.status = 0 //默认禁用 激活邮箱后才能用

    // try {
    //   const res = await user.save();
    //   const data = {
    //     code: 200,
    //     email: res.email,
    //     username: res.username
    //   }
    //   return [null, data]
    // } catch (err) {
    //   return [err, null]
    // }
  }

  // 验证密码
  static async verify(email, plainPassword) {

    try {
      // 查询用户是否存在
      const user = await User.findOne({
        where: {
          email,
          status: 1
        }
      })

      if (!user) {
        throw new global.errs.AuthFailed('账号不存在')
      }

      // 验证密码是否正确
      const correct = bcrypt.compareSync(plainPassword, user.password);
      if (!correct) {
        throw new global.errs.AuthFailed('账号不存在或者密码不正确')
      }

      return [null, user]
    } catch (err) {
      return [err, null]
    }
  }

  // 查询用户信息
  static async detail(id, status) {
    try {
      const scope = 'bh';
      const filter = {
        id
      }
      if (status) {
        filter.status = status
      }
      // 查询用户是否存在
      const user = await User.scope(scope).findOne({
        where: filter
      })

      if (!user) {
        throw new global.errs.AuthFailed('账号不存在或者已被禁用，请联系管理员！')
      }

      return [null, user]
    } catch (err) {
      return [err, null]
    }
  }

   // 查询用户信息 根据id status verify_key 
   static async detail_by_verify_key(id, verify_key) {
    try {
      const scope = 'bh';
      const filter = {
        id,
        status: 0,
        verify_key
      }

      // 查询用户是否存在
      const user = await User.scope(scope).findOne({
        where: filter
      })

      if (!user) {
        throw new global.errs.AuthFailed('账号不存在或者已被禁用，请联系管理员！')
      }

      return user
    } catch (err) {
      return err
    }
  }

  // 删除用户
  static async destroy(id) {
    // 检测是否存在用户
    const user = await User.findByPk(id);
    // 不存在抛出错误
    if (!user) {
      throw new global.errs.NotFound('没有找到相关用户');

    }

    try {
      // 软删除用户
      const res = await user.destroy()
      return [null, res]

    } catch (err) {
      return [err, null]
    }
  }

  // 更新用户
  static async update(id, v) {
    // 查询用户
    const user = await User.findByPk(id);
    if (!user) {
      throw new global.errs.NotFound('没有找到相关用户');
    }

    // 更新用户
    user.email = v.get('body.email')
    user.username = v.get('body.username')
    user.status = v.get('body.status')

    try {
      const res = await user.save();
      return [null, res]
    } catch (err) {
      return [err, null]
    }
  }

    // 邮箱激活 更新用户status为1
    static async update_status(id) {
      // 查询用户
      const user = await User.findByPk(id);
      if (!user) {
        throw new global.errs.NotFound('没有找到相关用户');
      }
  
      // 更新用户

      user.status = 1
  
      try {
        const res = await user.save();
        return [null, res]
      } catch (err) {
        return [err, null]
      }
    }

  static async list(query = {}) {
    const { id, email, status, username, page = 1, page_size = 10 } = query
    const scop = 'bh'
    const filter = {}
    if (email) {
      filter.email = email
    }
    if (id) {
      filter.id = id
    }
    // 状态筛选，0-隐藏，1-正常
    if (status || status === 0) {
      filter.status = status
    }

    if (username) {
      if (username) {
        filter.username = {
          [Op.like]: `%${username}%`
        };
      }
    }
    try {
      const user = await User.scope(scop).findAndCountAll({
        where: filter,
        limit: 10,
        offset: (page - 1) * page_size,
        order: [
          ['created_at', 'DESC']
        ]
      })

      const data = {
        data: user.rows,
        // 分页
        meta: {
          current_page: parseInt(page),
          per_page: 10,
          count: user.count,
          total: user.count,
          total_pages: Math.ceil(user.count / 10),
        }
      }

      return [null, data]

    } catch (err) {
      return [err, null]
    }
  }

}

module.exports = {
  SocialDao
}