/**
 * title: 权限管理
 */

import { Component } from 'react';
import { connect } from 'dva';
import AuthOptCard from './components/AuthOptCard';
import AuthTable from './components/AuthTable'

@connect(({auth, loading}) => ({auth,loading}))
class Auth extends Component {
  render() {
    const { auth: { auths, sys, SelectSys }, ...others } = this.props;
    return (<div>
      <AuthOptCard data={{ sys, SelectSys }}  {...others}>
        <AuthTable data={{ auths }} {...others}/>
      </AuthOptCard>
    </div>)
  }
}

export default Auth;