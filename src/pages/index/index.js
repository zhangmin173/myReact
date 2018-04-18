import './index.less';
import { login, getInfo } from '../../components/api';
import Utils from '../../components/utils';
import Cache from '../../components/cache';
import Cookie from '../../components/cookie';

$(function() {
  Utils.fetch({
    url: '/activity/dojoin',
    data: {
      name: 'zm'
    },
    success: (res) => {
      console.log(res)
    }
  })
})