import request from '@/utils/request'

//列表 article get
export function getArticle(params) {
  return request({
    url: '/article',
    method: 'get',
    params,
  })
}

//添加 article post
export function postArticle(data) {
  return request({
    url: '/article',
    method: 'post',
    data,
  })
}
