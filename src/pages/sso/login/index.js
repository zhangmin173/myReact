import React from 'react';
import './index.less';

export default class Login extends React.Component {

  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className='login-container'>
        <form onSubmit={this.login.bind(this)} >
          <div className='form-group'>
            <label>账号：</label>
            <input name='user' type='text' />
          </div>
          <div className='form-group'>
            <label>账号：</label>
            <input name='pwd' type='password' />
          </div>
          <button className='login-btn' type='submit'>登陆</button>
          <button className='register-btn' type='button'>注册</button>
        </form>
      </div>
    )
  }

  login(e) {
    e.preventDefault();
    let user = e.currentTarget.user.value,
      pwd = e.currentTarget.pwd.value;

    if (user === '123') {
      this.props.history.push('/web')
    }
  }

}