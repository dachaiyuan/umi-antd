import { Component } from 'react';
import router from 'umi/router';
import { Table, Button, Modal } from 'antd';
import { GroupsTable as arr } from './arr';

class GroupsTable extends Component {
  onDeleteGroup = item => {
    Modal.confirm({
      title: '提示',
      content: `您确定要删除权限：${item.name} ？`,
      onOk:() => {
        this.props.dispatch({
          type: 'group/deleteGroup',
          payload: {
            groupId: item.id
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
    const { groups: { list }, loading } = this.props;
    const columns = [
      ...arr.columns,
      {
        title: '操作',
        render: item => <div>
          <Button onClick={() =>this.toGroupDetail(item)} type="primary">详情</Button>&emsp;
          <Button onClick={() => this.onDeleteGroup(item)} type="danger">删除</Button>
        </div>
      }
    ]
    return (<div>
      <Table
        loading={loading.effects['group/groups']}
        columns={columns}
        rowKey="id"
        dataSource={list}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>);
  }
}

export default GroupsTable;