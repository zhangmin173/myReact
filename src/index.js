import React from 'react';
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  hashHistory
} from 'react-router';
import './common/css/base.less';

import App from './pages/app/index';

ReactDOM.render((
  <App></App>
),document.querySelector('#app'));