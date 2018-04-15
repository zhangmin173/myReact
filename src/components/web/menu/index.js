import React from 'react';
import './index.less';
import { NavLink  } from 'react-router-dom';

const menu = () => (
  <div>
    <NavLink to='/index'>首页</NavLink>
    <NavLink to='/news'>新闻</NavLink>
  </div>
);

export default menu