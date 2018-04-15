import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import './common/css/base.less';
import SsoLayout from './components/sso/layout/index';
import WebLayout from './components/web/layout/index';

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route path="/" exact component={SsoLayout} />
      <Route path="/sso" component={SsoLayout} />
      <Route path="/web" component={WebLayout} />
    </Switch>
  </HashRouter>,
  document.querySelector('#app')
);
