/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-21 09:15:36
 */

import './index.less';
import moonpng from '../../../common/images/moon.png';

import Pop from '../../../components/pop';
import Toolkit from '../../../components/toolkit';
import BetterPicker from 'better-picker';
import Formatdate from '../../../components/formatDate';
import Wechat from '../../../components/wehcat';
import Map from '../../../components/map/index';
import reg from '../../../components/reg';

$(function () {

    class Index {
        constructor() {
            this.userinfo = null;

            this.type1 = 0;
            this.type2 = 0;
            this.imgs = [];
            this.formdata = {
                address_txt_1: '',
                address_txt_2: '',
                address_x: '',
                address_y: '',
                address_user_id: '',
                address_user_name: '',
                address_phone: ''
            };
            this.mapinfo = Toolkit.getMapInfo();
            this.debug = window.location.hostname === 'localhost' ? true : false;
        }
        init() {
            // 夜晚模式
            if (this.isNight()) {
                $('#night .moon').css('background-image', `url('${moonpng}')`);
                $('#night').show();
            } else {
                Wechat.config();
                $('#app').show();
                this.$select1 = $('#select1');
                this.$select2 = $('#select2');
                this.$select3 = $('#select3');
                Toolkit.userLogin(() => {
                    this.event();
                })
            }
        }
        event() {
            // 获取用户信息
            this.getUserInfo((data) => {
                this.userinfo = data;
                this.setUserInfo(this.userinfo);
            }, () => {

            })
            // 初始化上传
            Toolkit.uploadInit('uploadBtn', res => {
                if (res.success) {
                    this.uploadSuccess(res.data);
                }
            }, 'property', 'work');

            // 点击上传点图片删除
            $('.imgs-box').on('click', '.img', (e) => {
                const index = e.target.dataset.index;
                this.imgs.splice(index, 1);
                $('.imgs-box').find('.img').eq(index).remove();
                $('.upload').show();
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
                const type2 = this.getSecondType(type1[0].value);
                this.type2wheel = new BetterPicker({
                    data: [
                        type2
                    ],
                    title: '请选择小类'
                });

                this.type1wheel.on('picker.select', (selectedVal, selectedIndex) => {
                    if (selectedVal[0] !== this.type1) {
                        this.type1 = selectedVal[0];
                        this.$select1.find('.select-name').text(this.getTypeById(this.type1).type_name);
                        if (this.type2) {
                            this.type2 = 0;
                            this.$select2.find('.select-name').text('请选择');
                        }
                        const type2 = this.getSecondType(this.type1);
                        this.type2wheel.refillColumn(0, type2);
                    }
                })

                this.type2wheel.on('picker.select', (selectedVal, selectedIndex) => {
                    this.type2 = selectedVal[0];
                    this.$select2.find('.select-name').text(this.getTypeById(this.type2).type_name);
                })
            })

            // 选择大类
            this.$select1.on('click', () => {
                this.type1wheel.show();
            })
            // 选择小类
            this.$select2.on('click', () => {
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
                        this.$select3.find('.select-name').text(this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2);
                    })
                }
            })
            // 选择地址
            this.$select3.on('click', () => {
                if (!this.addressData) {
                    this.addressPicker.show();
                } else {
                    this.initAddressBox();
                }
            })

            // 开始录音
            const $luyin = $('#luyin');
            const $yuyin = $('#yuyin');
            let isLuyin = false;
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
                    Wechat.startRecord(res => {
                        console.log(res);
                    });
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
        uploadSuccess(data) {
            const imgpath = data.attach_path;
            this.imgs.push(imgpath);
            const index = this.imgs.length - 1;
            $('.imgs-box').append(`<div class="img" data-index=${index} data-url="${imgpath}" style="background-image:url('${imgpath}');"></div>`);
            if (this.imgs.length >= 3) {
                $('.upload').hide();
            }
        }
        initAddressBox() {
            this.$input1 = $('#input-1');
            this.$input2 = $('#input-2');
            this.$input3 = $('#input-3');
            this.$input4 = $('#input-4');
            if (this.debug) {
                this.getProjectsNear(30.24, 120.34, res => {
                    this.projectData = res.data;
                    const data = this.initProjectData(res.data);
                    this.map = new Map(null, {
                        data: data,
                        lat: data[0].lat,
                        lng: data[0].lng,
                        key: this.mapinfo.key,
                        app: this.mapinfo.app,
                        listview: 2
                    });
                    this.map.on('map-click', marker => {
                        this.markerClickSuccess(marker);
                    })
                })
            } else {
                Wechat.getLocation(res => {
                    this.getProjectsNear(res.lat, res.lng, res => {
                        this.projectData = res.data;
                        const data = this.initProjectData(res.data);
                        this.map = new Map(null, {
                            data: data,
                            lat: data[0].lat,
                            lng: data[0].lng,
                            key: this.mapinfo.key,
                            app: this.mapinfo.app,
                            listview: 2
                        });
                        this.map.on('map-click', marker => {
                            this.markerClickSuccess(marker);
                        })
                    })
                })
            }

            $('#address').show();
            // 打开地图
            this.$input1.on('click', () => {
                this.map.show();
            })

            // 保存
            $('#btn-save-addr').on('click', () => {
                this.formdata.address_txt_1 = this.$input1.find('input').val();
                this.formdata.address_txt_2 = this.$input2.find('input').val();
                this.formdata.address_user_name = this.$input3.find('input').val();
                this.formdata.address_phone = this.$input4.find('input').val();
                if (!this.formdata.address_txt_1 || !this.formdata.address_txt_2 || !this.formdata.address_user_name || !this.formdata.address_phone) {
                    Pop.show('error', '所有选项均为必填').hide(800);
                    return false;
                }
                if (!reg.isMobile(this.formdata.address_phone)) {
                    Pop.show('error', '请填写正确的手机号').hide(800);
                    return false;
                }
                this.saveAddress(this.formdata, res => {
                    if (res.success) {
                        this.addressDesc = res.data;
                        this.$select3.find('.select-name').text(this.addressDesc.address_txt_1 + this.addressDesc.address_txt_2);                        
                        $('#address').hide();
                    }
                });
            })
        }
        markerClickSuccess(marker) {
            console.log(marker);
            if (marker) {
                this.map.hide();
                this.selectProjectData = this.getProjectById(marker.id);
                if (this.selectProjectData) {
                    this.$input1.find('input').val(this.selectProjectData.project_address);
                }
            }
        }
        getProjectById(id) {
            let data = null;
            for (let index = 0; index < this.projectData.length; index++) {
                const element = this.projectData[index];
                if (element.project_id === id) {
                    data = element
                }
            }
            return data;
        }
        initProjectData(array) {
            let arr = [];
            for (let index = 0; index < array.length; index++) {
                const item = array[index];
                const element = {
                    id: item.project_id,
                    lat: item.address_x,
                    lng: item.address_y,
                    title: item.title,
                    addr: item.project_address
                };
                arr.push(element);
            }
            return arr;
        }
        getProjectsNear(lat, lng, cb) {
            Toolkit.fetch({
                url: '/Project/getProjectsNear',
                data: {
                    address_x: lat,
                    address_y: lng
                },
                success: (res) => {
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        pop.show('error', res.msg).hide();
                    }
                }
            })
        }
        saveAddress(data, cb) {
            Toolkit.fetch({
                url: '/Address/createAddress',
                data,
                success: (res) => {
                    if (res.success) {
                        cb && cb(res);
                    } else {
                        Pop.show('error', res.msg).hide();
                    }
                }
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
                if (item.type_level === '1') {
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
            $('.headimg').css('background-image', `url('${data.user_img}')`);
            $('.nickname').text(data.user_name);
            if (data.mobile) {
                $('.mobile').text(Toolkit.mobile2show(data.user_phone));
            } else {
                $('.mobile').hide();
                $('.userinfo').show();
            }
        }
        getUserInfo(success, error) {
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
