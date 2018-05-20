/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-20 20:26:21
 */

import './index.less';
import toolkit from '../../../components/toolkit';
import defaultHeadimg from '../../../common/images/default-headimg.jpg';

$(function() {
    
    class index {
        constructor() {
            toolkit.userLogin(() => {
                this.init();
            });
        }
        init() {

            this.getuserinfo((data) => {
                $('.headimg').css('backgroundImage',`url('${data.headimg}')`);
                $('.nickname').text(data.nickname);
                if (data.mobile) {
                    $('.mobile').text(toolkit.mobile2show(data.mobile));
                } else {
                    $('.mobile').text('手机号暂未绑定');
                }
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

    new index();
});
