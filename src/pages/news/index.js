import React from 'react';
import './index.less';

import { Link  } from 'react-router-dom';

export default class News extends React.Component {

  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div>
        新闻列表
        <Link to='/news/a'>去aaa</Link>
      </div>
    )
  }

}