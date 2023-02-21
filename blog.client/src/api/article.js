import request from '@/utils/request'

//列表 article 
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

//详情 article/:id get
export function detail(id) {
  return request({
    url: `/article/${id}`,
    method: 'get',
  })
}
