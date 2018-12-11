import request from '@/utils/request';
import api from '@/utils/api';
export default {
  accountList(params) {
    return request(api.accountList, {
      params,
    });
  },
  addAccount(params) {
    return request(api.addAccount, {
      method: 'POST',
      body: JSON.stringify(params)
    })
  },
  editAccount(params) {
    return request(api.editAccount, {
      method: 'PUT',
      body: JSON.stringify(params)
    })
  }
}