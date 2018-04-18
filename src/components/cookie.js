/*
 * @Author: 张敏 
 * @Date: 2018-04-17 09:18:05 
 * @Last Modified by: 张敏
 * @Last Modified time: 2018-04-18 08:22:55
 */

/**
 * 封装cookie
 */
const Cookie = (function () {
  return {
		set(key,value,expiredays = 1) {
			let d = new Date();
			d.setTime(d.getTime() + expiredays*24*60*60*1000);
			document.cookie = key + '=' + JSON.stringify(value) + ';' + 'expires=' + d;
		},
		get(key) {
			let value = null;
			if(document.cookie.length) {
				for (let arr = document.cookie.split(';'), i = 0; i < arr.length; i++) {
					let keyLen = key.length + 1,
						ck = this._trim(arr[i]);
	
					if (ck.substring(0, keyLen) == key + '=') {
						value = ck.substring(keyLen);
						break;
					}
				}
			}
			return JSON.parse(value);
		},
		remove(key) {
			if(document.cookie.length) {
				let startIndex = document.cookie.indexOf(key + '='),
					endIndex = document.cookie.indexOf(';', startIndex),
					value = document.cookie.substring(startIndex, endIndex);
	
				let d = new Date();
				d.setTime(d.getTime() - 24*60*60*1000);
				document.cookie = key + '=;' + 'expires=' + d;
			}
		},
		_trim(str) { 
			return str.replace(/(^\s*)|(\s*$)/g, ""); 
		}
	}
})();
export default Cookie