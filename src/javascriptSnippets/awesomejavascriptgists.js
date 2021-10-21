import extend from "extend";
import { formatters as o } from "./../../libs/dateFormat.js";

Date.prototype._toString = Date.prototype.toString;
extend(Date.prototype, {
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
//重载类型方法
let caseInsensitiveProxyHandler = {
	has: function has(target, prop) {
		if (typeof prop === "symbol") {
			return prop in target; // pass through; or 'return;' if you want to block pass through
		}
		prop = prop.toLowerCase();
		if (prop in target) return true;
		let keys = Object.keys(target);
		let i = keys.length;
		while (i--) {
			if (keys[i] && keys[i].toLowerCase() == prop) return true;
		}
		return false;
	},
	get: function get(target, prop, receiver) {
		if (typeof prop === "symbol") {
			return target[prop];
		}
		prop = prop.toLowerCase();
		if (prop in target) return target[prop];
		let keys = Object.keys(target);
		let i = keys.length;
		while (i--) {
			if (keys[i] && keys[i].toLowerCase() == prop) return target[keys[i]];
		}
		return undefined;
	},
	set: function set(target, prop, value) {
		if (typeof prop === "symbol") {
			target[prop] = value;
		}
		target[prop.toLowerCase()] = value;
		return true;
	},
};

//删除数组中的空元素
extend(Array.prototype, {
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
extend(Number.prototype, {
	toString: function (num) {
		if (isNaN(num)) num = 2;
		return this.toFixed(num);
	},
});
extend(String.prototype, {
	toFloat: function () {
		return parseFloat(this);
	},
	toInt: function () {
		return parseInt(this);
	},
	startsWith: function (str) {
		return this.slice(0, str.length) == str;
	},
	endsWith: function (str) {
		return this.slice(-str.length) == str;
	},
	includes: function (str) {
		return this.indexOf(str) > -1;
	},
	replaceAll: function (search, replacement) {
		let target = this;
		return target.replace(new RegExp(search, "g"), replacement);
	},
});

function TestCaseInsensitive() {
	var Foo = "333";
	var wwww = "wwww";
	var obj1 = { Foo, wwww };
	obj1["sSs"] = "sssss";
	// alert(Proxy);
	var obj = new Proxy(obj1, caseInsensitiveProxyHandler);
	obj1.vvv = "vvvvv";
	obj.oooo = "ooooo";
	console.log(`
---------------------
     ${new Date().toString("YYY")}.
     ${obj.foo}
     ${obj.VVV}
     ${obj.OooO}
     ${obj.OO}
  `);
}
TestCaseInsensitive();
