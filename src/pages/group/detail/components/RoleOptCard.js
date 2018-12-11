import { Component } from 'react';
import { Card, Row, Col, Button, Input } from 'antd';
import AddGroupRoleModal from './Modal/AddGroupRoleModal';

export default class RoleOptCard extends Component {
  state = {
    AddGroupRoleVisible:false,
  }
  form = {
    name: '',
  }
  onAddGroupRoleSubmit = payload => {
    this.props.dispatch({
      type: 'group/addGroupRole',
      payload
    });
    this.setState({
      AddGroupRoleVisible:false,
    })
  }
  render(){
    const { data, loading } = this.props;
    const { AddGroupRoleVisible } = this.state;
    const extra = <Button onClick={() => this.setState({AddGroupRoleVisible:true})} type="primary">添加角色</Button>
    return (<div>
      <Card title="角色列表" extra={extra}>
        {this.props.children}
      </Card>
      <AddGroupRoleModal 
        visible={AddGroupRoleVisible}
        onCancel={() => this.setState({AddGroupRoleVisible:false})}
        onSubmit={this.onAddGroupRoleSubmit}
        data={data}
        loading={loading.effects['group/addGroupRole']}
      />
    </div>)
  }
}