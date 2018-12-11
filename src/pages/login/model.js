import base from '@/models/base';
import modelExtend from 'dva-model-extend';
import router from 'umi/router';
import { baseService } from '@/services';
export default modelExtend(base, {
  namespace: 'login',
  state: {
    isSavePassword: false,
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen(location => {
        if(location.pathname === '/login'){
          dispatch({
            type: 'savePassword',
            payload: {
              isSavePassword: JSON.parse(localStorage.getItem('isSavePassword'))
            }
          })
        }
      })
    }
  },
  effects: {
    * login({payload},{put,call,select}){
      yield call(baseService.login, payload);
      // sessionStorage.setItem('type',data.token_type);
      // sessionStorage.setItem('token',data.access_token);
      const { isSavePassword } = yield select(state => state.login);
      if(isSavePassword){
        localStorage.setItem('name',payload.name);
        localStorage.setItem('password',payload.password);
      }
      router.push('/');
    }
  },
  reducers: {
    savePassword(state, { payload }){
      if(!payload.isSavePassword){
        localStorage.removeItem('name');
        localStorage.removeItem('password');
      }
      Object.assign(state,payload);
    }
  },
})