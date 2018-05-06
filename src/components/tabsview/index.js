/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-04 15:35:10
 */

/**
 * 滚动加载
 */
import './index.less';
import Toolkit from '../toolkit';
import Event from '../event';

class Tabsview {
    constructor(opt) {
        Object.assign(this, Event);
        this.opt = opt || {};
        //this.debug = this.opt.debug || false; // 开启调试
        this.$wrapper = this.opt.wrapper || $('.tabs-components');
        this.width = this.$wrapper.width();
        this.timeout = this.opt.timeout || 800;

        this.tabs = this.opt.tabs || [
            {
                title: 'tab1'
            },
            {
                title: 'tab2'
            },
            {
                title: 'tab3'
            }
        ];
        this.tabNum = this.tabs.length;
        this.tabIndex = this.opt.tabIndex || 0;
    }
    init() {
        // 初始化dom
        this.$wrapper.append(this._createTabs(this.tabs));
        // 获取一些dom
        this.$tabBars = this.$wrapper.find('.tab-bar');
        this.$tabContents = this.$wrapper.find('.tab-content');
        this.$tabContentAnimation = this.$wrapper.find('.tabs-content-animation');
        // 设置动画时长
        this._setTranslition(this.$tabContentAnimation, this.timeout);
        // 触发首次显示事件
        this.emit('tabChange', this.tabIndex, this.$tabContents.eq(this.tabIndex));
        // 首次加载数据
        this._loading(this.tabIndex);
        // 首次显示pannel
        this._translate(this.$tabContentAnimation, -this.width * this.tabIndex);

        this.$tabBars.on('click', (e) => {
            const clickIndex = e.target.dataset.index;
            if (clickIndex !== this.tabIndex) {
                this.tabIndex = clickIndex;
                this.$tabBars.removeClass('active');
                e.target.className += ' active';
                this.emit('tabChange', this.tabIndex, this.$tabContents.eq(this.tabIndex));
                this._translate(this.$tabContentAnimation, -this.width * this.tabIndex);
            }
        })

    }
    _initStyle() {
        const barWidth = Math.floor(this.width / this.tabNum);
        return {
            barWidth
        };
    }
    _createTabs(tabs) {
        const tabBars = this._createTabBars(tabs);
        const tabContents = this._createTabContents(tabs);
        const tabsContentWidth = this.width * this.tabNum;

        return `
            <div class="tabs-components">
                <div class="tabs-bar-wrap">
                    <div class="tabs-bar-animation">${tabBars}</div>
                </div>
                <div class="tabs-content-wrap">
                    <div class="tabs-content-animation" style="width:${tabsContentWidth}px;">${tabContents}</div>
                </div>
            </div>
        `;
    }
    _createTabBars(tabs) {
        const styles = this._initStyle();
        let tabsHtml = '';
        tabs.forEach((item, i) => {
            tabsHtml += `<div class="tab-bar ${this.tabIndex === i ? 'active' : ''}" data-index=${i} style="width:${styles.barWidth}px;">${item.title}</div>`;
        });
        return tabsHtml;
    }
    _createTabContents(tabs) {
        let tabsCopntentHtml = '';
        tabs.forEach((item, i) => {
            tabsCopntentHtml += `<div class="tab-content" style="width:${this.width}px;">
                <ul></ul>
            </div>`;
        });
        return tabsCopntentHtml;
    }
    //移动容器
    _translate(ele, diff) {
        ele.css({
            "-webkit-transform": "translate(" + diff + "px,0)",
            "transform": "translate(" + diff + "px,0)",
        });
    }
    //设置效果时间
    _setTranslition(ele, time) {
        ele.css({
            "-webkit-transition": "all " + time + "ms",
            "transition": "all " + time + "ms"
        });
    }
    _log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
    _loading(nowIndex) {
        this.isLoading = true;
        Toolkit.fetch({
            url: this.url,
            type: this.type,
            data: this._getQuerys(),
            success: (res) => {
                const data = res.data instanceof Array ? res.data : [];
                if (res.success && data.length) {
                    this.total += data.length;
                    this.pageIndex++;
                    this.emit('success', res);
                    this.isLoading = false;
                } else if (res.success && data.length === 0) {
                    this.finished = true;
                    this.emit('finished', res);
                } else {
                    console.error(res.msg);
                    this.emit('error', res);
                }
            }
        })
    }
    _getQuerys() {
        return Object.assign({ page_number: this.pageIndex, page_limit: this.pageSize }, this.querys);
    }
}
export default Tabsview;