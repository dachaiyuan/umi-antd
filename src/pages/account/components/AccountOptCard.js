import { Component } from 'react';
import { Card, Row, Col, Button, Input } from 'antd';
import AddAccountModal from './Modal/AddAccountModal';

export default class AccountOptCard extends Component {
  state = {
    AddVisible:false,
  }
  form = {
    name: '',
    email: '',
  }
  onAddAccountSubmit = payload => {
    this.props.dispatch({
      type: 'account/addAccount',
      payload
    });
    this.setState({
      AddVisible:false,
    })
  }
  onChangeSearch = (property,{ target: { value }}) => {
    this.form[property] = value;
  }
  onSearch = () => {
    this.props.dispatch({
      type: 'account/accountList',
      payload: {
        ...this.form,
        page: 0,
      }
    })
    console.log(this.form)
  }
  render(){
    const { data: { roleList }, loading } = this.props;
    const { AddVisible } = this.state;
    const title = (<Row align="middle">
      <Col span="4">
        姓名：<Input onChange={e => this.onChangeSearch('name',e)} onPressEnter={this.onSearch}/>&emsp;
        邮箱：<Input onChange={e => this.onChangeSearch('email',e)} onPressEnter={this.onSearch}/>&emsp;
        <Button onClick={this.onSearch} type="primary">查询</Button>
      </Col>
    </Row>)
    const extra = <Button onClick={() => this.setState({AddVisible:true})} type="primary">新增账号</Button>
    return (<div>
      <Card title={title} extra={extra}>
        {this.props.children}
      </Card>
      <AddAccountModal 
        visible={AddVisible}
        onCancel={() => this.setState({AddVisible:false})}
        data={{roleList}}
        onSubmit={this.onAddAccountSubmit}
        loading={loading.effects['account/addAccount']}
      />
    </div>)
  }
}