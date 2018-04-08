require('../../../libs/lib-zepto/1.0.0/zepto.min');
import './index.less';

$.ajax({
  url: '/activity/dojoin',
  success: function(res) {
    console.log(res)
  }
})