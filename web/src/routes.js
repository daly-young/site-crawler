import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import loadable from '@loadable/component';

// 采取异步动态路由加载的方式
const Home = loadable(() => import('./module/site/home'));
const Demo = loadable(() => import('./module/demo'));
// import Home from './module/home'
// import Demo from './module/demo'

const Root = () => (
  <Suspense fallback={<div>加载中...</div>}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/home" component={Home} />
      <Route path="/demo" component={Demo} />
      {/*路由不正确时，默认跳回home页面*/}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </Suspense>
);

export default Root;
