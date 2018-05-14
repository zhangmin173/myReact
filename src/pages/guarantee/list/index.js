/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-12 13:07:36
 */

import './index.less';
import template from '../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../components/tabsview/index';
import Toolkit from '../../../components/toolkit';

$(function () {
    class Index {
        constructor() {
            // this.loader = new Listview({
            //     url: '/Work/getWorks',
            //     querys: {
            //         work_id: 1
            //     },
            //     wrapper: $('.wrapper ul')        
            // });
            this.workTypes = Toolkit.getWorkTypes();
            this.tabs = new Tabsview({
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
            // this.loader.on('success', res => {
            //     const html = template('tpl-work',res);
            //     this.loader.$wrapper.append(html);
            // })
            // this.loader.on('finished',res => {
            //     console.log(res);
            // })

            this.tabs.on('success', (res, tabIndex, tabContent, that) => {
                const html = template('tpl-work-1', res);
                tabContent.find('ul').append(html);
            })
            this.tabs.init();
            this.events();
        }
        events() {
            // todo

        }
    }

    new Index().init()
});
