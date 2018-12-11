import base from '@/models/base';
import modelExtend from 'dva-model-extend';
import { groupService } from '@/services';

export default modelExtend(base, {
  namespace: 'group',
  state: {
    groups:{
      list: [],
      totalElements: 0,
      page: 0,
      size: 10
    },
    groupRoles: {
      list: [],
    },
    groupAccounts: {
      list: [],
    }
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname === '/group'){
          dispatch({
            type: 'groups'
          })
        }
        else if(location.pathname === '/group/detail'){
          const { query:{ id:groupId } } = location;
          dispatch({
            type: 'groupRoles',
            payload: {
              groupId
            }
          })
          dispatch({
            type: 'groupAccounts',
            payload: {
              groupId
            }
          })
          dispatch({
            type: 'roleList'
          })
          dispatch({
            type: 'accountAll',
          })
        }
      })
    }
  },
  effects: {
    * groups({payload},{call, put, select}){
      const { groups: { page, size }  } = yield select(state => state.group)
      const { data: list, pagination: { totalElements } } = yield call(groupService.groups, {page, size, ...payload});
      yield put({
        type: 'save',
        payload: {
          groups: {
            list,
            totalElements,
            size,
            page
          }
        }
      })
    },
    * addGroup({payload},{call, put}) {
      yield call(groupService.addGroup, payload);
      yield put({type:'groups'});
    },
    * deleteGroup({payload},{call, put}) {
      yield call(groupService.deleteGroup, payload);
      yield put({type:'groups'});
    },
    * groupRoles({payload},{call, put}) {
      const { data:list } = yield call(groupService.groupRoles, payload);
      yield put({
        type:'save',
        payload: {
          groupRoles:{
            list
          }
        }
      })
    },
    * addGroupRole({payload},{call, put}) {
      yield call(groupService.addGroupRole, payload);
      yield put({type: 'groupRoles', payload: { groupId: payload.id }})
    },
    * deleteGroupRole({payload},{call, put}) {
      yield call(groupService.deleteGroupRole, payload);
      yield put({type: 'groupRoles', payload: { groupId: payload.id }})
    },

    * groupAccounts({payload},{call, put}) {
      const { data:list } = yield call(groupService.groupAccounts, payload);
      yield put({
        type:'save',
        payload: {
          groupAccounts:{
            list
          }
        }
      })
    },
    * addGroupAccount({payload},{call, put}) {
      yield call(groupService.addGroupAccount, payload);
      yield put({type: 'groupAccounts', payload: { groupId: payload.id }})
    }
  },
})