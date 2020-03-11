// import electronicLicense from '@/api/modules/electronicLicense'
// import account from '@/api/modules/account'
// import points from '@/api/modules/points'
// import fence from '@/api/modules/fence'
// import inspectlog from '@/api/modules/inspectlog'
// import common from '@/api/modules/common'
// import statistics from '@/api/modules/statistics'
// import cycleRecord from '@/api/modules/cycleRecord'
// import task from '@/api/modules/task'
// import warning from '@/api/modules/warning'
// import camera from '@/api/modules/camera'
// import repair from '@/api/modules/repair'

const ApiObj = {}
const files = require.context('./modules', false, /\.js$/)
const requireAll = requireContext => requireContext.keys().forEach(key => {
  const keyName = key.replace('./', '').replace('.js', '')
  ApiObj[keyName] = files(key).default // 读取文件中的default 模块
  // console.log(keyName)
})
requireAll(files)
// console.log(ApiObj)

export default ApiObj
