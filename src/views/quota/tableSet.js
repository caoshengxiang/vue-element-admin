// import moment from 'moment'
import store from '@/store'

// console.log(store.state.const)

const defaultFormThead = [{
  key: 'operateTime',
  name: '操作时间',
  minWidth: '120'
  // sortable: 'custom'
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
  key: 'capacity',
  name: '配额',
  minWidth: '90'
}, {
  key: 'restNum',
  name: '已注册',
  minWidth: '90',
  formatter: (row, column, cellValue, index) => {
    return row.capacity - row.restNum
  }
}, {
  key: 'range',
  name: '号段',
  minWidth: '160'
}, {
  key: 'operatorName',
  name: '操作人',
  minWidth: '90'
}]
export default defaultFormThead
