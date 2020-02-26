import request from '@/utils/request'

export default {
  list(params) {
    return request.get('supervisor/register', { params: params })
  }
}
