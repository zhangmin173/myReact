/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-19 15:03:32
 */

import './index.less';
import Pop from '../../../../components/pop';
import Toolkit from '../../../../components/toolkit';

$(function() {
    class Index {
        constructor() {
            this.$complaint = $('#complaint');
            this.postData = {};
        }
        init() {
            
            this.events()
        }
        events() {

            // 保存
            $('#btn').on('click',() => {
                this.postData.complainit = this.$complaint.val();
                console.log(this.postData);
                if (this.postData.complainit) {
                    this.save(this.postData);
                }
            })

        }
        save(data) {
            Toolkit.fetch({
                url: '/Complainit/createComplainit',
                data,
                success: (res) => {
                    if (res.success) {
                        Pop.show('success',res.msg).hide();
                    }
                },
                error: () => {
                    Pop.show('error','服务器异常').hide();
                }
            })
        }
    }

    new Index().init()
});
