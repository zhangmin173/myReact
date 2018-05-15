/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-15 21:33:59
 */

import './index.less';
import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';

$(function() {
    class Index {
        constructor() {
            
            this.postData = {};
        }
        init() {
            
            this.events()
        }
        events() {

            // 保存
            $('#btn').on('click',() => {
                this.postData.name = $('#input-1').val();
                this.postData.password = $('#input-2').val();
                console.log(this.postData);
                if (this.postData.name && this.postData.password) {
                    this.save(this.postData);
                }
            })

        }
        save(data) {
            Toolkit.fetch({
                url: '/Admin/login',
                data,
                success: (res) => {
                    if (res.success) {
                        Pop.show('success',res.msg).hide(0);
                        window.location.href = '../guarantee//list/index.html';
                    } else {
                        Pop.show('error',res.msg).hide();
                    }
                }
            })
        }
    }

    new Index().init()
});
