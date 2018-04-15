import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.less';

import MyHeader from '../header/index';
import Copyright from '../../coms/copyright/index';
import HomePage from '../../../pages/sso/home/index';
import LoginPage from '../../../pages/sso/login/index';
import AboutPage from '../../../pages/sso/about/index';

const layout = ({match}) => (
  <div className='container'>
    <div className='sso-head'><MyHeader match={match}></MyHeader></div>
    <div className='sso-main'>
    <Switch>
      <Route path={`${match.path}`} exact component={HomePage} />
      <Route path={`${match.path}/login`} component={LoginPage} />
      <Route path={`${match.path}/about`} component={AboutPage} />
    </Switch>
    </div>
    <div className='sso-copyright'><Copyright></Copyright></div>
  </div>
);

export default layout
