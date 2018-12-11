/**
 * title: 角色管理
 */

import { Component } from 'react';
import { connect } from 'dva';
import RoleOptCard from './components/RoleOptCard';
import RoleAuthTable from './components/RoleAuthTable'

@connect(({role, loading}) => ({role,loading}))
class Account extends Component {
  render() {
    const { role, ...others } = this.props;
    return (<div>
      <RoleOptCard {...role}  {...others}>
        <RoleAuthTable {...role} {...others}/>
      </RoleOptCard>
    </div>)
  }
}

export default Account;