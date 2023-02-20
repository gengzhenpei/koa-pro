import request from '@/utils/request'

//查
export function getCategory(params) {
  return request({
    url: '/category',
    method: 'get',
    params,
  })
}
