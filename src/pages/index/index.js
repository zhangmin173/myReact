import './index.less';
import { login, getInfo } from '../../components/api';

$(function() {
  login(function() {
    console.log('login')
  })
  getInfo(function() {
    console.log('getInfo')
  })
})