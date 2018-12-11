/**
 * title: 账号管理
 */

import { Component } from 'react';
import { connect } from 'dva';
import AccountListTable from './components/AccountListTable';
import AccountOptCard from './components/AccountOptCard';

@connect(({account, loading}) => ({account,loading}))
class Account extends Component {
  render() {
    const { account: { accounts, roleList }, ...others } = this.props;
    return (<div>
      <AccountOptCard data={{roleList}} {...others}>
        <AccountListTable data={{accounts, roleList}} {...others}/>
      </AccountOptCard>
    </div>)
  }
}

export default Account;