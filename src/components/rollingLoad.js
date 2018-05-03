/*
 * @Author: Zhang Min 
 * @Date: 2018-05-03 07:50:42 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-03 10:05:08
 */

/**
 * 滚动加载
 */
import Toolkit from './toolkit';
import Event from './event';

class rollingLoad {
    constructor(opt) {
        Object.assign(this, Event);

        this.url = opt.url;
        this.type = opt.type || 'get';
        this.total = 0;
        this.page = opt.page || 1;
        this.querys = opt.querys || {};
        this.limit = 0;
        this.finished = false;
        this.$wrapper = opt.wrapper || $('#wrapper');

        this.isLoading = false;
    }
    init() {
        this._loading();
    }
    _loading() {
        if (this.isLoading) {
            return false;
        }
        this.isLoading = true;
        Toolkit.fetch({
            url: this.url,
            type: this.type,
            data: this._getQuerys(),
            success: (res) => {
                const data = res.data instanceof Array ? res.data : [];
                if (res.success && data.length) {
                    this.total += data.length;
                    this.page++;
                    this.emit('success', res);
                } else if (res.success && data.length === 0) {
                    this.finished = true;
                    this.emit('finished', res);
                } else {
                    console.error(res.msg);
                    this.emit('error', res);
                }
            },
            complete: () => {
                this.isLoading = false;
            }
        })
    }
    _getQuerys() {
        return Object.assign({ page_number: this.page }, this.querys);
    }

    documentHeight() {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }

}
export default rollingLoad;