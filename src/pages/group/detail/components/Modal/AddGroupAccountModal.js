import { Component } from 'react';
import { Modal, Form, Select } from 'antd';
import { formItemLayout } from '@/utils/arr';
@Form.create()
class AddGroupAccountModal extends Component {
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
  dealAccountAll = () => {
    const { data: { groupAccounts, accountAll } } = this.props
    const selectAccounts = JSON.parse(JSON.stringify(groupAccounts.list));
    const Accounts = JSON.parse(JSON.stringify(accountAll.list))
    Accounts.some( auth => {
      let selectAccountIndex = 0
      let flag = selectAccounts.some( (selectAccount, index) => {
        if(selectAccount.id === auth.id){
          auth.disabled = true;
          selectAccountIndex = index;
          return true;
        }
        return false
      });
      if(flag){
        selectAccounts.splice(selectAccountIndex,1);
      }
      return !selectAccounts.length;
    });
    return Accounts;
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
          <Form.Item {...formItemLayout} label="账号">
            {getFieldDecorator('userIds', {
              rules: [{
                required: true, message: '请至少选择一个账号',
              }],
            })(
              <Select mode="multiple" allowClear>
                {this.dealAccountAll().map( item => <Select.Option key={item.id} disabled={!!item.disabled} value={item.id}>{item.name}</Select.Option> )}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>)
  }
}
export default AddGroupAccountModal;