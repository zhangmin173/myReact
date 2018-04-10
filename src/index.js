import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';
import './common/css/base.less';

import App from './pages/app/index';
import Index from './pages/index/index';
import User from './pages/user/index';

ReactDOM.render((
  <App></App>
),document.querySelector('#app'));