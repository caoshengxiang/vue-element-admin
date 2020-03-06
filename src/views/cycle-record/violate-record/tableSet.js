// import moment from 'moment'
import store from '@/store'

const defaultFormThead = [{
  key: 'mobile',
  name: '手机号'
}, {
  key: 'bikeNo',
  name: '单车编号'
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
  key: 't3',
  name: '违章骑行时间'
}, {
  key: 'spot',
  name: '违章地点'
}, {
  key: 'violationType',
  name: '违章类型',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.violationType
    let value = ''
    options.forEach(item => {
      if (item.value === row.violationType) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'deduction',
  name: '扣除信用分'
}]
export default defaultFormThead
