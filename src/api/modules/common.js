import request2 from '@/utils/request2'

export default {
  street(params) {
    return request2.get('system/dept/web/listV2', { params: params })
  },
  upload(params) {
    return request2.post('dfs/upload', params)
  }
}
