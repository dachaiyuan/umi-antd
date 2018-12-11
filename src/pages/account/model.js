import base from '@/models/base';
import modelExtend from 'dva-model-extend';
import { accountService, roleService } from '@/services';
export default modelExtend(base, {
  namespace: 'account',
  state: {
    accounts: {
      list: [],
      totalElements: 0,
      size: 10,
      page: 0,
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname === '/account'){
          dispatch({
            type: 'accountList',
          })
          dispatch({
            type: 'roleList'
          })
        }
      })
    }
  },
  effects: {
    * accountList({payload},{put,call,select}){
      const { accounts: { size, page } } = yield select(state => state.account);
      payload = { size, page, ...payload};
      const { data: list, pagination: { totalElements } } = yield call(accountService.accountList, payload);
      yield put({
        type: 'save',
        payload: {
          accounts: {
            list,
            totalElements,
            size: payload.size,
            page: payload.page
          }
        }
      })
    },
    * addAccount({payload},{put,call}){
      yield call(accountService.addAccount, payload);
      yield put({type:'accountList'})
    },
    * editAccount({payload},{put,call}){
      yield call(accountService.editAccount, payload);
      yield put({type:'accountList'})
    }
  },
})