import request from '@/utils/request'

//列表 article 
export function getArticle(data) {
  return request({
    url: '/article/articleList',
    method: 'post',
    data,
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
export function detail(data) {
  return request({
    url: `/article/article`,
    method: 'post',
    data
  })
}
