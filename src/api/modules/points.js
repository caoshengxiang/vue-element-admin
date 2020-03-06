import request2 from '@/utils/request2'

export default {
  list(params) {
    return request2.get('supervisor/spot', { params: params })
  },
  add(params) {
    return request2.post('supervisor/spot', params)
  },
  detail(params) {
    return request2.get(`supervisor/spot/${params}`)
  },
  del(params) {
    return request2.delete(`supervisor/spot/${params}`)
  },
  capacityList(params) {
    return request2.get('supervisor/tide-capacity/getBySpotId', { params: params })
  },
  capacityAdd(params) {
    return request2.post('supervisor/tide-capacity/saveOrUpdateBatch', params)
  }
}
