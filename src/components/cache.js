/*
 * @Author: 张敏 
 * @Date: 2018-04-17 09:18:17 
 * @Last Modified by: Zhang Min
 * @Last Modified time: 2018-05-04 17:58:39
 */

/**
 * 封装localStorage
 */
const Cache = (function () {
	let storage = window.localStorage;
	return {
		set(key, value, expiredays) {
			expiredays = expiredays ? expiredays : 1;
			try {
				storage.setItem(key, JSON.stringify(value))
			} catch (e) {

			}
		},
		get(key) {
			let value = null;
			try {
				value = JSON.parse(storage.getItem(key));
			} catch (e) {

			}
			return value;
		},
		remove(key) {
			let data = null;
			try {
				data = storage.getItem(key);
			} catch (e) {

			}
			if (data) {
				try {
					storage.removeItem(key);
				} catch (e) {

				}
			}
		}
	}
})();

export default Cache