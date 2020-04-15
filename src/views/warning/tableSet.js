import store from '@/store'

const defaultFormThead = [{
  key: 'stopTime',
  name: '消除时间'
  // sortable: 'custom'
},
  {
    key: 'fenceName',
    name: '围栏名称'
    // styleObject: { color: 'red' }
  },
//   {
//   key: 'eventDesc',
//   name: '事件描述'
// },
  {
    key: 'company',
    name: '单车公司',
    width: '95',
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
    key: 'alertTimes',
    name: '预警次数',
    width: '80'
  }, {
    key: 'earlyTime',
    name: '最早预警时间',
    sortable: 'custom'
  }, {
    key: 'eventTime',
    name: '最新事件时间',
    sortable: 'custom'
  }, {
    key: 'state',
    name: '预警状态',
    formatter: (row, column, cellValue, index) => {
      const options = store.state.const.warnState
      let value = ''
      options.forEach(item => {
        if (item.value === row.state) {
          value = item.label
        }
      })
      return value
    }
  }, {
    key: 'eventType',
    name: '事件类型',
    formatter: (row, column, cellValue, index) => {
      const options = store.state.const.warnType
      let value = ''
      options.forEach(item => {
        if (item.value === row.eventType) {
          value = item.label
        }
      })
      return value
    }
  }]
export default defaultFormThead
