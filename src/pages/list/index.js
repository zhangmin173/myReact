import React from 'react';
import './index.less';

export default class Add extends React.Component {

  render() {
    return (
      <li className={this.props.item.statues?'active':''}
        onClick={this.changeStatues.bind(this,this.props.item)}>
        <strong>{this.props.item.text}</strong>
        <label onClick={this.del.bind(this,this.props.item)}>X</label>
      </li>
    )
  }

  changeStatues(item) {
    this.props.changeStatues(item)
  }

  del(item,e) {
    e.stopPropagation()
    this.props.del(item)
  }

}