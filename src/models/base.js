import { message } from 'antd';
import { baseService, roleService, authService, accountService } from '@/services';

export default {
  state: {
    roleList: [],
    authAll: {
      list: []
    },
    accountAll: {
      list: [],
    },
    sys: {
      list: [],
    }
  },
  effects: {
    // 角色列表
    * roleList({payload},{put,call}) {
      const { data:roleList } = yield call(roleService.roleList);
      yield put({
        type: 'save',
        payload: { roleList }
      })
    },
    * authAll({payload},{put,call}){
      const { data:list } = yield call(authService.authAll, payload);
      yield put({
        type: 'save',
        payload: {
          authAll: {
            list
          }
        }
      })
    },
    * accountAll({payload},{put,call}){
      const { data: list} = yield call(accountService.accountList, payload);
      yield put({
        type: 'save',
        payload: {
          accountAll: {
            list,
          }
        }
      })
    },
    * sys({payload},{put,call}) {
      const { data: list} = yield call(baseService.sys, payload);
      yield put({
        type: 'save',
        payload: {
          sys: {
            list,
          }
        }
      })
    },
    * addSys({payload}, {put, call}) {
      yield call(baseService.addSys, payload);
      message.success('添加成功');
      yield put({type: 'sys'});
    }
  },
  reducers: {
    save(state, { payload }) {
      Object.assign(state,payload);
    },
  }
}