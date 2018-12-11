import { Component } from 'react';
import { Card, Row, Col, Button, Select, Icon, Divider, Modal } from 'antd';
import AddRoleModal from './Modal/AddRoleModal';
import AddRoleAuthModal from './Modal/AddRoleAuthModal';

class RoleOptCard extends Component {
  state = {
    AddRoleVisible: false,
    AddRoleAuthVisible: false,
    SelectOpenStatus: false,
  }
  onAddRoleSubmit = payload => {
    this.props.dispatch({
      type:'role/addRole',
      payload
    })
    this.setState({
      AddRoleVisible:false
    })
  }
  onAddRoleAuthSubmit = payload => {
    this.props.dispatch({
      type: 'role/editRole',
      payload,
    })
    this.setState({
      AddRoleAuthVisible:false,
    })
  }
  onSelectRole = SelectedRole => {
    this.refs.select.blur();
    this.props.dispatch({
      type: 'role/roleAuthList',
      payload: {
        roleId: SelectedRole
      }
    })
  }
  onDeleteRole = () => {
    const { roleList, dispatch, SelectedRole: roleId } = this.props;
    let roleName = ''
    roleList.some( item => {
      if(item.id === roleId){
        roleName = item.name;
        return true;
      }
      return false;
    })
    Modal.confirm({
      title: '提示',
      content: `您确定要删除角色：${roleName} ?`,
      onOk:() => {
        dispatch({
          type: 'role/deleteRole',
          payload: { roleId }
        })
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
    const { roleList, roleAuths, authAll, loading, SelectedRole } = this.props;
    const { AddRoleVisible, AddRoleAuthVisible, SelectOpenStatus } = this.state;
    const dropdownRender = menu =>(
      <div>
        {menu}
        <Divider style={{ margin: '4px 0' }} />
        <div onClick={() => this.setState({AddRoleVisible:true})} style={{ padding: '8px', cursor: 'pointer' }}>
          <Icon type="plus" /> 添加角色
        </div>
      </div>
    )

    const title = (
      <Row align="middle">
        <Col span="4">
          角色：
          <Select
            ref="select"
            open={SelectOpenStatus}
            onFocus={() => this.setState({SelectOpenStatus:true})}
            onBlur={this.onSelectBlur}
            value={SelectedRole}
            onChange={this.onSelectRole}
            dropdownRender={dropdownRender}
            style={{width:160}}
          >
            {
              roleList.map( item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option> )
            }
          </Select>&emsp;
          <Button onClick={this.onDeleteRole} disabled={!SelectedRole} type="danger">删除此角色</Button>
        </Col>
      </Row>
    )

    const extra = <Button onClick={() => this.setState({AddRoleAuthVisible:true})} disabled={!SelectedRole} type="primary">权限添加</Button>

    return (<div>
      <Card title={title} extra={extra}>
        {this.props.children}
      </Card>
      <AddRoleModal
        visible={AddRoleVisible}
        loading={loading.effects['role/addRole']}
        onSubmit={this.onAddRoleSubmit}
        onCancel={() => this.setState({ AddRoleVisible: false })}
      />
      <AddRoleAuthModal
        visible={AddRoleAuthVisible}
        data={{roleAuths, authAll}}
        loading={loading.effects['role/editRole']}
        onSubmit={this.onAddRoleAuthSubmit}
        onCancel={() => this.setState({ AddRoleAuthVisible: false })}
      />
    </div>);
  }
}

export default RoleOptCard;