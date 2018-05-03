/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-03 10:45:30
 */

import './index.less';
import template from '../../../../libs/lib-artTemplate/index';
import RollingLoad from '../../../components/rollingLoad';

$(function() {
    class Index {
        constructor() {
            this.loader = new RollingLoad({
                url: '/Work/getWorks',
                querys: {
                    work_id: 1
                },
                wrapper: $('#wrapper ul')             
            })
        }
        init() {
            this.loader.on('success', res => {
                const html = template('tpl-work',res);
                this.loader.$wrapper.append(html);
            })
            this.loader.on('finished',res => {
                console.log(res);
            })
            this.loader.init();
            console.log(this.loader);
            this.events();
        }
        events() {
            // todo
            $(window).on('scroll',function(){
                if(scrollTop() + windowHeight() >= (documentHeight() - 50)){
                 waterallowData();
                }
               });
        }
    }

    new Index().init()
});
