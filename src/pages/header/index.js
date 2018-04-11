import React from 'react';
import './index.less';

export default class AppHeader extends React.Component {

  render() {
    return (
      <div className='header'>
        {this.props.title}
      </div>
    )
  }
}