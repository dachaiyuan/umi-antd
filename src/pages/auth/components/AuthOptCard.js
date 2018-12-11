import { Component } from 'react';
import { Card, Row, Col, Button, Select, Icon, Divider, Modal } from 'antd';
import AddAuthModal from './Modal/AddAuthModal';
import AddSysModal from './Modal/AddSysModal';

class AuthOptCard extends Component {
  state = {
    AddSysVisible: false,
    AddAuthVisible: false,
    SelectOpenStatus: false,
  }
  onAddSysSubmit = payload => {
    this.props.dispatch({
      type:'auth/addSys',
      payload
    })
    this.setState({
      AddSysVisible:false
    })
  }
  onAddAuthSubmit = payload => {
    this.props.dispatch({
      type: 'auth/addAuth',
      payload,
    })
    this.setState({
      AddAuthVisible:false,
    })
  }
  onSelectSys = sysId => {
    this.refs.select.blur();
    this.props.dispatch({
      type: 'auth/auths',
      payload: {
        sysId
      }
    })
  }
  onSelectBlur = () => {
    setTimeout(()=>{
      this.setState({
        SelectOpenStatus: false
      })
    },200)
  }
  render() {
    const { data: { sys, SelectSys }, loading } = this.props;
    const { AddSysVisible, AddAuthVisible, SelectOpenStatus } = this.state;
    const dropdownRender = menu =>(
      <div>
        {menu}
        <Divider style={{ margin: '4px 0' }} />
        <div onClick={() => this.setState({AddSysVisible:true})} style={{ padding: '8px', cursor: 'pointer' }}>
          <Icon type="plus" /> 添加系统
        </div>
      </div>
    )

    const title = (
      <Row align="middle">
        <Col span="4">
          系统：
          <Select
            ref="select"
            open={SelectOpenStatus}
            onFocus={() => this.setState({SelectOpenStatus:true})}
            onBlur={this.onSelectBlur}
            value={SelectSys}
            onChange={this.onSelectSys}
            dropdownRender={dropdownRender}
            style={{width:160}}
          >
            {
              sys.list.map( item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option> )
            }
          </Select>
        </Col>
      </Row>
    )

    const extra = <Button onClick={() => this.setState({AddAuthVisible:true})} disabled={!SelectSys} type="primary">权限添加</Button>

    return (<div>
      <Card title={title} extra={extra}>
        {this.props.children}
      </Card>
      <AddSysModal
        visible={AddSysVisible}
        loading={loading.effects['role/addRole']}
        onSubmit={this.onAddSysSubmit}
        onCancel={() => this.setState({ AddSysVisible: false })}
      />
      <AddAuthModal
        visible={AddAuthVisible}
        loading={loading.effects['auth/addAuth']}
        onSubmit={this.onAddAuthSubmit}
        onCancel={() => this.setState({ AddAuthVisible: false })}
      />
    </div>);
  }
}

export default AuthOptCard;