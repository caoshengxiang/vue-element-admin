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
  // 公司  1.美团 2.青桔 3.哈罗 4.摩拜 5.ofo
  bikeCompany: [
    { label: '美团', value: 1 },
    { label: '青桔', value: 2 },
    { label: '哈罗', value: 3 },
    { label: '摩拜', value: 4 },
    { label: 'ofo', value: 5 }
  ],
  // 违章类型 1.界外停车 2.车辆倒地 3.人行道 4.路面停车
  violationType: [
    { label: '界外停车', value: 1 },
    { label: '车辆倒地', value: 2 },
    { label: '人行道', value: 3 },
    { label: '路面停车', value: 4 }
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
