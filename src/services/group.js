import request from '@/utils/request';
import api from '@/utils/api';
export default {
  groups(params) {
    return request(api.groups, {
      params,
    });
  },
  addGroup(params) {
    return request(api.addGroup, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },
  deleteGroup(params) {
    return request(api.deleteGroup.replace(':groupId',params.groupId), {
      method: 'DELETE',
    })
  },
  groupRoles(params) {
    return request(api.groupRoles.replace(':groupId',params.groupId), {})
  },
  addGroupRole(params) {
    return request(api.addGroupRole, {
      method: 'POST',
      body: JSON.stringify(params)
    })
  },
  deleteGroupRole(params) {
    return request(api.deleteGroupRole, {
      method: 'DELETE',
      body: JSON.stringify(params)
    })
  },
  groupAccounts(params) {
    return request(api.groupAccounts.replace(':groupId',params.groupId),{})
  },
  addGroupAccount(params) {
    return request(api.addGroupAccount, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  }
}