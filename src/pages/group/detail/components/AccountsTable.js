import { Component } from 'react';
import router from 'umi/router';
import { Table, Button, Modal } from 'antd';
import { RolesTable as arr } from './arr';

export default class AccountsTable extends Component {
  onDeleteGroup = item => {
    Modal.confirm({
      title: '提示',
      content: `您确定要删除权限：${item.name} ？`,
      onOk:() => {
        this.props.dispatch({
          type: 'role/deleteGroup',
          payload: {
            permissionId: item.id
          }
        })
      }
    })
  }
  toGroupDetail = query => {
    router.push({
      pathname:'/group/detail',
      query,
    });
  }
  render() {
    const { data: { groupAccounts }, loading } = this.props;
    const columns = [
      ...arr.columns,
      {
        title: '操作',
        render: item => <div>
          <Button onClick={() => this.onDeleteGroup(item)} type="danger">删除</Button>
        </div>
      }
    ]
    return (<div>
      <Table
        loading={loading.effects['group/groupAccounts']}
        columns={columns}
        rowKey="id"
        dataSource={groupAccounts.list}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>);
  }
}