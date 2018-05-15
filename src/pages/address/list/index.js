/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-15 20:31:00
 */

import './index.less';
import Template from '../../../../libs/lib-artTemplate/index';
import Listview from '../../../components/listview/index';

$(function() {
    class Index {
        constructor() {
            this.$wrap = $('.address-list');
        }
        init() {
            this.Listview = new Listview({
                url: '/Address/getAddresss'
            })
            this.Listview.on('success', res => {
                const htmlStr = Template('tpl', res);
                this.$wrap.append(htmlStr);
            })
            this.Listview.init()
        }
    }
    new Index().init()
});
