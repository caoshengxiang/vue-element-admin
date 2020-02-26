import moment from 'moment'

const defaultFormThead = [{
  key: 't1',
  name: '单车编号',
  disabled: true,
  sortable: true
}, {
  key: 't2',
  name: '电子牌照'
}, {
  key: 't3',
  name: '蓝牙标识',
  formatter: (row, column, cellValue, index) => {
    if (row.t3 === 1) {
      return '是'
    } else {
      return '否'
    }
  }
}, {
  key: 't4',
  name: '车况'
}, {
  key: 't5',
  name: '车辆型号'
}, {
  key: 't6',
  name: '颜色'
}, {
  key: 't7',
  name: '注册时间',
  formatter: (row, column, cellValue, index) => {
    return moment(row.t7).format('YYYY-MM-DD')
  }
}]
export default defaultFormThead
