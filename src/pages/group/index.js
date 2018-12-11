/**
 * title: 用户组管理
 */

import { Component } from 'react';
import { connect } from 'dva';
import GroupOptCard from './components/GroupOptCard';
import GroupsTable from './components/GroupsTable';

@connect(({group, loading}) => ({group, loading}))
class Group extends Component {
  render() {
    const { group, ...others } = this.props;
    return (
      <div>
        <GroupOptCard {...group} {...others}>
          <GroupsTable {...group} {...others}/>
        </GroupOptCard>
      </div>
    )
  }
}

export default Group;