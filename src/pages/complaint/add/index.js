/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-14 08:45:14
 */

import './index.less';

$(function() {
    class Index {
        constructor() {
            this.$input1 = $('#input-1');
        }
        init() {
            
            this.events()
        }
        events() {


            // 保存
            $('#btn').on('click',() => {
                
                this.saveAddress(this.formdata);
            })

        }
        saveAddress(data) {
            pop.show('success','提交中，请稍后');
            toolkit.fetch({
                url: '/Address/createAddress',
                data,
                success: (res) => {
                    if (res.success) {
                        //window.location.href = ''
                    }
                }
            })
        }
    }

    new Index().init()
});
