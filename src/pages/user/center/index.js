/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-04-29 21:17:33
 */

import './index.less';
import toolkit from '../../../components/toolkit';
import defaultHeadimg from '../../../common/images/user/default-headimg.jpg';

$(function() {
    
    class index {
        constructor() {
            
        }
        init() {

            this.getuserinfo((data) => {
                $('.headimg').css('backgroundImage',`url('${data.headimg}')`);
                $('.nickname').text(data.nickname);
                $('.mobile').text(toolkit.mobile2show(data.mobile));
            })
        }
        getuserinfo(cb) {
            toolkit.fetch({
                url: '',
                success: (res) => {

                }
            })

            cb & cb({
                headimg: defaultHeadimg,
                nickname: '阿敏',
                mobile: '17357213387'
            })
        }
    }

    new index().init()
});
