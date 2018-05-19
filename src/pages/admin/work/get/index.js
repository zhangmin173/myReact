/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-19 15:13:04
 */

import './index.less';
import Pop from '../../../../components/pop';
import Template from '../../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../../components/tabsview/index';
import Toolkit from '../../../../components/toolkit';
import BetterPicker from 'better-picker';
import IosSelect from 'iosselect';

$(function () {
    class Index {
        constructor() {
            this.workTypes = Toolkit.getWorkTypes();
            this.tabs = new Tabsview({
                timeout: 300,
                tabs: [
                    {
                        title: '待处理',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[0]
                        }
                    },
                    {
                        title: '派单中',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[1]
                        }
                    },
                    {
                        title: '处理中',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[2]
                        }
                    },
                    {
                        title: '已完成',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[3]
                        }
                    },
                    {
                        title: '延期转单',
                        url: '/Work/getWorks',
                        querys: {
                            work_status: this.workTypes[4]
                        }
                    }
                ]
            });

        }
        init() {
            this.tabs.on('success', (res, tabIndex, tabContent, that) => {
                const html = Template('tpl-work-1', res);
                tabContent.find('ul').append(html);
            })
            this.tabs.init();

            // 获取报修类型
            this.getWorkers((data) => {
                this.workers = data;
                const workers = this.createData(this.workers);
                this.workerwheel = new BetterPicker({
                    data: [
                        workers
                    ],
                    title: '派单给维修员'
                });
                this.workerwheel.on('picker.select', (selectedVal, selectedIndex) => {
                    const worker = this.workers[selectedIndex[0]];
                    this.paijian(worker);
                })
            })

            this.initDatepicker();

            this.events();
        }
        events() {
            const self = this;
            // todo
            $('.tabs-components').on('click', '.paijian', function () {
                self.work_id = $(this).data('id');
                self.workerwheel.show();
            })
        }
        initDatepicker() {
            var selectDateDom = $('#selectDate');
            var showDateDom = $('#showDate');
            // 初始化时间
            var now = new Date();
            var nowYear = now.getFullYear();
            var nowMonth = now.getMonth() + 1;
            var nowDate = now.getDate();
            showDateDom.attr('data-year', nowYear);
            showDateDom.attr('data-month', nowMonth);
            showDateDom.attr('data-date', nowDate);
            // 数据初始化
            function formatYear(nowYear) {
                var arr = [];
                for (var i = nowYear - 5; i <= nowYear + 5; i++) {
                    arr.push({
                        id: i + '',
                        value: i + '年'
                    });
                }
                return arr;
            }
            function formatMonth() {
                var arr = [];
                for (var i = 1; i <= 12; i++) {
                    arr.push({
                        id: i + '',
                        value: i + '月'
                    });
                }
                return arr;
            }
            function formatDate(count) {
                var arr = [];
                for (var i = 1; i <= count; i++) {
                    arr.push({
                        id: i + '',
                        value: i + '日'
                    });
                }
                return arr;
            }
            var yearData = function (callback) {
                callback(formatYear(nowYear))
            }
            var monthData = function (year, callback) {
                callback(formatMonth());
            };
            var dateData = function (year, month, callback) {
                if (/^(1|3|5|7|8|10|12)$/.test(month)) {
                    callback(formatDate(31));
                }
                else if (/^(4|6|9|11)$/.test(month)) {
                    callback(formatDate(30));
                }
                else if (/^2$/.test(month)) {
                    if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
                        callback(formatDate(29));
                    }
                    else {
                        callback(formatDate(28));
                    }
                }
                else {
                    throw new Error('month is illegal');
                }
            };
            var hourData = function (one, two, three, callback) {
                var hours = [];
                for (var i = 0, len = 24; i < len; i++) {
                    hours.push({
                        id: i,
                        value: i + '时'
                    });
                }
                callback(hours);
            };
            var minuteData = function (one, two, three, four, callback) {
                var minutes = [];
                for (var i = 0, len = 60; i < len; i++) {
                    minutes.push({
                        id: i,
                        value: i + '分'
                    });
                }
                callback(minutes);
            };
            selectDateDom.bind('click', function () {
                var oneLevelId = showDateDom.attr('data-year');
                var twoLevelId = showDateDom.attr('data-month');
                var threeLevelId = showDateDom.attr('data-date');
                var fourLevelId = showDateDom.attr('data-hour');
                var fiveLevelId = showDateDom.attr('data-minute');
                var iosSelect = new IosSelect(5,
                    [yearData, monthData, dateData, hourData, minuteData],
                    {
                        title: '地址选择',
                        itemHeight: 35,
                        itemShowCount: 9,
                        oneLevelId: oneLevelId,
                        twoLevelId: twoLevelId,
                        threeLevelId: threeLevelId,
                        fourLevelId: fourLevelId,
                        fiveLevelId: fiveLevelId,
                        callback: function (selectOneObj, selectTwoObj, selectThreeObj, selectFourObj, selectFiveObj) {
                            showDateDom.attr('data-year', selectOneObj.id);
                            showDateDom.attr('data-month', selectTwoObj.id);
                            showDateDom.attr('data-date', selectThreeObj.id);
                            showDateDom.attr('data-hour', selectFourObj.id);
                            showDateDom.attr('data-minute', selectFiveObj.id);
                            showDateDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value + ' ' + selectFourObj.value + ' ' + selectFiveObj.value);
                        }
                    });
            });

        }
        paijian(worker) {
            if (!this.work_id) {
                return false;
            }
            Toolkit.ajax({
                url: '/Work/updateWork',
                data: {
                    work_id: this.work_id,
                    work_worker_id: worker.work_id,
                    work_worker_name: worker.worker_name,
                    work_worker_phone: worker.worker_phone
                },
                success: res => {
                    if (res.success) {
                        this.work_id = 0;
                        Pop.show('success', res.msg).hide();
                    }
                }
            })
        }
        createData(data) {
            let arr = [];
            data.forEach(item => {
                const obj = {
                    text: item.worker_name,
                    value: item.worker_id
                }
                arr.push(obj);
            })
            return arr;
        }
        getWorkers(cb) {
            Toolkit.ajax({
                url: '/Worker/getWorkers',
                success: (res) => {
                    if (res.success) {
                        cb && cb(res.data);
                    }
                }
            })
        }
    }

    new Index().init()
});
