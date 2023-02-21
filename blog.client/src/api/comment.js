import request from '@/utils/request'

// 获取关联目标下的评论列表
export function getCommentTargetList(params) {
  return request({
    url: '/comment/target/list',
    method: 'get',
    params,
  })
}

//添加评论
export function postComment(data) {
  return request({
    url: '/comment',
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
