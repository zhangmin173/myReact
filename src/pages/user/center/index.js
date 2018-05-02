/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-01 09:40:20
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
                url: '/User/getUser',
                success: (res) => {
                    cb & cb({
                        headimg: res.data.user_img,
                        nickname: res.data.user_name,
                        mobile: res.data.user_phone
                    })
                }
            })
        }
    }

    new index().init()
});
