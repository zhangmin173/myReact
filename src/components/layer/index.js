/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-16 19:34:59
 */

/**
 * 弹层
 */
import './index.less';

class EventEmitter {
    constructor() {
        this.handlers = {};
    }
    /**
         * 注册事件
         * @param {事件名词} eventName
         * @param {事件执行} callback
         */
    on(eventName, callback) {
        if (!this.handlers[eventName]) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(callback);
    }
    /**
     * 触发事件
     * @param {事件名词} eventName
     */
    trigger(eventName) {
        if (this.handlers && this.handlers[arguments[0]]) {
            for (var i = 0; i < this.handlers[arguments[0]].length; i++) {
                this.handlers[eventName][i].apply(null, [].slice.call(arguments, 1));
            }
        }
    }
    /**
     * 移除事件
     * @param {事件名词} eventName
     * @param {事件} callback
     */
    remove(eventName, callback) {
        if (this.handlers[eventName] instanceof Array) {
            const handlers = this.handlers[eventName];
            for (let i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === callback) {
                    this.handlers[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }
}

class Layer extends EventEmitter {
    constructor(opt) {
        super();
        this.opt = opt || {};

        this.debug = this.opt.debug || false; // 开启调试
    }
    init() {
        // 首次数据加载


    }
    _tpl(data) {
        const htmlStr = `<div class="layer">
            <div class="layer-overlay"></div>
            <div class="layer-close"></div>
            <div class="layer-body">
                <div class="layer-decorate"></div>
                <div class="layer-light"></div>
                <div></div>
            </div>
        </div>`;
        return htmlStr;
    }
    _log(msg) {
        if (this.debug) {
            console.log(msg);
        }
    }
}
export default Layer;