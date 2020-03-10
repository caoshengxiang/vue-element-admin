import request2 from '@/utils/request2'

// 任务
export default {
  list(params) {
    return request2.get('supervisor/alertEvent', { params: params })
  },
  // add(params) {
  //   return request2.post('supervisor/alertEvent/create', params)
  // },
  // del(params) {
  //   return request2.delete(`supervisor/alertEvent/${params}`)
  // },
  detail(params) {
    return request2.get(`supervisor/alertEvent/${params}`)
  }
}
