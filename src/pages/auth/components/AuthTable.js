import { Component } from 'react';
import { Table, Button, Modal } from 'antd';
import { AuthTable as arr } from './arr';

class AuthTable extends Component {
  onDeleteAuth = item => {
    Modal.confirm({
      title: '提示',
      content: `您确定要删除权限：${item.name} ？`,
      onOk:() => {
        this.props.dispatch({
          type: 'role/deleteAuth',
          payload: {
            permissionId: item.id
          }
        })
      }
    })
  }
  render() {
    const { data: { auths }, loading } = this.props;
    const columns = [
      ...arr.columns,
      {
        title: '操作',
        render: item => <Button onClick={() => this.onDeleteAuth(item)} type="danger">删除</Button>
      }
    ]
    return (<div>
      <Table
        loading={loading.effects['auth/auths']}
        columns={columns}
        rowKey="id"
        dataSource={auths.list}
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </div>);
  }
}

export default AuthTable;