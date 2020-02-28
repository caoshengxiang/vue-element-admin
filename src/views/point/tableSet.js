
const defaultFormThead = [{
  key: 'name',
  name: '点位名称'
}, {
  key: 'regionId',
  name: '所属街道'
}, {
  key: 'focused',
  name: '是否重点点位',
  formatter: (row, column, cellValue, index) => {
    if (row.focused === true) {
      return '是'
    } else {
      return '否'
    }
  }
}, {
  key: 'taskNum',
  name: '任务(点击数值查看)',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}, {
  key: 'alertNum',
  name: '预警(点击数值查看)',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}, {
  key: 'maxCapacity',
  name: '最大容量(查看容量)',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}, {
  key: 'parkingNum',
  name: '已停数量',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}]
export default defaultFormThead
