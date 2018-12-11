import { Component } from 'react';
import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import { Consumer } from '@/layouts/indexContext';
const { SubMenu } = Menu;

export default class Menus extends Component {
  getNavMenuItems = (menusData, parent) => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => this.getSubMenuOrItem(item, parent))
      .filter(item => item);
  };

  getSubMenuOrItem = item => {
    // doc: add hideChildrenInMenu
    if (item.children && !item.hideChildrenInMenu && item.children.some(child => child.name)) {
      const { name } = item;
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                <Icon type={item.icon} />
                <span>{name}</span>
              </span>
            ) : (
              name
            )
          }
          key={item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      );
    }
    return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
  };

  getMenuItemPath = item => {
    const { name } = item;
    const itemPath = item.path;
    const icon = <Icon type={item.icon}/>;
    const { target } = item;

    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link
        to={itemPath}
        target={target}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };
  ConsumerRender = (value) => {
    const { menuData } = this.props;
    const { location: { pathname } } = value;
    return (
      <Menu theme="dark" mode="inline"  selectedKeys={[pathname]}>
        {this.getNavMenuItems(menuData)}
      </Menu>
    );
  }
  render() {
    return (<Consumer>
      {this.ConsumerRender}
    </Consumer>)
  }
}
