import moment from 'moment'

const defaultFormThead = [{
  key: 't1',
  name: '预警事件ID'
}, {
  key: 't2',
  name: '停车点'
}, {
  key: 't3',
  name: '事件描述'
}, {
  key: 't4',
  name: '单车公司'
}, {
  key: 't5',
  name: '预警次数'
}, {
  key: 't6',
  name: '最新事件时间',
  formatter: (row, column, cellValue, index) => {
    return moment(row.t6).format('YYYY-MM-DD')
  }
}, {
  key: 't7',
  name: '事件类型'
}]
export default defaultFormThead
