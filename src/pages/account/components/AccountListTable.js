import { Component } from 'react';
import { Table, Button, Modal} from 'antd';
import { AccountListTable as arr } from './arr';
import EditAccountModal from './Modal/EditAccountModal';
export default class AccountListTable extends Component {
  state = {
    EditVisible:false,
    EditItem: {}
  }
  onClickEdit = EditItem => {
    EditItem.roleIds = EditItem.roles.map( item => item.id);
    this.setState({
      EditVisible: true,
      EditItem,
    })
  }
  onEditAccountSubmit = payload => {
    this.props.dispatch({
      type: 'account/editAccount',
      payload
    })
    this.setState({
      EditVisible:false,
    })
  }
  onClickFreeze = item => {
    Modal.confirm({
      content: `您确定要冻结账号：${item.email} 吗？`,
      onOk:() => {
        this.props.dispatch({
          type: 'account/editAccount',
          payload: {
            id: item.id,
            status: 'ABNORMAL'
          }
        })
      }
    })
  }
  onClickThaw = item => {
    Modal.confirm({
      content: `您确定要解结账号：${item.email} 吗？`,
      onOk:() => {
        this.props.dispatch({
          type: 'account/editAccount',
          payload: {
            id: item.id,
            status: 'NORMAL'
          }
        })
      }
    })
  }
  onPageChange = page => {
    this.props.dispatch({
      type: 'account/accountList',
      payload:{
        page: page-1,
      }
    })
  }
  render(){
    const { data: { roleList, accounts: { list, totalElements, size, page } }, loading } = this.props;
    const { EditVisible, EditItem } = this.state;
    const columns = [
      ...arr.columns,
      {
        title: '操作',
        render: item => (<div>
          <Button onClick={() => this.onClickEdit(item)} type="primary" size="small">修改</Button>&emsp;
          {
            item.status === 'NORMAL'?
            <Button onClick={() => this.onClickFreeze(item)} type="danger" size="small">冻结</Button>
            :<Button onClick={() => this.onClickThaw(item)} type="dashed" size="small">解冻</Button>
          }
          
        </div>)
      }
    ]
    return (<div>
      <Table 
        loading= {loading.effects['account/accountList']}
        dataSource={list}
        rowKey="id"
        columns={columns}
        pagination={{
          hideOnSinglePage: true,
          pageSize: size,
          total: totalElements,
          current: page+1,
          onChange:this.onPageChange
        }}
      />
      <EditAccountModal 
        onCancel={() => this.setState({EditVisible:false})}
        visible={EditVisible}
        data={{EditItem,roleList}}
        onSubmit={this.onEditAccountSubmit}
        loading={loading.effects['account/editAccount']}
      />
    </div>)
  }
}