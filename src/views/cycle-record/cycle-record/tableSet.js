// import moment from 'moment'
import store from '@/store'

const defaultFormThead = [{
  key: 'violationDesc',
  name: '违章描述'
}, {
  key: 'name',
  name: '名字'
}, {
  key: 'idCard',
  name: '身份证号'
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
  key: 'eventTime',
  name: '骑行时间'
  // sortable: 'custom'
}, {
  key: 'rideMintues',
  name: '骑行分钟数',
  width: '90'
}, {
  key: 'valid',
  name: '是否违章',
  width: '90',
  formatter: (row, column, cellValue, index) => {
    return row.valid === true ? '是' : '否'
  }
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
}]
export default defaultFormThead
