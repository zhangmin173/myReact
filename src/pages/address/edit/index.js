/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-15 20:56:40
 */

import './index.less';
import toolkit from '../../../components/toolkit';
import pop from '../../../components/pop';
import reg from '../../../components/reg';

$(function() {
    
    class Index {
        constructor() {
            this.address_id = toolkit.getUrlParameter('id');
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$input3 = $('#input-3');
            this.$input4 = $('#input-4');
            this.formdata = {
                address_id: this.address_id,
                address_txt_1: '',
                address_txt_2: '',
                address_x: '',
                address_y: '',
                address_user_id: '',
                address_user_name: '',
                address_phone: ''
            };
        }
        init() {
            this.getAddress(this.address_id,(res) => {
                this.formdata.address_txt_1 = res.data.address_txt_1;
                this.formdata.address_txt_2 = res.data.address_txt_2;
                this.formdata.address_x = res.data.address_x;
                this.formdata.address_y = res.data.address_y;
                this.formdata.address_user_id = res.data.address_user_id;
                this.formdata.address_user_name = res.data.address_user_name;
                this.formdata.address_phone = res.data.address_phone;
                this.renderdata(this.formdata);
            });
            this.events()
        }
        events() {

            // 打开地图
            this.$input1.on('click',() => {

            })

            // 保存
            $('#btn').on('click',() => {
                // this.formdata.address_txt_1 = this.$input1.find('input').val();
                this.formdata.address_txt_2 = this.$input2.find('input').val();
                this.formdata.address_user_name = this.$input3.find('input').val();
                this.formdata.address_phone = this.$input4.find('input').val();                
                console.log(this.formdata);
                if (!this.formdata.address_txt_1 || !this.formdata.address_txt_2 || !this.formdata.address_user_name || !this.formdata.address_phone) {
                    pop.show('error','所有选项均为必填').hide(800);
                    return false;
                }
                if (!reg.isMobile(this.formdata.address_phone)) {
                    pop.show('error','请填写正确的手机号').hide(800);
                    return false;
                }
                this.updateAddress(this.formdata);
            })

            // 删除
            $('#del').on('click',() => {
                this.delAddress(this.address_id);
            })
        }
        renderdata(data) {
            this.$input1.find('input').val(data.address_txt_1);
            this.$input2.find('input').val(data.address_txt_2);
            this.$input3.find('input').val(data.address_user_name);
            this.$input4.find('input').val(data.address_phone);
        }
        getAddress(address_id,cb) {
            toolkit.fetch({
                url: '/Address/getAddress',
                data: {
                    address_id: address_id
                },
                success: (res) => {
                    cb && cb(res)
                }
            })
        }
        updateAddress(data) {
            pop.show('success','提交中，请稍后');
            toolkit.fetch({
                url: '/Address/updateAddress',
                data,
                success: (res) => {
                    pop.hide(0);
                    if (res.success) {
                        window.location.href = '../list/index.html';
                    } else {
                        pop.show('error',res.msg).hide();
                    }
                }
            })
        }
        delAddress(address_id) {
            pop.show('','删除中，请稍后');
                toolkit.fetch({
                    url: '/Address/deleteAddress',
                    data: {
                        address_id: address_id
                    },
                    success: (res) => {
                        pop.hide(0);
                        if (res.success) {
                            window.location.href = '../list/index.html';
                        } else {
                            pop.show('error',res.msg).hide();
                        }
                    }
                })
        }
    }

    new Index().init()
});
