/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-01 09:52:28
 */

import './index.less';
import toolkit from '../../../components/toolkit';
import pop from '../../../components/pop';
import reg from '../../../components/reg';

$(function() {
    
    class Index {
        constructor() {
            this.$apptitle = $('.app-nav-title');
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$tip = $('.tip');
            this.formdata = {};
        }
        init() {
            
            this.$apptitle.text(this.getAppTitle());
            this.events()
        }
        events() {

            // 保存
            $('#btn').on('click',() => {
                this.formdata.input1 = this.$input1.find('input').val();
                this.formdata.input2 = this.$input2.find('input').val();
                console.log(this.formdata);
                if (!this.formdata.input1) {
                    pop.show('error','姓名不能为空').hide(800);
                    return false;
                }
                if (this.formdata.input2) {
                    pop.show('error','手机号不能为空').hide(800);
                    return false;
                }
                if (!reg.isMobile(this.formdata.input2)) {
                    pop.show('error','请填写正确的手机号').hide(800);
                    return false;
                }
                this.saveInformation(this.formdata);
            })

            
        }
        getAppTitle() {
            let apptitle = '';
            const action = toolkit.getUrlParameter('action');
            switch(action) {
                case 'headimg':
                    apptitle = '修改头像';
                    break;
                case 'nickname':
                    apptitle = '修改昵称';
                    this.$input1.show();
                    break;
                case 'mobile':
                    apptitle = '修改手机号';
                    this.$input2.show();
                    break;
                default:
                    break;
            }
            return apptitle;
        }
        saveInformation(data) {
            pop.show('success','提交中，请稍后');
            toolkit.fetch({
                url: '/User/updateUser',
                data,
                success: (res) => {
                    
                }
            })
        }
    }

    new Index().init()
});
