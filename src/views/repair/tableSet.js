import store from '@/store'

const defaultFormThead = [{
  key: 'content',
  name: '描述'
}, {
  key: 'bikeNo',
  name: '单车编号'
}, {
  key: 'electroLicence',
  name: '电子牌照'
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
  name: '上报时间'
  // sortable: 'custom'
  // formatter: (row, column, cellValue, index) => {
  //   return moment(row.t3).format('YYYY-MM-DD HH:mm:ss')
  // }
}, {
  key: 'spot',
  name: '点位名称'
}, {
  key: 'eventAddr',
  name: '地址'
}, {
  key: 'category',
  name: '维修分类',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.repairType
    let value = ''
    options.forEach(item => {
      if (item.value === row.category) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'state',
  name: '维修分类',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.repairState
    let value = ''
    options.forEach(item => {
      if (item.value === row.state) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'reporterName',
  name: '上报人'
}, {
  key: 'deptName',
  name: '部门'
}]
export default defaultFormThead
