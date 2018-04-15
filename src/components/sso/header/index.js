import React from 'react';
import './index.less';
import { NavLink  } from 'react-router-dom';

const header = () => (
  <div className='componets-header'>
    <NavLink to='/sso' exact key='/sso' activeClassName='active'>首页</NavLink>
    <NavLink to='/sso/login' key='/sso/login' activeClassName='active'>登陆</NavLink>
    <NavLink to='/sso/about' key='/sso/about' activeClassName='active'>关于我们</NavLink>
  </div>
);

export default header