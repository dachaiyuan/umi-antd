import { Component } from 'react';
import { Breadcrumb } from 'antd';
import Link from 'umi/link';
import { Consumer } from '@/layouts/indexContext';
export default class Breadcrumbs extends Component {
  routes = []
  CheckQuery = result => {
    if(result.length>1){
      if(this.routes.length < result.length){
        if(this.routes.every((item,index) => item.path === result[index].path)){
          this.routes.push(result[result.length-1]);
        }else {
          return this.routes = result;
        }
      } else {
        if(result.every((item,index) => item.path === this.routes[index].path)){
          this.routes.pop();
        }else {
          return this.routes = result;
        }
      }
    }else {
      return this.routes = result;
    }
  }
  ConsumerRender = ({ location }) => {
    const { pathname, query, search } = location;
    const { menuData } = this.props;
    const routeUnit = pathname.split('/').filter( val => val).map(val=>'/'+val);
    let result = [];
    let children = menuData;
    let routeString = '';
    routeUnit.map( val => {
      children.some(item => {
        if(item.path === routeString + val){
          item.query = query;
          item.search = search;
          result.push(item);
          children = item.children;
          routeString += val;
          return true;
        }
        return false;
      })
    })
    this.CheckQuery(result);
    return (<Breadcrumb>
      {
        this.routes.map( (item,index) => <Breadcrumb.Item key={item.path}>
          {this.BreadcrumbItemRender(item)}
        </Breadcrumb.Item> )
      }
    </Breadcrumb>)
  }
  BreadcrumbItemRender = (item) => {
    if(item.breadCrumbClick){
      return <Link to={`${item.path}?${item.search}`} >{item.name}</Link>
    }
    return <span>{item.name}</span>
  }
  render() {
    return (<div>
      <Consumer>
        {this.ConsumerRender}
      </Consumer>
    </div>);
  }
}