import { Component } from 'react';
import { Card, Row, Col, Button, Input } from 'antd';
import AddGroupModal from './Modal/AddGroupModal';

export default class GroupOptCard extends Component {
  state = {
    AddGroupVisible:false,
  }
  form = {
    name: '',
  }
  onAddGroupSubmit = payload => {
    this.props.dispatch({
      type: 'group/addGroup',
      payload
    });
    this.setState({
      AddGroupVisible:false,
    })
  }
  onChangeSearch = ({ target: { value }}) => {
    this.form.name = value;
  }
  onSearch = () => {
    this.props.dispatch({
      type: 'group/groups',
      payload: {
        ...this.form,
        page: 0,
      }
    })
  }
  render(){
    const { loading } = this.props;
    const { AddGroupVisible } = this.state;
    const title = (<Row align="middle">
      <Col span="4">
        用户组名：<Input onChange={this.onChangeSearch} onPressEnter={this.onSearch}/>&emsp;
        <Button onClick={this.onSearch} type="primary">查询</Button>
      </Col>
    </Row>)
    const extra = <Button onClick={() => this.setState({AddGroupVisible:true})} type="primary">添加分组</Button>
    return (<div>
      <Card title={title} extra={extra}>
        {this.props.children}
      </Card>
      <AddGroupModal 
        visible={AddGroupVisible}
        onCancel={() => this.setState({AddGroupVisible:false})}
        onSubmit={this.onAddGroupSubmit}
        loading={loading.effects['group/addGroup']}
      />
    </div>)
  }
}