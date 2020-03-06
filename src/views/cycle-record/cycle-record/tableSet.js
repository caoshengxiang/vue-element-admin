// import moment from 'moment'
import store from '@/store'

const defaultFormThead = [{
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
}, {
  key: 'rideMintues',
  name: '骑行分钟数'
}, {
  key: 'valid',
  name: '是否违章',
  formatter: (row, column, cellValue, index) => {
    return row.valid === 1 ? '是' : '否'
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
}, {
  key: 'violationDesc',
  name: '违章描述'
}]
export default defaultFormThead
