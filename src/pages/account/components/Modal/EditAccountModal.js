import { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { formItemLayout } from '@/utils/arr';
@Form.create()
class EditAccountModal extends Component {
  onSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.id = this.props.data.EditItem.id;
        this.props.onSubmit(values);
        this.props.form.resetFields();
      }
    });
  }
  onCancel = () => {
    this.props.form.resetFields();
    this.props.onCancel();
  }
  render() {
    const { visible, data: { roleList, EditItem: { roleIds, email, name } }, form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (<div>
      <Modal 
        title="编辑账号"
        visible={visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={loading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="角色">
            {getFieldDecorator('roleIds', {
              initialValue: roleIds,
              rules: [{required: true, message: '请至少选择一种角色'}]
            })(
              <Select mode="multiple" allowClear>
                {roleList.map( item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option> )}
              </Select>
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="邮箱">
            {getFieldDecorator('email', {
              initialValue: email,
              rules: [{
                type: 'email', message: '邮箱格式不正确',
              }, {
                required: true, message: '请输入邮箱',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="姓名">
            {getFieldDecorator('name', {
              initialValue: name,
              rules: [{required: true, whitespace:true, message: '请输入姓名'}]
            })(
              <Input />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>)
  }
}
export default EditAccountModal;