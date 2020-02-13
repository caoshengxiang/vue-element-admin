
const defaultFormThead = [{
  key: 't1',
  name: '名称'
}, {
  key: 't2',
  name: '所属街道'
}, {
  key: 't3',
  name: '是否重点点位',
  width: '100px',
  formatter: (row, column, cellValue, index) => {
    if (row.t3 === 1) {
      return '是'
    } else {
      return '否'
    }
  }
}, {
  key: 't4',
  name: '任务',
  width: '80px',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}, {
  key: 't5',
  name: '预警',
  width: '80px',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}, {
  key: 't6',
  name: '容量',
  width: '80px',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}, {
  key: 't7',
  name: '已停数量',
  width: '80px',
  className: 'com-el-talble-col-name',
  labelClassName: 'com-el-talble-col-title-name'
}]
export default defaultFormThead
