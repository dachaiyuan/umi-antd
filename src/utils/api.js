// const HOST = 'http://192.168.50.50:8080'
const HOST = ''
const API = `${HOST}/api`
export default {
  // 登录
  login: `${API}/login`,
  // 系统列表
  sys: `${API}/systems`,
  addSys: `${API}/system/save`,
  // 账号列表
  accountList: `${API}/users`,
  // 添加账号
  addAccount: `${API}/user/save`,
  // 修改账号
  editAccount: `${API}/user/update`,

  //role
  roleList: `${API}/role/all`,
  addRole: `${API}/role/save`,
  deleteRole: `${API}/role/:roleId/delete`,
  roleAuthList: `${API}/role/permissons`,
  editRole: `${API}/role/update`,
  deleteRoleAuth: `${API}/role/permission/delete`,

  //permission
  authAll: `${API}/permission/all`,
  auths: `${API}/permissions`,
  addAuth: `${API}/permission/save`,

  //group
  groups: `${API}/groups`,
  addGroup: `${API}/group/save`,
  deleteGroup: `${API}/group/:groupId/delete`,

  groupRoles: `${API}/group/:groupId/roles`,
  addGroupRole: `${API}/group/role/add`,
  deleteGroupRole: `${API}/group/role/delete`,

  groupAccounts: `${API}/group/:groupId/users`,
  addGroupAccount: `${API}/group/user/add`
}