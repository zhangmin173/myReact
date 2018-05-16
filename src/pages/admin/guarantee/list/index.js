/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-16 08:52:40
 */

import './index.less';
import Template from '../../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../../components/tabsview/index';
import Toolkit from '../../../../components/toolkit';
import BetterPicker from 'better-picker';

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
                    this.worker = selectedVal[0];
                })
            })
            
            this.events();
        }
        events() {
            const self = this;
            // todo
            $('.tabs-components').on('click', '.paijian', function() {
                const id = $(this).data('id');
                const type = $(this).data('type');
                self.workerwheel.show();
            })
        }
        createData(data) {
            let arr = [];
            data.forEach(item => {
                const obj = {
                    text: item.type_name,
                    value: item.type_id
                }
                arr.push(obj);
            })
            return arr;
        }
        getWorkers(cb) {
            Toolkit.fetch({
                url: '/Address/getAddresss',
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
