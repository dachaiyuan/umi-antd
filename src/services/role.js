import request from '@/utils/request';
import api from '@/utils/api';
export default {
  roleList(params) {
    return request(api.roleList, {
      params,
    });
  },
  addRole(params) {
    return request(api.addRole, {
      method: 'POST',
      body: JSON.stringify(params),
    })
  },
  deleteRole(params) {
    return request(api.deleteRole.replace(':roleId',params.roleId), {
      method: 'PUT',
      body: JSON.stringify(params),
    })
  },
  roleAuthList(params) {
    return request(api.roleAuthList, {
      params,
    })
  },
  editRole(params) {
    return request(api.editRole, {
      method: 'PUT',
      body: JSON.stringify(params)
    })
  },
  deleteRoleAuth(params) {
    return request(api.deleteRoleAuth, {
      method: 'DELETE',
      body: JSON.stringify(params),
    })
  },
}