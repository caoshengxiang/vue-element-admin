const defaultFormThead = [
  {
    key: 'alertNum',
    name: '预警数',
    width: '80',
    className: 'com-el-talble-col-name',
    labelClassName: 'com-el-talble-col-title-name'
  }, {
    key: 'name',
    name: '围栏名称'
  }, {
    key: 'spot',
    name: '所属点位'
  }, {
    key: 'street',
    name: '所属街道'
  }, {
    key: 'hasCamera',
    name: '摄像头',
    width: '90',
    formatter: (row, column, cellValue, index) => {
      return row.hasCamera ? '有摄像头' : '无摄像头'
    }
  }, {
    key: 'validStart_validEnd',
    name: '有效期',
    width: '270px',
    formatter: (row, column, cellValue, index) => {
      return row.validStart + ' - ' + row.validEnd
    }
  }, {
    key: 'taskNum',
    name: '任务数',
    width: '80',
    className: 'com-el-talble-col-name',
    labelClassName: 'com-el-talble-col-title-name'
  }]
export default defaultFormThead
