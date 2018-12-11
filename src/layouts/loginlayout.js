import styles from './loginlayout.less';
import { loginImg } from '@/utils/imgs';
export default function(props) {
  return (<div className={styles.login}>
    <div className={styles.content}>
      <div className="center">
        <img src={ loginImg } alt=""/>
      </div>
      <div className="center">
        { props.children }
      </div>
    </div>
  </div>);
}