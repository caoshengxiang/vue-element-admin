import request2 from '@/utils/request2'

// 任务
export default {
  list(params) {
    return request2.get('supervisor/task', { params: params })
  },
  add(params) {
    return request2.post('supervisor/task/create', params)
  },
  del(params) {
    return request2.delete(`supervisor/task/${params}`)
  },
  detail(params) {
    return request2.get(`supervisor/task/${params}`)
  },
  finish(params) {
    return request2.post('supervisor/task/finish', params)
  },
  transfer(params) {
    return request2.post('supervisor/task/transfer', params)
  }
}
