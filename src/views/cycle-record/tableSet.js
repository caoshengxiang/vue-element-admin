import moment from 'moment'

const defaultFormThead = [{
  key: 't1',
  name: '名字'
}, {
  key: 't2',
  name: '身份证号'
}, {
  key: 't3',
  name: '违章骑行时间',
  formatter: (row, column, cellValue, index) => {
    return moment(row.t7).format('YYYY-MM-DD')
  }
}, {
  key: 't4',
  name: '是否违章'
}, {
  key: 't5',
  name: '违章类型'
}]
export default defaultFormThead
