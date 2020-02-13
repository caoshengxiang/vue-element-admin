import moment from 'moment'

const defaultFormThead = [{
  key: 't1',
  name: '任务ID',
  width: '100px'
}, {
  key: 't2',
  name: '任务状态',
  width: '100px'
}, {
  key: 't3',
  name: '停车点'
}, {
  key: 't4',
  name: '任务执行人',
  width: '100px'
}, {
  key: 't5',
  name: '执行人所属组织'
}, {
  key: 't6',
  name: '任务调度时间',
  formatter: (row, column, cellValue, index) => {
    return moment(row.t6).format('YYYY-MM-DD HH:mm:ss')
  }
}, {
  key: 't7',
  name: '任务调度类型'
}]
export default defaultFormThead
