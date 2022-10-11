"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = generate;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var p = function p() {
  var _console;

  return (_console = console).log.apply(_console, arguments), arguments.length <= 0 ? undefined : arguments[0];
},
    _sym = "abcdefghijklmnopqrstuvwxyz1234567890",
    len = _sym.length;

function generate(count, k) {
  for (var str = [], i = 0; i < count; i++) {
    str[i] = _sym[parseInt(Math.random() * len)];
  }

  return str.join("");
}
/**
 * Gets the class name of an object or function if it can.  Otherwise returns the provided default.
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

var a = new Date(),
    name = Object.prototype.toString.call(a).match(/\[object (.*?)\]/)[1];
p(name);

function Foo() {}

var f = new Foo();
p(f.constructor.name);

var Bar = function Bar() {}; // p(b.constructor.name);


p(_typeof(Bar));
var m = Bar();
p(className(m));