import request2 from '@/utils/request2'

export default {
  bikeCount(params) {
    return request2.get('supervisor/statistic/bikeCount', { params: params })
  }
}
