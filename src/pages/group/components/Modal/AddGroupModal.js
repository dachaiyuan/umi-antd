import { Component } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { formItemLayout } from '@/utils/arr';
@Form.create()
class AddGroupModal extends Component {
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
  render() {
    const { visible, form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (<div>
      <Modal 
        title="添加用户组"
        visible={visible}
        onOk={this.onSubmit}
        onCancel={this.onCancel}
        confirmLoading={loading}
      >
        <Form>
          <Form.Item {...formItemLayout} label="名称">
            {getFieldDecorator('name', {
              rules: [{
                required: true, whitespace:true, message: '请输入名称',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item {...formItemLayout} label="描述">
            {getFieldDecorator('mark', {
              rules: [{required: true, whitespace:true, message: '请输入描述'}]
            })(
              <Input.TextArea />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>)
  }
}
export default AddGroupModal;