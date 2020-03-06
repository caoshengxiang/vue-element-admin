import request2 from '@/utils/request2'

export default {
  list(params) {
    return request2.get('supervisor/ride_record/page', { params: params })
  },
  // add(params) {
  //   return request2.post('supervisor/register', params)
  // },
  // revoke(params) {
  //   return request2.post(`supervisor/register/revoke/${params}`)
  // },
  del(params) {
    return request2.delete('supervisor/ride_record', { params: params })
  },
  // detail(params) {
  //   return request2.get(`supervisor/register/${params}`)
  // },
  reportRecord(params) {
    return request2.post('supervisor/ride_record/reportRecord', params)
  }
}
