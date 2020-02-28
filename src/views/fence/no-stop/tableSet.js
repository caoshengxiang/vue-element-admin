const defaultFormThead = [{
  key: 'id',
  name: 'ID'
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
  formatter: (row, column, cellValue, index) => {
    return row.hasCamera ? '有摄像头' : '无摄像头'
  }
}, {
  key: 'validStart_validEnd',
  name: '有效期',
  width: '300px',
  formatter: (row, column, cellValue, index) => {
    return row.validStart + ' - ' + row.validEnd
  }
}]
export default defaultFormThead
