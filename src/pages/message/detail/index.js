/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-29 22:57:33
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';
import Template from '../../../../libs/lib-artTemplate/index';

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
                url: '/Messages/createMessageByUser',
                data,
                success: (res) => {
                    if (res.success) {
                        
                    } else {

                    }
                }
            })
        }
    }

    new Index().init()
});
