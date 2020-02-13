import moment from 'moment'

const defaultFormThead = [{
  key: 't1',
  name: '点位名称'
}, {
  key: 't2',
  name: '地理描述'
}, {
  key: 't3',
  name: '时间',
  formatter: (row, column, cellValue, index) => {
    return moment(row.t3).format('YYYY-MM-DD HH:mm:ss')
  }
}, {
  key: 't4',
  name: '类型'
}, {
  key: 't5',
  name: '处理状态',
  formatter: (row, column, cellValue, index) => {
    if (row.t5 === 1) {
      return '待处理'
    } else {
      return '已处理'
    }
  }
}]
export default defaultFormThead
