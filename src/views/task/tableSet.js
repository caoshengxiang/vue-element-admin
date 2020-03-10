import store from '@/store'

const defaultFormThead = [{
  key: 'parkingSpotName',
  name: '点位名称'
}, {
  key: 'creatorName',
  name: '创建人名称'
}, {
  key: 'executorName',
  name: '执行人名称'
}, {
  key: 'deptName',
  name: '执行人组织'
}, {
  key: 'taskCate',
  name: '任务类型',
  formatter: (row, column, cellValue, index) => {
    if (row.taskCate === 1) {
      return '自动任务'
    } else if (row.taskCate === 2) {
      return '手动任务'
    } else {
      return ''
    }
  }
}, {
  key: 'taskTime',
  name: '任务调度时间'
}, {
  key: 'fishTime',
  name: '任务完成时间'
}, {
  key: 'taskType',
  name: '调度类型',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.taskType
    let value = ''
    options.forEach(item => {
      if (item.value === row.taskType) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'state',
  name: '调度状态',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.taskState
    let value = ''
    options.forEach(item => {
      if (item.value === row.state) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'taskTrace',
  name: '任务转移记录'
}, {
  key: 'taskDesc',
  name: '任务描述'
}]
export default defaultFormThead
