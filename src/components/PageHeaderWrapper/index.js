import { Component } from 'react';
import { Layout } from 'antd';
import styles from './index.less';

export default class PageHeaderWrapper extends Component {
  render() {
    return (<div>
      <div className={styles.wrapper}>
        4556565
      </div>
      {this.props.children}
    </div>)
  }
}