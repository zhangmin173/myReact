/*
 * @Author: Zhang Min 
 * @Date: 2018-04-28 08:57:30 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-07 20:24:06
 */

import './index.less';
import Toolkit from '../../components/toolkit';
import Picker from '../../components/picker/index';
import ActionSheet from '../../components/actionSheet/index';
import BetterPicker from 'better-picker';

$(function () {

    class Index {
        constructor() {
            this.data = [
                {
                    text: '张三',
                    value: 1
                },
                {
                    text: '李四',
                    value: 2
                },
                {
                    text: '王五',
                    value: 3
                },
                {
                    text: '赵六',
                    value: 4
                },
                {
                    text: '吴七',
                    value: 5
                },
                {
                    text: '陈八',
                    value: 6
                },
                {
                    text: '杜九',
                    value: 7
                },
                {
                    text: '黄十',
                    value: 8
                },
                {
                    text: '呵呵',
                    value: 9
                },
                {
                    text: '哈哈',
                    value: 10
                }
            ];
        }
        init() {
            this.picker = new BetterPicker({
                data: [
                    this.data
                ],
                title: '我们都是小学生'
            });
            this.picker.show();
            console.log(this.picker);

            this.picker.on('picker.select', (selectedVal, selectedIndex) => {
                console.log(selectedVal);
                console.log(selectedIndex);
                console.log(this.data[selectedIndex[0]].text);
            })
        }
    }

    new Index().init()
});
