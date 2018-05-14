/*
 * @Author: 张敏 
 * @Date: 2018-04-17 08:41:11 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-12 12:35:46
 */

/**
 * 工具类函数
 */
const Toolkit = (function () {
  return {
    /**
     * ajax请求
     * @param {ajax参数} options 
     */
    fetch(options) {
      let _default = {
        url: options.url,
        type: options.type || 'post',
        data: options.data || {},
        success: (res) => {
          // console.log(res);
          options.success && options.success(res);
        },
        error: (err) => {
          options.error && options.error(err);
        },
        complete: () => {
          options.complete && options.complete();
        }
      };

      $.ajax(_default);
    },
    /**
     * 获取url参数
     * @param {参数名称} name 
     * @param {utl地址} path 
     */
    getUrlParameter(name,path = window.location.href) {
      const result = decodeURIComponent((new RegExp('[?|&]' + name + '=([^&;]+?)(&|#|;|$)').exec(path) || [undefined, ''])[1].replace(/\+/g, '%20')) || null;
      return result ? result.split('/')[0] : '';
    },
    /**
     * 手机号隐藏4位
     * @param {手机号} tel 
     */
    mobile2show(tel) {
      return tel.substr(0, 3) + '****' + tel.substr(7);;
    },
    /**
     * 获取工单类型
     * @param {工单类型} type 
     */
    getWorkTypes(index) {
      return ['to_send','to_deal','in_deal','to_delay','over'];
    },
    /**
     * 获取工单类型字段
     * @param {工单类型} type 
     */
    getWorkStatus(type) {
      const status = {
        to_send: '待处理',
        to_deal: '派单中',
        in_deal: '处理中',
        to_delay: '延期转单',
        over: '已完成'
      };
      if (status[type]) {
        return status[type];
      }
      return status.to_send;
    }
  }
})();
export default Toolkit