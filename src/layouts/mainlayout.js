import { Component } from 'react';
import { Layout, Icon, Row, Col } from 'antd';
import Menus from '@/components/Menus';
import Breadcrumbs from '@/components/Breadcrumbs';
import Users from '@/components/Users';
import menuData from '@/menuData';
import styles from './mainlayout.less';
import withRouter from 'umi/withRouter';
import { TransitionGroup, CSSTransition } from "react-transition-group";
const { Header, Sider, Content } = Layout;
class MainLayout extends Component {
  state = {
    collapsed: false,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { collapsed } = this.state;
    return (<Layout className={styles.layout}>
      <Sider
        width={256}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={styles.logo} />
        <Menus menuData={menuData} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, boxShaw: '0 1px 4px rgba(0, 21, 41, 0.08)' }}>
          <Row type="flex" align="middle">
            <Col span="12">
              <Row type="flex" align="middle">
                <Col>
                  <Icon
                    className={styles.trigger}
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                  />
                </Col>
                <Col>
                  <Breadcrumbs menuData={menuData}/>
                </Col>
              </Row>
            </Col>
            <Col span="12" style={{display: 'flex', paddingRight: '24px'}}>
              <div style={{flexGrow: '1'}}></div>
              <Users />
            </Col>
          </Row>
        </Header>
        <Content className={styles.content}>
          {this.props.children}
        </Content>
      </Layout>
    </Layout>)
  }
}

export default MainLayout;