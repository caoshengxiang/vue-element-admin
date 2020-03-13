import request2 from '@/utils/request2'

export default {
  bikeCount(params) {
    return request2.get('supervisor/statistic/bikeCount', { params: params })
  },
  // 电子牌照投放趋势
  licenseChange(params) {
    return request2.get('supervisor/statistic/licenseChange', { params: params })
  },
  // 车辆备案总数统计
  bikeRegistrationTotal(params) {
    return request2.get('supervisor/statistic/bikeRegistrationTotal', { params: params })
  },
  // 违章停放统计
  illegChange(params) {
    return request2.get('supervisor/statistic/illegChange', { params: params })
  },
  // 非法投放统计
  illegRegChange(params) {
    return request2.get('supervisor/statistic/illegRegChange', { params: params })
  },
  // 非法投放统计
  taskStatics(params) {
    return request2.get('supervisor/statistic/taskStatics', { params: params })
  },
  // 首页折线统计 第二行
  home_line(params) {
    return request2.get('supervisor/statistic/usedRatesTrends', { params: params })
  },
  home_line31(params) {
    return request2.get('supervisor/statistic/putInCounts', { params: params })
  },
  home_line32(params) {
    return request2.get('supervisor/statistic/illegalAmount', { params: params })
  },
  home_line33(params) {
    return request2.get('supervisor/statistic/taskCompleted', { params: params })
  },
  bikeAndillegalTotal(params) {
    return request2.get('supervisor/statistic/bikeAndillegalTotal', { params: params })
  }
}
