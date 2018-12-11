import { Component } from 'react';
import { Card, Row, Col, Button, Input } from 'antd';
import AddGroupAccountModal from './Modal/AddGroupAccountModal';

export default class AccountOptCard extends Component {
  state = {
    AddGroupAccountVisible:false,
  }
  form = {
    name: '',
  }
  onAddGroupAccountSubmit = payload => {
    this.props.dispatch({
      type: 'group/addGroupAccount',
      payload
    });
    this.setState({
      AddGroupAccountVisible:false,
    })
  }
  render(){
    const { data, loading } = this.props;
    const { AddGroupAccountVisible } = this.state;
    const extra = <Button onClick={() => this.setState({AddGroupAccountVisible:true})} type="primary">添加用户</Button>
    return (<div>
      <Card title="用户列表" extra={extra}>
        {this.props.children}
      </Card>
      <AddGroupAccountModal 
        visible={AddGroupAccountVisible}
        onCancel={() => this.setState({AddGroupAccountVisible:false})}
        onSubmit={this.onAddGroupAccountSubmit}
        data={data}
        loading={loading.effects['group/addGroup']}
      />
    </div>)
  }
}