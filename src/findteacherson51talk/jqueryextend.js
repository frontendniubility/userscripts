import PropertiesCaseInsensitive from "./../../libs/propertiesCaseInsensitive.mjs"
import { formatters as o } from "./../../libs/dateFormat"

///date to string with formater

Date.prototype._toString = Date.prototype.toString;
$.extend(Date.prototype, {
	toString: function (format) {
		if (!format) return this._toString();
		let formattedDate = format;
		for (let k in o) {
			if (new RegExp("(" + k + ")").test(format)) {
				formattedDate = formattedDate.replace(RegExp.$1, o[k](this));
			}
		}
		return formattedDate;
	},
});

//扩展基本类型方法 array.clean(val), Number.toString(len),String.toFloat, String.toInt,String.startsWtih,String.endsWith, ** String.replaceAll区别育默认的string.replace
$.extend(Array.prototype, {
	clean: function (deleteValue = "") {
		for (let i = 0; i < this.length; i++) {
			if (this[i] == deleteValue) {
				this.splice(i, 1);
				i--;
			}
		}
		return this;
	},
});
$.extend(Number.prototype, {
	toString: function (num) {
		if (isNaN(num)) num = 2;
		return this.toFixed(num);
	},
});
$.extend(String.prototype, {
	toFloat: function () {
		return parseFloat(this);
	},
	toInt: function () {
		return parseInt(this);
	},
	includesAny: function (...arr) {
		if (!Array.isArray(arr)) return false;
		return new RegExp(arr.join("|")).test(this);
	},

	replaceAll: function (search, replacement) {
		let target = this;
		return target.replace(new RegExp(search, "g"), replacement);
	},
});

if (!String.prototype.startsWith) {
	Object.defineProperty(String.prototype, "startsWith", {
		value: function (search, rawPos) {
			var pos = rawPos > 0 ? rawPos | 0 : 0;
			return this.substring(pos, pos + search.length) === search;
		},
	});
}
if (!String.prototype.endsWith) {
	String.prototype.endsWith = function (search, this_len) {
		if (this_len === undefined || this_len > this.length) {
			this_len = this.length;
		}
		return this.substring(this_len - search.length, this_len) === search;
	};
}
if (!String.prototype.includes) {
	String.prototype.includes = function (search, start) {
		"use strict";

		if (search instanceof RegExp) {
			throw TypeError("first argument must not be a RegExp");
		}
		if (start === undefined) {
			start = 0;
		}
		return this.indexOf(search, start) !== -1;
	};
}
///extend method parameters of window, get parameter's value with key case-insensitive

$.extend(window, {
	parameters: function (url) {
		// get query string from url (optional) or window
		let queryString = url ? url.split("?")[1] : window.location.search.slice(1);
		let cachedkey = "urlparameters" + queryString;

		let obj = $(window).data(cachedkey);
		if (obj == undefined) {
			obj = new Proxy({}, PropertiesCaseInsensitive);
			$(window).data(cachedkey, obj);
		} else return obj;
		// we'll store the parameters here
		// if query string exists
		if (queryString) {
			// stuff after # is not part of query string, so get rid of it
			queryString = queryString.split("#")[0];
			// split our query string into its component parts
			let arr = queryString.split("&");
			for (let i = 0; i < arr.length; i++) {
				// separate the keys and the values
				let a = arr[i].split("=");
				// set parameter name and value (use 'true' if empty)
				let paramName = a[0];
				let paramValue = typeof a[1] === "undefined" ? true : a[1];
				// if the paramName ends with square brackets, e.g. colors[] or colors[2]
				if (paramName.match(/\[(\d+)?\]$/)) {
					// create key if it doesn't exist
					let key = paramName.replace(/\[(\d+)?\]/, "");
					if (!obj[key]) obj[key] = [];
					// if it's an indexed array e.g. colors[2]
					if (paramName.match(/\[\d+\]$/)) {
						// get the index value and add the entry at the appropriate position
						let index = /\[(\d+)\]/.exec(paramName)[1];
						obj[key][index] = paramValue;
					} else {
						// otherwise add the value to the end of the array
						obj[key].push(paramValue);
					}
				} else {
					// we're dealing with a string
					if (!obj[paramName]) {
						// if it doesn't exist, create property
						obj[paramName] = paramValue;
					} else if (obj[paramName] && typeof obj[paramName] === "string") {
						// if property does exist and it's a string, convert it to an array
						obj[paramName] = [obj[paramName]];
						obj[paramName].push(paramValue);
					} else {
						// otherwise add the property
						obj[paramName].push(paramValue);
					}
				}
			}
		}
		return obj;
	},
});
