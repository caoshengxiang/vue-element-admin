import request2 from '@/utils/request2'

export default {
  list(params) {
    return request2.get('supervisor/evaluation', { params: params })
  }
  // add(params) {
  //   return request2.post('supervisor', params)
  // },
  // del(params) {
  //   return request2.delete(`supervisor/inspectlog`, { params: params })
  // },
  // detail(params) {
  //   return request2.get(`supervisor/inspectlog/detail/${params}`)
  // }
}
