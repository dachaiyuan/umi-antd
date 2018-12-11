import base from '@/models/base';
import modelExtend from 'dva-model-extend';
import { authService } from '@/services';
export default modelExtend(base, {
  namespace: 'auth',
  state: {
    auths: {
      list: [],
      page: 0,
      size: 10,
      totalElements: 0,
    },
    SelectSys: '',
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname === '/auth'){
          dispatch({
            type: 'sys'
          })
        }
      })
    }
  },
  effects: {
    * auths({payload},{put,call}) {
      const { data: list } = yield call(authService.auths, payload);
      yield put({
        type: 'save',
        payload: {
          auths: {
            list
          },
          SelectSys: payload.sysId,
        }
      })
    },
    * addAuth({payload},{put,call,select}) {
      const { SelectSys:sysId } = yield select( state => state.auth);
      yield call(authService.addAuth, {sysId,...payload});
      yield put({type:'auths', payload: { sysId }})
    },
  },
})