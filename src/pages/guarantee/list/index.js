/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-04 14:57:20
 */

import './index.less';
import template from '../../../../libs/lib-artTemplate/index';
import Tabsview from '../../../components/tabsview/index';

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

            this.tabs = new Tabsview({
                tabs: [
                    {
                        title: 'tab1',
                        url: '/Work/getWorks',
                    },
                    {
                        title: 'tab2',
                        url: '/Work/getWorks',
                    },
                    {
                        title: 'tab2',
                        url: '/Work/getWorks',
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

            this.tabs.on('tabChange', (tabIndex, wrap) => {
                console.log(tabIndex, wrap)
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
