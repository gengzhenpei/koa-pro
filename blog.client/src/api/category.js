import request from '@/utils/request'

//查
export function getCategory(data) {
  return request({
    url: '/category/all',
    method: 'post',
    data,
  })
}
