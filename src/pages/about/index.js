import './index.less';
import { login} from '../../components/api';

$(function() {
  login(function() {
    console.log('login')
  })
})