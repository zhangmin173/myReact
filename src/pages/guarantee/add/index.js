/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 21:44:12
 */

import './index.less';
import Toolkit from '../../../components/toolkit';
import BetterPicker from 'better-picker';

$(function() {

    class Index {
        constructor() {
            this.userinfo = null;

            this.$select1 = $('#select1');
            this.$select2 = $('#select2');

            this.type1 = 0;
            this.type2 = 0;
        }
        init() {
            
            this.getUserInfo((data) => {
                this.userinfo = data;
                this.setUserInfo(this.userinfo);
            },() => {
                
            })

            this.getTypes((data) => {
                this.types = data;
                const type1 = this.getFirstType();
                this.type1wheel = new BetterPicker({
                    data: [
                        type1
                    ],
                    title: '请选择大类'
                });
                console.log(this.type1wheel);
                const type2 = this.getSecondType(type1[0].value);
                this.type2wheel = new BetterPicker({
                    data: [
                        type2
                    ],
                    title: '请选择小类'
                });
                console.log(this.type2wheel);
                
                this.type1wheel.on('picker.select', (selectedVal, selectedIndex) => {
                    if (selectedVal[0] !== this.type1) {
                        this.type1 = selectedVal[0];
                        this.$select1.find('.select-name').text(this.getTypeById(this.type1).type_name);
                        if (this.type2) {
                            this.type2 = 0;
                            this.$select2.find('.select-name').text('请选择');
                        }
                        const type2 = this.getSecondType(this.type1);
                        this.type2wheel.refillColumn(0,type2);
                    }                    
                })

                this.type2wheel.on('picker.select', (selectedVal, selectedIndex) => {
                    this.type2 = selectedVal[0];
                    this.$select2.find('.select-name').text(this.getTypeById(this.type2).type_name);
                })
            })

            this.$select1.on('click',() => {
                this.type1wheel.show();
            })

            this.$select2.on('click',() => {
                this.type2wheel.show();
            })
        }
        getTypeById(type_id) {
            let val = null;
            this.types.forEach(item => {
                if (item.type_id === type_id) {
                    val = item;
                }
            });
            return val;
        }
        getFirstType() {
            let arr = [];
            this.types.forEach(item => {
                if (item.type_level === 1) {
                    const obj = {
                        text: item.type_name,
                        value: item.type_id
                    }
                    arr.push(obj);
                }
            })
            return arr;
        }
        getSecondType(type_id) {
            let arr = [];
            this.types.forEach(item => {
                if (item.type_parent_id === type_id) {
                    const obj = {
                        text: item.type_name,
                        value: item.type_id
                    }
                    arr.push(obj);
                }
            })
            return arr;
        }
        getTypes(cb) {
            Toolkit.fetch({
                url: '/Type/getTypes',
                type: 'get',
                success: res => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
        setUserInfo(data) {
            $('.headimg').css('background-image',`url('${data.user_img}')`);
            $('.mobile').text(Toolkit.mobile2show(data.user_phone));
            $('.nickname').text(data.user_name);
        }
        getUserInfo(success,error) {
            Toolkit.fetch({
                url: '/User/getUser',
                type: 'get',
                success: res => {
                    if (res.success) {
                        success && success(res.data)
                    } else {
                        error && error()
                    }
                }
            })
        }
    }

    new Index().init()
});
