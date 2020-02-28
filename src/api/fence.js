import request2 from '@/utils/request2'

export default {
  list(params) {
    return request2.get('supervisor/fence', { params: params })
  },
  add(params) {
    return request2.post('supervisor/fence', params)
  },
  detail(params) {
    return request2.get(`supervisor/fence/${params}`)
  },
  del(params) {
    return request2.delete(`supervisor/fence/${params}`)
  }
}
