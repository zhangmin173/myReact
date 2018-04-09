require('../../../libs/lib-zepto/1.0.0/zepto.min');
import './index.less';

function getUrlParameter(name,path = window.location.href) {
  const result = decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
  return result ? result.split('/')[0] : '';
}

$.ajax({
  url: '/activity/dojoin',
  success: function(res) {
    console.log(res)
  }
})