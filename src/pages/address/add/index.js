/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-16 22:32:51
 */

import './index.less';
import toolkit from '../../../components/toolkit';
import pop from '../../../components/pop';
import reg from '../../../components/reg';
import Map from '../../../components/map/index';

$(function() {
    
    class Index {
        constructor() {
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$input3 = $('#input-3');
            this.$input4 = $('#input-4');
            this.formdata = {
                address_txt_1: '浙江',
                address_txt_2: '',
                address_x: '',
                address_y: '',
                address_user_id: '',
                address_user_name: '',
                address_phone: ''
            };
            this.mapinfo = toolkit.getMapInfo();
        }
        init() {
            this.getProjectsNear(res => {
                const data = this.initProjectData(res.data);
                this.map = new Map({
                    data: data,
                    key: this.mapinfo.key,
                    app: this.mapinfo.app
                })
                this.map.show();
            })
            this.events()
        }
        initProjectData(array) {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const item = array[index];
                const element = {
                    x: item.address_x,
                    y: item.address_y,
                    title: item.title,
                    addr: item.project_address
                };
                arr.push(element);
            }
            return arr;
        }
        events() {

            // 打开地图
            this.$input1.on('click',() => {
                // qq.maps.Geolocation(this.mapinfo.key, this.mapinfo.app);
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
                this.saveAddress(this.formdata);
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
        getProjectsNear(cb) {
            toolkit.fetch({
                url: '/Project/getProjectsNear',
                data: {

                },
                success: (res) => {
                    pop.hide(0);
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        pop.show('error',res.msg).hide();
                    }
                }
            })
        }
        saveAddress(data) {
            pop.show('success','提交中，请稍后');
            toolkit.fetch({
                url: '/Address/createAddress',
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
    }

    new Index().init()
});
