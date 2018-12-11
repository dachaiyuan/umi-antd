import { Component } from 'react';
import { Modal, Select, Form } from 'antd';
import { formItemLayout } from '@/utils/arr';
@Form.create()
class AddRoleAuthModal extends Component {
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
        this.props.form.resetFields();
      }
    });
  }
  onCancel = () => {
    this.props.form.resetFields();
    this.props.onCancel();
  }
  dealAuthAll = () => {
    const { data: { roleAuths, authAll } } = this.props
    const selectRoleAuths = JSON.parse(JSON.stringify(roleAuths.list));
    const auths = JSON.parse(JSON.stringify(authAll.list))
    auths.some( auth => {
      let selectRoleAuthsIndex = 0
      let flag = selectRoleAuths.some( (selectRoleAuth, index) => {
        if(selectRoleAuth.id === auth.id){
          auth.disabled = true;
          selectRoleAuthsIndex = index;
          return true;
        }
        return false
      });
      if(flag){
        selectRoleAuths.splice(selectRoleAuthsIndex,1);
      }
      return !selectRoleAuths.length;
    });
    return auths;
  }
  render() {
    const { visible, form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (<div>
      <Modal 
        title="权限添加"
        visible={visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={loading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="权限">
            {getFieldDecorator('permissionIds', {
              rules: [{required: true, message: '请选择权限'}]
            })(
              <Select mode="multiple" allowClear>
                {this.dealAuthAll().map( item => <Select.Option key={item.id} disabled={!!item.disabled} value={item.id}>{item.name}</Select.Option> )}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>)
  }
}
export default AddRoleAuthModal;