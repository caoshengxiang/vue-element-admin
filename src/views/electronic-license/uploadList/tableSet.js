// import moment from 'moment'
// import store from '@/store'

import store from '@/store'

const defaultFormThead = [
  {
    key: 'operatorName',
    name: '操作人'
  }, {
    key: 'id',
    name: 'ID'
  }, {
    key: 'cate',
    name: '类型',
    formatter: (row, column, cellValue, index) => {
      const options = store.state.const.uploadType
      let value = ''
      options.forEach(item => {
        if (item.value === row.cate) {
          value = item.label
        }
      })
      return value
    }
  }, {
    key: 'taskTime',
    name: '上传时间'
    // sortable: 'custom'
    // formatter: (row, column, cellValue, index) => {
    //   return moment(row.registryTime).format('YYYY-MM-DD')
    // }
  }, {
    key: 'total',
    name: '总数'
  }, {
    key: 'success',
    name: '成功数量'
  }, {
    key: 'fail',
    name: '失败数量'
  }]
export default defaultFormThead
