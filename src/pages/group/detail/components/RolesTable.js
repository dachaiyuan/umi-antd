import { Component } from 'react';
import router from 'umi/router';
import { Table, Button, Modal } from 'antd';
import { RolesTable as arr } from './arr';

class RolesTable extends Component {
  onDeleteGroup = item => {
    Modal.confirm({
      title: '提示',
      content: `您确定要删除角色：${item.name} ？`,
      onOk:() => {
        const { location: { query: { id } } } = this.props;
        this.props.dispatch({
          type: 'group/deleteGroupRole',
          payload: {
            id,
            roleIds: [item.id]
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
    const { data: { groupRoles }, loading } = this.props;
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
        loading={loading.effects['group/groupRoles']}
        columns={columns}
        rowKey="id"
        dataSource={groupRoles.list}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>);
  }
}

export default RolesTable;