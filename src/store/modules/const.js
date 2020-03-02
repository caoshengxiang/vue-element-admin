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
