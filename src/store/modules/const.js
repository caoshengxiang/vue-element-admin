// import Cookies from 'js-cookie'
// import settings from '../../settings'

const state = {
  // 车况
  electroLicence_condition: [
    { label: '正常', value: 1 },
    { label: '污损', value: 2 },
    { label: '故障', value: 3 },
    { label: '僵尸', value: 4 }
  ],
  // 车辆状态
  electroLicence_state: [
    { label: '合法', value: 1 },
    { label: '注销', value: 2 },
    { label: '故障', value: 3 },
    { label: '非法', value: 4 }
  ],
  // 公司  1=>哈啰，2=>青桔，3=>美团，4=>OFO
  bikeCompany: [
    { label: '哈啰', value: 1 },
    { label: '青桔', value: 2 },
    { label: '美团', value: 3 },
    { label: 'OFO', value: 4 }
  ],
  // 违章类型 1.界外停车 2.车辆倒地 3.人行道 4.路面停车
  violationType: [
    { label: '界外停车', value: 1 },
    { label: '车辆倒地', value: 2 },
    { label: '人行道', value: 3 },
    { label: '路面停车', value: 4 }
  ],
  // 任务状态
  taskState: [
    { label: '调度中', value: 1 },
    { label: '已处理', value: 2 },
    { label: '异常', value: 4 }
  ],
  // 调度类型
  taskType: [
    { label: '界外停车', value: 1 },
    { label: '车辆倒地', value: 2 },
    { label: '人行道/路面停车', value: 3 },
    { label: '车辆爆仓', value: 4 },
    { label: '车辆不足', value: 5 }
  ],
  // 预警状态 1.预警中 2.自动消除 3.手动消除 4.误报消除
  warnState: [
    { label: '预警中', value: 1 },
    { label: '自动消除', value: 2 },
    { label: '手动消除', value: 3 },
    { label: '误报消除', value: 4 }
  ],
  // 预警事件类型 1.界外停车 2.车辆倒地 3.人行道/路面停车 4.车辆爆仓 5.车辆不足
  warnType: [
    { label: '界外停车', value: 1 },
    { label: '车辆倒地', value: 2 },
    { label: '人行道/路面停车', value: 3 },
    { label: '车辆爆仓', value: 4 },
    { label: '车辆不足', value: 5 }
  ],
  // 摄像头状态 1.正常 2.下线 3.故障
  cameraState: [
    { label: '正常', value: 1 },
    { label: '下线', value: 2 },
    { label: '故障', value: 3 }
  ],
  // 维修分类 1.正常 2.污损 3.故障 4.僵尸
  repairType: [
    { label: '正常', value: 1 },
    { label: '污损', value: 2 },
    { label: '故障', value: 3 },
    { label: '僵尸', value: 4 }
  ],
  // 维修状态
  repairState: [
    { label: '待处理', value: 1 },
    { label: '已处理', value: 2 }
  ],
  // 上传类型
  uploadType: [
    { label: '批量备案', value: 1 },
    { label: '批量注销', value: 2 },
    { label: '骑行人上报', value: 3 }
  ]
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
