import request2 from '@/utils/request2'

const inspectlog = {
  list(params) {
    return request2.get('supervisor/inspectlog/page', { params: params })
  },
  // add(params) {
  //   return request2.post('supervisor', params)
  // },
  // del(params) {
  //   return request2.delete(`supervisor/${params}`)
  // },
  detail(params) {
    return request2.get(`supervisor/inspectlog/detail/${params}`)
  }
}
export default inspectlog
