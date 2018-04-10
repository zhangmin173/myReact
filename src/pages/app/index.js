import React from 'react';
import './index.less';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonText: '提交',
      list: [
        {
          id: 1,
          text: '吃饭',
          statues: 0
        }
      ]
    }

    this.handleInput = this.handleInput.bind(this)
    this.addList = this.addList.bind(this)
    this.changeStatues = this.changeStatues.bind(this)
  }

  render() {
    return (
      <div>
        <div className='header'>To Do List</div>
        <div className='add'>
          <input type='text' ref='addInput' onChange={this.handleInput}  />
          <button onClick={this.addList}>{this.state.buttonText}</button>
        </div>
        <ul className="list">
          {
            this.state.list.map((item) => {
              return <li className={item.statues?'active':''} key={item.id} onClick={this.changeStatues.bind(this,item)}><strong>{item.text}</strong><label onClick={this.del.bind(this,item)}>X</label></li>
            })
          }
        </ul>
      </div>
    )
  }

  del(item,e) {
    e.stopPropagation()

    let allTask = this.state.list,
      index = this.getListIndex(item)
    console.log(index)
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

  addList() {
    let item = {},
      allTask = this.state.list

    if (this.refs.addInput.value) {
      this.setState({
        buttonText: '提交中'
      })
      item.id = allTask.length + 1
      item.text = this.refs.addInput.value
      item.statues = 0
      allTask.push(item)
      this.setState({
        list: allTask
      })
      this.refs.addInput.value = ''
      setTimeout(()=>{
        this.setState({
          buttonText: '提交'
        })
      },500)
    } else {
      this.refs.addInput.focus()
    }
  }

  handleInput(e) {
    console.log(this.refs.addInput.value);
  }
}