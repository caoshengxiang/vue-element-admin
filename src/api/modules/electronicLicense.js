import request2 from '@/utils/request2'

const electronicLicense = {
  list(params) {
    return request2.get('supervisor/register', { params: params })
  },
  add(params) {
    return request2.post('supervisor/register', params)
  },
  revoke(params) {
    return request2.post(`supervisor/register/revoke/${params}`)
  },
  del(params) {
    return request2.delete(`supervisor/register/${params}`)
  },
  detail(params) {
    return request2.get(`supervisor/register/${params}`)
  },
  batchRevoke(params) {
    return request2.post('supervisor/register/batchRevoke', params)
  },
  batchRegistry(params) {
    return request2.post('supervisor/register/batchRegistry', params)
  }
}
export default electronicLicense
