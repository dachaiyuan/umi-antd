import { Component } from 'react';
import router from 'umi/router';
import { Avatar, Dropdown, Menu } from 'antd';
export default class Users extends Component {
  loginOut = () => {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		if(keys) {
      for(var i = keys.length; i--;)
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
		}
    router.push('/login');
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <span onClick={this.loginOut}>退出</span>
        </Menu.Item>
      </Menu>
    );
    return (<div>
      <Dropdown overlay={menu}>
        <div>
          <Avatar size="large" icon="user" />&ensp;
          <span>admin</span>
        </div>
      </Dropdown>
    </div>)
  }
}