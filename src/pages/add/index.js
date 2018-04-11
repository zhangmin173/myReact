import React from 'react';
import './index.less';

export default class Add extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      buttonText: '提交',
      canSubmit: true
    }

  }

  render() {
    return (
      <div className='add'>
        <input type='text' ref='addInput' />
        <button onClick={this.submit.bind(this)}>{this.state.buttonText}</button>
      </div>
    )
  }

  submit() {
    let val = this.refs.addInput.value
    if (val && this.state.canSubmit) {
      this.setState({
        buttonText: '提交中',
        canSubmit: false
      })
      this.props.addList(val)
      setTimeout(() => {
        this.setState({
          buttonText: '提交',
          canSubmit: true
        })
        this.refs.addInput.value = ''
      },300)
    } else {
      this.refs.addInput.focus()
    }
  }

}