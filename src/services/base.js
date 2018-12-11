import request from '@/utils/request';
import api from '@/utils/api';
export default {
  login(body) {
    return request(api.login, {
      method: 'post',
      body:JSON.stringify(body),
    });
  },
  sys(params) {
    return request(api.sys, {})
  },
  addSys(params) {
    return request(api.addSys, {
      method: 'POST',
      body: JSON.stringify(params)
    })
  }
}