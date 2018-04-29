/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-04-29 14:26:38
 */

import './index.less';

$(function() {
    
    class Index {
        constructor() {
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.formdata = {};
        }
        init() {
            
            this.events()
        }
        events() {

            // 打开地图
            this.$input1.on('click',() => {

            })

            // 保存
            $('#btn').on('click',() => {
                this.formdata.input1 = this.$input1.find('input').val();
                this.formdata.input2 = this.$input2.find('input').val();
                console.log(this.formdata);
            })

            // input change
            // const $input2clear = this.$input2.find('.input-right');
            // const $input2val = this.$input2.find('input');
            // $input2val.on('change',() => {
            //     if ($input2val.val()) {
            //         $input2clear.removeClass('hide');
            //     }
            // })
            // $input2clear.on('click',() => {
            //     $input2val.addClass('hide');
            //     $input2val.val('');
            // })

            
        }
    }

    new Index().init()
});
