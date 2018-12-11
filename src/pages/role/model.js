import base from '@/models/base';
import modelExtend from 'dva-model-extend';
import { roleService } from '@/services';
import { message } from 'antd';
export default modelExtend(base, {
  namespace: 'role',
  state: {
    roleAuths: {
      list: [],
    },
    SelectedRole: '',
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname === '/role'){
          dispatch({
            type: 'roleList'
          })
          dispatch({
            type: 'authAll'
          })
        }
      })
    }
  },
  effects: {
    * addRole({payload},{put, call}){
      yield call(roleService.addRole,payload);
      message.success('添加角色成功');
      yield put({type:'roleList'});
    },
    * deleteRole({payload},{put, call}){
      yield call(roleService.deleteRole,payload);
      message.success('删除角色成功');
      yield put({type:'roleList'});
      yield put({
        type: 'save',
        payload: {
          SelectedRole: payload.roleId
        }
      })
    },
    * roleAuthList({payload},{put, call}){
      const { data:list } = yield call(roleService.roleAuthList,payload);
      yield put({
        type:'save',
        payload:{
          roleAuths: {
            list
          },
          SelectedRole: payload.roleId
        }
      })
    },
    * editRole({payload},{put, call, select}) {
      const { SelectedRole: roleId } = yield select(state => state.role)
      yield call(roleService.editRole, {id:roleId,...payload});
      yield put({type:'roleAuthList', payload: { roleId }})
    },
    * deleteRoleAuth({payload},{put, call, select}) {
      const { SelectedRole: roleId } = yield select(state => state.role)
      yield call(roleService.deleteRoleAuth, {roleId,...payload});
      yield put({type:'roleAuthList', payload: { roleId }})
    }
  },
})