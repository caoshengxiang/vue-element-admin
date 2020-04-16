/*
* axios.request(config)
* axios.get(url[, config])
* axios.delete(url[, config])
* axios.head(url[, config])
* axios.post(url[, data[, config]])
* axios.put(url[, data[, config]])
* axios.patch(url[, data[, config]])
*
* */

// import utils from '../utils/utils'
import request2 from '@/utils/request2'

export default {
  account: {
    login(params) {
      return request2.post('auth/loginV2', params)
    },
    list(params) {
      return request2.post('area/list', params)
    }
  },
  v1: {
    left1(params) {
      return request2.get('supervisor/statistic/illegalAmount', { params: params })
    },
    left2(params) {
      return request2.get('supervisor/statistic/avgHandleTaskTime', { params: params })
    },
    right1(params) {
      return request2.get('supervisor/statistic/putInCounts', { params: params })
    },
    right2(params) {
      return request2.get('supervisor/statistic/unlicensedPutsCount', { params: params })
    },
    bottom1(params) {
      return request2.get('supervisor/statistic/taskCompleted', { params: params })
    },
    bottom2(params) {
      return request2.get('supervisor/statistic/usedRatesTrends', { params: params })
    },
    bottom3(params) {
      return request2.get('supervisor/statistic/parkingUsedRate', { params: params })
    },
    bottom4(params) {
      return request2.get('supervisor/statistic/latestTask', { params: params })
    },
    center(params) {
      return request2.get('supervisor/statistic/bikeAndillegalTotal', { params: params })
    }
  }
}
