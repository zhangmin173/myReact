import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './index.less';

import Layout from '../../components/layout/index';
import MyMenu from '../../components/menu';
import Routes from '../../routes/index';

export default class App extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Layout />
    )
  }

  addList(text) {
    let item = {},
      allTask = this.state.list

    item.id = allTask.length + 1
    item.text = text
    item.statues = 0
    allTask.push(item)

    this.setState({
      list: allTask
    })

  }

  del(item) {

    let allTask = this.state.list,
      index = this.getListIndex(item)

    allTask.splice(index,1);
    this.setState({
      list: allTask
    })
  }

  changeStatues(item) {
    let allTask = this.state.list,
      index = this.getListIndex(item)

    allTask[index].statues = 1- allTask[index].statues
    this.setState({
      list: allTask
    })
  }

  getListIndex(item) {
    return this.state.list.indexOf(item)
  }
  
}