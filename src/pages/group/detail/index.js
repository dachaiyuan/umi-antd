/**
 * title: 用户组详情
 */

import { Component } from 'react';
import { connect } from 'dva';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import DescriptionList from 'ant-design-pro/lib/DescriptionList';
import RoleOptCard from './components/RoleOptCard';
import RolesTable from './components/RolesTable';
import AccountOptCard from './components/AccountOptCard';
import AccountsTable from './components/AccountsTable';
import moment from 'moment';

@connect(({group,loading}) => ({group,loading}))
class Detail extends Component {
  state = {
    tabActiveKey: 'roles'
  }
  render() {
    const { group: { groupRoles, roleList, groupAccounts, accountAll }, ...other } = this.props;
    const { tabActiveKey } = this.state;
    const { location: { query } } = other;
    return (<div>
      <PageHeader
        title={`组名: ${query.name}`}
        content={
          <DescriptionList size="small" col="2">
            <DescriptionList.Description term="描述">{query.mark}</DescriptionList.Description>
            <DescriptionList.Description term="创建时间">{moment(query.gmtCreate).format('YYYY-MM-DD HH:mm:ss')}</DescriptionList.Description>
          </DescriptionList>
        }
        tabList={[{
          key: 'roles',
          tab: '用户组角色'
        },{
          key: 'accounts',
          tab: '用户组成员'
        }]}
        tabActiveKey={tabActiveKey}
        onTabChange={tabActiveKey => this.setState({tabActiveKey})}
      />
      <br/>
      {
        tabActiveKey === 'roles' &&
        <RoleOptCard data={{roleList, groupRoles, groupId: query.id}} {...other}>
          <RolesTable data={{groupRoles}} {...other}/>
        </RoleOptCard>
      }
      {
        tabActiveKey === 'accounts' &&
        <AccountOptCard data={{groupAccounts, accountAll, groupId: query.id}} {...other}>
          <AccountsTable data={{groupAccounts}} {...other}/>
        </AccountOptCard>
      }
    </div>);
  }
}

export default Detail;