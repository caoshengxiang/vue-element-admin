import request2 from '@/utils/request2'

// 任务
export default {
  list(params) {
    return request2.get('supervisor/camera/page', { params: params })
  },
  add(params) {
    return request2.post('supervisor/camera', params)
  },
  del(params) {
    return request2.delete(`supervisor/camera`, { params: params })
  },
  detail(params) {
    return request2.get(`supervisor/camera/detail/${params}`)
  }
}
