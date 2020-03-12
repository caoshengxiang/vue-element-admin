// import moment from 'moment'
import store from '@/store'

// console.log(store.state.const)

const defaultFormThead = [{
  key: 'report',
  name: '违章上报数',
  minWidth: '90'
}, {
  key: 'company',
  name: '公司',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.bikeCompany
    let value = ''
    options.forEach(item => {
      if (item.value === row.company) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'year',
  name: '年',
  minWidth: '90'
}, {
  key: 'month',
  name: '月',
  minWidth: '90'
}, {
  key: 'score',
  name: '考核总分',
  minWidth: '90'
}, {
  key: 'broken',
  name: '月故障数',
  minWidth: '90'
}, {
  key: 'invalid',
  name: '非法投放数',
  minWidth: '90'
}, {
  key: 'finish',
  name: '任务完成比',
  minWidth: '90'
}, {
  key: 'task',
  name: '任务数',
  minWidth: '90'
}, {
  key: 'response',
  name: '平均响应时间',
  minWidth: '90'
}, {
  key: 'complain',
  name: '投诉数量',
  minWidth: '90'
}]
export default defaultFormThead
