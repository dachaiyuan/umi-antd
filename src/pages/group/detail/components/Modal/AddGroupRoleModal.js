import { Component } from 'react';
import { Modal, Form, Select } from 'antd';
import { formItemLayout } from '@/utils/arr';
@Form.create()
class AddGroupRoleModal extends Component {
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { data: { groupId: id } } = this.props;
        this.props.onSubmit({...values,id});
        this.props.form.resetFields();
      }
    });
  }
  onCancel = () => {
    this.props.form.resetFields();
    this.props.onCancel();
  }
  dealRoleAll = () => {
    const { data: { groupRoles, roleList } } = this.props
    const selectRoles = JSON.parse(JSON.stringify(groupRoles.list));
    const roles = JSON.parse(JSON.stringify(roleList))
    roles.some( auth => {
      let selectRolesIndex = 0
      let flag = selectRoles.some( (selectRole, index) => {
        if(selectRole.id === auth.id){
          auth.disabled = true;
          selectRolesIndex = index;
          return true;
        }
        return false
      });
      if(flag){
        selectRoles.splice(selectRolesIndex,1);
      }
      return !selectRoles.length;
    });
    return roles;
  }
  render() {
    const { visible, form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (<div>
      <Modal 
        title="添加角色"
        visible={visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={loading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="角色">
            {getFieldDecorator('roleIds', {
              rules: [{
                required: true, message: '请至少选择一种角色',
              }],
            })(
              <Select mode="multiple" allowClear>
                {this.dealRoleAll().map( item => <Select.Option key={item.id} disabled={!!item.disabled} value={item.id}>{item.name}</Select.Option> )}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>)
  }
}
export default AddGroupRoleModal;