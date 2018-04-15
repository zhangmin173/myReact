import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.less';

// import Routes from '../../../routes/web/index';
import MyMenu from '../menu/index';
import HomePage from '../../../pages/web/home/index';
import NewsListPage from '../../../pages/web/news/list';
import NewsDetailsPage from '../../../pages/web/news/details';

const layout = ({match}) => (
  <div className="container">
    <MyMenu className="menu"></MyMenu>
    <div className="main">
    <Switch>
      <Route path={`${match.path}`} exact component={HomePage} />
      <Route path={`${match.path}/news:id`} component={NewsDetailsPage} />
      <Route path={`${match.path}/news`} component={NewsListPage} />
    </Switch>
    </div>
  </div>
);

export default layout