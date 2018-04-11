import React from 'react';
import './index.less';

import AppHeader from '../../pages/header/index';
import Add from '../../pages/add/index';
import List from '../../pages/list/index';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          id: 1,
          text: '吃饭',
          statues: 0
        }
      ]
    } 

  }

  render() {
    return (
      <div>
        <AppHeader title="To Do List"></AppHeader>
        <Add addList={this.addList.bind(this)}></Add>
        <ul className="list">
          {
            this.state.list.map((item) => {
              return <List key={item.id} item={item} 
                changeStatues={this.changeStatues.bind(this)}
                del={this.del.bind(this)}></List>
            })
          }
        </ul>
      </div>
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