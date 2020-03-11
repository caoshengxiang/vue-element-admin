// import moment from 'moment'
import store from '@/store'

// console.log(store.state.const)

const defaultFormThead = [
  {},
  {
  key: 'bikeNo',
  name: '单车编号'
}, {
  key: 'company',
  name: '公司',
  width: '100',
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
  key: 'electroLicence',
  name: '电子牌照'
}, {
  key: 'bluetooth',
  name: '蓝牙标识',
  width: '90',
  formatter: (row, column, cellValue, index) => {
    if (row.bluetooth === true) {
      return '是'
    } else {
      return '否'
    }
  }
}, {
  key: 'condition',
  name: '车况',
  width: '90',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.electroLicence_condition
    let value = ''
    options.forEach(item => {
      if (item.value === row.condition) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'state',
  name: '状态',
  width: '90',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.electroLicence_state
    let value = ''
    options.forEach(item => {
      if (item.value === row.state) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'model',
  name: '车辆型号'
}, {
  key: 'color',
  name: '颜色',
  width: '90'
}, {
  key: 'registryTime',
  name: '注册时间'
  // formatter: (row, column, cellValue, index) => {
  //   return moment(row.registryTime).format('YYYY-MM-DD')
  // }
}]
export default defaultFormThead
