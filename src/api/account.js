import request2 from '@/utils/request2'
import md5 from 'js-md5'

export default {
  login(params) {
    return request2.post('auth/loginV2', {
      username: params.username,
      password: md5(params.password)
    }, {
      headers: {
        pos: 3
      }
    })
  }
}
