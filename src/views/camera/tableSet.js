import store from '@/store'

const defaultFormThead = [{
  key: 'parkingName',
  name: '点位名称'
}, {
  key: 'name',
  name: '摄像头名称'
}, {
  key: 'state',
  name: '状态',
  formatter: (row, column, cellValue, index) => {
    const options = store.state.const.cameraState
    let value = ''
    options.forEach(item => {
      if (item.value === row.state) {
        value = item.label
      }
    })
    return value
  }
}, {
  key: 'ip',
  name: 'ip地址'
}, {
  key: 'vendor',
  name: '厂商'
}, {
  key: 'remark',
  name: '备注'
}, {
  key: 'fenceName',
  name: '电子围栏名称'
}]
export default defaultFormThead
