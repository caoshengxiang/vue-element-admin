// import moment from 'moment'
// import store from '@/store'

const defaultFormThead = [{
  key: 'title',
  name: '标题'
}, {
  key: 'content',
  name: '内容'
}, {
  key: 'inspectorOrgId',
  name: '巡查人组织'
}, {
  key: 'inspectorName',
  name: '巡查人名字'
}, {
  key: 'valid',
  name: '是否非法',
  formatter: (row, column, cellValue, index) => {
    if (row.valid === true) {
      return '是'
    } else {
      return '否'
    }
  }
}, {
  key: 'eventTime',
  name: '巡查时间'
}, {
  key: 'replyUserId',
  name: '回复人'
}, {
  key: 'replyContent',
  name: '回复内容'
}, {
  key: 'replyTime',
  name: '回复时间'
}, {
  key: 'address',
  name: '巡查地址'
}]
export default defaultFormThead
