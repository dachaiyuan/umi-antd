import request from '@/utils/request';
import api from '@/utils/api';
export default {
  authAll(params) {
    return request(api.authAll, {
      params,
    });
  },
  auths(params) {
    return request(api.auths, {
      params,
    });
  },
  addAuth(params) {
    return request(api.addAuth, {
      method: 'POST',
      body: JSON.stringify(params)
    })
  },
}