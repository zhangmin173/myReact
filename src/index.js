// import React from 'react';

// import ReactDom from 'react-dom';

import nav from './components/nav';
import stylePage from './common/base.less';


// ReactDom.render((
//   <div>
//     <Nav/>
//   </div>
// ), document.querySelector('#app'))
import bg from './images/bg/bg.gif';
document.getElementById('app').innerHTML = nav.title
document.getElementById('app').style.backgroundImage = 'url('+bg+')';

$.ajax({
  url: '/activity/result',
  success: function(res) {
    console.log(res);
  }
})