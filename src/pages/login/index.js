/**
 * title: 登录
 */
import { Component } from 'react'
import { connect } from 'dva';
import { Login as Logins } from 'ant-design-pro';
import { Checkbox } from 'antd';
import styles from './index.less';
const { UserName, Password, Submit } = Logins;
@connect(({login,loading}) => ({
  login,
  loading:loading.effects['login/login']
}))
class Login extends Component{

  onSubmit = (err, payload) => {
    if(!!payload.username && !!payload.password) {
      this.props.dispatch({
        type: 'login/login',
        payload: {
          name: payload.username,
          password: payload.password
        },
      })
    }
  }

  onCheckChange = ({ target: { checked } }) => {
    localStorage.setItem('isSavePassword',checked);
    this.props.dispatch({
      type: 'login/savePassword',
      payload: {
        isSavePassword: checked,
      }
    })
  }

  onPressEnter = () => {
    console.log(Submit);
  }
  render() {
    const { loading, login: { isSavePassword } } = this.props;
    return (<div>
      <h1 className={styles.title}>Auth Center</h1>
      <span className={styles.sub}>一个权限管理系统</span>
      <div className={styles.form}>
        <Logins onSubmit={this.onSubmit}>
          <UserName placeholder="用户名" defaultValue={isSavePassword?localStorage.getItem('name'):''} name="username" rules={[{required:true,message:'请输入用户名'}]} />
          <Password placeholder="密码" defaultValue={isSavePassword?localStorage.getItem('password'):''} name="password" rules={[{required:true,message:'请输入密码'}]} />
          <Checkbox onChange={this.onCheckChange} checked={isSavePassword}>记住密码</Checkbox>
          <div>&emsp;</div>
          <Submit block loading={loading}>登录</Submit>
        </Logins>
      </div>
    </div>);
  }
}
export default Login;