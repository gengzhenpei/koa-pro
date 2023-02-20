import request from '@/utils/request'

//注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data,
  })
}

//登录 login

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data,
  })
}