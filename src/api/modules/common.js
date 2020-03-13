import request2 from '@/utils/request2'

export default {
  street(params) { // 组织街道
    return request2.get('system/dept/web/listV2', { params: params })
  },
  street2(params) { // 地区街道
    return request2.get('system/districts/listV2', { params: params })
  },
  orgList(params) {
    return request2.get('system/user/sampleList', { params: params })
  },
  upload(params) {
    return request2.post('dfs/upload', params)
  }
}
