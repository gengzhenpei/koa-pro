const nodemailer = require('nodemailer');
const { service_ip } = require('../../config/config');
 
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', //QQ邮箱的服务器
  port: 587, //端口号
  secure: false, //465为true,其他为false
  auth: {
    user: '928022763@qq.com', // 自己的邮箱
    pass: 'ixhtxvevnhtubahg', // 授权码,邮箱的授权码
  },
});
 
/**
 * 注册用户时发送邮箱
 */
exports.sendRegisterEmail = ({ user_id, email, verify_key }) => {
  const url = `http://${service_ip}/api/v1/user/email_activate?id=${user_id}&verify_key=${verify_key}`;
  const params = {
    from: '928022763@qq.com', // 收件人显示的发件人信息,xxxxxxx换成自己的qq
    to: email, // 目标邮箱号
    subject: '全球贸易网注册新用户',
    html: `点击链接即可注册完毕:<a style="color:red" href="${url}">${url}</a>`,
  };
  console.log('params', params)
  return sendMsg(params);
};
 
/**
 * 找回密码时发送校验码
 * @param {*} params
 */
exports.sendCode = ({ email, verify_key }) => {
  const params = {
    from: '奥巴马<xxxxx@qq.com>', // 收件人显示的发件人信息,xxxxxxx换成自己的qq
    to: email, // 目标邮箱号
    subject: '找回密码',
    html: `邮箱验证码:${verify_key}`,
  };
  return sendMsg(params);
};
 
/**
 * 发送消息
 */
const sendMsg = (params) => {
  return new Promise((resolve) => {
    console.log('transporter', transporter)
    transporter.sendMail(params, (err, data) => {
      resolve(null);
      transporter.close(); //发送完毕后关闭
    });
  });
};