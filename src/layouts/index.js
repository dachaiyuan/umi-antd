import { Provider } from './indexContext';
import LoginLayout from './loginlayout';
import MainLayout from './mainlayout';
function BasicLayout(props) {
  if (props.location.pathname === '/login') {
    return <LoginLayout> { props.children } </LoginLayout>
  }
  return <Provider value={props}><MainLayout>{ props.children }</MainLayout></Provider>;
}

export default BasicLayout;
