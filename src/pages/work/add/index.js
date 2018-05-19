/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-12 12:14:07
 */

import './index.less';
import moonpng  from '../../../common/images/moon.png';

import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';
import BetterPicker from 'better-picker';
import BenUploadUtils from '../../../components/upload/index';
import Formatdate from '../../../components/formatDate';

$(function() {

    class Index {
        constructor() {
            this.userinfo = null;

            this.$select1 = $('#select1');
            this.$select2 = $('#select2');
            this.$select3 = $('#select3');

            this.type1 = 0;
            this.type2 = 0;
            this.imgs = [];
        }
        init() {
            // 夜晚模式
            if (this.isNight()) {
                $('#night .moon').css('background-image',`url('${moonpng}')`);
                $('#night').show();
                return false;
            } else {
                $('#app').show();
            }
            // 初始化上传
            BenUploadUtils({
                dom: "#uploadBtn",		// 需要挂在的DOM
                url: "/Upload/image",				// 上传的服务器地址
                limitSize: 10240000,    // 1024000kb
                limitFormat: 'gif,jpg,jpeg,png,GIF,JPG,PNG', // 使用什么格式
                limitSizeCallback: function(err){	// 限制大小的回调事件
                    console.log(err);
                },
                limitFormatCallback: function(err){	// 限制格式的回调事件
                    console.log(err);
                },
                onUploadBeforeCallback: function(res){	// 上传图片之前的回调事件
                    console.log(res);
                },
                onUploadSuccessCallback: (res) => {	// 上传成功的回调事件
                    res = JSON.parse(res);
                    if (res.success) {
                        const imgpath = res.data.url;
                        this.imgs.push(imgpath);
                        const index = this.imgs.length - 1;
                        $('.imgs-box').append(`<div class="img" data-index=${index} data-url="${imgpath}" style="background-image:url('${imgpath}');"></div>`);
                        if (this.imgs.length >= 3) {
                            $('.upload').hide();
                        }
                    }
                },
                onUploadFailCallback: function(res){ // 上传失败的回调事件
                    console.log(res);
                },
                onUploadAlwaysCallback: function(res){	// 上传无论什么结果的回调事件
                    console.log(res);
                },
                onRenderResizerBefore: function(res){	// 压缩之前的回调事件
                    //$("#preview").attr("src",res);
                },
                onRenderResizerAfter: function(res){	// 压缩之后的回调事件
                    //$("#nextview").attr("src",res);
                }
            }).init();

            // 点击上传点图片删除
            $('.imgs-box').on('click', '.img', (e) => {
                const index = e.target.dataset.index;
                this.imgs.splice(index,1);
                $('.imgs-box').find('.img').eq(index).remove();
                $('.upload').show();
            })
            
            // 获取用户信息
            this.getUserInfo((data) => {
                this.userinfo = data;
                this.setUserInfo(this.userinfo);
            },() => {
                
            })

            // 获取报修类型
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

            // 选择大类
            this.$select1.on('click',() => {
                this.type1wheel.show();
            })
            // 选择小类
            this.$select2.on('click',() => {
                this.type2wheel.show();
            })

            // 获取用户地址列表
            this.getAddress((data) => {
                if (data.length) {
                    this.addressData = data;
                    const pickerData = this.getAddressPickerData();
                    this.addressPicker = new BetterPicker({
                        data: [
                            pickerData
                        ],
                        title: '请选择地址'
                    });

                    this.addressPicker.on('picker.select', (selectedVal, selectedIndex) => {
                        const addressId = selectedVal[0];
                        this.addressDesc = this.getAddressById(addressId);
                        console.log(this.addressDesc);
                        this.$select3.find('.select-name').text(this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2);
                    })
                }
            })
            // 选择地址
            this.$select3.on('click',() => {
                this.addressPicker.show();
            })

            // 开始录音
            const $luyin = $('#luyin');
            const $yuyin = $('#yuyin');
            let isLuyin = false;
            // $luyin.on({
            //     touchstart: (e) => {
            //         e.stopPropagation();
            //         e.preventDefault();
            //         $luyin.find('.label').text('请开始说话');
            //     },
            //     touchmove: () => {

            //     },
            //     touchend: () => {
            //         $luyin.find('.label').text('请长按说话');
            //     }
            // });
            $luyin.on('click', () => {
                if (isLuyin) {
                    // 正在录音 todo
                    $luyin.find('.label').text('录音成功，正在上传...');
                    setTimeout(() => {
                        isLuyin = false;
                        $luyin.hide();
                        $luyin.find('.label').text('请点击说话');
                        $yuyin.find('.time').text('60');
                        $yuyin.show();
                    }, 1000)
                } else {
                    // 开始录音 todo
                    isLuyin = true;
                    $luyin.find('.label').text('请开始说话');
                }
            })
            // 点击播放
            $yuyin.on('click', () => {
                $yuyin.hide();
                $luyin.show();
            })

            // 提交
            $('#submitBtn').on('click', () => {
                if (!this.imgs.length) {
                    Pop.show('error', '请上传图片').hide(800);
                    return false;
                }
                if (!this.type1 || !this.type2 || !this.addressDesc) {
                    Pop.show('error', '请完成其他选项').hide(800);
                    return false;
                }
                const data = {
                    work_imgs: this.imgs,
                    work_phone: this.userinfo.user_phone,
                    work_user_name: this.userinfo.user_name,
                    work_type1: this.type1,
                    work_type2: this.type2,
                    work_address: this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2,
                    work_address_x: this.addressDesc.address_x,
                    work_address_y: this.addressDesc.address_y,
                    project_id: this.addressDesc.project_id,
                    work_voice: '',
                    work_user_note: $('#beizhu').val()
                }
                console.log(data);
                Toolkit.fetch({
                    url: '/Work/createWork',
                    data: data,
                    success: (res) => {
                        if (!res.success) {
                            Pop.show(res.msg);
                        } else {
                            window.location.href = '../list/index.html';
                        }
                    }
                })
            })
        }
        isNight() {
            const format = new Formatdate();
            const time = format.formatDate('hh');
            let isNight = false;
            console.log('now time: ' + time);
            if (time >= 0 && time <= 6 || time >= 22 && time <= 24) {
                isNight = true;
            }
            return isNight;
        }
        getAddress(cb) {
            Toolkit.fetch({
                url: '/Address/getAddresss',
                success: (res) => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
        getAddressPickerData(data) {
            let arr = [];
            this.addressData.forEach(item => {
                const obj = {
                    text: item.address_txt_1 + item.address_txt_2,
                    value: item.address_id
                }
                arr.push(obj);
            })
            return arr;
        }
        getAddressById(address_id) {
            let val = null;
            this.addressData.forEach(item => {
                if (item.address_id === address_id) {
                    val = item;
                }
            });
            return val;
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
