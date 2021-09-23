const p = (...args) => (console.log(...args), args[0]);
const _sym = "abcdefghijklmnopqrstuvwxyz1234567890",
	len = _sym.length;
export function generate(count, k) {
	let str = [];
	for (var i = 0; i < count; i++) {
		str[i] = _sym[parseInt(Math.random() * len)];
	}

	return str.join("");
}

/**
 * Gets the classname of an object or function if it can.  Otherwise returns the provided default.
 *
 * Getting the name of a function is not a standard feature, so while this will work in many
 * cases, it should not be relied upon except for informational messages (e.g. logging and Error
 * messages).
 *
 * @private
 */
function className(object, defaultName) {
	if (!object) return "";
	var result = "";
	if (typeof object === "function") {
		result = object.name || object.toString().match(/^function\s?([^\s(]*)/)[1];
	} else if (typeof object.constructor === "function") {
		result = className(object.constructor, defaultName);
	}
	return result || defaultName;
}

var a = new Date();
var name = Object.prototype.toString.call(a).match(/\[object (.*?)\]/)[1];

p(name);

function Foo() {}
var f = new Foo();

p(f.constructor.name);

var Bar = function () {};

// p(b.constructor.name);
p(typeof Bar);
let m = Bar();
p(className(m));
