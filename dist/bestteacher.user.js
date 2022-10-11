// ==UserScript==
// @name        Best Teachers(Vuetify)
// @version     2022.10.511131810
// @author      jimbo
// @description 谁是最好的老师？-排序显示，经验值计算|自定义经验值公式|好评率|显示年龄|列表显示所有教师
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/bestteacher
// @match       *://www.51talk.com/ReserveNew/index*
// @match       *://www.51talk.com/TeacherNew/*
// @match       *://www.51talk.com/user/*
// @match       *
// @namespace   https://github.com/niubilityfrontend
// @license     OSL-3.0
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/pace.min.js
// @require     https://raw.githubusercontent.com/niubilityfrontend/jquery-scrollfix/master/src/scrollfix.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/bestteacher.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/bestteacher.meta.js
// ==/UserScript==

(() => {
    var __webpack_modules__ = {
        443: false
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    })();
    (() => {
        __webpack_require__.g = function() {
            if (typeof globalThis === "object") return globalThis;
            try {
                return this || new Function("return this")();
            } catch (e) {
                if (typeof window === "object") return window;
            }
        }();
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        __webpack_require__.r = exports => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var easing_patterns_namespaceObject = {};
        __webpack_require__.r(easing_patterns_namespaceObject);
        __webpack_require__.d(easing_patterns_namespaceObject, {
            easeInCubic: () => easeInCubic,
            easeInOutCubic: () => easeInOutCubic,
            easeInOutQuad: () => easeInOutQuad,
            easeInOutQuart: () => easeInOutQuart,
            easeInOutQuint: () => easeInOutQuint,
            easeInQuad: () => easeInQuad,
            easeInQuart: () => easeInQuart,
            easeInQuint: () => easeInQuint,
            easeOutCubic: () => easeOutCubic,
            easeOutQuad: () => easeOutQuad,
            easeOutQuart: () => easeOutQuart,
            easeOutQuint: () => easeOutQuint,
            linear: () => linear
        });
        var emptyObject = Object.freeze({});
        function isUndef(v) {
            return v === undefined || v === null;
        }
        function isDef(v) {
            return v !== undefined && v !== null;
        }
        function isTrue(v) {
            return v === true;
        }
        function isFalse(v) {
            return v === false;
        }
        function isPrimitive(value) {
            return typeof value === "string" || typeof value === "number" || typeof value === "symbol" || typeof value === "boolean";
        }
        function isObject(obj) {
            return obj !== null && typeof obj === "object";
        }
        var _toString = Object.prototype.toString;
        function toRawType(value) {
            return _toString.call(value).slice(8, -1);
        }
        function isPlainObject(obj) {
            return _toString.call(obj) === "[object Object]";
        }
        function isRegExp(v) {
            return _toString.call(v) === "[object RegExp]";
        }
        function isValidArrayIndex(val) {
            var n = parseFloat(String(val));
            return n >= 0 && Math.floor(n) === n && isFinite(val);
        }
        function isPromise(val) {
            return isDef(val) && typeof val.then === "function" && typeof val.catch === "function";
        }
        function vue_runtime_esm_toString(val) {
            return val == null ? "" : Array.isArray(val) || isPlainObject(val) && val.toString === _toString ? JSON.stringify(val, null, 2) : String(val);
        }
        function toNumber(val) {
            var n = parseFloat(val);
            return isNaN(n) ? val : n;
        }
        function makeMap(str, expectsLowerCase) {
            var map = Object.create(null);
            var list = str.split(",");
            for (var i = 0; i < list.length; i++) {
                map[list[i]] = true;
            }
            return expectsLowerCase ? function(val) {
                return map[val.toLowerCase()];
            } : function(val) {
                return map[val];
            };
        }
        var isBuiltInTag = makeMap("slot,component", true);
        var isReservedAttribute = makeMap("key,ref,slot,slot-scope,is");
        function remove(arr, item) {
            if (arr.length) {
                var index = arr.indexOf(item);
                if (index > -1) {
                    return arr.splice(index, 1);
                }
            }
        }
        var vue_runtime_esm_hasOwnProperty = Object.prototype.hasOwnProperty;
        function hasOwn(obj, key) {
            return vue_runtime_esm_hasOwnProperty.call(obj, key);
        }
        function cached(fn) {
            var cache = Object.create(null);
            return function cachedFn(str) {
                var hit = cache[str];
                return hit || (cache[str] = fn(str));
            };
        }
        var camelizeRE = /-(\w)/g;
        var camelize = cached((function(str) {
            return str.replace(camelizeRE, (function(_, c) {
                return c ? c.toUpperCase() : "";
            }));
        }));
        var capitalize = cached((function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }));
        var hyphenateRE = /\B([A-Z])/g;
        var hyphenate = cached((function(str) {
            return str.replace(hyphenateRE, "-$1").toLowerCase();
        }));
        function polyfillBind(fn, ctx) {
            function boundFn(a) {
                var l = arguments.length;
                return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
            }
            boundFn._length = fn.length;
            return boundFn;
        }
        function nativeBind(fn, ctx) {
            return fn.bind(ctx);
        }
        var bind = Function.prototype.bind ? nativeBind : polyfillBind;
        function toArray(list, start) {
            start = start || 0;
            var i = list.length - start;
            var ret = new Array(i);
            while (i--) {
                ret[i] = list[i + start];
            }
            return ret;
        }
        function extend(to, _from) {
            for (var key in _from) {
                to[key] = _from[key];
            }
            return to;
        }
        function toObject(arr) {
            var res = {};
            for (var i = 0; i < arr.length; i++) {
                if (arr[i]) {
                    extend(res, arr[i]);
                }
            }
            return res;
        }
        function noop(a, b, c) {}
        var no = function(a, b, c) {
            return false;
        };
        var identity = function(_) {
            return _;
        };
        function looseEqual(a, b) {
            if (a === b) {
                return true;
            }
            var isObjectA = isObject(a);
            var isObjectB = isObject(b);
            if (isObjectA && isObjectB) {
                try {
                    var isArrayA = Array.isArray(a);
                    var isArrayB = Array.isArray(b);
                    if (isArrayA && isArrayB) {
                        return a.length === b.length && a.every((function(e, i) {
                            return looseEqual(e, b[i]);
                        }));
                    } else if (a instanceof Date && b instanceof Date) {
                        return a.getTime() === b.getTime();
                    } else if (!isArrayA && !isArrayB) {
                        var keysA = Object.keys(a);
                        var keysB = Object.keys(b);
                        return keysA.length === keysB.length && keysA.every((function(key) {
                            return looseEqual(a[key], b[key]);
                        }));
                    } else {
                        return false;
                    }
                } catch (e) {
                    return false;
                }
            } else if (!isObjectA && !isObjectB) {
                return String(a) === String(b);
            } else {
                return false;
            }
        }
        function looseIndexOf(arr, val) {
            for (var i = 0; i < arr.length; i++) {
                if (looseEqual(arr[i], val)) {
                    return i;
                }
            }
            return -1;
        }
        function once(fn) {
            var called = false;
            return function() {
                if (!called) {
                    called = true;
                    fn.apply(this, arguments);
                }
            };
        }
        var SSR_ATTR = "data-server-rendered";
        var ASSET_TYPES = [ "component", "directive", "filter" ];
        var LIFECYCLE_HOOKS = [ "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch" ];
        var config = {
            optionMergeStrategies: Object.create(null),
            silent: false,
            productionTip: "production" !== "production",
            devtools: "production" !== "production",
            performance: false,
            errorHandler: null,
            warnHandler: null,
            ignoredElements: [],
            keyCodes: Object.create(null),
            isReservedTag: no,
            isReservedAttr: no,
            isUnknownElement: no,
            getTagNamespace: noop,
            parsePlatformTagName: identity,
            mustUseProp: no,
            async: true,
            _lifecycleHooks: LIFECYCLE_HOOKS
        };
        var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;
        function isReserved(str) {
            var c = (str + "").charCodeAt(0);
            return c === 36 || c === 95;
        }
        function def(obj, key, val, enumerable) {
            Object.defineProperty(obj, key, {
                value: val,
                enumerable: !!enumerable,
                writable: true,
                configurable: true
            });
        }
        var bailRE = new RegExp("[^" + unicodeRegExp.source + ".$_\\d]");
        function parsePath(path) {
            if (bailRE.test(path)) {
                return;
            }
            var segments = path.split(".");
            return function(obj) {
                for (var i = 0; i < segments.length; i++) {
                    if (!obj) {
                        return;
                    }
                    obj = obj[segments[i]];
                }
                return obj;
            };
        }
        var hasProto = "__proto__" in {};
        var inBrowser = typeof window !== "undefined";
        var inWeex = typeof WXEnvironment !== "undefined" && !!WXEnvironment.platform;
        var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
        var UA = inBrowser && window.navigator.userAgent.toLowerCase();
        var isIE = UA && /msie|trident/.test(UA);
        var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
        var isEdge = UA && UA.indexOf("edge/") > 0;
        var isAndroid = UA && UA.indexOf("android") > 0 || weexPlatform === "android";
        var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA) || weexPlatform === "ios";
        var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
        var isPhantomJS = UA && /phantomjs/.test(UA);
        var isFF = UA && UA.match(/firefox\/(\d+)/);
        var nativeWatch = {}.watch;
        var supportsPassive = false;
        if (inBrowser) {
            try {
                var opts = {};
                Object.defineProperty(opts, "passive", {
                    get: function get() {
                        supportsPassive = true;
                    }
                });
                window.addEventListener("test-passive", null, opts);
            } catch (e) {}
        }
        var _isServer;
        var isServerRendering = function() {
            if (_isServer === undefined) {
                if (!inBrowser && !inWeex && typeof __webpack_require__.g !== "undefined") {
                    _isServer = __webpack_require__.g["process"] && __webpack_require__.g["process"].env.VUE_ENV === "server";
                } else {
                    _isServer = false;
                }
            }
            return _isServer;
        };
        var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
        function isNative(Ctor) {
            return typeof Ctor === "function" && /native code/.test(Ctor.toString());
        }
        var hasSymbol = typeof Symbol !== "undefined" && isNative(Symbol) && typeof Reflect !== "undefined" && isNative(Reflect.ownKeys);
        var _Set;
        if (typeof Set !== "undefined" && isNative(Set)) {
            _Set = Set;
        } else {
            _Set = function() {
                function Set() {
                    this.set = Object.create(null);
                }
                Set.prototype.has = function has(key) {
                    return this.set[key] === true;
                };
                Set.prototype.add = function add(key) {
                    this.set[key] = true;
                };
                Set.prototype.clear = function clear() {
                    this.set = Object.create(null);
                };
                return Set;
            }();
        }
        var warn = noop;
        var tip = null && noop;
        var generateComponentTrace = null && noop;
        var formatComponentName = null && noop;
        if (false) {
            var repeat, classify, classifyRE, hasConsole;
        }
        var uid = 0;
        var Dep = function Dep() {
            this.id = uid++;
            this.subs = [];
        };
        Dep.prototype.addSub = function addSub(sub) {
            this.subs.push(sub);
        };
        Dep.prototype.removeSub = function removeSub(sub) {
            remove(this.subs, sub);
        };
        Dep.prototype.depend = function depend() {
            if (Dep.target) {
                Dep.target.addDep(this);
            }
        };
        Dep.prototype.notify = function notify() {
            var subs = this.subs.slice();
            if (false) {}
            for (var i = 0, l = subs.length; i < l; i++) {
                subs[i].update();
            }
        };
        Dep.target = null;
        var targetStack = [];
        function pushTarget(target) {
            targetStack.push(target);
            Dep.target = target;
        }
        function popTarget() {
            targetStack.pop();
            Dep.target = targetStack[targetStack.length - 1];
        }
        var VNode = function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
            this.tag = tag;
            this.data = data;
            this.children = children;
            this.text = text;
            this.elm = elm;
            this.ns = undefined;
            this.context = context;
            this.fnContext = undefined;
            this.fnOptions = undefined;
            this.fnScopeId = undefined;
            this.key = data && data.key;
            this.componentOptions = componentOptions;
            this.componentInstance = undefined;
            this.parent = undefined;
            this.raw = false;
            this.isStatic = false;
            this.isRootInsert = true;
            this.isComment = false;
            this.isCloned = false;
            this.isOnce = false;
            this.asyncFactory = asyncFactory;
            this.asyncMeta = undefined;
            this.isAsyncPlaceholder = false;
        };
        var prototypeAccessors = {
            child: {
                configurable: true
            }
        };
        prototypeAccessors.child.get = function() {
            return this.componentInstance;
        };
        Object.defineProperties(VNode.prototype, prototypeAccessors);
        var createEmptyVNode = function(text) {
            if (text === void 0) text = "";
            var node = new VNode;
            node.text = text;
            node.isComment = true;
            return node;
        };
        function createTextVNode(val) {
            return new VNode(undefined, undefined, undefined, String(val));
        }
        function cloneVNode(vnode) {
            var cloned = new VNode(vnode.tag, vnode.data, vnode.children && vnode.children.slice(), vnode.text, vnode.elm, vnode.context, vnode.componentOptions, vnode.asyncFactory);
            cloned.ns = vnode.ns;
            cloned.isStatic = vnode.isStatic;
            cloned.key = vnode.key;
            cloned.isComment = vnode.isComment;
            cloned.fnContext = vnode.fnContext;
            cloned.fnOptions = vnode.fnOptions;
            cloned.fnScopeId = vnode.fnScopeId;
            cloned.asyncMeta = vnode.asyncMeta;
            cloned.isCloned = true;
            return cloned;
        }
        var arrayProto = Array.prototype;
        var arrayMethods = Object.create(arrayProto);
        var methodsToPatch = [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ];
        methodsToPatch.forEach((function(method) {
            var original = arrayProto[method];
            def(arrayMethods, method, (function mutator() {
                var args = [], len = arguments.length;
                while (len--) args[len] = arguments[len];
                var result = original.apply(this, args);
                var ob = this.__ob__;
                var inserted;
                switch (method) {
                  case "push":
                  case "unshift":
                    inserted = args;
                    break;

                  case "splice":
                    inserted = args.slice(2);
                    break;
                }
                if (inserted) {
                    ob.observeArray(inserted);
                }
                ob.dep.notify();
                return result;
            }));
        }));
        var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
        var shouldObserve = true;
        function toggleObserving(value) {
            shouldObserve = value;
        }
        var Observer = function Observer(value) {
            this.value = value;
            this.dep = new Dep;
            this.vmCount = 0;
            def(value, "__ob__", this);
            if (Array.isArray(value)) {
                if (hasProto) {
                    protoAugment(value, arrayMethods);
                } else {
                    copyAugment(value, arrayMethods, arrayKeys);
                }
                this.observeArray(value);
            } else {
                this.walk(value);
            }
        };
        Observer.prototype.walk = function walk(obj) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                defineReactive$$1(obj, keys[i]);
            }
        };
        Observer.prototype.observeArray = function observeArray(items) {
            for (var i = 0, l = items.length; i < l; i++) {
                observe(items[i]);
            }
        };
        function protoAugment(target, src) {
            target.__proto__ = src;
        }
        function copyAugment(target, src, keys) {
            for (var i = 0, l = keys.length; i < l; i++) {
                var key = keys[i];
                def(target, key, src[key]);
            }
        }
        function observe(value, asRootData) {
            if (!isObject(value) || value instanceof VNode) {
                return;
            }
            var ob;
            if (hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
                ob = value.__ob__;
            } else if (shouldObserve && !isServerRendering() && (Array.isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
                ob = new Observer(value);
            }
            if (asRootData && ob) {
                ob.vmCount++;
            }
            return ob;
        }
        function defineReactive$$1(obj, key, val, customSetter, shallow) {
            var dep = new Dep;
            var property = Object.getOwnPropertyDescriptor(obj, key);
            if (property && property.configurable === false) {
                return;
            }
            var getter = property && property.get;
            var setter = property && property.set;
            if ((!getter || setter) && arguments.length === 2) {
                val = obj[key];
            }
            var childOb = !shallow && observe(val);
            Object.defineProperty(obj, key, {
                enumerable: true,
                configurable: true,
                get: function reactiveGetter() {
                    var value = getter ? getter.call(obj) : val;
                    if (Dep.target) {
                        dep.depend();
                        if (childOb) {
                            childOb.dep.depend();
                            if (Array.isArray(value)) {
                                dependArray(value);
                            }
                        }
                    }
                    return value;
                },
                set: function reactiveSetter(newVal) {
                    var value = getter ? getter.call(obj) : val;
                    if (newVal === value || newVal !== newVal && value !== value) {
                        return;
                    }
                    if (false) {}
                    if (getter && !setter) {
                        return;
                    }
                    if (setter) {
                        setter.call(obj, newVal);
                    } else {
                        val = newVal;
                    }
                    childOb = !shallow && observe(newVal);
                    dep.notify();
                }
            });
        }
        function set(target, key, val) {
            if (false) {}
            if (Array.isArray(target) && isValidArrayIndex(key)) {
                target.length = Math.max(target.length, key);
                target.splice(key, 1, val);
                return val;
            }
            if (key in target && !(key in Object.prototype)) {
                target[key] = val;
                return val;
            }
            var ob = target.__ob__;
            if (target._isVue || ob && ob.vmCount) {
                false && 0;
                return val;
            }
            if (!ob) {
                target[key] = val;
                return val;
            }
            defineReactive$$1(ob.value, key, val);
            ob.dep.notify();
            return val;
        }
        function del(target, key) {
            if (false) {}
            if (Array.isArray(target) && isValidArrayIndex(key)) {
                target.splice(key, 1);
                return;
            }
            var ob = target.__ob__;
            if (target._isVue || ob && ob.vmCount) {
                false && 0;
                return;
            }
            if (!hasOwn(target, key)) {
                return;
            }
            delete target[key];
            if (!ob) {
                return;
            }
            ob.dep.notify();
        }
        function dependArray(value) {
            for (var e = void 0, i = 0, l = value.length; i < l; i++) {
                e = value[i];
                e && e.__ob__ && e.__ob__.dep.depend();
                if (Array.isArray(e)) {
                    dependArray(e);
                }
            }
        }
        var strats = config.optionMergeStrategies;
        if (false) {}
        function mergeData(to, from) {
            if (!from) {
                return to;
            }
            var key, toVal, fromVal;
            var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                if (key === "__ob__") {
                    continue;
                }
                toVal = to[key];
                fromVal = from[key];
                if (!hasOwn(to, key)) {
                    set(to, key, fromVal);
                } else if (toVal !== fromVal && isPlainObject(toVal) && isPlainObject(fromVal)) {
                    mergeData(toVal, fromVal);
                }
            }
            return to;
        }
        function mergeDataOrFn(parentVal, childVal, vm) {
            if (!vm) {
                if (!childVal) {
                    return parentVal;
                }
                if (!parentVal) {
                    return childVal;
                }
                return function mergedDataFn() {
                    return mergeData(typeof childVal === "function" ? childVal.call(this, this) : childVal, typeof parentVal === "function" ? parentVal.call(this, this) : parentVal);
                };
            } else {
                return function mergedInstanceDataFn() {
                    var instanceData = typeof childVal === "function" ? childVal.call(vm, vm) : childVal;
                    var defaultData = typeof parentVal === "function" ? parentVal.call(vm, vm) : parentVal;
                    if (instanceData) {
                        return mergeData(instanceData, defaultData);
                    } else {
                        return defaultData;
                    }
                };
            }
        }
        strats.data = function(parentVal, childVal, vm) {
            if (!vm) {
                if (childVal && typeof childVal !== "function") {
                    false && 0;
                    return parentVal;
                }
                return mergeDataOrFn(parentVal, childVal);
            }
            return mergeDataOrFn(parentVal, childVal, vm);
        };
        function mergeHook(parentVal, childVal) {
            var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [ childVal ] : parentVal;
            return res ? dedupeHooks(res) : res;
        }
        function dedupeHooks(hooks) {
            var res = [];
            for (var i = 0; i < hooks.length; i++) {
                if (res.indexOf(hooks[i]) === -1) {
                    res.push(hooks[i]);
                }
            }
            return res;
        }
        LIFECYCLE_HOOKS.forEach((function(hook) {
            strats[hook] = mergeHook;
        }));
        function mergeAssets(parentVal, childVal, vm, key) {
            var res = Object.create(parentVal || null);
            if (childVal) {
                false && 0;
                return extend(res, childVal);
            } else {
                return res;
            }
        }
        ASSET_TYPES.forEach((function(type) {
            strats[type + "s"] = mergeAssets;
        }));
        strats.watch = function(parentVal, childVal, vm, key) {
            if (parentVal === nativeWatch) {
                parentVal = undefined;
            }
            if (childVal === nativeWatch) {
                childVal = undefined;
            }
            if (!childVal) {
                return Object.create(parentVal || null);
            }
            if (false) {}
            if (!parentVal) {
                return childVal;
            }
            var ret = {};
            extend(ret, parentVal);
            for (var key$1 in childVal) {
                var parent = ret[key$1];
                var child = childVal[key$1];
                if (parent && !Array.isArray(parent)) {
                    parent = [ parent ];
                }
                ret[key$1] = parent ? parent.concat(child) : Array.isArray(child) ? child : [ child ];
            }
            return ret;
        };
        strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
            if (childVal && "production" !== "production") {}
            if (!parentVal) {
                return childVal;
            }
            var ret = Object.create(null);
            extend(ret, parentVal);
            if (childVal) {
                extend(ret, childVal);
            }
            return ret;
        };
        strats.provide = mergeDataOrFn;
        var defaultStrat = function(parentVal, childVal) {
            return childVal === undefined ? parentVal : childVal;
        };
        function checkComponents(options) {
            for (var key in options.components) {
                validateComponentName(key);
            }
        }
        function validateComponentName(name) {
            if (!new RegExp("^[a-zA-Z][\\-\\.0-9_" + unicodeRegExp.source + "]*$").test(name)) {
                warn('Invalid component name: "' + name + '". Component names ' + "should conform to valid custom element name in html5 specification.");
            }
            if (isBuiltInTag(name) || config.isReservedTag(name)) {
                warn("Do not use built-in or reserved HTML elements as component " + "id: " + name);
            }
        }
        function normalizeProps(options, vm) {
            var props = options.props;
            if (!props) {
                return;
            }
            var res = {};
            var i, val, name;
            if (Array.isArray(props)) {
                i = props.length;
                while (i--) {
                    val = props[i];
                    if (typeof val === "string") {
                        name = camelize(val);
                        res[name] = {
                            type: null
                        };
                    } else if (false) {}
                }
            } else if (isPlainObject(props)) {
                for (var key in props) {
                    val = props[key];
                    name = camelize(key);
                    res[name] = isPlainObject(val) ? val : {
                        type: val
                    };
                }
            } else if (false) {}
            options.props = res;
        }
        function normalizeInject(options, vm) {
            var inject = options.inject;
            if (!inject) {
                return;
            }
            var normalized = options.inject = {};
            if (Array.isArray(inject)) {
                for (var i = 0; i < inject.length; i++) {
                    normalized[inject[i]] = {
                        from: inject[i]
                    };
                }
            } else if (isPlainObject(inject)) {
                for (var key in inject) {
                    var val = inject[key];
                    normalized[key] = isPlainObject(val) ? extend({
                        from: key
                    }, val) : {
                        from: val
                    };
                }
            } else if (false) {}
        }
        function normalizeDirectives(options) {
            var dirs = options.directives;
            if (dirs) {
                for (var key in dirs) {
                    var def$$1 = dirs[key];
                    if (typeof def$$1 === "function") {
                        dirs[key] = {
                            bind: def$$1,
                            update: def$$1
                        };
                    }
                }
            }
        }
        function assertObjectType(name, value, vm) {
            if (!isPlainObject(value)) {
                warn('Invalid value for option "' + name + '": expected an Object, ' + "but got " + toRawType(value) + ".", vm);
            }
        }
        function mergeOptions(parent, child, vm) {
            if (false) {}
            if (typeof child === "function") {
                child = child.options;
            }
            normalizeProps(child, vm);
            normalizeInject(child, vm);
            normalizeDirectives(child);
            if (!child._base) {
                if (child.extends) {
                    parent = mergeOptions(parent, child.extends, vm);
                }
                if (child.mixins) {
                    for (var i = 0, l = child.mixins.length; i < l; i++) {
                        parent = mergeOptions(parent, child.mixins[i], vm);
                    }
                }
            }
            var options = {};
            var key;
            for (key in parent) {
                mergeField(key);
            }
            for (key in child) {
                if (!hasOwn(parent, key)) {
                    mergeField(key);
                }
            }
            function mergeField(key) {
                var strat = strats[key] || defaultStrat;
                options[key] = strat(parent[key], child[key], vm, key);
            }
            return options;
        }
        function resolveAsset(options, type, id, warnMissing) {
            if (typeof id !== "string") {
                return;
            }
            var assets = options[type];
            if (hasOwn(assets, id)) {
                return assets[id];
            }
            var camelizedId = camelize(id);
            if (hasOwn(assets, camelizedId)) {
                return assets[camelizedId];
            }
            var PascalCaseId = capitalize(camelizedId);
            if (hasOwn(assets, PascalCaseId)) {
                return assets[PascalCaseId];
            }
            var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
            if (false) {}
            return res;
        }
        function validateProp(key, propOptions, propsData, vm) {
            var prop = propOptions[key];
            var absent = !hasOwn(propsData, key);
            var value = propsData[key];
            var booleanIndex = getTypeIndex(Boolean, prop.type);
            if (booleanIndex > -1) {
                if (absent && !hasOwn(prop, "default")) {
                    value = false;
                } else if (value === "" || value === hyphenate(key)) {
                    var stringIndex = getTypeIndex(String, prop.type);
                    if (stringIndex < 0 || booleanIndex < stringIndex) {
                        value = true;
                    }
                }
            }
            if (value === undefined) {
                value = getPropDefaultValue(vm, prop, key);
                var prevShouldObserve = shouldObserve;
                toggleObserving(true);
                observe(value);
                toggleObserving(prevShouldObserve);
            }
            if (false) {}
            return value;
        }
        function getPropDefaultValue(vm, prop, key) {
            if (!hasOwn(prop, "default")) {
                return undefined;
            }
            var def = prop.default;
            if (false) {}
            if (vm && vm.$options.propsData && vm.$options.propsData[key] === undefined && vm._props[key] !== undefined) {
                return vm._props[key];
            }
            return typeof def === "function" && getType(prop.type) !== "Function" ? def.call(vm) : def;
        }
        function assertProp(prop, name, value, vm, absent) {
            if (prop.required && absent) {
                warn('Missing required prop: "' + name + '"', vm);
                return;
            }
            if (value == null && !prop.required) {
                return;
            }
            var type = prop.type;
            var valid = !type || type === true;
            var expectedTypes = [];
            if (type) {
                if (!Array.isArray(type)) {
                    type = [ type ];
                }
                for (var i = 0; i < type.length && !valid; i++) {
                    var assertedType = assertType(value, type[i], vm);
                    expectedTypes.push(assertedType.expectedType || "");
                    valid = assertedType.valid;
                }
            }
            var haveExpectedTypes = expectedTypes.some((function(t) {
                return t;
            }));
            if (!valid && haveExpectedTypes) {
                warn(getInvalidTypeMessage(name, value, expectedTypes), vm);
                return;
            }
            var validator = prop.validator;
            if (validator) {
                if (!validator(value)) {
                    warn('Invalid prop: custom validator check failed for prop "' + name + '".', vm);
                }
            }
        }
        var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol|BigInt)$/;
        function assertType(value, type, vm) {
            var valid;
            var expectedType = getType(type);
            if (simpleCheckRE.test(expectedType)) {
                var t = typeof value;
                valid = t === expectedType.toLowerCase();
                if (!valid && t === "object") {
                    valid = value instanceof type;
                }
            } else if (expectedType === "Object") {
                valid = isPlainObject(value);
            } else if (expectedType === "Array") {
                valid = Array.isArray(value);
            } else {
                try {
                    valid = value instanceof type;
                } catch (e) {
                    warn('Invalid prop type: "' + String(type) + '" is not a constructor', vm);
                    valid = false;
                }
            }
            return {
                valid,
                expectedType
            };
        }
        var functionTypeCheckRE = /^\s*function (\w+)/;
        function getType(fn) {
            var match = fn && fn.toString().match(functionTypeCheckRE);
            return match ? match[1] : "";
        }
        function isSameType(a, b) {
            return getType(a) === getType(b);
        }
        function getTypeIndex(type, expectedTypes) {
            if (!Array.isArray(expectedTypes)) {
                return isSameType(expectedTypes, type) ? 0 : -1;
            }
            for (var i = 0, len = expectedTypes.length; i < len; i++) {
                if (isSameType(expectedTypes[i], type)) {
                    return i;
                }
            }
            return -1;
        }
        function getInvalidTypeMessage(name, value, expectedTypes) {
            var message = 'Invalid prop: type check failed for prop "' + name + '".' + " Expected " + expectedTypes.map(capitalize).join(", ");
            var expectedType = expectedTypes[0];
            var receivedType = toRawType(value);
            if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value) && !isBoolean(expectedType, receivedType)) {
                message += " with value " + styleValue(value, expectedType);
            }
            message += ", got " + receivedType + " ";
            if (isExplicable(receivedType)) {
                message += "with value " + styleValue(value, receivedType) + ".";
            }
            return message;
        }
        function styleValue(value, type) {
            if (type === "String") {
                return '"' + value + '"';
            } else if (type === "Number") {
                return "" + Number(value);
            } else {
                return "" + value;
            }
        }
        var EXPLICABLE_TYPES = null && [ "string", "number", "boolean" ];
        function isExplicable(value) {
            return EXPLICABLE_TYPES.some((function(elem) {
                return value.toLowerCase() === elem;
            }));
        }
        function isBoolean() {
            var args = [], len = arguments.length;
            while (len--) args[len] = arguments[len];
            return args.some((function(elem) {
                return elem.toLowerCase() === "boolean";
            }));
        }
        function handleError(err, vm, info) {
            pushTarget();
            try {
                if (vm) {
                    var cur = vm;
                    while (cur = cur.$parent) {
                        var hooks = cur.$options.errorCaptured;
                        if (hooks) {
                            for (var i = 0; i < hooks.length; i++) {
                                try {
                                    var capture = hooks[i].call(cur, err, vm, info) === false;
                                    if (capture) {
                                        return;
                                    }
                                } catch (e) {
                                    globalHandleError(e, cur, "errorCaptured hook");
                                }
                            }
                        }
                    }
                }
                globalHandleError(err, vm, info);
            } finally {
                popTarget();
            }
        }
        function invokeWithErrorHandling(handler, context, args, vm, info) {
            var res;
            try {
                res = args ? handler.apply(context, args) : handler.call(context);
                if (res && !res._isVue && isPromise(res) && !res._handled) {
                    res.catch((function(e) {
                        return handleError(e, vm, info + " (Promise/async)");
                    }));
                    res._handled = true;
                }
            } catch (e) {
                handleError(e, vm, info);
            }
            return res;
        }
        function globalHandleError(err, vm, info) {
            if (config.errorHandler) {
                try {
                    return config.errorHandler.call(null, err, vm, info);
                } catch (e) {
                    if (e !== err) {
                        logError(e, null, "config.errorHandler");
                    }
                }
            }
            logError(err, vm, info);
        }
        function logError(err, vm, info) {
            if (false) {}
            if ((inBrowser || inWeex) && typeof console !== "undefined") {
                console.error(err);
            } else {
                throw err;
            }
        }
        var isUsingMicroTask = false;
        var callbacks = [];
        var pending = false;
        function flushCallbacks() {
            pending = false;
            var copies = callbacks.slice(0);
            callbacks.length = 0;
            for (var i = 0; i < copies.length; i++) {
                copies[i]();
            }
        }
        var timerFunc;
        if (typeof Promise !== "undefined" && isNative(Promise)) {
            var p = Promise.resolve();
            timerFunc = function() {
                p.then(flushCallbacks);
                if (isIOS) {
                    setTimeout(noop);
                }
            };
            isUsingMicroTask = true;
        } else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
            var counter = 1;
            var observer = new MutationObserver(flushCallbacks);
            var textNode = document.createTextNode(String(counter));
            observer.observe(textNode, {
                characterData: true
            });
            timerFunc = function() {
                counter = (counter + 1) % 2;
                textNode.data = String(counter);
            };
            isUsingMicroTask = true;
        } else if (typeof setImmediate !== "undefined" && isNative(setImmediate)) {
            timerFunc = function() {
                setImmediate(flushCallbacks);
            };
        } else {
            timerFunc = function() {
                setTimeout(flushCallbacks, 0);
            };
        }
        function nextTick(cb, ctx) {
            var _resolve;
            callbacks.push((function() {
                if (cb) {
                    try {
                        cb.call(ctx);
                    } catch (e) {
                        handleError(e, ctx, "nextTick");
                    }
                } else if (_resolve) {
                    _resolve(ctx);
                }
            }));
            if (!pending) {
                pending = true;
                timerFunc();
            }
            if (!cb && typeof Promise !== "undefined") {
                return new Promise((function(resolve) {
                    _resolve = resolve;
                }));
            }
        }
        var initProxy;
        if (false) {
            var getHandler, hasHandler, isBuiltInModifier, hasProxy, warnReservedPrefix, warnNonPresent, allowedGlobals;
        }
        var seenObjects = new _Set;
        function traverse(val) {
            _traverse(val, seenObjects);
            seenObjects.clear();
        }
        function _traverse(val, seen) {
            var i, keys;
            var isA = Array.isArray(val);
            if (!isA && !isObject(val) || Object.isFrozen(val) || val instanceof VNode) {
                return;
            }
            if (val.__ob__) {
                var depId = val.__ob__.dep.id;
                if (seen.has(depId)) {
                    return;
                }
                seen.add(depId);
            }
            if (isA) {
                i = val.length;
                while (i--) {
                    _traverse(val[i], seen);
                }
            } else {
                keys = Object.keys(val);
                i = keys.length;
                while (i--) {
                    _traverse(val[keys[i]], seen);
                }
            }
        }
        var mark;
        var measure;
        if (false) {
            var perf;
        }
        var normalizeEvent = cached((function(name) {
            var passive = name.charAt(0) === "&";
            name = passive ? name.slice(1) : name;
            var once$$1 = name.charAt(0) === "~";
            name = once$$1 ? name.slice(1) : name;
            var capture = name.charAt(0) === "!";
            name = capture ? name.slice(1) : name;
            return {
                name,
                once: once$$1,
                capture,
                passive
            };
        }));
        function createFnInvoker(fns, vm) {
            function invoker() {
                var arguments$1 = arguments;
                var fns = invoker.fns;
                if (Array.isArray(fns)) {
                    var cloned = fns.slice();
                    for (var i = 0; i < cloned.length; i++) {
                        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
                    }
                } else {
                    return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
                }
            }
            invoker.fns = fns;
            return invoker;
        }
        function updateListeners(on, oldOn, add, remove$$1, createOnceHandler, vm) {
            var name, def$$1, cur, old, event;
            for (name in on) {
                def$$1 = cur = on[name];
                old = oldOn[name];
                event = normalizeEvent(name);
                if (isUndef(cur)) {
                    false && 0;
                } else if (isUndef(old)) {
                    if (isUndef(cur.fns)) {
                        cur = on[name] = createFnInvoker(cur, vm);
                    }
                    if (isTrue(event.once)) {
                        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
                    }
                    add(event.name, cur, event.capture, event.passive, event.params);
                } else if (cur !== old) {
                    old.fns = cur;
                    on[name] = old;
                }
            }
            for (name in oldOn) {
                if (isUndef(on[name])) {
                    event = normalizeEvent(name);
                    remove$$1(event.name, oldOn[name], event.capture);
                }
            }
        }
        function mergeVNodeHook(def, hookKey, hook) {
            if (def instanceof VNode) {
                def = def.data.hook || (def.data.hook = {});
            }
            var invoker;
            var oldHook = def[hookKey];
            function wrappedHook() {
                hook.apply(this, arguments);
                remove(invoker.fns, wrappedHook);
            }
            if (isUndef(oldHook)) {
                invoker = createFnInvoker([ wrappedHook ]);
            } else {
                if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
                    invoker = oldHook;
                    invoker.fns.push(wrappedHook);
                } else {
                    invoker = createFnInvoker([ oldHook, wrappedHook ]);
                }
            }
            invoker.merged = true;
            def[hookKey] = invoker;
        }
        function extractPropsFromVNodeData(data, Ctor, tag) {
            var propOptions = Ctor.options.props;
            if (isUndef(propOptions)) {
                return;
            }
            var res = {};
            var attrs = data.attrs;
            var props = data.props;
            if (isDef(attrs) || isDef(props)) {
                for (var key in propOptions) {
                    var altKey = hyphenate(key);
                    if (false) {
                        var keyInLowerCase;
                    }
                    checkProp(res, props, key, altKey, true) || checkProp(res, attrs, key, altKey, false);
                }
            }
            return res;
        }
        function checkProp(res, hash, key, altKey, preserve) {
            if (isDef(hash)) {
                if (hasOwn(hash, key)) {
                    res[key] = hash[key];
                    if (!preserve) {
                        delete hash[key];
                    }
                    return true;
                } else if (hasOwn(hash, altKey)) {
                    res[key] = hash[altKey];
                    if (!preserve) {
                        delete hash[altKey];
                    }
                    return true;
                }
            }
            return false;
        }
        function simpleNormalizeChildren(children) {
            for (var i = 0; i < children.length; i++) {
                if (Array.isArray(children[i])) {
                    return Array.prototype.concat.apply([], children);
                }
            }
            return children;
        }
        function normalizeChildren(children) {
            return isPrimitive(children) ? [ createTextVNode(children) ] : Array.isArray(children) ? normalizeArrayChildren(children) : undefined;
        }
        function isTextNode(node) {
            return isDef(node) && isDef(node.text) && isFalse(node.isComment);
        }
        function normalizeArrayChildren(children, nestedIndex) {
            var res = [];
            var i, c, lastIndex, last;
            for (i = 0; i < children.length; i++) {
                c = children[i];
                if (isUndef(c) || typeof c === "boolean") {
                    continue;
                }
                lastIndex = res.length - 1;
                last = res[lastIndex];
                if (Array.isArray(c)) {
                    if (c.length > 0) {
                        c = normalizeArrayChildren(c, (nestedIndex || "") + "_" + i);
                        if (isTextNode(c[0]) && isTextNode(last)) {
                            res[lastIndex] = createTextVNode(last.text + c[0].text);
                            c.shift();
                        }
                        res.push.apply(res, c);
                    }
                } else if (isPrimitive(c)) {
                    if (isTextNode(last)) {
                        res[lastIndex] = createTextVNode(last.text + c);
                    } else if (c !== "") {
                        res.push(createTextVNode(c));
                    }
                } else {
                    if (isTextNode(c) && isTextNode(last)) {
                        res[lastIndex] = createTextVNode(last.text + c.text);
                    } else {
                        if (isTrue(children._isVList) && isDef(c.tag) && isUndef(c.key) && isDef(nestedIndex)) {
                            c.key = "__vlist" + nestedIndex + "_" + i + "__";
                        }
                        res.push(c);
                    }
                }
            }
            return res;
        }
        function initProvide(vm) {
            var provide = vm.$options.provide;
            if (provide) {
                vm._provided = typeof provide === "function" ? provide.call(vm) : provide;
            }
        }
        function initInjections(vm) {
            var result = resolveInject(vm.$options.inject, vm);
            if (result) {
                toggleObserving(false);
                Object.keys(result).forEach((function(key) {
                    if (false) {} else {
                        defineReactive$$1(vm, key, result[key]);
                    }
                }));
                toggleObserving(true);
            }
        }
        function resolveInject(inject, vm) {
            if (inject) {
                var result = Object.create(null);
                var keys = hasSymbol ? Reflect.ownKeys(inject) : Object.keys(inject);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    if (key === "__ob__") {
                        continue;
                    }
                    var provideKey = inject[key].from;
                    var source = vm;
                    while (source) {
                        if (source._provided && hasOwn(source._provided, provideKey)) {
                            result[key] = source._provided[provideKey];
                            break;
                        }
                        source = source.$parent;
                    }
                    if (!source) {
                        if ("default" in inject[key]) {
                            var provideDefault = inject[key].default;
                            result[key] = typeof provideDefault === "function" ? provideDefault.call(vm) : provideDefault;
                        } else if (false) {}
                    }
                }
                return result;
            }
        }
        function resolveSlots(children, context) {
            if (!children || !children.length) {
                return {};
            }
            var slots = {};
            for (var i = 0, l = children.length; i < l; i++) {
                var child = children[i];
                var data = child.data;
                if (data && data.attrs && data.attrs.slot) {
                    delete data.attrs.slot;
                }
                if ((child.context === context || child.fnContext === context) && data && data.slot != null) {
                    var name = data.slot;
                    var slot = slots[name] || (slots[name] = []);
                    if (child.tag === "template") {
                        slot.push.apply(slot, child.children || []);
                    } else {
                        slot.push(child);
                    }
                } else {
                    (slots.default || (slots.default = [])).push(child);
                }
            }
            for (var name$1 in slots) {
                if (slots[name$1].every(isWhitespace)) {
                    delete slots[name$1];
                }
            }
            return slots;
        }
        function isWhitespace(node) {
            return node.isComment && !node.asyncFactory || node.text === " ";
        }
        function isAsyncPlaceholder(node) {
            return node.isComment && node.asyncFactory;
        }
        function normalizeScopedSlots(slots, normalSlots, prevSlots) {
            var res;
            var hasNormalSlots = Object.keys(normalSlots).length > 0;
            var isStable = slots ? !!slots.$stable : !hasNormalSlots;
            var key = slots && slots.$key;
            if (!slots) {
                res = {};
            } else if (slots._normalized) {
                return slots._normalized;
            } else if (isStable && prevSlots && prevSlots !== emptyObject && key === prevSlots.$key && !hasNormalSlots && !prevSlots.$hasNormal) {
                return prevSlots;
            } else {
                res = {};
                for (var key$1 in slots) {
                    if (slots[key$1] && key$1[0] !== "$") {
                        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
                    }
                }
            }
            for (var key$2 in normalSlots) {
                if (!(key$2 in res)) {
                    res[key$2] = proxyNormalSlot(normalSlots, key$2);
                }
            }
            if (slots && Object.isExtensible(slots)) {
                slots._normalized = res;
            }
            def(res, "$stable", isStable);
            def(res, "$key", key);
            def(res, "$hasNormal", hasNormalSlots);
            return res;
        }
        function normalizeScopedSlot(normalSlots, key, fn) {
            var normalized = function() {
                var res = arguments.length ? fn.apply(null, arguments) : fn({});
                res = res && typeof res === "object" && !Array.isArray(res) ? [ res ] : normalizeChildren(res);
                var vnode = res && res[0];
                return res && (!vnode || res.length === 1 && vnode.isComment && !isAsyncPlaceholder(vnode)) ? undefined : res;
            };
            if (fn.proxy) {
                Object.defineProperty(normalSlots, key, {
                    get: normalized,
                    enumerable: true,
                    configurable: true
                });
            }
            return normalized;
        }
        function proxyNormalSlot(slots, key) {
            return function() {
                return slots[key];
            };
        }
        function renderList(val, render) {
            var ret, i, l, keys, key;
            if (Array.isArray(val) || typeof val === "string") {
                ret = new Array(val.length);
                for (i = 0, l = val.length; i < l; i++) {
                    ret[i] = render(val[i], i);
                }
            } else if (typeof val === "number") {
                ret = new Array(val);
                for (i = 0; i < val; i++) {
                    ret[i] = render(i + 1, i);
                }
            } else if (isObject(val)) {
                if (hasSymbol && val[Symbol.iterator]) {
                    ret = [];
                    var iterator = val[Symbol.iterator]();
                    var result = iterator.next();
                    while (!result.done) {
                        ret.push(render(result.value, ret.length));
                        result = iterator.next();
                    }
                } else {
                    keys = Object.keys(val);
                    ret = new Array(keys.length);
                    for (i = 0, l = keys.length; i < l; i++) {
                        key = keys[i];
                        ret[i] = render(val[key], key, i);
                    }
                }
            }
            if (!isDef(ret)) {
                ret = [];
            }
            ret._isVList = true;
            return ret;
        }
        function renderSlot(name, fallbackRender, props, bindObject) {
            var scopedSlotFn = this.$scopedSlots[name];
            var nodes;
            if (scopedSlotFn) {
                props = props || {};
                if (bindObject) {
                    if (false) {}
                    props = extend(extend({}, bindObject), props);
                }
                nodes = scopedSlotFn(props) || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
            } else {
                nodes = this.$slots[name] || (typeof fallbackRender === "function" ? fallbackRender() : fallbackRender);
            }
            var target = props && props.slot;
            if (target) {
                return this.$createElement("template", {
                    slot: target
                }, nodes);
            } else {
                return nodes;
            }
        }
        function resolveFilter(id) {
            return resolveAsset(this.$options, "filters", id, true) || identity;
        }
        function isKeyNotMatch(expect, actual) {
            if (Array.isArray(expect)) {
                return expect.indexOf(actual) === -1;
            } else {
                return expect !== actual;
            }
        }
        function checkKeyCodes(eventKeyCode, key, builtInKeyCode, eventKeyName, builtInKeyName) {
            var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
            if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
                return isKeyNotMatch(builtInKeyName, eventKeyName);
            } else if (mappedKeyCode) {
                return isKeyNotMatch(mappedKeyCode, eventKeyCode);
            } else if (eventKeyName) {
                return hyphenate(eventKeyName) !== key;
            }
            return eventKeyCode === undefined;
        }
        function bindObjectProps(data, tag, value, asProp, isSync) {
            if (value) {
                if (!isObject(value)) {
                    false && 0;
                } else {
                    if (Array.isArray(value)) {
                        value = toObject(value);
                    }
                    var hash;
                    var loop = function(key) {
                        if (key === "class" || key === "style" || isReservedAttribute(key)) {
                            hash = data;
                        } else {
                            var type = data.attrs && data.attrs.type;
                            hash = asProp || config.mustUseProp(tag, type, key) ? data.domProps || (data.domProps = {}) : data.attrs || (data.attrs = {});
                        }
                        var camelizedKey = camelize(key);
                        var hyphenatedKey = hyphenate(key);
                        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
                            hash[key] = value[key];
                            if (isSync) {
                                var on = data.on || (data.on = {});
                                on["update:" + key] = function($event) {
                                    value[key] = $event;
                                };
                            }
                        }
                    };
                    for (var key in value) loop(key);
                }
            }
            return data;
        }
        function renderStatic(index, isInFor) {
            var cached = this._staticTrees || (this._staticTrees = []);
            var tree = cached[index];
            if (tree && !isInFor) {
                return tree;
            }
            tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, null, this);
            markStatic(tree, "__static__" + index, false);
            return tree;
        }
        function markOnce(tree, index, key) {
            markStatic(tree, "__once__" + index + (key ? "_" + key : ""), true);
            return tree;
        }
        function markStatic(tree, key, isOnce) {
            if (Array.isArray(tree)) {
                for (var i = 0; i < tree.length; i++) {
                    if (tree[i] && typeof tree[i] !== "string") {
                        markStaticNode(tree[i], key + "_" + i, isOnce);
                    }
                }
            } else {
                markStaticNode(tree, key, isOnce);
            }
        }
        function markStaticNode(node, key, isOnce) {
            node.isStatic = true;
            node.key = key;
            node.isOnce = isOnce;
        }
        function bindObjectListeners(data, value) {
            if (value) {
                if (!isPlainObject(value)) {
                    false && 0;
                } else {
                    var on = data.on = data.on ? extend({}, data.on) : {};
                    for (var key in value) {
                        var existing = on[key];
                        var ours = value[key];
                        on[key] = existing ? [].concat(existing, ours) : ours;
                    }
                }
            }
            return data;
        }
        function resolveScopedSlots(fns, res, hasDynamicKeys, contentHashKey) {
            res = res || {
                $stable: !hasDynamicKeys
            };
            for (var i = 0; i < fns.length; i++) {
                var slot = fns[i];
                if (Array.isArray(slot)) {
                    resolveScopedSlots(slot, res, hasDynamicKeys);
                } else if (slot) {
                    if (slot.proxy) {
                        slot.fn.proxy = true;
                    }
                    res[slot.key] = slot.fn;
                }
            }
            if (contentHashKey) {
                res.$key = contentHashKey;
            }
            return res;
        }
        function bindDynamicKeys(baseObj, values) {
            for (var i = 0; i < values.length; i += 2) {
                var key = values[i];
                if (typeof key === "string" && key) {
                    baseObj[values[i]] = values[i + 1];
                } else if (false) {}
            }
            return baseObj;
        }
        function prependModifier(value, symbol) {
            return typeof value === "string" ? symbol + value : value;
        }
        function installRenderHelpers(target) {
            target._o = markOnce;
            target._n = toNumber;
            target._s = vue_runtime_esm_toString;
            target._l = renderList;
            target._t = renderSlot;
            target._q = looseEqual;
            target._i = looseIndexOf;
            target._m = renderStatic;
            target._f = resolveFilter;
            target._k = checkKeyCodes;
            target._b = bindObjectProps;
            target._v = createTextVNode;
            target._e = createEmptyVNode;
            target._u = resolveScopedSlots;
            target._g = bindObjectListeners;
            target._d = bindDynamicKeys;
            target._p = prependModifier;
        }
        function FunctionalRenderContext(data, props, children, parent, Ctor) {
            var this$1 = this;
            var options = Ctor.options;
            var contextVm;
            if (hasOwn(parent, "_uid")) {
                contextVm = Object.create(parent);
                contextVm._original = parent;
            } else {
                contextVm = parent;
                parent = parent._original;
            }
            var isCompiled = isTrue(options._compiled);
            var needNormalization = !isCompiled;
            this.data = data;
            this.props = props;
            this.children = children;
            this.parent = parent;
            this.listeners = data.on || emptyObject;
            this.injections = resolveInject(options.inject, parent);
            this.slots = function() {
                if (!this$1.$slots) {
                    normalizeScopedSlots(data.scopedSlots, this$1.$slots = resolveSlots(children, parent));
                }
                return this$1.$slots;
            };
            Object.defineProperty(this, "scopedSlots", {
                enumerable: true,
                get: function get() {
                    return normalizeScopedSlots(data.scopedSlots, this.slots());
                }
            });
            if (isCompiled) {
                this.$options = options;
                this.$slots = this.slots();
                this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
            }
            if (options._scopeId) {
                this._c = function(a, b, c, d) {
                    var vnode = createElement(contextVm, a, b, c, d, needNormalization);
                    if (vnode && !Array.isArray(vnode)) {
                        vnode.fnScopeId = options._scopeId;
                        vnode.fnContext = parent;
                    }
                    return vnode;
                };
            } else {
                this._c = function(a, b, c, d) {
                    return createElement(contextVm, a, b, c, d, needNormalization);
                };
            }
        }
        installRenderHelpers(FunctionalRenderContext.prototype);
        function createFunctionalComponent(Ctor, propsData, data, contextVm, children) {
            var options = Ctor.options;
            var props = {};
            var propOptions = options.props;
            if (isDef(propOptions)) {
                for (var key in propOptions) {
                    props[key] = validateProp(key, propOptions, propsData || emptyObject);
                }
            } else {
                if (isDef(data.attrs)) {
                    mergeProps(props, data.attrs);
                }
                if (isDef(data.props)) {
                    mergeProps(props, data.props);
                }
            }
            var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
            var vnode = options.render.call(null, renderContext._c, renderContext);
            if (vnode instanceof VNode) {
                return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
            } else if (Array.isArray(vnode)) {
                var vnodes = normalizeChildren(vnode) || [];
                var res = new Array(vnodes.length);
                for (var i = 0; i < vnodes.length; i++) {
                    res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
                }
                return res;
            }
        }
        function cloneAndMarkFunctionalResult(vnode, data, contextVm, options, renderContext) {
            var clone = cloneVNode(vnode);
            clone.fnContext = contextVm;
            clone.fnOptions = options;
            if (false) {}
            if (data.slot) {
                (clone.data || (clone.data = {})).slot = data.slot;
            }
            return clone;
        }
        function mergeProps(to, from) {
            for (var key in from) {
                to[camelize(key)] = from[key];
            }
        }
        var componentVNodeHooks = {
            init: function init(vnode, hydrating) {
                if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
                    var mountedNode = vnode;
                    componentVNodeHooks.prepatch(mountedNode, mountedNode);
                } else {
                    var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
                    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
                }
            },
            prepatch: function prepatch(oldVnode, vnode) {
                var options = vnode.componentOptions;
                var child = vnode.componentInstance = oldVnode.componentInstance;
                updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
            },
            insert: function insert(vnode) {
                var context = vnode.context;
                var componentInstance = vnode.componentInstance;
                if (!componentInstance._isMounted) {
                    componentInstance._isMounted = true;
                    callHook(componentInstance, "mounted");
                }
                if (vnode.data.keepAlive) {
                    if (context._isMounted) {
                        queueActivatedComponent(componentInstance);
                    } else {
                        activateChildComponent(componentInstance, true);
                    }
                }
            },
            destroy: function destroy(vnode) {
                var componentInstance = vnode.componentInstance;
                if (!componentInstance._isDestroyed) {
                    if (!vnode.data.keepAlive) {
                        componentInstance.$destroy();
                    } else {
                        deactivateChildComponent(componentInstance, true);
                    }
                }
            }
        };
        var hooksToMerge = Object.keys(componentVNodeHooks);
        function createComponent(Ctor, data, context, children, tag) {
            if (isUndef(Ctor)) {
                return;
            }
            var baseCtor = context.$options._base;
            if (isObject(Ctor)) {
                Ctor = baseCtor.extend(Ctor);
            }
            if (typeof Ctor !== "function") {
                if (false) {}
                return;
            }
            var asyncFactory;
            if (isUndef(Ctor.cid)) {
                asyncFactory = Ctor;
                Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
                if (Ctor === undefined) {
                    return createAsyncPlaceholder(asyncFactory, data, context, children, tag);
                }
            }
            data = data || {};
            resolveConstructorOptions(Ctor);
            if (isDef(data.model)) {
                transformModel(Ctor.options, data);
            }
            var propsData = extractPropsFromVNodeData(data, Ctor, tag);
            if (isTrue(Ctor.options.functional)) {
                return createFunctionalComponent(Ctor, propsData, data, context, children);
            }
            var listeners = data.on;
            data.on = data.nativeOn;
            if (isTrue(Ctor.options.abstract)) {
                var slot = data.slot;
                data = {};
                if (slot) {
                    data.slot = slot;
                }
            }
            installComponentHooks(data);
            var name = Ctor.options.name || tag;
            var vnode = new VNode("vue-component-" + Ctor.cid + (name ? "-" + name : ""), data, undefined, undefined, undefined, context, {
                Ctor,
                propsData,
                listeners,
                tag,
                children
            }, asyncFactory);
            return vnode;
        }
        function createComponentInstanceForVnode(vnode, parent) {
            var options = {
                _isComponent: true,
                _parentVnode: vnode,
                parent
            };
            var inlineTemplate = vnode.data.inlineTemplate;
            if (isDef(inlineTemplate)) {
                options.render = inlineTemplate.render;
                options.staticRenderFns = inlineTemplate.staticRenderFns;
            }
            return new vnode.componentOptions.Ctor(options);
        }
        function installComponentHooks(data) {
            var hooks = data.hook || (data.hook = {});
            for (var i = 0; i < hooksToMerge.length; i++) {
                var key = hooksToMerge[i];
                var existing = hooks[key];
                var toMerge = componentVNodeHooks[key];
                if (existing !== toMerge && !(existing && existing._merged)) {
                    hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
                }
            }
        }
        function mergeHook$1(f1, f2) {
            var merged = function(a, b) {
                f1(a, b);
                f2(a, b);
            };
            merged._merged = true;
            return merged;
        }
        function transformModel(options, data) {
            var prop = options.model && options.model.prop || "value";
            var event = options.model && options.model.event || "input";
            (data.attrs || (data.attrs = {}))[prop] = data.model.value;
            var on = data.on || (data.on = {});
            var existing = on[event];
            var callback = data.model.callback;
            if (isDef(existing)) {
                if (Array.isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
                    on[event] = [ callback ].concat(existing);
                }
            } else {
                on[event] = callback;
            }
        }
        var SIMPLE_NORMALIZE = 1;
        var ALWAYS_NORMALIZE = 2;
        function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
            if (Array.isArray(data) || isPrimitive(data)) {
                normalizationType = children;
                children = data;
                data = undefined;
            }
            if (isTrue(alwaysNormalize)) {
                normalizationType = ALWAYS_NORMALIZE;
            }
            return _createElement(context, tag, data, children, normalizationType);
        }
        function _createElement(context, tag, data, children, normalizationType) {
            if (isDef(data) && isDef(data.__ob__)) {
                false && 0;
                return createEmptyVNode();
            }
            if (isDef(data) && isDef(data.is)) {
                tag = data.is;
            }
            if (!tag) {
                return createEmptyVNode();
            }
            if (false) {}
            if (Array.isArray(children) && typeof children[0] === "function") {
                data = data || {};
                data.scopedSlots = {
                    default: children[0]
                };
                children.length = 0;
            }
            if (normalizationType === ALWAYS_NORMALIZE) {
                children = normalizeChildren(children);
            } else if (normalizationType === SIMPLE_NORMALIZE) {
                children = simpleNormalizeChildren(children);
            }
            var vnode, ns;
            if (typeof tag === "string") {
                var Ctor;
                ns = context.$vnode && context.$vnode.ns || config.getTagNamespace(tag);
                if (config.isReservedTag(tag)) {
                    if (false) {}
                    vnode = new VNode(config.parsePlatformTagName(tag), data, children, undefined, undefined, context);
                } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, "components", tag))) {
                    vnode = createComponent(Ctor, data, context, children, tag);
                } else {
                    vnode = new VNode(tag, data, children, undefined, undefined, context);
                }
            } else {
                vnode = createComponent(tag, data, context, children);
            }
            if (Array.isArray(vnode)) {
                return vnode;
            } else if (isDef(vnode)) {
                if (isDef(ns)) {
                    applyNS(vnode, ns);
                }
                if (isDef(data)) {
                    registerDeepBindings(data);
                }
                return vnode;
            } else {
                return createEmptyVNode();
            }
        }
        function applyNS(vnode, ns, force) {
            vnode.ns = ns;
            if (vnode.tag === "foreignObject") {
                ns = undefined;
                force = true;
            }
            if (isDef(vnode.children)) {
                for (var i = 0, l = vnode.children.length; i < l; i++) {
                    var child = vnode.children[i];
                    if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force) && child.tag !== "svg")) {
                        applyNS(child, ns, force);
                    }
                }
            }
        }
        function registerDeepBindings(data) {
            if (isObject(data.style)) {
                traverse(data.style);
            }
            if (isObject(data.class)) {
                traverse(data.class);
            }
        }
        function initRender(vm) {
            vm._vnode = null;
            vm._staticTrees = null;
            var options = vm.$options;
            var parentVnode = vm.$vnode = options._parentVnode;
            var renderContext = parentVnode && parentVnode.context;
            vm.$slots = resolveSlots(options._renderChildren, renderContext);
            vm.$scopedSlots = emptyObject;
            vm._c = function(a, b, c, d) {
                return createElement(vm, a, b, c, d, false);
            };
            vm.$createElement = function(a, b, c, d) {
                return createElement(vm, a, b, c, d, true);
            };
            var parentData = parentVnode && parentVnode.data;
            if (false) {} else {
                defineReactive$$1(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
                defineReactive$$1(vm, "$listeners", options._parentListeners || emptyObject, null, true);
            }
        }
        var currentRenderingInstance = null;
        function renderMixin(Vue) {
            installRenderHelpers(Vue.prototype);
            Vue.prototype.$nextTick = function(fn) {
                return nextTick(fn, this);
            };
            Vue.prototype._render = function() {
                var vm = this;
                var ref = vm.$options;
                var render = ref.render;
                var _parentVnode = ref._parentVnode;
                if (_parentVnode) {
                    vm.$scopedSlots = normalizeScopedSlots(_parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
                }
                vm.$vnode = _parentVnode;
                var vnode;
                try {
                    currentRenderingInstance = vm;
                    vnode = render.call(vm._renderProxy, vm.$createElement);
                } catch (e) {
                    handleError(e, vm, "render");
                    if (false) {} else {
                        vnode = vm._vnode;
                    }
                } finally {
                    currentRenderingInstance = null;
                }
                if (Array.isArray(vnode) && vnode.length === 1) {
                    vnode = vnode[0];
                }
                if (!(vnode instanceof VNode)) {
                    if (false) {}
                    vnode = createEmptyVNode();
                }
                vnode.parent = _parentVnode;
                return vnode;
            };
        }
        function ensureCtor(comp, base) {
            if (comp.__esModule || hasSymbol && comp[Symbol.toStringTag] === "Module") {
                comp = comp.default;
            }
            return isObject(comp) ? base.extend(comp) : comp;
        }
        function createAsyncPlaceholder(factory, data, context, children, tag) {
            var node = createEmptyVNode();
            node.asyncFactory = factory;
            node.asyncMeta = {
                data,
                context,
                children,
                tag
            };
            return node;
        }
        function resolveAsyncComponent(factory, baseCtor) {
            if (isTrue(factory.error) && isDef(factory.errorComp)) {
                return factory.errorComp;
            }
            if (isDef(factory.resolved)) {
                return factory.resolved;
            }
            var owner = currentRenderingInstance;
            if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
                factory.owners.push(owner);
            }
            if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
                return factory.loadingComp;
            }
            if (owner && !isDef(factory.owners)) {
                var owners = factory.owners = [ owner ];
                var sync = true;
                var timerLoading = null;
                var timerTimeout = null;
                owner.$on("hook:destroyed", (function() {
                    return remove(owners, owner);
                }));
                var forceRender = function(renderCompleted) {
                    for (var i = 0, l = owners.length; i < l; i++) {
                        owners[i].$forceUpdate();
                    }
                    if (renderCompleted) {
                        owners.length = 0;
                        if (timerLoading !== null) {
                            clearTimeout(timerLoading);
                            timerLoading = null;
                        }
                        if (timerTimeout !== null) {
                            clearTimeout(timerTimeout);
                            timerTimeout = null;
                        }
                    }
                };
                var resolve = once((function(res) {
                    factory.resolved = ensureCtor(res, baseCtor);
                    if (!sync) {
                        forceRender(true);
                    } else {
                        owners.length = 0;
                    }
                }));
                var reject = once((function(reason) {
                    false && 0;
                    if (isDef(factory.errorComp)) {
                        factory.error = true;
                        forceRender(true);
                    }
                }));
                var res = factory(resolve, reject);
                if (isObject(res)) {
                    if (isPromise(res)) {
                        if (isUndef(factory.resolved)) {
                            res.then(resolve, reject);
                        }
                    } else if (isPromise(res.component)) {
                        res.component.then(resolve, reject);
                        if (isDef(res.error)) {
                            factory.errorComp = ensureCtor(res.error, baseCtor);
                        }
                        if (isDef(res.loading)) {
                            factory.loadingComp = ensureCtor(res.loading, baseCtor);
                            if (res.delay === 0) {
                                factory.loading = true;
                            } else {
                                timerLoading = setTimeout((function() {
                                    timerLoading = null;
                                    if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                        factory.loading = true;
                                        forceRender(false);
                                    }
                                }), res.delay || 200);
                            }
                        }
                        if (isDef(res.timeout)) {
                            timerTimeout = setTimeout((function() {
                                timerTimeout = null;
                                if (isUndef(factory.resolved)) {
                                    reject(false ? 0 : null);
                                }
                            }), res.timeout);
                        }
                    }
                }
                sync = false;
                return factory.loading ? factory.loadingComp : factory.resolved;
            }
        }
        function getFirstComponentChild(children) {
            if (Array.isArray(children)) {
                for (var i = 0; i < children.length; i++) {
                    var c = children[i];
                    if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                        return c;
                    }
                }
            }
        }
        function initEvents(vm) {
            vm._events = Object.create(null);
            vm._hasHookEvent = false;
            var listeners = vm.$options._parentListeners;
            if (listeners) {
                updateComponentListeners(vm, listeners);
            }
        }
        var target;
        function add(event, fn) {
            target.$on(event, fn);
        }
        function remove$1(event, fn) {
            target.$off(event, fn);
        }
        function createOnceHandler(event, fn) {
            var _target = target;
            return function onceHandler() {
                var res = fn.apply(null, arguments);
                if (res !== null) {
                    _target.$off(event, onceHandler);
                }
            };
        }
        function updateComponentListeners(vm, listeners, oldListeners) {
            target = vm;
            updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
            target = undefined;
        }
        function eventsMixin(Vue) {
            var hookRE = /^hook:/;
            Vue.prototype.$on = function(event, fn) {
                var vm = this;
                if (Array.isArray(event)) {
                    for (var i = 0, l = event.length; i < l; i++) {
                        vm.$on(event[i], fn);
                    }
                } else {
                    (vm._events[event] || (vm._events[event] = [])).push(fn);
                    if (hookRE.test(event)) {
                        vm._hasHookEvent = true;
                    }
                }
                return vm;
            };
            Vue.prototype.$once = function(event, fn) {
                var vm = this;
                function on() {
                    vm.$off(event, on);
                    fn.apply(vm, arguments);
                }
                on.fn = fn;
                vm.$on(event, on);
                return vm;
            };
            Vue.prototype.$off = function(event, fn) {
                var vm = this;
                if (!arguments.length) {
                    vm._events = Object.create(null);
                    return vm;
                }
                if (Array.isArray(event)) {
                    for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
                        vm.$off(event[i$1], fn);
                    }
                    return vm;
                }
                var cbs = vm._events[event];
                if (!cbs) {
                    return vm;
                }
                if (!fn) {
                    vm._events[event] = null;
                    return vm;
                }
                var cb;
                var i = cbs.length;
                while (i--) {
                    cb = cbs[i];
                    if (cb === fn || cb.fn === fn) {
                        cbs.splice(i, 1);
                        break;
                    }
                }
                return vm;
            };
            Vue.prototype.$emit = function(event) {
                var vm = this;
                if (false) {
                    var lowerCaseEvent;
                }
                var cbs = vm._events[event];
                if (cbs) {
                    cbs = cbs.length > 1 ? toArray(cbs) : cbs;
                    var args = toArray(arguments, 1);
                    var info = 'event handler for "' + event + '"';
                    for (var i = 0, l = cbs.length; i < l; i++) {
                        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
                    }
                }
                return vm;
            };
        }
        var activeInstance = null;
        var isUpdatingChildComponent = false;
        function setActiveInstance(vm) {
            var prevActiveInstance = activeInstance;
            activeInstance = vm;
            return function() {
                activeInstance = prevActiveInstance;
            };
        }
        function initLifecycle(vm) {
            var options = vm.$options;
            var parent = options.parent;
            if (parent && !options.abstract) {
                while (parent.$options.abstract && parent.$parent) {
                    parent = parent.$parent;
                }
                parent.$children.push(vm);
            }
            vm.$parent = parent;
            vm.$root = parent ? parent.$root : vm;
            vm.$children = [];
            vm.$refs = {};
            vm._watcher = null;
            vm._inactive = null;
            vm._directInactive = false;
            vm._isMounted = false;
            vm._isDestroyed = false;
            vm._isBeingDestroyed = false;
        }
        function lifecycleMixin(Vue) {
            Vue.prototype._update = function(vnode, hydrating) {
                var vm = this;
                var prevEl = vm.$el;
                var prevVnode = vm._vnode;
                var restoreActiveInstance = setActiveInstance(vm);
                vm._vnode = vnode;
                if (!prevVnode) {
                    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false);
                } else {
                    vm.$el = vm.__patch__(prevVnode, vnode);
                }
                restoreActiveInstance();
                if (prevEl) {
                    prevEl.__vue__ = null;
                }
                if (vm.$el) {
                    vm.$el.__vue__ = vm;
                }
                if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
                    vm.$parent.$el = vm.$el;
                }
            };
            Vue.prototype.$forceUpdate = function() {
                var vm = this;
                if (vm._watcher) {
                    vm._watcher.update();
                }
            };
            Vue.prototype.$destroy = function() {
                var vm = this;
                if (vm._isBeingDestroyed) {
                    return;
                }
                callHook(vm, "beforeDestroy");
                vm._isBeingDestroyed = true;
                var parent = vm.$parent;
                if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
                    remove(parent.$children, vm);
                }
                if (vm._watcher) {
                    vm._watcher.teardown();
                }
                var i = vm._watchers.length;
                while (i--) {
                    vm._watchers[i].teardown();
                }
                if (vm._data.__ob__) {
                    vm._data.__ob__.vmCount--;
                }
                vm._isDestroyed = true;
                vm.__patch__(vm._vnode, null);
                callHook(vm, "destroyed");
                vm.$off();
                if (vm.$el) {
                    vm.$el.__vue__ = null;
                }
                if (vm.$vnode) {
                    vm.$vnode.parent = null;
                }
            };
        }
        function mountComponent(vm, el, hydrating) {
            vm.$el = el;
            if (!vm.$options.render) {
                vm.$options.render = createEmptyVNode;
                if (false) {}
            }
            callHook(vm, "beforeMount");
            var updateComponent;
            if (false) {} else {
                updateComponent = function() {
                    vm._update(vm._render(), hydrating);
                };
            }
            new Watcher(vm, updateComponent, noop, {
                before: function before() {
                    if (vm._isMounted && !vm._isDestroyed) {
                        callHook(vm, "beforeUpdate");
                    }
                }
            }, true);
            hydrating = false;
            if (vm.$vnode == null) {
                vm._isMounted = true;
                callHook(vm, "mounted");
            }
            return vm;
        }
        function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
            if (false) {}
            var newScopedSlots = parentVnode.data.scopedSlots;
            var oldScopedSlots = vm.$scopedSlots;
            var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
            var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
            vm.$options._parentVnode = parentVnode;
            vm.$vnode = parentVnode;
            if (vm._vnode) {
                vm._vnode.parent = parentVnode;
            }
            vm.$options._renderChildren = renderChildren;
            vm.$attrs = parentVnode.data.attrs || emptyObject;
            vm.$listeners = listeners || emptyObject;
            if (propsData && vm.$options.props) {
                toggleObserving(false);
                var props = vm._props;
                var propKeys = vm.$options._propKeys || [];
                for (var i = 0; i < propKeys.length; i++) {
                    var key = propKeys[i];
                    var propOptions = vm.$options.props;
                    props[key] = validateProp(key, propOptions, propsData, vm);
                }
                toggleObserving(true);
                vm.$options.propsData = propsData;
            }
            listeners = listeners || emptyObject;
            var oldListeners = vm.$options._parentListeners;
            vm.$options._parentListeners = listeners;
            updateComponentListeners(vm, listeners, oldListeners);
            if (needsForceUpdate) {
                vm.$slots = resolveSlots(renderChildren, parentVnode.context);
                vm.$forceUpdate();
            }
            if (false) {}
        }
        function isInInactiveTree(vm) {
            while (vm && (vm = vm.$parent)) {
                if (vm._inactive) {
                    return true;
                }
            }
            return false;
        }
        function activateChildComponent(vm, direct) {
            if (direct) {
                vm._directInactive = false;
                if (isInInactiveTree(vm)) {
                    return;
                }
            } else if (vm._directInactive) {
                return;
            }
            if (vm._inactive || vm._inactive === null) {
                vm._inactive = false;
                for (var i = 0; i < vm.$children.length; i++) {
                    activateChildComponent(vm.$children[i]);
                }
                callHook(vm, "activated");
            }
        }
        function deactivateChildComponent(vm, direct) {
            if (direct) {
                vm._directInactive = true;
                if (isInInactiveTree(vm)) {
                    return;
                }
            }
            if (!vm._inactive) {
                vm._inactive = true;
                for (var i = 0; i < vm.$children.length; i++) {
                    deactivateChildComponent(vm.$children[i]);
                }
                callHook(vm, "deactivated");
            }
        }
        function callHook(vm, hook) {
            pushTarget();
            var handlers = vm.$options[hook];
            var info = hook + " hook";
            if (handlers) {
                for (var i = 0, j = handlers.length; i < j; i++) {
                    invokeWithErrorHandling(handlers[i], vm, null, vm, info);
                }
            }
            if (vm._hasHookEvent) {
                vm.$emit("hook:" + hook);
            }
            popTarget();
        }
        var MAX_UPDATE_COUNT = 100;
        var queue = [];
        var activatedChildren = [];
        var has = {};
        var circular = {};
        var waiting = false;
        var flushing = false;
        var index = 0;
        function resetSchedulerState() {
            index = queue.length = activatedChildren.length = 0;
            has = {};
            if (false) {}
            waiting = flushing = false;
        }
        var currentFlushTimestamp = 0;
        var getNow = Date.now;
        if (inBrowser && !isIE) {
            var vue_runtime_esm_performance = window.performance;
            if (vue_runtime_esm_performance && typeof vue_runtime_esm_performance.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
                getNow = function() {
                    return vue_runtime_esm_performance.now();
                };
            }
        }
        function flushSchedulerQueue() {
            currentFlushTimestamp = getNow();
            flushing = true;
            var watcher, id;
            queue.sort((function(a, b) {
                return a.id - b.id;
            }));
            for (index = 0; index < queue.length; index++) {
                watcher = queue[index];
                if (watcher.before) {
                    watcher.before();
                }
                id = watcher.id;
                has[id] = null;
                watcher.run();
                if (false) {}
            }
            var activatedQueue = activatedChildren.slice();
            var updatedQueue = queue.slice();
            resetSchedulerState();
            callActivatedHooks(activatedQueue);
            callUpdatedHooks(updatedQueue);
            if (devtools && config.devtools) {
                devtools.emit("flush");
            }
        }
        function callUpdatedHooks(queue) {
            var i = queue.length;
            while (i--) {
                var watcher = queue[i];
                var vm = watcher.vm;
                if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
                    callHook(vm, "updated");
                }
            }
        }
        function queueActivatedComponent(vm) {
            vm._inactive = false;
            activatedChildren.push(vm);
        }
        function callActivatedHooks(queue) {
            for (var i = 0; i < queue.length; i++) {
                queue[i]._inactive = true;
                activateChildComponent(queue[i], true);
            }
        }
        function queueWatcher(watcher) {
            var id = watcher.id;
            if (has[id] == null) {
                has[id] = true;
                if (!flushing) {
                    queue.push(watcher);
                } else {
                    var i = queue.length - 1;
                    while (i > index && queue[i].id > watcher.id) {
                        i--;
                    }
                    queue.splice(i + 1, 0, watcher);
                }
                if (!waiting) {
                    waiting = true;
                    if (false) {}
                    nextTick(flushSchedulerQueue);
                }
            }
        }
        var uid$2 = 0;
        var Watcher = function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
            this.vm = vm;
            if (isRenderWatcher) {
                vm._watcher = this;
            }
            vm._watchers.push(this);
            if (options) {
                this.deep = !!options.deep;
                this.user = !!options.user;
                this.lazy = !!options.lazy;
                this.sync = !!options.sync;
                this.before = options.before;
            } else {
                this.deep = this.user = this.lazy = this.sync = false;
            }
            this.cb = cb;
            this.id = ++uid$2;
            this.active = true;
            this.dirty = this.lazy;
            this.deps = [];
            this.newDeps = [];
            this.depIds = new _Set;
            this.newDepIds = new _Set;
            this.expression = false ? 0 : "";
            if (typeof expOrFn === "function") {
                this.getter = expOrFn;
            } else {
                this.getter = parsePath(expOrFn);
                if (!this.getter) {
                    this.getter = noop;
                    false && 0;
                }
            }
            this.value = this.lazy ? undefined : this.get();
        };
        Watcher.prototype.get = function get() {
            pushTarget(this);
            var value;
            var vm = this.vm;
            try {
                value = this.getter.call(vm, vm);
            } catch (e) {
                if (this.user) {
                    handleError(e, vm, 'getter for watcher "' + this.expression + '"');
                } else {
                    throw e;
                }
            } finally {
                if (this.deep) {
                    traverse(value);
                }
                popTarget();
                this.cleanupDeps();
            }
            return value;
        };
        Watcher.prototype.addDep = function addDep(dep) {
            var id = dep.id;
            if (!this.newDepIds.has(id)) {
                this.newDepIds.add(id);
                this.newDeps.push(dep);
                if (!this.depIds.has(id)) {
                    dep.addSub(this);
                }
            }
        };
        Watcher.prototype.cleanupDeps = function cleanupDeps() {
            var i = this.deps.length;
            while (i--) {
                var dep = this.deps[i];
                if (!this.newDepIds.has(dep.id)) {
                    dep.removeSub(this);
                }
            }
            var tmp = this.depIds;
            this.depIds = this.newDepIds;
            this.newDepIds = tmp;
            this.newDepIds.clear();
            tmp = this.deps;
            this.deps = this.newDeps;
            this.newDeps = tmp;
            this.newDeps.length = 0;
        };
        Watcher.prototype.update = function update() {
            if (this.lazy) {
                this.dirty = true;
            } else if (this.sync) {
                this.run();
            } else {
                queueWatcher(this);
            }
        };
        Watcher.prototype.run = function run() {
            if (this.active) {
                var value = this.get();
                if (value !== this.value || isObject(value) || this.deep) {
                    var oldValue = this.value;
                    this.value = value;
                    if (this.user) {
                        var info = 'callback for watcher "' + this.expression + '"';
                        invokeWithErrorHandling(this.cb, this.vm, [ value, oldValue ], this.vm, info);
                    } else {
                        this.cb.call(this.vm, value, oldValue);
                    }
                }
            }
        };
        Watcher.prototype.evaluate = function evaluate() {
            this.value = this.get();
            this.dirty = false;
        };
        Watcher.prototype.depend = function depend() {
            var i = this.deps.length;
            while (i--) {
                this.deps[i].depend();
            }
        };
        Watcher.prototype.teardown = function teardown() {
            if (this.active) {
                if (!this.vm._isBeingDestroyed) {
                    remove(this.vm._watchers, this);
                }
                var i = this.deps.length;
                while (i--) {
                    this.deps[i].removeSub(this);
                }
                this.active = false;
            }
        };
        var sharedPropertyDefinition = {
            enumerable: true,
            configurable: true,
            get: noop,
            set: noop
        };
        function proxy(target, sourceKey, key) {
            sharedPropertyDefinition.get = function proxyGetter() {
                return this[sourceKey][key];
            };
            sharedPropertyDefinition.set = function proxySetter(val) {
                this[sourceKey][key] = val;
            };
            Object.defineProperty(target, key, sharedPropertyDefinition);
        }
        function initState(vm) {
            vm._watchers = [];
            var opts = vm.$options;
            if (opts.props) {
                initProps(vm, opts.props);
            }
            if (opts.methods) {
                initMethods(vm, opts.methods);
            }
            if (opts.data) {
                initData(vm);
            } else {
                observe(vm._data = {}, true);
            }
            if (opts.computed) {
                initComputed(vm, opts.computed);
            }
            if (opts.watch && opts.watch !== nativeWatch) {
                initWatch(vm, opts.watch);
            }
        }
        function initProps(vm, propsOptions) {
            var propsData = vm.$options.propsData || {};
            var props = vm._props = {};
            var keys = vm.$options._propKeys = [];
            var isRoot = !vm.$parent;
            if (!isRoot) {
                toggleObserving(false);
            }
            var loop = function(key) {
                keys.push(key);
                var value = validateProp(key, propsOptions, propsData, vm);
                if (false) {
                    var hyphenatedKey;
                } else {
                    defineReactive$$1(props, key, value);
                }
                if (!(key in vm)) {
                    proxy(vm, "_props", key);
                }
            };
            for (var key in propsOptions) loop(key);
            toggleObserving(true);
        }
        function initData(vm) {
            var data = vm.$options.data;
            data = vm._data = typeof data === "function" ? getData(data, vm) : data || {};
            if (!isPlainObject(data)) {
                data = {};
                false && 0;
            }
            var keys = Object.keys(data);
            var props = vm.$options.props;
            var methods = vm.$options.methods;
            var i = keys.length;
            while (i--) {
                var key = keys[i];
                if (false) {}
                if (props && hasOwn(props, key)) {
                    false && 0;
                } else if (!isReserved(key)) {
                    proxy(vm, "_data", key);
                }
            }
            observe(data, true);
        }
        function getData(data, vm) {
            pushTarget();
            try {
                return data.call(vm, vm);
            } catch (e) {
                handleError(e, vm, "data()");
                return {};
            } finally {
                popTarget();
            }
        }
        var computedWatcherOptions = {
            lazy: true
        };
        function initComputed(vm, computed) {
            var watchers = vm._computedWatchers = Object.create(null);
            var isSSR = isServerRendering();
            for (var key in computed) {
                var userDef = computed[key];
                var getter = typeof userDef === "function" ? userDef : userDef.get;
                if (false) {}
                if (!isSSR) {
                    watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
                }
                if (!(key in vm)) {
                    defineComputed(vm, key, userDef);
                } else if (false) {}
            }
        }
        function defineComputed(target, key, userDef) {
            var shouldCache = !isServerRendering();
            if (typeof userDef === "function") {
                sharedPropertyDefinition.get = shouldCache ? createComputedGetter(key) : createGetterInvoker(userDef);
                sharedPropertyDefinition.set = noop;
            } else {
                sharedPropertyDefinition.get = userDef.get ? shouldCache && userDef.cache !== false ? createComputedGetter(key) : createGetterInvoker(userDef.get) : noop;
                sharedPropertyDefinition.set = userDef.set || noop;
            }
            if (false) {}
            Object.defineProperty(target, key, sharedPropertyDefinition);
        }
        function createComputedGetter(key) {
            return function computedGetter() {
                var watcher = this._computedWatchers && this._computedWatchers[key];
                if (watcher) {
                    if (watcher.dirty) {
                        watcher.evaluate();
                    }
                    if (Dep.target) {
                        watcher.depend();
                    }
                    return watcher.value;
                }
            };
        }
        function createGetterInvoker(fn) {
            return function computedGetter() {
                return fn.call(this, this);
            };
        }
        function initMethods(vm, methods) {
            var props = vm.$options.props;
            for (var key in methods) {
                if (false) {}
                vm[key] = typeof methods[key] !== "function" ? noop : bind(methods[key], vm);
            }
        }
        function initWatch(vm, watch) {
            for (var key in watch) {
                var handler = watch[key];
                if (Array.isArray(handler)) {
                    for (var i = 0; i < handler.length; i++) {
                        createWatcher(vm, key, handler[i]);
                    }
                } else {
                    createWatcher(vm, key, handler);
                }
            }
        }
        function createWatcher(vm, expOrFn, handler, options) {
            if (isPlainObject(handler)) {
                options = handler;
                handler = handler.handler;
            }
            if (typeof handler === "string") {
                handler = vm[handler];
            }
            return vm.$watch(expOrFn, handler, options);
        }
        function stateMixin(Vue) {
            var dataDef = {};
            dataDef.get = function() {
                return this._data;
            };
            var propsDef = {};
            propsDef.get = function() {
                return this._props;
            };
            if (false) {}
            Object.defineProperty(Vue.prototype, "$data", dataDef);
            Object.defineProperty(Vue.prototype, "$props", propsDef);
            Vue.prototype.$set = set;
            Vue.prototype.$delete = del;
            Vue.prototype.$watch = function(expOrFn, cb, options) {
                var vm = this;
                if (isPlainObject(cb)) {
                    return createWatcher(vm, expOrFn, cb, options);
                }
                options = options || {};
                options.user = true;
                var watcher = new Watcher(vm, expOrFn, cb, options);
                if (options.immediate) {
                    var info = 'callback for immediate watcher "' + watcher.expression + '"';
                    pushTarget();
                    invokeWithErrorHandling(cb, vm, [ watcher.value ], vm, info);
                    popTarget();
                }
                return function unwatchFn() {
                    watcher.teardown();
                };
            };
        }
        var uid$3 = 0;
        function initMixin(Vue) {
            Vue.prototype._init = function(options) {
                var vm = this;
                vm._uid = uid$3++;
                var startTag, endTag;
                if (false) {}
                vm._isVue = true;
                if (options && options._isComponent) {
                    initInternalComponent(vm, options);
                } else {
                    vm.$options = mergeOptions(resolveConstructorOptions(vm.constructor), options || {}, vm);
                }
                if (false) {} else {
                    vm._renderProxy = vm;
                }
                vm._self = vm;
                initLifecycle(vm);
                initEvents(vm);
                initRender(vm);
                callHook(vm, "beforeCreate");
                initInjections(vm);
                initState(vm);
                initProvide(vm);
                callHook(vm, "created");
                if (false) {}
                if (vm.$options.el) {
                    vm.$mount(vm.$options.el);
                }
            };
        }
        function initInternalComponent(vm, options) {
            var opts = vm.$options = Object.create(vm.constructor.options);
            var parentVnode = options._parentVnode;
            opts.parent = options.parent;
            opts._parentVnode = parentVnode;
            var vnodeComponentOptions = parentVnode.componentOptions;
            opts.propsData = vnodeComponentOptions.propsData;
            opts._parentListeners = vnodeComponentOptions.listeners;
            opts._renderChildren = vnodeComponentOptions.children;
            opts._componentTag = vnodeComponentOptions.tag;
            if (options.render) {
                opts.render = options.render;
                opts.staticRenderFns = options.staticRenderFns;
            }
        }
        function resolveConstructorOptions(Ctor) {
            var options = Ctor.options;
            if (Ctor.super) {
                var superOptions = resolveConstructorOptions(Ctor.super);
                var cachedSuperOptions = Ctor.superOptions;
                if (superOptions !== cachedSuperOptions) {
                    Ctor.superOptions = superOptions;
                    var modifiedOptions = resolveModifiedOptions(Ctor);
                    if (modifiedOptions) {
                        extend(Ctor.extendOptions, modifiedOptions);
                    }
                    options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
                    if (options.name) {
                        options.components[options.name] = Ctor;
                    }
                }
            }
            return options;
        }
        function resolveModifiedOptions(Ctor) {
            var modified;
            var latest = Ctor.options;
            var sealed = Ctor.sealedOptions;
            for (var key in latest) {
                if (latest[key] !== sealed[key]) {
                    if (!modified) {
                        modified = {};
                    }
                    modified[key] = latest[key];
                }
            }
            return modified;
        }
        function vue_runtime_esm_Vue(options) {
            if (false) {}
            this._init(options);
        }
        initMixin(vue_runtime_esm_Vue);
        stateMixin(vue_runtime_esm_Vue);
        eventsMixin(vue_runtime_esm_Vue);
        lifecycleMixin(vue_runtime_esm_Vue);
        renderMixin(vue_runtime_esm_Vue);
        function initUse(Vue) {
            Vue.use = function(plugin) {
                var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
                if (installedPlugins.indexOf(plugin) > -1) {
                    return this;
                }
                var args = toArray(arguments, 1);
                args.unshift(this);
                if (typeof plugin.install === "function") {
                    plugin.install.apply(plugin, args);
                } else if (typeof plugin === "function") {
                    plugin.apply(null, args);
                }
                installedPlugins.push(plugin);
                return this;
            };
        }
        function initMixin$1(Vue) {
            Vue.mixin = function(mixin) {
                this.options = mergeOptions(this.options, mixin);
                return this;
            };
        }
        function initExtend(Vue) {
            Vue.cid = 0;
            var cid = 1;
            Vue.extend = function(extendOptions) {
                extendOptions = extendOptions || {};
                var Super = this;
                var SuperId = Super.cid;
                var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
                if (cachedCtors[SuperId]) {
                    return cachedCtors[SuperId];
                }
                var name = extendOptions.name || Super.options.name;
                if (false) {}
                var Sub = function VueComponent(options) {
                    this._init(options);
                };
                Sub.prototype = Object.create(Super.prototype);
                Sub.prototype.constructor = Sub;
                Sub.cid = cid++;
                Sub.options = mergeOptions(Super.options, extendOptions);
                Sub["super"] = Super;
                if (Sub.options.props) {
                    initProps$1(Sub);
                }
                if (Sub.options.computed) {
                    initComputed$1(Sub);
                }
                Sub.extend = Super.extend;
                Sub.mixin = Super.mixin;
                Sub.use = Super.use;
                ASSET_TYPES.forEach((function(type) {
                    Sub[type] = Super[type];
                }));
                if (name) {
                    Sub.options.components[name] = Sub;
                }
                Sub.superOptions = Super.options;
                Sub.extendOptions = extendOptions;
                Sub.sealedOptions = extend({}, Sub.options);
                cachedCtors[SuperId] = Sub;
                return Sub;
            };
        }
        function initProps$1(Comp) {
            var props = Comp.options.props;
            for (var key in props) {
                proxy(Comp.prototype, "_props", key);
            }
        }
        function initComputed$1(Comp) {
            var computed = Comp.options.computed;
            for (var key in computed) {
                defineComputed(Comp.prototype, key, computed[key]);
            }
        }
        function initAssetRegisters(Vue) {
            ASSET_TYPES.forEach((function(type) {
                Vue[type] = function(id, definition) {
                    if (!definition) {
                        return this.options[type + "s"][id];
                    } else {
                        if (false) {}
                        if (type === "component" && isPlainObject(definition)) {
                            definition.name = definition.name || id;
                            definition = this.options._base.extend(definition);
                        }
                        if (type === "directive" && typeof definition === "function") {
                            definition = {
                                bind: definition,
                                update: definition
                            };
                        }
                        this.options[type + "s"][id] = definition;
                        return definition;
                    }
                };
            }));
        }
        function getComponentName(opts) {
            return opts && (opts.Ctor.options.name || opts.tag);
        }
        function matches(pattern, name) {
            if (Array.isArray(pattern)) {
                return pattern.indexOf(name) > -1;
            } else if (typeof pattern === "string") {
                return pattern.split(",").indexOf(name) > -1;
            } else if (isRegExp(pattern)) {
                return pattern.test(name);
            }
            return false;
        }
        function pruneCache(keepAliveInstance, filter) {
            var cache = keepAliveInstance.cache;
            var keys = keepAliveInstance.keys;
            var _vnode = keepAliveInstance._vnode;
            for (var key in cache) {
                var entry = cache[key];
                if (entry) {
                    var name = entry.name;
                    if (name && !filter(name)) {
                        pruneCacheEntry(cache, key, keys, _vnode);
                    }
                }
            }
        }
        function pruneCacheEntry(cache, key, keys, current) {
            var entry = cache[key];
            if (entry && (!current || entry.tag !== current.tag)) {
                entry.componentInstance.$destroy();
            }
            cache[key] = null;
            remove(keys, key);
        }
        var patternTypes = [ String, RegExp, Array ];
        var KeepAlive = {
            name: "keep-alive",
            abstract: true,
            props: {
                include: patternTypes,
                exclude: patternTypes,
                max: [ String, Number ]
            },
            methods: {
                cacheVNode: function cacheVNode() {
                    var ref = this;
                    var cache = ref.cache;
                    var keys = ref.keys;
                    var vnodeToCache = ref.vnodeToCache;
                    var keyToCache = ref.keyToCache;
                    if (vnodeToCache) {
                        var tag = vnodeToCache.tag;
                        var componentInstance = vnodeToCache.componentInstance;
                        var componentOptions = vnodeToCache.componentOptions;
                        cache[keyToCache] = {
                            name: getComponentName(componentOptions),
                            tag,
                            componentInstance
                        };
                        keys.push(keyToCache);
                        if (this.max && keys.length > parseInt(this.max)) {
                            pruneCacheEntry(cache, keys[0], keys, this._vnode);
                        }
                        this.vnodeToCache = null;
                    }
                }
            },
            created: function created() {
                this.cache = Object.create(null);
                this.keys = [];
            },
            destroyed: function destroyed() {
                for (var key in this.cache) {
                    pruneCacheEntry(this.cache, key, this.keys);
                }
            },
            mounted: function mounted() {
                var this$1 = this;
                this.cacheVNode();
                this.$watch("include", (function(val) {
                    pruneCache(this$1, (function(name) {
                        return matches(val, name);
                    }));
                }));
                this.$watch("exclude", (function(val) {
                    pruneCache(this$1, (function(name) {
                        return !matches(val, name);
                    }));
                }));
            },
            updated: function updated() {
                this.cacheVNode();
            },
            render: function render() {
                var slot = this.$slots.default;
                var vnode = getFirstComponentChild(slot);
                var componentOptions = vnode && vnode.componentOptions;
                if (componentOptions) {
                    var name = getComponentName(componentOptions);
                    var ref = this;
                    var include = ref.include;
                    var exclude = ref.exclude;
                    if (include && (!name || !matches(include, name)) || exclude && name && matches(exclude, name)) {
                        return vnode;
                    }
                    var ref$1 = this;
                    var cache = ref$1.cache;
                    var keys = ref$1.keys;
                    var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::" + componentOptions.tag : "") : vnode.key;
                    if (cache[key]) {
                        vnode.componentInstance = cache[key].componentInstance;
                        remove(keys, key);
                        keys.push(key);
                    } else {
                        this.vnodeToCache = vnode;
                        this.keyToCache = key;
                    }
                    vnode.data.keepAlive = true;
                }
                return vnode || slot && slot[0];
            }
        };
        var builtInComponents = {
            KeepAlive
        };
        function initGlobalAPI(Vue) {
            var configDef = {};
            configDef.get = function() {
                return config;
            };
            if (false) {}
            Object.defineProperty(Vue, "config", configDef);
            Vue.util = {
                warn,
                extend,
                mergeOptions,
                defineReactive: defineReactive$$1
            };
            Vue.set = set;
            Vue.delete = del;
            Vue.nextTick = nextTick;
            Vue.observable = function(obj) {
                observe(obj);
                return obj;
            };
            Vue.options = Object.create(null);
            ASSET_TYPES.forEach((function(type) {
                Vue.options[type + "s"] = Object.create(null);
            }));
            Vue.options._base = Vue;
            extend(Vue.options.components, builtInComponents);
            initUse(Vue);
            initMixin$1(Vue);
            initExtend(Vue);
            initAssetRegisters(Vue);
        }
        initGlobalAPI(vue_runtime_esm_Vue);
        Object.defineProperty(vue_runtime_esm_Vue.prototype, "$isServer", {
            get: isServerRendering
        });
        Object.defineProperty(vue_runtime_esm_Vue.prototype, "$ssrContext", {
            get: function get() {
                return this.$vnode && this.$vnode.ssrContext;
            }
        });
        Object.defineProperty(vue_runtime_esm_Vue, "FunctionalRenderContext", {
            value: FunctionalRenderContext
        });
        vue_runtime_esm_Vue.version = "2.6.14";
        var isReservedAttr = makeMap("style,class");
        var acceptValue = makeMap("input,textarea,option,select,progress");
        var mustUseProp = function(tag, type, attr) {
            return attr === "value" && acceptValue(tag) && type !== "button" || attr === "selected" && tag === "option" || attr === "checked" && tag === "input" || attr === "muted" && tag === "video";
        };
        var isEnumeratedAttr = makeMap("contenteditable,draggable,spellcheck");
        var isValidContentEditableValue = makeMap("events,caret,typing,plaintext-only");
        var convertEnumeratedValue = function(key, value) {
            return isFalsyAttrValue(value) || value === "false" ? "false" : key === "contenteditable" && isValidContentEditableValue(value) ? value : "true";
        };
        var isBooleanAttr = makeMap("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare," + "default,defaultchecked,defaultmuted,defaultselected,defer,disabled," + "enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple," + "muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly," + "required,reversed,scoped,seamless,selected,sortable," + "truespeed,typemustmatch,visible");
        var xlinkNS = "http://www.w3.org/1999/xlink";
        var isXlink = function(name) {
            return name.charAt(5) === ":" && name.slice(0, 5) === "xlink";
        };
        var getXlinkProp = function(name) {
            return isXlink(name) ? name.slice(6, name.length) : "";
        };
        var isFalsyAttrValue = function(val) {
            return val == null || val === false;
        };
        function genClassForVnode(vnode) {
            var data = vnode.data;
            var parentNode = vnode;
            var childNode = vnode;
            while (isDef(childNode.componentInstance)) {
                childNode = childNode.componentInstance._vnode;
                if (childNode && childNode.data) {
                    data = mergeClassData(childNode.data, data);
                }
            }
            while (isDef(parentNode = parentNode.parent)) {
                if (parentNode && parentNode.data) {
                    data = mergeClassData(data, parentNode.data);
                }
            }
            return renderClass(data.staticClass, data.class);
        }
        function mergeClassData(child, parent) {
            return {
                staticClass: concat(child.staticClass, parent.staticClass),
                class: isDef(child.class) ? [ child.class, parent.class ] : parent.class
            };
        }
        function renderClass(staticClass, dynamicClass) {
            if (isDef(staticClass) || isDef(dynamicClass)) {
                return concat(staticClass, stringifyClass(dynamicClass));
            }
            return "";
        }
        function concat(a, b) {
            return a ? b ? a + " " + b : a : b || "";
        }
        function stringifyClass(value) {
            if (Array.isArray(value)) {
                return stringifyArray(value);
            }
            if (isObject(value)) {
                return stringifyObject(value);
            }
            if (typeof value === "string") {
                return value;
            }
            return "";
        }
        function stringifyArray(value) {
            var res = "";
            var stringified;
            for (var i = 0, l = value.length; i < l; i++) {
                if (isDef(stringified = stringifyClass(value[i])) && stringified !== "") {
                    if (res) {
                        res += " ";
                    }
                    res += stringified;
                }
            }
            return res;
        }
        function stringifyObject(value) {
            var res = "";
            for (var key in value) {
                if (value[key]) {
                    if (res) {
                        res += " ";
                    }
                    res += key;
                }
            }
            return res;
        }
        var namespaceMap = {
            svg: "http://www.w3.org/2000/svg",
            math: "http://www.w3.org/1998/Math/MathML"
        };
        var isHTMLTag = makeMap("html,body,base,head,link,meta,style,title," + "address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section," + "div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul," + "a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby," + "s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video," + "embed,object,param,source,canvas,script,noscript,del,ins," + "caption,col,colgroup,table,thead,tbody,td,th,tr," + "button,datalist,fieldset,form,input,label,legend,meter,optgroup,option," + "output,progress,select,textarea," + "details,dialog,menu,menuitem,summary," + "content,element,shadow,template,blockquote,iframe,tfoot");
        var isSVG = makeMap("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face," + "foreignobject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern," + "polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view", true);
        var isReservedTag = function(tag) {
            return isHTMLTag(tag) || isSVG(tag);
        };
        function getTagNamespace(tag) {
            if (isSVG(tag)) {
                return "svg";
            }
            if (tag === "math") {
                return "math";
            }
        }
        var unknownElementCache = Object.create(null);
        function isUnknownElement(tag) {
            if (!inBrowser) {
                return true;
            }
            if (isReservedTag(tag)) {
                return false;
            }
            tag = tag.toLowerCase();
            if (unknownElementCache[tag] != null) {
                return unknownElementCache[tag];
            }
            var el = document.createElement(tag);
            if (tag.indexOf("-") > -1) {
                return unknownElementCache[tag] = el.constructor === window.HTMLUnknownElement || el.constructor === window.HTMLElement;
            } else {
                return unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString());
            }
        }
        var isTextInputType = makeMap("text,number,password,search,email,tel,url");
        function query(el) {
            if (typeof el === "string") {
                var selected = document.querySelector(el);
                if (!selected) {
                    false && 0;
                    return document.createElement("div");
                }
                return selected;
            } else {
                return el;
            }
        }
        function createElement$1(tagName, vnode) {
            var elm = document.createElement(tagName);
            if (tagName !== "select") {
                return elm;
            }
            if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
                elm.setAttribute("multiple", "multiple");
            }
            return elm;
        }
        function createElementNS(namespace, tagName) {
            return document.createElementNS(namespaceMap[namespace], tagName);
        }
        function createTextNode(text) {
            return document.createTextNode(text);
        }
        function createComment(text) {
            return document.createComment(text);
        }
        function insertBefore(parentNode, newNode, referenceNode) {
            parentNode.insertBefore(newNode, referenceNode);
        }
        function removeChild(node, child) {
            node.removeChild(child);
        }
        function appendChild(node, child) {
            node.appendChild(child);
        }
        function parentNode(node) {
            return node.parentNode;
        }
        function nextSibling(node) {
            return node.nextSibling;
        }
        function tagName(node) {
            return node.tagName;
        }
        function setTextContent(node, text) {
            node.textContent = text;
        }
        function setStyleScope(node, scopeId) {
            node.setAttribute(scopeId, "");
        }
        var nodeOps = Object.freeze({
            createElement: createElement$1,
            createElementNS,
            createTextNode,
            createComment,
            insertBefore,
            removeChild,
            appendChild,
            parentNode,
            nextSibling,
            tagName,
            setTextContent,
            setStyleScope
        });
        var ref = {
            create: function create(_, vnode) {
                registerRef(vnode);
            },
            update: function update(oldVnode, vnode) {
                if (oldVnode.data.ref !== vnode.data.ref) {
                    registerRef(oldVnode, true);
                    registerRef(vnode);
                }
            },
            destroy: function destroy(vnode) {
                registerRef(vnode, true);
            }
        };
        function registerRef(vnode, isRemoval) {
            var key = vnode.data.ref;
            if (!isDef(key)) {
                return;
            }
            var vm = vnode.context;
            var ref = vnode.componentInstance || vnode.elm;
            var refs = vm.$refs;
            if (isRemoval) {
                if (Array.isArray(refs[key])) {
                    remove(refs[key], ref);
                } else if (refs[key] === ref) {
                    refs[key] = undefined;
                }
            } else {
                if (vnode.data.refInFor) {
                    if (!Array.isArray(refs[key])) {
                        refs[key] = [ ref ];
                    } else if (refs[key].indexOf(ref) < 0) {
                        refs[key].push(ref);
                    }
                } else {
                    refs[key] = ref;
                }
            }
        }
        var emptyNode = new VNode("", {}, []);
        var hooks = [ "create", "activate", "update", "remove", "destroy" ];
        function sameVnode(a, b) {
            return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
        }
        function sameInputType(a, b) {
            if (a.tag !== "input") {
                return true;
            }
            var i;
            var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
            var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
            return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB);
        }
        function createKeyToOldIdx(children, beginIdx, endIdx) {
            var i, key;
            var map = {};
            for (i = beginIdx; i <= endIdx; ++i) {
                key = children[i].key;
                if (isDef(key)) {
                    map[key] = i;
                }
            }
            return map;
        }
        function createPatchFunction(backend) {
            var i, j;
            var cbs = {};
            var modules = backend.modules;
            var nodeOps = backend.nodeOps;
            for (i = 0; i < hooks.length; ++i) {
                cbs[hooks[i]] = [];
                for (j = 0; j < modules.length; ++j) {
                    if (isDef(modules[j][hooks[i]])) {
                        cbs[hooks[i]].push(modules[j][hooks[i]]);
                    }
                }
            }
            function emptyNodeAt(elm) {
                return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm);
            }
            function createRmCb(childElm, listeners) {
                function remove$$1() {
                    if (--remove$$1.listeners === 0) {
                        removeNode(childElm);
                    }
                }
                remove$$1.listeners = listeners;
                return remove$$1;
            }
            function removeNode(el) {
                var parent = nodeOps.parentNode(el);
                if (isDef(parent)) {
                    nodeOps.removeChild(parent, el);
                }
            }
            function isUnknownElement$$1(vnode, inVPre) {
                return !inVPre && !vnode.ns && !(config.ignoredElements.length && config.ignoredElements.some((function(ignore) {
                    return isRegExp(ignore) ? ignore.test(vnode.tag) : ignore === vnode.tag;
                }))) && config.isUnknownElement(vnode.tag);
            }
            var creatingElmInVPre = 0;
            function createElm(vnode, insertedVnodeQueue, parentElm, refElm, nested, ownerArray, index) {
                if (isDef(vnode.elm) && isDef(ownerArray)) {
                    vnode = ownerArray[index] = cloneVNode(vnode);
                }
                vnode.isRootInsert = !nested;
                if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
                    return;
                }
                var data = vnode.data;
                var children = vnode.children;
                var tag = vnode.tag;
                if (isDef(tag)) {
                    if (false) {}
                    vnode.elm = vnode.ns ? nodeOps.createElementNS(vnode.ns, tag) : nodeOps.createElement(tag, vnode);
                    setScope(vnode);
                    {
                        createChildren(vnode, children, insertedVnodeQueue);
                        if (isDef(data)) {
                            invokeCreateHooks(vnode, insertedVnodeQueue);
                        }
                        insert(parentElm, vnode.elm, refElm);
                    }
                    if (false) {}
                } else if (isTrue(vnode.isComment)) {
                    vnode.elm = nodeOps.createComment(vnode.text);
                    insert(parentElm, vnode.elm, refElm);
                } else {
                    vnode.elm = nodeOps.createTextNode(vnode.text);
                    insert(parentElm, vnode.elm, refElm);
                }
            }
            function createComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
                var i = vnode.data;
                if (isDef(i)) {
                    var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
                    if (isDef(i = i.hook) && isDef(i = i.init)) {
                        i(vnode, false);
                    }
                    if (isDef(vnode.componentInstance)) {
                        initComponent(vnode, insertedVnodeQueue);
                        insert(parentElm, vnode.elm, refElm);
                        if (isTrue(isReactivated)) {
                            reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
                        }
                        return true;
                    }
                }
            }
            function initComponent(vnode, insertedVnodeQueue) {
                if (isDef(vnode.data.pendingInsert)) {
                    insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
                    vnode.data.pendingInsert = null;
                }
                vnode.elm = vnode.componentInstance.$el;
                if (isPatchable(vnode)) {
                    invokeCreateHooks(vnode, insertedVnodeQueue);
                    setScope(vnode);
                } else {
                    registerRef(vnode);
                    insertedVnodeQueue.push(vnode);
                }
            }
            function reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm) {
                var i;
                var innerNode = vnode;
                while (innerNode.componentInstance) {
                    innerNode = innerNode.componentInstance._vnode;
                    if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
                        for (i = 0; i < cbs.activate.length; ++i) {
                            cbs.activate[i](emptyNode, innerNode);
                        }
                        insertedVnodeQueue.push(innerNode);
                        break;
                    }
                }
                insert(parentElm, vnode.elm, refElm);
            }
            function insert(parent, elm, ref$$1) {
                if (isDef(parent)) {
                    if (isDef(ref$$1)) {
                        if (nodeOps.parentNode(ref$$1) === parent) {
                            nodeOps.insertBefore(parent, elm, ref$$1);
                        }
                    } else {
                        nodeOps.appendChild(parent, elm);
                    }
                }
            }
            function createChildren(vnode, children, insertedVnodeQueue) {
                if (Array.isArray(children)) {
                    if (false) {}
                    for (var i = 0; i < children.length; ++i) {
                        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true, children, i);
                    }
                } else if (isPrimitive(vnode.text)) {
                    nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
                }
            }
            function isPatchable(vnode) {
                while (vnode.componentInstance) {
                    vnode = vnode.componentInstance._vnode;
                }
                return isDef(vnode.tag);
            }
            function invokeCreateHooks(vnode, insertedVnodeQueue) {
                for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                    cbs.create[i$1](emptyNode, vnode);
                }
                i = vnode.data.hook;
                if (isDef(i)) {
                    if (isDef(i.create)) {
                        i.create(emptyNode, vnode);
                    }
                    if (isDef(i.insert)) {
                        insertedVnodeQueue.push(vnode);
                    }
                }
            }
            function setScope(vnode) {
                var i;
                if (isDef(i = vnode.fnScopeId)) {
                    nodeOps.setStyleScope(vnode.elm, i);
                } else {
                    var ancestor = vnode;
                    while (ancestor) {
                        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
                            nodeOps.setStyleScope(vnode.elm, i);
                        }
                        ancestor = ancestor.parent;
                    }
                }
                if (isDef(i = activeInstance) && i !== vnode.context && i !== vnode.fnContext && isDef(i = i.$options._scopeId)) {
                    nodeOps.setStyleScope(vnode.elm, i);
                }
            }
            function addVnodes(parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
                for (;startIdx <= endIdx; ++startIdx) {
                    createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm, false, vnodes, startIdx);
                }
            }
            function invokeDestroyHook(vnode) {
                var i, j;
                var data = vnode.data;
                if (isDef(data)) {
                    if (isDef(i = data.hook) && isDef(i = i.destroy)) {
                        i(vnode);
                    }
                    for (i = 0; i < cbs.destroy.length; ++i) {
                        cbs.destroy[i](vnode);
                    }
                }
                if (isDef(i = vnode.children)) {
                    for (j = 0; j < vnode.children.length; ++j) {
                        invokeDestroyHook(vnode.children[j]);
                    }
                }
            }
            function removeVnodes(vnodes, startIdx, endIdx) {
                for (;startIdx <= endIdx; ++startIdx) {
                    var ch = vnodes[startIdx];
                    if (isDef(ch)) {
                        if (isDef(ch.tag)) {
                            removeAndInvokeRemoveHook(ch);
                            invokeDestroyHook(ch);
                        } else {
                            removeNode(ch.elm);
                        }
                    }
                }
            }
            function removeAndInvokeRemoveHook(vnode, rm) {
                if (isDef(rm) || isDef(vnode.data)) {
                    var i;
                    var listeners = cbs.remove.length + 1;
                    if (isDef(rm)) {
                        rm.listeners += listeners;
                    } else {
                        rm = createRmCb(vnode.elm, listeners);
                    }
                    if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
                        removeAndInvokeRemoveHook(i, rm);
                    }
                    for (i = 0; i < cbs.remove.length; ++i) {
                        cbs.remove[i](vnode, rm);
                    }
                    if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
                        i(vnode, rm);
                    } else {
                        rm();
                    }
                } else {
                    removeNode(vnode.elm);
                }
            }
            function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
                var oldStartIdx = 0;
                var newStartIdx = 0;
                var oldEndIdx = oldCh.length - 1;
                var oldStartVnode = oldCh[0];
                var oldEndVnode = oldCh[oldEndIdx];
                var newEndIdx = newCh.length - 1;
                var newStartVnode = newCh[0];
                var newEndVnode = newCh[newEndIdx];
                var oldKeyToIdx, idxInOld, vnodeToMove, refElm;
                var canMove = !removeOnly;
                if (false) {}
                while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
                    if (isUndef(oldStartVnode)) {
                        oldStartVnode = oldCh[++oldStartIdx];
                    } else if (isUndef(oldEndVnode)) {
                        oldEndVnode = oldCh[--oldEndIdx];
                    } else if (sameVnode(oldStartVnode, newStartVnode)) {
                        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                        oldStartVnode = oldCh[++oldStartIdx];
                        newStartVnode = newCh[++newStartIdx];
                    } else if (sameVnode(oldEndVnode, newEndVnode)) {
                        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                        oldEndVnode = oldCh[--oldEndIdx];
                        newEndVnode = newCh[--newEndIdx];
                    } else if (sameVnode(oldStartVnode, newEndVnode)) {
                        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx);
                        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
                        oldStartVnode = oldCh[++oldStartIdx];
                        newEndVnode = newCh[--newEndIdx];
                    } else if (sameVnode(oldEndVnode, newStartVnode)) {
                        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                        oldEndVnode = oldCh[--oldEndIdx];
                        newStartVnode = newCh[++newStartIdx];
                    } else {
                        if (isUndef(oldKeyToIdx)) {
                            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                        }
                        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
                        if (isUndef(idxInOld)) {
                            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                        } else {
                            vnodeToMove = oldCh[idxInOld];
                            if (sameVnode(vnodeToMove, newStartVnode)) {
                                patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx);
                                oldCh[idxInOld] = undefined;
                                canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
                            } else {
                                createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx);
                            }
                        }
                        newStartVnode = newCh[++newStartIdx];
                    }
                }
                if (oldStartIdx > oldEndIdx) {
                    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
                    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
                } else if (newStartIdx > newEndIdx) {
                    removeVnodes(oldCh, oldStartIdx, oldEndIdx);
                }
            }
            function checkDuplicateKeys(children) {
                var seenKeys = {};
                for (var i = 0; i < children.length; i++) {
                    var vnode = children[i];
                    var key = vnode.key;
                    if (isDef(key)) {
                        if (seenKeys[key]) {
                            warn("Duplicate keys detected: '" + key + "'. This may cause an update error.", vnode.context);
                        } else {
                            seenKeys[key] = true;
                        }
                    }
                }
            }
            function findIdxInOld(node, oldCh, start, end) {
                for (var i = start; i < end; i++) {
                    var c = oldCh[i];
                    if (isDef(c) && sameVnode(node, c)) {
                        return i;
                    }
                }
            }
            function patchVnode(oldVnode, vnode, insertedVnodeQueue, ownerArray, index, removeOnly) {
                if (oldVnode === vnode) {
                    return;
                }
                if (isDef(vnode.elm) && isDef(ownerArray)) {
                    vnode = ownerArray[index] = cloneVNode(vnode);
                }
                var elm = vnode.elm = oldVnode.elm;
                if (isTrue(oldVnode.isAsyncPlaceholder)) {
                    if (isDef(vnode.asyncFactory.resolved)) {
                        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
                    } else {
                        vnode.isAsyncPlaceholder = true;
                    }
                    return;
                }
                if (isTrue(vnode.isStatic) && isTrue(oldVnode.isStatic) && vnode.key === oldVnode.key && (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
                    vnode.componentInstance = oldVnode.componentInstance;
                    return;
                }
                var i;
                var data = vnode.data;
                if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
                    i(oldVnode, vnode);
                }
                var oldCh = oldVnode.children;
                var ch = vnode.children;
                if (isDef(data) && isPatchable(vnode)) {
                    for (i = 0; i < cbs.update.length; ++i) {
                        cbs.update[i](oldVnode, vnode);
                    }
                    if (isDef(i = data.hook) && isDef(i = i.update)) {
                        i(oldVnode, vnode);
                    }
                }
                if (isUndef(vnode.text)) {
                    if (isDef(oldCh) && isDef(ch)) {
                        if (oldCh !== ch) {
                            updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
                        }
                    } else if (isDef(ch)) {
                        if (false) {}
                        if (isDef(oldVnode.text)) {
                            nodeOps.setTextContent(elm, "");
                        }
                        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
                    } else if (isDef(oldCh)) {
                        removeVnodes(oldCh, 0, oldCh.length - 1);
                    } else if (isDef(oldVnode.text)) {
                        nodeOps.setTextContent(elm, "");
                    }
                } else if (oldVnode.text !== vnode.text) {
                    nodeOps.setTextContent(elm, vnode.text);
                }
                if (isDef(data)) {
                    if (isDef(i = data.hook) && isDef(i = i.postpatch)) {
                        i(oldVnode, vnode);
                    }
                }
            }
            function invokeInsertHook(vnode, queue, initial) {
                if (isTrue(initial) && isDef(vnode.parent)) {
                    vnode.parent.data.pendingInsert = queue;
                } else {
                    for (var i = 0; i < queue.length; ++i) {
                        queue[i].data.hook.insert(queue[i]);
                    }
                }
            }
            var hydrationBailed = false;
            var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
            function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
                var i;
                var tag = vnode.tag;
                var data = vnode.data;
                var children = vnode.children;
                inVPre = inVPre || data && data.pre;
                vnode.elm = elm;
                if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
                    vnode.isAsyncPlaceholder = true;
                    return true;
                }
                if (false) {}
                if (isDef(data)) {
                    if (isDef(i = data.hook) && isDef(i = i.init)) {
                        i(vnode, true);
                    }
                    if (isDef(i = vnode.componentInstance)) {
                        initComponent(vnode, insertedVnodeQueue);
                        return true;
                    }
                }
                if (isDef(tag)) {
                    if (isDef(children)) {
                        if (!elm.hasChildNodes()) {
                            createChildren(vnode, children, insertedVnodeQueue);
                        } else {
                            if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
                                if (i !== elm.innerHTML) {
                                    if (false) {}
                                    return false;
                                }
                            } else {
                                var childrenMatch = true;
                                var childNode = elm.firstChild;
                                for (var i$1 = 0; i$1 < children.length; i$1++) {
                                    if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                                        childrenMatch = false;
                                        break;
                                    }
                                    childNode = childNode.nextSibling;
                                }
                                if (!childrenMatch || childNode) {
                                    if (false) {}
                                    return false;
                                }
                            }
                        }
                    }
                    if (isDef(data)) {
                        var fullInvoke = false;
                        for (var key in data) {
                            if (!isRenderedModule(key)) {
                                fullInvoke = true;
                                invokeCreateHooks(vnode, insertedVnodeQueue);
                                break;
                            }
                        }
                        if (!fullInvoke && data["class"]) {
                            traverse(data["class"]);
                        }
                    }
                } else if (elm.data !== vnode.text) {
                    elm.data = vnode.text;
                }
                return true;
            }
            function assertNodeMatch(node, vnode, inVPre) {
                if (isDef(vnode.tag)) {
                    return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement$$1(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
                } else {
                    return node.nodeType === (vnode.isComment ? 8 : 3);
                }
            }
            return function patch(oldVnode, vnode, hydrating, removeOnly) {
                if (isUndef(vnode)) {
                    if (isDef(oldVnode)) {
                        invokeDestroyHook(oldVnode);
                    }
                    return;
                }
                var isInitialPatch = false;
                var insertedVnodeQueue = [];
                if (isUndef(oldVnode)) {
                    isInitialPatch = true;
                    createElm(vnode, insertedVnodeQueue);
                } else {
                    var isRealElement = isDef(oldVnode.nodeType);
                    if (!isRealElement && sameVnode(oldVnode, vnode)) {
                        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly);
                    } else {
                        if (isRealElement) {
                            if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
                                oldVnode.removeAttribute(SSR_ATTR);
                                hydrating = true;
                            }
                            if (isTrue(hydrating)) {
                                if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
                                    invokeInsertHook(vnode, insertedVnodeQueue, true);
                                    return oldVnode;
                                } else if (false) {}
                            }
                            oldVnode = emptyNodeAt(oldVnode);
                        }
                        var oldElm = oldVnode.elm;
                        var parentElm = nodeOps.parentNode(oldElm);
                        createElm(vnode, insertedVnodeQueue, oldElm._leaveCb ? null : parentElm, nodeOps.nextSibling(oldElm));
                        if (isDef(vnode.parent)) {
                            var ancestor = vnode.parent;
                            var patchable = isPatchable(vnode);
                            while (ancestor) {
                                for (var i = 0; i < cbs.destroy.length; ++i) {
                                    cbs.destroy[i](ancestor);
                                }
                                ancestor.elm = vnode.elm;
                                if (patchable) {
                                    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                                        cbs.create[i$1](emptyNode, ancestor);
                                    }
                                    var insert = ancestor.data.hook.insert;
                                    if (insert.merged) {
                                        for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                                            insert.fns[i$2]();
                                        }
                                    }
                                } else {
                                    registerRef(ancestor);
                                }
                                ancestor = ancestor.parent;
                            }
                        }
                        if (isDef(parentElm)) {
                            removeVnodes([ oldVnode ], 0, 0);
                        } else if (isDef(oldVnode.tag)) {
                            invokeDestroyHook(oldVnode);
                        }
                    }
                }
                invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
                return vnode.elm;
            };
        }
        var directives = {
            create: updateDirectives,
            update: updateDirectives,
            destroy: function unbindDirectives(vnode) {
                updateDirectives(vnode, emptyNode);
            }
        };
        function updateDirectives(oldVnode, vnode) {
            if (oldVnode.data.directives || vnode.data.directives) {
                _update(oldVnode, vnode);
            }
        }
        function _update(oldVnode, vnode) {
            var isCreate = oldVnode === emptyNode;
            var isDestroy = vnode === emptyNode;
            var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
            var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
            var dirsWithInsert = [];
            var dirsWithPostpatch = [];
            var key, oldDir, dir;
            for (key in newDirs) {
                oldDir = oldDirs[key];
                dir = newDirs[key];
                if (!oldDir) {
                    callHook$1(dir, "bind", vnode, oldVnode);
                    if (dir.def && dir.def.inserted) {
                        dirsWithInsert.push(dir);
                    }
                } else {
                    dir.oldValue = oldDir.value;
                    dir.oldArg = oldDir.arg;
                    callHook$1(dir, "update", vnode, oldVnode);
                    if (dir.def && dir.def.componentUpdated) {
                        dirsWithPostpatch.push(dir);
                    }
                }
            }
            if (dirsWithInsert.length) {
                var callInsert = function() {
                    for (var i = 0; i < dirsWithInsert.length; i++) {
                        callHook$1(dirsWithInsert[i], "inserted", vnode, oldVnode);
                    }
                };
                if (isCreate) {
                    mergeVNodeHook(vnode, "insert", callInsert);
                } else {
                    callInsert();
                }
            }
            if (dirsWithPostpatch.length) {
                mergeVNodeHook(vnode, "postpatch", (function() {
                    for (var i = 0; i < dirsWithPostpatch.length; i++) {
                        callHook$1(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
                    }
                }));
            }
            if (!isCreate) {
                for (key in oldDirs) {
                    if (!newDirs[key]) {
                        callHook$1(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
                    }
                }
            }
        }
        var emptyModifiers = Object.create(null);
        function normalizeDirectives$1(dirs, vm) {
            var res = Object.create(null);
            if (!dirs) {
                return res;
            }
            var i, dir;
            for (i = 0; i < dirs.length; i++) {
                dir = dirs[i];
                if (!dir.modifiers) {
                    dir.modifiers = emptyModifiers;
                }
                res[getRawDirName(dir)] = dir;
                dir.def = resolveAsset(vm.$options, "directives", dir.name, true);
            }
            return res;
        }
        function getRawDirName(dir) {
            return dir.rawName || dir.name + "." + Object.keys(dir.modifiers || {}).join(".");
        }
        function callHook$1(dir, hook, vnode, oldVnode, isDestroy) {
            var fn = dir.def && dir.def[hook];
            if (fn) {
                try {
                    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
                } catch (e) {
                    handleError(e, vnode.context, "directive " + dir.name + " " + hook + " hook");
                }
            }
        }
        var baseModules = [ ref, directives ];
        function updateAttrs(oldVnode, vnode) {
            var opts = vnode.componentOptions;
            if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
                return;
            }
            if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
                return;
            }
            var key, cur, old;
            var elm = vnode.elm;
            var oldAttrs = oldVnode.data.attrs || {};
            var attrs = vnode.data.attrs || {};
            if (isDef(attrs.__ob__)) {
                attrs = vnode.data.attrs = extend({}, attrs);
            }
            for (key in attrs) {
                cur = attrs[key];
                old = oldAttrs[key];
                if (old !== cur) {
                    setAttr(elm, key, cur, vnode.data.pre);
                }
            }
            if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
                setAttr(elm, "value", attrs.value);
            }
            for (key in oldAttrs) {
                if (isUndef(attrs[key])) {
                    if (isXlink(key)) {
                        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
                    } else if (!isEnumeratedAttr(key)) {
                        elm.removeAttribute(key);
                    }
                }
            }
        }
        function setAttr(el, key, value, isInPre) {
            if (isInPre || el.tagName.indexOf("-") > -1) {
                baseSetAttr(el, key, value);
            } else if (isBooleanAttr(key)) {
                if (isFalsyAttrValue(value)) {
                    el.removeAttribute(key);
                } else {
                    value = key === "allowfullscreen" && el.tagName === "EMBED" ? "true" : key;
                    el.setAttribute(key, value);
                }
            } else if (isEnumeratedAttr(key)) {
                el.setAttribute(key, convertEnumeratedValue(key, value));
            } else if (isXlink(key)) {
                if (isFalsyAttrValue(value)) {
                    el.removeAttributeNS(xlinkNS, getXlinkProp(key));
                } else {
                    el.setAttributeNS(xlinkNS, key, value);
                }
            } else {
                baseSetAttr(el, key, value);
            }
        }
        function baseSetAttr(el, key, value) {
            if (isFalsyAttrValue(value)) {
                el.removeAttribute(key);
            } else {
                if (isIE && !isIE9 && el.tagName === "TEXTAREA" && key === "placeholder" && value !== "" && !el.__ieph) {
                    var blocker = function(e) {
                        e.stopImmediatePropagation();
                        el.removeEventListener("input", blocker);
                    };
                    el.addEventListener("input", blocker);
                    el.__ieph = true;
                }
                el.setAttribute(key, value);
            }
        }
        var attrs = {
            create: updateAttrs,
            update: updateAttrs
        };
        function updateClass(oldVnode, vnode) {
            var el = vnode.elm;
            var data = vnode.data;
            var oldData = oldVnode.data;
            if (isUndef(data.staticClass) && isUndef(data.class) && (isUndef(oldData) || isUndef(oldData.staticClass) && isUndef(oldData.class))) {
                return;
            }
            var cls = genClassForVnode(vnode);
            var transitionClass = el._transitionClasses;
            if (isDef(transitionClass)) {
                cls = concat(cls, stringifyClass(transitionClass));
            }
            if (cls !== el._prevClass) {
                el.setAttribute("class", cls);
                el._prevClass = cls;
            }
        }
        var klass = {
            create: updateClass,
            update: updateClass
        };
        var RANGE_TOKEN = "__r";
        var CHECKBOX_RADIO_TOKEN = "__c";
        function normalizeEvents(on) {
            if (isDef(on[RANGE_TOKEN])) {
                var event = isIE ? "change" : "input";
                on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
                delete on[RANGE_TOKEN];
            }
            if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
                on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
                delete on[CHECKBOX_RADIO_TOKEN];
            }
        }
        var target$1;
        function createOnceHandler$1(event, handler, capture) {
            var _target = target$1;
            return function onceHandler() {
                var res = handler.apply(null, arguments);
                if (res !== null) {
                    remove$2(event, onceHandler, capture, _target);
                }
            };
        }
        var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
        function add$1(name, handler, capture, passive) {
            if (useMicrotaskFix) {
                var attachedTimestamp = currentFlushTimestamp;
                var original = handler;
                handler = original._wrapper = function(e) {
                    if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
                        return original.apply(this, arguments);
                    }
                };
            }
            target$1.addEventListener(name, handler, supportsPassive ? {
                capture,
                passive
            } : capture);
        }
        function remove$2(name, handler, capture, _target) {
            (_target || target$1).removeEventListener(name, handler._wrapper || handler, capture);
        }
        function updateDOMListeners(oldVnode, vnode) {
            if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
                return;
            }
            var on = vnode.data.on || {};
            var oldOn = oldVnode.data.on || {};
            target$1 = vnode.elm;
            normalizeEvents(on);
            updateListeners(on, oldOn, add$1, remove$2, createOnceHandler$1, vnode.context);
            target$1 = undefined;
        }
        var events = {
            create: updateDOMListeners,
            update: updateDOMListeners
        };
        var svgContainer;
        function updateDOMProps(oldVnode, vnode) {
            if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
                return;
            }
            var key, cur;
            var elm = vnode.elm;
            var oldProps = oldVnode.data.domProps || {};
            var props = vnode.data.domProps || {};
            if (isDef(props.__ob__)) {
                props = vnode.data.domProps = extend({}, props);
            }
            for (key in oldProps) {
                if (!(key in props)) {
                    elm[key] = "";
                }
            }
            for (key in props) {
                cur = props[key];
                if (key === "textContent" || key === "innerHTML") {
                    if (vnode.children) {
                        vnode.children.length = 0;
                    }
                    if (cur === oldProps[key]) {
                        continue;
                    }
                    if (elm.childNodes.length === 1) {
                        elm.removeChild(elm.childNodes[0]);
                    }
                }
                if (key === "value" && elm.tagName !== "PROGRESS") {
                    elm._value = cur;
                    var strCur = isUndef(cur) ? "" : String(cur);
                    if (shouldUpdateValue(elm, strCur)) {
                        elm.value = strCur;
                    }
                } else if (key === "innerHTML" && isSVG(elm.tagName) && isUndef(elm.innerHTML)) {
                    svgContainer = svgContainer || document.createElement("div");
                    svgContainer.innerHTML = "<svg>" + cur + "</svg>";
                    var svg = svgContainer.firstChild;
                    while (elm.firstChild) {
                        elm.removeChild(elm.firstChild);
                    }
                    while (svg.firstChild) {
                        elm.appendChild(svg.firstChild);
                    }
                } else if (cur !== oldProps[key]) {
                    try {
                        elm[key] = cur;
                    } catch (e) {}
                }
            }
        }
        function shouldUpdateValue(elm, checkVal) {
            return !elm.composing && (elm.tagName === "OPTION" || isNotInFocusAndDirty(elm, checkVal) || isDirtyWithModifiers(elm, checkVal));
        }
        function isNotInFocusAndDirty(elm, checkVal) {
            var notInFocus = true;
            try {
                notInFocus = document.activeElement !== elm;
            } catch (e) {}
            return notInFocus && elm.value !== checkVal;
        }
        function isDirtyWithModifiers(elm, newVal) {
            var value = elm.value;
            var modifiers = elm._vModifiers;
            if (isDef(modifiers)) {
                if (modifiers.number) {
                    return toNumber(value) !== toNumber(newVal);
                }
                if (modifiers.trim) {
                    return value.trim() !== newVal.trim();
                }
            }
            return value !== newVal;
        }
        var domProps = {
            create: updateDOMProps,
            update: updateDOMProps
        };
        var parseStyleText = cached((function(cssText) {
            var res = {};
            var listDelimiter = /;(?![^(]*\))/g;
            var propertyDelimiter = /:(.+)/;
            cssText.split(listDelimiter).forEach((function(item) {
                if (item) {
                    var tmp = item.split(propertyDelimiter);
                    tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
                }
            }));
            return res;
        }));
        function normalizeStyleData(data) {
            var style = normalizeStyleBinding(data.style);
            return data.staticStyle ? extend(data.staticStyle, style) : style;
        }
        function normalizeStyleBinding(bindingStyle) {
            if (Array.isArray(bindingStyle)) {
                return toObject(bindingStyle);
            }
            if (typeof bindingStyle === "string") {
                return parseStyleText(bindingStyle);
            }
            return bindingStyle;
        }
        function getStyle(vnode, checkChild) {
            var res = {};
            var styleData;
            if (checkChild) {
                var childNode = vnode;
                while (childNode.componentInstance) {
                    childNode = childNode.componentInstance._vnode;
                    if (childNode && childNode.data && (styleData = normalizeStyleData(childNode.data))) {
                        extend(res, styleData);
                    }
                }
            }
            if (styleData = normalizeStyleData(vnode.data)) {
                extend(res, styleData);
            }
            var parentNode = vnode;
            while (parentNode = parentNode.parent) {
                if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
                    extend(res, styleData);
                }
            }
            return res;
        }
        var cssVarRE = /^--/;
        var importantRE = /\s*!important$/;
        var setProp = function(el, name, val) {
            if (cssVarRE.test(name)) {
                el.style.setProperty(name, val);
            } else if (importantRE.test(val)) {
                el.style.setProperty(hyphenate(name), val.replace(importantRE, ""), "important");
            } else {
                var normalizedName = normalize(name);
                if (Array.isArray(val)) {
                    for (var i = 0, len = val.length; i < len; i++) {
                        el.style[normalizedName] = val[i];
                    }
                } else {
                    el.style[normalizedName] = val;
                }
            }
        };
        var vendorNames = [ "Webkit", "Moz", "ms" ];
        var emptyStyle;
        var normalize = cached((function(prop) {
            emptyStyle = emptyStyle || document.createElement("div").style;
            prop = camelize(prop);
            if (prop !== "filter" && prop in emptyStyle) {
                return prop;
            }
            var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
            for (var i = 0; i < vendorNames.length; i++) {
                var name = vendorNames[i] + capName;
                if (name in emptyStyle) {
                    return name;
                }
            }
        }));
        function updateStyle(oldVnode, vnode) {
            var data = vnode.data;
            var oldData = oldVnode.data;
            if (isUndef(data.staticStyle) && isUndef(data.style) && isUndef(oldData.staticStyle) && isUndef(oldData.style)) {
                return;
            }
            var cur, name;
            var el = vnode.elm;
            var oldStaticStyle = oldData.staticStyle;
            var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
            var oldStyle = oldStaticStyle || oldStyleBinding;
            var style = normalizeStyleBinding(vnode.data.style) || {};
            vnode.data.normalizedStyle = isDef(style.__ob__) ? extend({}, style) : style;
            var newStyle = getStyle(vnode, true);
            for (name in oldStyle) {
                if (isUndef(newStyle[name])) {
                    setProp(el, name, "");
                }
            }
            for (name in newStyle) {
                cur = newStyle[name];
                if (cur !== oldStyle[name]) {
                    setProp(el, name, cur == null ? "" : cur);
                }
            }
        }
        var style = {
            create: updateStyle,
            update: updateStyle
        };
        var whitespaceRE = /\s+/;
        function addClass(el, cls) {
            if (!cls || !(cls = cls.trim())) {
                return;
            }
            if (el.classList) {
                if (cls.indexOf(" ") > -1) {
                    cls.split(whitespaceRE).forEach((function(c) {
                        return el.classList.add(c);
                    }));
                } else {
                    el.classList.add(cls);
                }
            } else {
                var cur = " " + (el.getAttribute("class") || "") + " ";
                if (cur.indexOf(" " + cls + " ") < 0) {
                    el.setAttribute("class", (cur + cls).trim());
                }
            }
        }
        function removeClass(el, cls) {
            if (!cls || !(cls = cls.trim())) {
                return;
            }
            if (el.classList) {
                if (cls.indexOf(" ") > -1) {
                    cls.split(whitespaceRE).forEach((function(c) {
                        return el.classList.remove(c);
                    }));
                } else {
                    el.classList.remove(cls);
                }
                if (!el.classList.length) {
                    el.removeAttribute("class");
                }
            } else {
                var cur = " " + (el.getAttribute("class") || "") + " ";
                var tar = " " + cls + " ";
                while (cur.indexOf(tar) >= 0) {
                    cur = cur.replace(tar, " ");
                }
                cur = cur.trim();
                if (cur) {
                    el.setAttribute("class", cur);
                } else {
                    el.removeAttribute("class");
                }
            }
        }
        function resolveTransition(def$$1) {
            if (!def$$1) {
                return;
            }
            if (typeof def$$1 === "object") {
                var res = {};
                if (def$$1.css !== false) {
                    extend(res, autoCssTransition(def$$1.name || "v"));
                }
                extend(res, def$$1);
                return res;
            } else if (typeof def$$1 === "string") {
                return autoCssTransition(def$$1);
            }
        }
        var autoCssTransition = cached((function(name) {
            return {
                enterClass: name + "-enter",
                enterToClass: name + "-enter-to",
                enterActiveClass: name + "-enter-active",
                leaveClass: name + "-leave",
                leaveToClass: name + "-leave-to",
                leaveActiveClass: name + "-leave-active"
            };
        }));
        var hasTransition = inBrowser && !isIE9;
        var TRANSITION = "transition";
        var ANIMATION = "animation";
        var transitionProp = "transition";
        var transitionEndEvent = "transitionend";
        var animationProp = "animation";
        var animationEndEvent = "animationend";
        if (hasTransition) {
            if (window.ontransitionend === undefined && window.onwebkittransitionend !== undefined) {
                transitionProp = "WebkitTransition";
                transitionEndEvent = "webkitTransitionEnd";
            }
            if (window.onanimationend === undefined && window.onwebkitanimationend !== undefined) {
                animationProp = "WebkitAnimation";
                animationEndEvent = "webkitAnimationEnd";
            }
        }
        var raf = inBrowser ? window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : setTimeout : function(fn) {
            return fn();
        };
        function nextFrame(fn) {
            raf((function() {
                raf(fn);
            }));
        }
        function addTransitionClass(el, cls) {
            var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
            if (transitionClasses.indexOf(cls) < 0) {
                transitionClasses.push(cls);
                addClass(el, cls);
            }
        }
        function removeTransitionClass(el, cls) {
            if (el._transitionClasses) {
                remove(el._transitionClasses, cls);
            }
            removeClass(el, cls);
        }
        function whenTransitionEnds(el, expectedType, cb) {
            var ref = getTransitionInfo(el, expectedType);
            var type = ref.type;
            var timeout = ref.timeout;
            var propCount = ref.propCount;
            if (!type) {
                return cb();
            }
            var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
            var ended = 0;
            var end = function() {
                el.removeEventListener(event, onEnd);
                cb();
            };
            var onEnd = function(e) {
                if (e.target === el) {
                    if (++ended >= propCount) {
                        end();
                    }
                }
            };
            setTimeout((function() {
                if (ended < propCount) {
                    end();
                }
            }), timeout + 1);
            el.addEventListener(event, onEnd);
        }
        var transformRE = /\b(transform|all)(,|$)/;
        function getTransitionInfo(el, expectedType) {
            var styles = window.getComputedStyle(el);
            var transitionDelays = (styles[transitionProp + "Delay"] || "").split(", ");
            var transitionDurations = (styles[transitionProp + "Duration"] || "").split(", ");
            var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
            var animationDelays = (styles[animationProp + "Delay"] || "").split(", ");
            var animationDurations = (styles[animationProp + "Duration"] || "").split(", ");
            var animationTimeout = getTimeout(animationDelays, animationDurations);
            var type;
            var timeout = 0;
            var propCount = 0;
            if (expectedType === TRANSITION) {
                if (transitionTimeout > 0) {
                    type = TRANSITION;
                    timeout = transitionTimeout;
                    propCount = transitionDurations.length;
                }
            } else if (expectedType === ANIMATION) {
                if (animationTimeout > 0) {
                    type = ANIMATION;
                    timeout = animationTimeout;
                    propCount = animationDurations.length;
                }
            } else {
                timeout = Math.max(transitionTimeout, animationTimeout);
                type = timeout > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
                propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
            }
            var hasTransform = type === TRANSITION && transformRE.test(styles[transitionProp + "Property"]);
            return {
                type,
                timeout,
                propCount,
                hasTransform
            };
        }
        function getTimeout(delays, durations) {
            while (delays.length < durations.length) {
                delays = delays.concat(delays);
            }
            return Math.max.apply(null, durations.map((function(d, i) {
                return toMs(d) + toMs(delays[i]);
            })));
        }
        function toMs(s) {
            return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
        }
        function enter(vnode, toggleDisplay) {
            var el = vnode.elm;
            if (isDef(el._leaveCb)) {
                el._leaveCb.cancelled = true;
                el._leaveCb();
            }
            var data = resolveTransition(vnode.data.transition);
            if (isUndef(data)) {
                return;
            }
            if (isDef(el._enterCb) || el.nodeType !== 1) {
                return;
            }
            var css = data.css;
            var type = data.type;
            var enterClass = data.enterClass;
            var enterToClass = data.enterToClass;
            var enterActiveClass = data.enterActiveClass;
            var appearClass = data.appearClass;
            var appearToClass = data.appearToClass;
            var appearActiveClass = data.appearActiveClass;
            var beforeEnter = data.beforeEnter;
            var enter = data.enter;
            var afterEnter = data.afterEnter;
            var enterCancelled = data.enterCancelled;
            var beforeAppear = data.beforeAppear;
            var appear = data.appear;
            var afterAppear = data.afterAppear;
            var appearCancelled = data.appearCancelled;
            var duration = data.duration;
            var context = activeInstance;
            var transitionNode = activeInstance.$vnode;
            while (transitionNode && transitionNode.parent) {
                context = transitionNode.context;
                transitionNode = transitionNode.parent;
            }
            var isAppear = !context._isMounted || !vnode.isRootInsert;
            if (isAppear && !appear && appear !== "") {
                return;
            }
            var startClass = isAppear && appearClass ? appearClass : enterClass;
            var activeClass = isAppear && appearActiveClass ? appearActiveClass : enterActiveClass;
            var toClass = isAppear && appearToClass ? appearToClass : enterToClass;
            var beforeEnterHook = isAppear ? beforeAppear || beforeEnter : beforeEnter;
            var enterHook = isAppear ? typeof appear === "function" ? appear : enter : enter;
            var afterEnterHook = isAppear ? afterAppear || afterEnter : afterEnter;
            var enterCancelledHook = isAppear ? appearCancelled || enterCancelled : enterCancelled;
            var explicitEnterDuration = toNumber(isObject(duration) ? duration.enter : duration);
            if (false) {}
            var expectsCSS = css !== false && !isIE9;
            var userWantsControl = getHookArgumentsLength(enterHook);
            var cb = el._enterCb = once((function() {
                if (expectsCSS) {
                    removeTransitionClass(el, toClass);
                    removeTransitionClass(el, activeClass);
                }
                if (cb.cancelled) {
                    if (expectsCSS) {
                        removeTransitionClass(el, startClass);
                    }
                    enterCancelledHook && enterCancelledHook(el);
                } else {
                    afterEnterHook && afterEnterHook(el);
                }
                el._enterCb = null;
            }));
            if (!vnode.data.show) {
                mergeVNodeHook(vnode, "insert", (function() {
                    var parent = el.parentNode;
                    var pendingNode = parent && parent._pending && parent._pending[vnode.key];
                    if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
                        pendingNode.elm._leaveCb();
                    }
                    enterHook && enterHook(el, cb);
                }));
            }
            beforeEnterHook && beforeEnterHook(el);
            if (expectsCSS) {
                addTransitionClass(el, startClass);
                addTransitionClass(el, activeClass);
                nextFrame((function() {
                    removeTransitionClass(el, startClass);
                    if (!cb.cancelled) {
                        addTransitionClass(el, toClass);
                        if (!userWantsControl) {
                            if (isValidDuration(explicitEnterDuration)) {
                                setTimeout(cb, explicitEnterDuration);
                            } else {
                                whenTransitionEnds(el, type, cb);
                            }
                        }
                    }
                }));
            }
            if (vnode.data.show) {
                toggleDisplay && toggleDisplay();
                enterHook && enterHook(el, cb);
            }
            if (!expectsCSS && !userWantsControl) {
                cb();
            }
        }
        function leave(vnode, rm) {
            var el = vnode.elm;
            if (isDef(el._enterCb)) {
                el._enterCb.cancelled = true;
                el._enterCb();
            }
            var data = resolveTransition(vnode.data.transition);
            if (isUndef(data) || el.nodeType !== 1) {
                return rm();
            }
            if (isDef(el._leaveCb)) {
                return;
            }
            var css = data.css;
            var type = data.type;
            var leaveClass = data.leaveClass;
            var leaveToClass = data.leaveToClass;
            var leaveActiveClass = data.leaveActiveClass;
            var beforeLeave = data.beforeLeave;
            var leave = data.leave;
            var afterLeave = data.afterLeave;
            var leaveCancelled = data.leaveCancelled;
            var delayLeave = data.delayLeave;
            var duration = data.duration;
            var expectsCSS = css !== false && !isIE9;
            var userWantsControl = getHookArgumentsLength(leave);
            var explicitLeaveDuration = toNumber(isObject(duration) ? duration.leave : duration);
            if (false) {}
            var cb = el._leaveCb = once((function() {
                if (el.parentNode && el.parentNode._pending) {
                    el.parentNode._pending[vnode.key] = null;
                }
                if (expectsCSS) {
                    removeTransitionClass(el, leaveToClass);
                    removeTransitionClass(el, leaveActiveClass);
                }
                if (cb.cancelled) {
                    if (expectsCSS) {
                        removeTransitionClass(el, leaveClass);
                    }
                    leaveCancelled && leaveCancelled(el);
                } else {
                    rm();
                    afterLeave && afterLeave(el);
                }
                el._leaveCb = null;
            }));
            if (delayLeave) {
                delayLeave(performLeave);
            } else {
                performLeave();
            }
            function performLeave() {
                if (cb.cancelled) {
                    return;
                }
                if (!vnode.data.show && el.parentNode) {
                    (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
                }
                beforeLeave && beforeLeave(el);
                if (expectsCSS) {
                    addTransitionClass(el, leaveClass);
                    addTransitionClass(el, leaveActiveClass);
                    nextFrame((function() {
                        removeTransitionClass(el, leaveClass);
                        if (!cb.cancelled) {
                            addTransitionClass(el, leaveToClass);
                            if (!userWantsControl) {
                                if (isValidDuration(explicitLeaveDuration)) {
                                    setTimeout(cb, explicitLeaveDuration);
                                } else {
                                    whenTransitionEnds(el, type, cb);
                                }
                            }
                        }
                    }));
                }
                leave && leave(el, cb);
                if (!expectsCSS && !userWantsControl) {
                    cb();
                }
            }
        }
        function checkDuration(val, name, vnode) {
            if (typeof val !== "number") {
                warn("<transition> explicit " + name + " duration is not a valid number - " + "got " + JSON.stringify(val) + ".", vnode.context);
            } else if (isNaN(val)) {
                warn("<transition> explicit " + name + " duration is NaN - " + "the duration expression might be incorrect.", vnode.context);
            }
        }
        function isValidDuration(val) {
            return typeof val === "number" && !isNaN(val);
        }
        function getHookArgumentsLength(fn) {
            if (isUndef(fn)) {
                return false;
            }
            var invokerFns = fn.fns;
            if (isDef(invokerFns)) {
                return getHookArgumentsLength(Array.isArray(invokerFns) ? invokerFns[0] : invokerFns);
            } else {
                return (fn._length || fn.length) > 1;
            }
        }
        function _enter(_, vnode) {
            if (vnode.data.show !== true) {
                enter(vnode);
            }
        }
        var transition = inBrowser ? {
            create: _enter,
            activate: _enter,
            remove: function remove$$1(vnode, rm) {
                if (vnode.data.show !== true) {
                    leave(vnode, rm);
                } else {
                    rm();
                }
            }
        } : {};
        var platformModules = [ attrs, klass, events, domProps, style, transition ];
        var modules = platformModules.concat(baseModules);
        var patch = createPatchFunction({
            nodeOps,
            modules
        });
        if (isIE9) {
            document.addEventListener("selectionchange", (function() {
                var el = document.activeElement;
                if (el && el.vmodel) {
                    trigger(el, "input");
                }
            }));
        }
        var directive = {
            inserted: function inserted(el, binding, vnode, oldVnode) {
                if (vnode.tag === "select") {
                    if (oldVnode.elm && !oldVnode.elm._vOptions) {
                        mergeVNodeHook(vnode, "postpatch", (function() {
                            directive.componentUpdated(el, binding, vnode);
                        }));
                    } else {
                        setSelected(el, binding, vnode.context);
                    }
                    el._vOptions = [].map.call(el.options, getValue);
                } else if (vnode.tag === "textarea" || isTextInputType(el.type)) {
                    el._vModifiers = binding.modifiers;
                    if (!binding.modifiers.lazy) {
                        el.addEventListener("compositionstart", onCompositionStart);
                        el.addEventListener("compositionend", onCompositionEnd);
                        el.addEventListener("change", onCompositionEnd);
                        if (isIE9) {
                            el.vmodel = true;
                        }
                    }
                }
            },
            componentUpdated: function componentUpdated(el, binding, vnode) {
                if (vnode.tag === "select") {
                    setSelected(el, binding, vnode.context);
                    var prevOptions = el._vOptions;
                    var curOptions = el._vOptions = [].map.call(el.options, getValue);
                    if (curOptions.some((function(o, i) {
                        return !looseEqual(o, prevOptions[i]);
                    }))) {
                        var needReset = el.multiple ? binding.value.some((function(v) {
                            return hasNoMatchingOption(v, curOptions);
                        })) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
                        if (needReset) {
                            trigger(el, "change");
                        }
                    }
                }
            }
        };
        function setSelected(el, binding, vm) {
            actuallySetSelected(el, binding, vm);
            if (isIE || isEdge) {
                setTimeout((function() {
                    actuallySetSelected(el, binding, vm);
                }), 0);
            }
        }
        function actuallySetSelected(el, binding, vm) {
            var value = binding.value;
            var isMultiple = el.multiple;
            if (isMultiple && !Array.isArray(value)) {
                false && 0;
                return;
            }
            var selected, option;
            for (var i = 0, l = el.options.length; i < l; i++) {
                option = el.options[i];
                if (isMultiple) {
                    selected = looseIndexOf(value, getValue(option)) > -1;
                    if (option.selected !== selected) {
                        option.selected = selected;
                    }
                } else {
                    if (looseEqual(getValue(option), value)) {
                        if (el.selectedIndex !== i) {
                            el.selectedIndex = i;
                        }
                        return;
                    }
                }
            }
            if (!isMultiple) {
                el.selectedIndex = -1;
            }
        }
        function hasNoMatchingOption(value, options) {
            return options.every((function(o) {
                return !looseEqual(o, value);
            }));
        }
        function getValue(option) {
            return "_value" in option ? option._value : option.value;
        }
        function onCompositionStart(e) {
            e.target.composing = true;
        }
        function onCompositionEnd(e) {
            if (!e.target.composing) {
                return;
            }
            e.target.composing = false;
            trigger(e.target, "input");
        }
        function trigger(el, type) {
            var e = document.createEvent("HTMLEvents");
            e.initEvent(type, true, true);
            el.dispatchEvent(e);
        }
        function locateNode(vnode) {
            return vnode.componentInstance && (!vnode.data || !vnode.data.transition) ? locateNode(vnode.componentInstance._vnode) : vnode;
        }
        var show = {
            bind: function bind(el, ref, vnode) {
                var value = ref.value;
                vnode = locateNode(vnode);
                var transition$$1 = vnode.data && vnode.data.transition;
                var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
                if (value && transition$$1) {
                    vnode.data.show = true;
                    enter(vnode, (function() {
                        el.style.display = originalDisplay;
                    }));
                } else {
                    el.style.display = value ? originalDisplay : "none";
                }
            },
            update: function update(el, ref, vnode) {
                var value = ref.value;
                var oldValue = ref.oldValue;
                if (!value === !oldValue) {
                    return;
                }
                vnode = locateNode(vnode);
                var transition$$1 = vnode.data && vnode.data.transition;
                if (transition$$1) {
                    vnode.data.show = true;
                    if (value) {
                        enter(vnode, (function() {
                            el.style.display = el.__vOriginalDisplay;
                        }));
                    } else {
                        leave(vnode, (function() {
                            el.style.display = "none";
                        }));
                    }
                } else {
                    el.style.display = value ? el.__vOriginalDisplay : "none";
                }
            },
            unbind: function unbind(el, binding, vnode, oldVnode, isDestroy) {
                if (!isDestroy) {
                    el.style.display = el.__vOriginalDisplay;
                }
            }
        };
        var platformDirectives = {
            model: directive,
            show
        };
        var transitionProps = {
            name: String,
            appear: Boolean,
            css: Boolean,
            mode: String,
            type: String,
            enterClass: String,
            leaveClass: String,
            enterToClass: String,
            leaveToClass: String,
            enterActiveClass: String,
            leaveActiveClass: String,
            appearClass: String,
            appearActiveClass: String,
            appearToClass: String,
            duration: [ Number, String, Object ]
        };
        function getRealChild(vnode) {
            var compOptions = vnode && vnode.componentOptions;
            if (compOptions && compOptions.Ctor.options.abstract) {
                return getRealChild(getFirstComponentChild(compOptions.children));
            } else {
                return vnode;
            }
        }
        function extractTransitionData(comp) {
            var data = {};
            var options = comp.$options;
            for (var key in options.propsData) {
                data[key] = comp[key];
            }
            var listeners = options._parentListeners;
            for (var key$1 in listeners) {
                data[camelize(key$1)] = listeners[key$1];
            }
            return data;
        }
        function placeholder(h, rawChild) {
            if (/\d-keep-alive$/.test(rawChild.tag)) {
                return h("keep-alive", {
                    props: rawChild.componentOptions.propsData
                });
            }
        }
        function hasParentTransition(vnode) {
            while (vnode = vnode.parent) {
                if (vnode.data.transition) {
                    return true;
                }
            }
        }
        function isSameChild(child, oldChild) {
            return oldChild.key === child.key && oldChild.tag === child.tag;
        }
        var isNotTextNode = function(c) {
            return c.tag || isAsyncPlaceholder(c);
        };
        var isVShowDirective = function(d) {
            return d.name === "show";
        };
        var Transition = {
            name: "transition",
            props: transitionProps,
            abstract: true,
            render: function render(h) {
                var this$1 = this;
                var children = this.$slots.default;
                if (!children) {
                    return;
                }
                children = children.filter(isNotTextNode);
                if (!children.length) {
                    return;
                }
                if (false) {}
                var mode = this.mode;
                if (false) {}
                var rawChild = children[0];
                if (hasParentTransition(this.$vnode)) {
                    return rawChild;
                }
                var child = getRealChild(rawChild);
                if (!child) {
                    return rawChild;
                }
                if (this._leaving) {
                    return placeholder(h, rawChild);
                }
                var id = "__transition-" + this._uid + "-";
                child.key = child.key == null ? child.isComment ? id + "comment" : id + child.tag : isPrimitive(child.key) ? String(child.key).indexOf(id) === 0 ? child.key : id + child.key : child.key;
                var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
                var oldRawChild = this._vnode;
                var oldChild = getRealChild(oldRawChild);
                if (child.data.directives && child.data.directives.some(isVShowDirective)) {
                    child.data.show = true;
                }
                if (oldChild && oldChild.data && !isSameChild(child, oldChild) && !isAsyncPlaceholder(oldChild) && !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)) {
                    var oldData = oldChild.data.transition = extend({}, data);
                    if (mode === "out-in") {
                        this._leaving = true;
                        mergeVNodeHook(oldData, "afterLeave", (function() {
                            this$1._leaving = false;
                            this$1.$forceUpdate();
                        }));
                        return placeholder(h, rawChild);
                    } else if (mode === "in-out") {
                        if (isAsyncPlaceholder(child)) {
                            return oldRawChild;
                        }
                        var delayedLeave;
                        var performLeave = function() {
                            delayedLeave();
                        };
                        mergeVNodeHook(data, "afterEnter", performLeave);
                        mergeVNodeHook(data, "enterCancelled", performLeave);
                        mergeVNodeHook(oldData, "delayLeave", (function(leave) {
                            delayedLeave = leave;
                        }));
                    }
                }
                return rawChild;
            }
        };
        var props = extend({
            tag: String,
            moveClass: String
        }, transitionProps);
        delete props.mode;
        var TransitionGroup = {
            props,
            beforeMount: function beforeMount() {
                var this$1 = this;
                var update = this._update;
                this._update = function(vnode, hydrating) {
                    var restoreActiveInstance = setActiveInstance(this$1);
                    this$1.__patch__(this$1._vnode, this$1.kept, false, true);
                    this$1._vnode = this$1.kept;
                    restoreActiveInstance();
                    update.call(this$1, vnode, hydrating);
                };
            },
            render: function render(h) {
                var tag = this.tag || this.$vnode.data.tag || "span";
                var map = Object.create(null);
                var prevChildren = this.prevChildren = this.children;
                var rawChildren = this.$slots.default || [];
                var children = this.children = [];
                var transitionData = extractTransitionData(this);
                for (var i = 0; i < rawChildren.length; i++) {
                    var c = rawChildren[i];
                    if (c.tag) {
                        if (c.key != null && String(c.key).indexOf("__vlist") !== 0) {
                            children.push(c);
                            map[c.key] = c;
                            (c.data || (c.data = {})).transition = transitionData;
                        } else if (false) {
                            var name, opts;
                        }
                    }
                }
                if (prevChildren) {
                    var kept = [];
                    var removed = [];
                    for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
                        var c$1 = prevChildren[i$1];
                        c$1.data.transition = transitionData;
                        c$1.data.pos = c$1.elm.getBoundingClientRect();
                        if (map[c$1.key]) {
                            kept.push(c$1);
                        } else {
                            removed.push(c$1);
                        }
                    }
                    this.kept = h(tag, null, kept);
                    this.removed = removed;
                }
                return h(tag, null, children);
            },
            updated: function updated() {
                var children = this.prevChildren;
                var moveClass = this.moveClass || (this.name || "v") + "-move";
                if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
                    return;
                }
                children.forEach(callPendingCbs);
                children.forEach(recordPosition);
                children.forEach(applyTranslation);
                this._reflow = document.body.offsetHeight;
                children.forEach((function(c) {
                    if (c.data.moved) {
                        var el = c.elm;
                        var s = el.style;
                        addTransitionClass(el, moveClass);
                        s.transform = s.WebkitTransform = s.transitionDuration = "";
                        el.addEventListener(transitionEndEvent, el._moveCb = function cb(e) {
                            if (e && e.target !== el) {
                                return;
                            }
                            if (!e || /transform$/.test(e.propertyName)) {
                                el.removeEventListener(transitionEndEvent, cb);
                                el._moveCb = null;
                                removeTransitionClass(el, moveClass);
                            }
                        });
                    }
                }));
            },
            methods: {
                hasMove: function hasMove(el, moveClass) {
                    if (!hasTransition) {
                        return false;
                    }
                    if (this._hasMove) {
                        return this._hasMove;
                    }
                    var clone = el.cloneNode();
                    if (el._transitionClasses) {
                        el._transitionClasses.forEach((function(cls) {
                            removeClass(clone, cls);
                        }));
                    }
                    addClass(clone, moveClass);
                    clone.style.display = "none";
                    this.$el.appendChild(clone);
                    var info = getTransitionInfo(clone);
                    this.$el.removeChild(clone);
                    return this._hasMove = info.hasTransform;
                }
            }
        };
        function callPendingCbs(c) {
            if (c.elm._moveCb) {
                c.elm._moveCb();
            }
            if (c.elm._enterCb) {
                c.elm._enterCb();
            }
        }
        function recordPosition(c) {
            c.data.newPos = c.elm.getBoundingClientRect();
        }
        function applyTranslation(c) {
            var oldPos = c.data.pos;
            var newPos = c.data.newPos;
            var dx = oldPos.left - newPos.left;
            var dy = oldPos.top - newPos.top;
            if (dx || dy) {
                c.data.moved = true;
                var s = c.elm.style;
                s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
                s.transitionDuration = "0s";
            }
        }
        var platformComponents = {
            Transition,
            TransitionGroup
        };
        vue_runtime_esm_Vue.config.mustUseProp = mustUseProp;
        vue_runtime_esm_Vue.config.isReservedTag = isReservedTag;
        vue_runtime_esm_Vue.config.isReservedAttr = isReservedAttr;
        vue_runtime_esm_Vue.config.getTagNamespace = getTagNamespace;
        vue_runtime_esm_Vue.config.isUnknownElement = isUnknownElement;
        extend(vue_runtime_esm_Vue.options.directives, platformDirectives);
        extend(vue_runtime_esm_Vue.options.components, platformComponents);
        vue_runtime_esm_Vue.prototype.__patch__ = inBrowser ? patch : noop;
        vue_runtime_esm_Vue.prototype.$mount = function(el, hydrating) {
            el = el && inBrowser ? query(el) : undefined;
            return mountComponent(this, el, hydrating);
        };
        if (inBrowser) {
            setTimeout((function() {
                if (config.devtools) {
                    if (devtools) {
                        devtools.emit("init", vue_runtime_esm_Vue);
                    } else if (false) {}
                }
                if (false) {}
            }), 0);
        }
        const vue_runtime_esm = vue_runtime_esm_Vue;
        function createMessage(message, vm, parent) {
            if (Vuetify.config.silent) return;
            if (parent) {
                vm = {
                    _isVue: true,
                    $parent: parent,
                    $options: vm
                };
            }
            if (vm) {
                vm.$_alreadyWarned = vm.$_alreadyWarned || [];
                if (vm.$_alreadyWarned.includes(message)) return;
                vm.$_alreadyWarned.push(message);
            }
            return `[Vuetify] ${message}` + (vm ? console_generateComponentTrace(vm) : "");
        }
        function consoleInfo(message, vm, parent) {
            const newMessage = createMessage(message, vm, parent);
            newMessage != null && console.info(newMessage);
        }
        function consoleWarn(message, vm, parent) {
            const newMessage = createMessage(message, vm, parent);
            newMessage != null && console.warn(newMessage);
        }
        function consoleError(message, vm, parent) {
            const newMessage = createMessage(message, vm, parent);
            newMessage != null && console.error(newMessage);
        }
        function deprecate(original, replacement, vm, parent) {
            consoleWarn(`[UPGRADE] '${original}' is deprecated, use '${replacement}' instead.`, vm, parent);
        }
        function breaking(original, replacement, vm, parent) {
            consoleError(`[BREAKING] '${original}' has been removed, use '${replacement}' instead. For more information, see the upgrade guide https://github.com/vuetifyjs/vuetify/releases/tag/v2.0.0#user-content-upgrade-guide`, vm, parent);
        }
        function removed(original, vm, parent) {
            consoleWarn(`[REMOVED] '${original}' has been removed. You can safely omit it.`, vm, parent);
        }
        const console_classifyRE = /(?:^|[-_])(\w)/g;
        const console_classify = str => str.replace(console_classifyRE, (c => c.toUpperCase())).replace(/[-_]/g, "");
        function console_formatComponentName(vm, includeFile) {
            if (vm.$root === vm) {
                return "<Root>";
            }
            const options = typeof vm === "function" && vm.cid != null ? vm.options : vm._isVue ? vm.$options || vm.constructor.options : vm || {};
            let name = options.name || options._componentTag;
            const file = options.__file;
            if (!name && file) {
                const match = file.match(/([^/\\]+)\.vue$/);
                name = match && match[1];
            }
            return (name ? `<${console_classify(name)}>` : `<Anonymous>`) + (file && includeFile !== false ? ` at ${file}` : "");
        }
        function console_generateComponentTrace(vm) {
            if (vm._isVue && vm.$parent) {
                const tree = [];
                let currentRecursiveSequence = 0;
                while (vm) {
                    if (tree.length > 0) {
                        const last = tree[tree.length - 1];
                        if (last.constructor === vm.constructor) {
                            currentRecursiveSequence++;
                            vm = vm.$parent;
                            continue;
                        } else if (currentRecursiveSequence > 0) {
                            tree[tree.length - 1] = [ last, currentRecursiveSequence ];
                            currentRecursiveSequence = 0;
                        }
                    }
                    tree.push(vm);
                    vm = vm.$parent;
                }
                return "\n\nfound in\n\n" + tree.map(((vm, i) => `${i === 0 ? "---> " : " ".repeat(5 + i * 2)}${Array.isArray(vm) ? `${console_formatComponentName(vm[0])}... (${vm[1]} recursive calls)` : console_formatComponentName(vm)}`)).join("\n");
            } else {
                return `\n\n(found in ${console_formatComponentName(vm)})`;
            }
        }
        function install(Vue, args = {}) {
            if (install.installed) return;
            install.installed = true;
            if (vue_runtime_esm !== Vue) {
                consoleError(`Multiple instances of Vue detected\nSee https://github.com/vuetifyjs/vuetify/issues/4068\n\nIf you're seeing "$attrs is readonly", it's caused by this`);
            }
            const components = args.components || {};
            const directives = args.directives || {};
            for (const name in directives) {
                const directive = directives[name];
                Vue.directive(name, directive);
            }
            (function registerComponents(components) {
                if (components) {
                    for (const key in components) {
                        const component = components[key];
                        if (component && !registerComponents(component.$_vuetify_subcomponents)) {
                            Vue.component(key, component);
                        }
                    }
                    return true;
                }
                return false;
            })(components);
            if (Vue.$_vuetify_installed) return;
            Vue.$_vuetify_installed = true;
            Vue.mixin({
                beforeCreate() {
                    const options = this.$options;
                    if (options.vuetify) {
                        options.vuetify.init(this, this.$ssrContext);
                        this.$vuetify = Vue.observable(options.vuetify.framework);
                    } else {
                        this.$vuetify = options.parent && options.parent.$vuetify || this;
                    }
                },
                beforeMount() {
                    if (this.$options.vuetify && this.$el && this.$el.hasAttribute("data-server-rendered")) {
                        this.$vuetify.isHydrating = true;
                        this.$vuetify.breakpoint.update(true);
                    }
                },
                mounted() {
                    if (this.$options.vuetify && this.$vuetify.isHydrating) {
                        this.$vuetify.isHydrating = false;
                        this.$vuetify.breakpoint.update();
                    }
                }
            });
        }
        var main = __webpack_require__(443);
        const en = {
            badge: "Badge",
            close: "Close",
            dataIterator: {
                noResultsText: "No matching records found",
                loadingText: "Loading items..."
            },
            dataTable: {
                itemsPerPageText: "Rows per page:",
                ariaLabel: {
                    sortDescending: "Sorted descending.",
                    sortAscending: "Sorted ascending.",
                    sortNone: "Not sorted.",
                    activateNone: "Activate to remove sorting.",
                    activateDescending: "Activate to sort descending.",
                    activateAscending: "Activate to sort ascending."
                },
                sortBy: "Sort by"
            },
            dataFooter: {
                itemsPerPageText: "Items per page:",
                itemsPerPageAll: "All",
                nextPage: "Next page",
                prevPage: "Previous page",
                firstPage: "First page",
                lastPage: "Last page",
                pageText: "{0}-{1} of {2}"
            },
            datePicker: {
                itemsSelected: "{0} selected",
                nextMonthAriaLabel: "Next month",
                nextYearAriaLabel: "Next year",
                prevMonthAriaLabel: "Previous month",
                prevYearAriaLabel: "Previous year"
            },
            noDataText: "No data available",
            carousel: {
                prev: "Previous visual",
                next: "Next visual",
                ariaLabel: {
                    delimiter: "Carousel slide {0} of {1}"
                }
            },
            calendar: {
                moreEvents: "{0} more"
            },
            fileInput: {
                counter: "{0} files",
                counterSize: "{0} files ({1} in total)"
            },
            timePicker: {
                am: "AM",
                pm: "PM"
            },
            pagination: {
                ariaLabel: {
                    wrapper: "Pagination Navigation",
                    next: "Next page",
                    previous: "Previous page",
                    page: "Goto Page {0}",
                    currentPage: "Current Page, Page {0}"
                }
            },
            rating: {
                ariaLabel: {
                    icon: "Rating {0} of {1}"
                }
            }
        };
        const default_preset = {
            breakpoint: {
                mobileBreakpoint: 1264,
                scrollBarWidth: 16,
                thresholds: {
                    xs: 600,
                    sm: 960,
                    md: 1280,
                    lg: 1920
                }
            },
            icons: {
                iconfont: "mdi",
                values: {}
            },
            lang: {
                current: "en",
                locales: {
                    en
                },
                t: undefined
            },
            rtl: false,
            theme: {
                dark: false,
                default: "light",
                disable: false,
                options: {
                    cspNonce: undefined,
                    customProperties: undefined,
                    minifyTheme: undefined,
                    themeCache: undefined,
                    variations: true
                },
                themes: {
                    light: {
                        primary: "#1976D2",
                        secondary: "#424242",
                        accent: "#82B1FF",
                        error: "#FF5252",
                        info: "#2196F3",
                        success: "#4CAF50",
                        warning: "#FB8C00"
                    },
                    dark: {
                        primary: "#2196F3",
                        secondary: "#424242",
                        accent: "#FF4081",
                        error: "#FF5252",
                        info: "#2196F3",
                        success: "#4CAF50",
                        warning: "#FB8C00"
                    }
                }
            }
        };
        function createSimpleFunctional(c, el = "div", name) {
            return Vue.extend({
                name: name || c.replace(/__/g, "-"),
                functional: true,
                render(h, {data, children}) {
                    data.staticClass = `${c} ${data.staticClass || ""}`.trim();
                    return h(el, data, children);
                }
            });
        }
        function directiveConfig(binding, defaults = {}) {
            return {
                ...defaults,
                ...binding.modifiers,
                value: binding.arg,
                ...binding.value || {}
            };
        }
        function addOnceEventListener(el, eventName, cb, options = false) {
            const once = event => {
                cb(event);
                el.removeEventListener(eventName, once, options);
            };
            el.addEventListener(eventName, once, options);
        }
        let passiveSupported = false;
        try {
            if (typeof window !== "undefined") {
                const testListenerOpts = Object.defineProperty({}, "passive", {
                    get: () => {
                        passiveSupported = true;
                    }
                });
                window.addEventListener("testListener", testListenerOpts, testListenerOpts);
                window.removeEventListener("testListener", testListenerOpts, testListenerOpts);
            }
        } catch (e) {
            console.warn(e);
        }
        function addPassiveEventListener(el, event, cb, options) {
            el.addEventListener(event, cb, passiveSupported ? options : false);
        }
        function getNestedValue(obj, path, fallback) {
            const last = path.length - 1;
            if (last < 0) return obj === undefined ? fallback : obj;
            for (let i = 0; i < last; i++) {
                if (obj == null) {
                    return fallback;
                }
                obj = obj[path[i]];
            }
            if (obj == null) return fallback;
            return obj[path[last]] === undefined ? fallback : obj[path[last]];
        }
        function deepEqual(a, b) {
            if (a === b) return true;
            if (a instanceof Date && b instanceof Date && a.getTime() !== b.getTime()) {
                return false;
            }
            if (a !== Object(a) || b !== Object(b)) {
                return false;
            }
            const props = Object.keys(a);
            if (props.length !== Object.keys(b).length) {
                return false;
            }
            return props.every((p => deepEqual(a[p], b[p])));
        }
        function getObjectValueByPath(obj, path, fallback) {
            if (obj == null || !path || typeof path !== "string") return fallback;
            if (obj[path] !== undefined) return obj[path];
            path = path.replace(/\[(\w+)\]/g, ".$1");
            path = path.replace(/^\./, "");
            return getNestedValue(obj, path.split("."), fallback);
        }
        function getPropertyFromItem(item, property, fallback) {
            if (property == null) return item === undefined ? fallback : item;
            if (item !== Object(item)) return fallback === undefined ? item : fallback;
            if (typeof property === "string") return getObjectValueByPath(item, property, fallback);
            if (Array.isArray(property)) return getNestedValue(item, property, fallback);
            if (typeof property !== "function") return fallback;
            const value = property(item, fallback);
            return typeof value === "undefined" ? fallback : value;
        }
        function createRange(length) {
            return Array.from({
                length
            }, ((v, k) => k));
        }
        function getZIndex(el) {
            if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
            const index = +window.getComputedStyle(el).getPropertyValue("z-index");
            if (!index) return getZIndex(el.parentNode);
            return index;
        }
        const tagsToReplace = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
        };
        function escapeHTML(str) {
            return str.replace(/[&<>]/g, (tag => tagsToReplace[tag] || tag));
        }
        function filterObjectOnKeys(obj, keys) {
            const filtered = {};
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (typeof obj[key] !== "undefined") {
                    filtered[key] = obj[key];
                }
            }
            return filtered;
        }
        function convertToUnit(str, unit = "px") {
            if (str == null || str === "") {
                return undefined;
            } else if (isNaN(+str)) {
                return String(str);
            } else {
                return `${Number(str)}${unit}`;
            }
        }
        function kebabCase(str) {
            return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        }
        function helpers_isObject(obj) {
            return obj !== null && typeof obj === "object";
        }
        const keyCodes = Object.freeze({
            enter: 13,
            tab: 9,
            delete: 46,
            esc: 27,
            space: 32,
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            end: 35,
            home: 36,
            del: 46,
            backspace: 8,
            insert: 45,
            pageup: 33,
            pagedown: 34,
            shift: 16
        });
        function remapInternalIcon(vm, iconName) {
            const component = vm.$vuetify.icons.component;
            if (iconName.startsWith("$")) {
                const iconPath = `$vuetify.icons.values.${iconName.split("$").pop().split(".").pop()}`;
                const override = getObjectValueByPath(vm, iconPath, iconName);
                if (typeof override === "string") iconName = override; else return override;
            }
            if (component == null) {
                return iconName;
            }
            return {
                component,
                props: {
                    icon: iconName
                }
            };
        }
        function keys(o) {
            return Object.keys(o);
        }
        const helpers_camelizeRE = /-(\w)/g;
        const helpers_camelize = str => str.replace(helpers_camelizeRE, ((_, c) => c ? c.toUpperCase() : ""));
        function arrayDiff(a, b) {
            const diff = [];
            for (let i = 0; i < b.length; i++) {
                if (a.indexOf(b[i]) < 0) diff.push(b[i]);
            }
            return diff;
        }
        function upperFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        function groupItems(items, groupBy, groupDesc) {
            const key = groupBy[0];
            const groups = [];
            let current;
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const val = getObjectValueByPath(item, key, null);
                if (current !== val) {
                    current = val;
                    groups.push({
                        name: val != null ? val : "",
                        items: []
                    });
                }
                groups[groups.length - 1].items.push(item);
            }
            return groups;
        }
        function wrapInArray(v) {
            return v != null ? Array.isArray(v) ? v : [ v ] : [];
        }
        function sortItems(items, sortBy, sortDesc, locale, customSorters) {
            if (sortBy === null || !sortBy.length) return items;
            const stringCollator = new Intl.Collator(locale, {
                sensitivity: "accent",
                usage: "sort"
            });
            return items.sort(((a, b) => {
                for (let i = 0; i < sortBy.length; i++) {
                    const sortKey = sortBy[i];
                    let sortA = getObjectValueByPath(a, sortKey);
                    let sortB = getObjectValueByPath(b, sortKey);
                    if (sortDesc[i]) {
                        [sortA, sortB] = [ sortB, sortA ];
                    }
                    if (customSorters && customSorters[sortKey]) {
                        const customResult = customSorters[sortKey](sortA, sortB);
                        if (!customResult) continue;
                        return customResult;
                    }
                    if (sortA === null && sortB === null) {
                        continue;
                    }
                    if (sortA instanceof Date && sortB instanceof Date) {
                        return sortA.getTime() - sortB.getTime();
                    }
                    [sortA, sortB] = [ sortA, sortB ].map((s => (s || "").toString().toLocaleLowerCase()));
                    if (sortA !== sortB) {
                        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
                        return stringCollator.compare(sortA, sortB);
                    }
                }
                return 0;
            }));
        }
        function defaultFilter(value, search, item) {
            return value != null && search != null && typeof value !== "boolean" && value.toString().toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !== -1;
        }
        function searchItems(items, search) {
            if (!search) return items;
            search = search.toString().toLowerCase();
            if (search.trim() === "") return items;
            return items.filter((item => Object.keys(item).some((key => defaultFilter(getObjectValueByPath(item, key), search, item)))));
        }
        function getSlotType(vm, name, split) {
            if (vm.$slots[name] && vm.$scopedSlots[name] && vm.$scopedSlots[name].name) {
                return split ? "v-slot" : "scoped";
            }
            if (vm.$slots[name]) return "normal";
            if (vm.$scopedSlots[name]) return "scoped";
        }
        function debounce(fn, delay) {
            let timeoutId = 0;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout((() => fn(...args)), delay);
            };
        }
        function throttle(fn, limit) {
            let throttling = false;
            return (...args) => {
                if (!throttling) {
                    throttling = true;
                    setTimeout((() => throttling = false), limit);
                    return fn(...args);
                }
            };
        }
        function getPrefixedScopedSlots(prefix, scopedSlots) {
            return Object.keys(scopedSlots).filter((k => k.startsWith(prefix))).reduce(((obj, k) => {
                obj[k.replace(prefix, "")] = scopedSlots[k];
                return obj;
            }), {});
        }
        function getSlot(vm, name = "default", data, optional = false) {
            if (vm.$scopedSlots[name]) {
                return vm.$scopedSlots[name](data instanceof Function ? data() : data);
            } else if (vm.$slots[name] && (!data || optional)) {
                return vm.$slots[name];
            }
            return undefined;
        }
        function clamp(value, min = 0, max = 1) {
            return Math.max(min, Math.min(max, value));
        }
        function helpers_padEnd(str, length, char = "0") {
            return str + char.repeat(Math.max(0, length - str.length));
        }
        function helpers_chunk(str, size = 1) {
            const chunked = [];
            let index = 0;
            while (index < str.length) {
                chunked.push(str.substr(index, size));
                index += size;
            }
            return chunked;
        }
        function humanReadableFileSize(bytes, binary = false) {
            const base = binary ? 1024 : 1e3;
            if (bytes < base) {
                return `${bytes} B`;
            }
            const prefix = binary ? [ "Ki", "Mi", "Gi" ] : [ "k", "M", "G" ];
            let unit = -1;
            while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
                bytes /= base;
                ++unit;
            }
            return `${bytes.toFixed(1)} ${prefix[unit]}B`;
        }
        function camelizeObjectKeys(obj) {
            if (!obj) return {};
            return Object.keys(obj).reduce(((o, key) => {
                o[helpers_camelize(key)] = obj[key];
                return o;
            }), {});
        }
        function mergeDeep(source = {}, target = {}) {
            for (const key in target) {
                const sourceProperty = source[key];
                const targetProperty = target[key];
                if (helpers_isObject(sourceProperty) && helpers_isObject(targetProperty)) {
                    source[key] = mergeDeep(sourceProperty, targetProperty);
                    continue;
                }
                source[key] = targetProperty;
            }
            return source;
        }
        function fillArray(length, obj) {
            return Array(length).fill(obj);
        }
        function composedPath(e) {
            if (e.composedPath) return e.composedPath();
            const path = [];
            let el = e.target;
            while (el) {
                path.push(el);
                if (el.tagName === "HTML") {
                    path.push(document);
                    path.push(window);
                    return path;
                }
                el = el.parentElement;
            }
            return path;
        }
        class Service {
            constructor() {
                this.framework = {};
            }
            init(root, ssrContext) {}
        }
        class Presets extends Service {
            constructor(parentPreset, parent) {
                super();
                const defaultPreset = mergeDeep({}, default_preset);
                const {userPreset} = parent;
                const {preset: globalPreset = {}, ...preset} = userPreset;
                if (globalPreset.preset != null) {
                    consoleWarn("Global presets do not support the **preset** option, it can be safely omitted");
                }
                parent.preset = mergeDeep(mergeDeep(defaultPreset, globalPreset), preset);
            }
        }
        Presets.property = "presets";
        class Application extends Service {
            constructor() {
                super(...arguments);
                this.bar = 0;
                this.top = 0;
                this.left = 0;
                this.insetFooter = 0;
                this.right = 0;
                this.bottom = 0;
                this.footer = 0;
                this.application = {
                    bar: {},
                    top: {},
                    left: {},
                    insetFooter: {},
                    right: {},
                    bottom: {},
                    footer: {}
                };
            }
            register(uid, location, size) {
                this.application[location] = {
                    [uid]: size
                };
                this.update(location);
            }
            unregister(uid, location) {
                if (this.application[location][uid] == null) return;
                delete this.application[location][uid];
                this.update(location);
            }
            update(location) {
                this[location] = Object.values(this.application[location]).reduce(((acc, cur) => acc + cur), 0);
            }
        }
        Application.property = "application";
        class Breakpoint extends Service {
            constructor(preset) {
                super();
                this.xs = false;
                this.sm = false;
                this.md = false;
                this.lg = false;
                this.xl = false;
                this.xsOnly = false;
                this.smOnly = false;
                this.smAndDown = false;
                this.smAndUp = false;
                this.mdOnly = false;
                this.mdAndDown = false;
                this.mdAndUp = false;
                this.lgOnly = false;
                this.lgAndDown = false;
                this.lgAndUp = false;
                this.xlOnly = false;
                this.name = "xs";
                this.height = 0;
                this.width = 0;
                this.mobile = true;
                this.resizeTimeout = 0;
                const {mobileBreakpoint, scrollBarWidth, thresholds} = preset[Breakpoint.property];
                this.mobileBreakpoint = mobileBreakpoint;
                this.scrollBarWidth = scrollBarWidth;
                this.thresholds = thresholds;
            }
            init() {
                this.update();
                if (typeof window === "undefined") return;
                window.addEventListener("resize", this.onResize.bind(this), {
                    passive: true
                });
            }
            update(ssr = false) {
                const height = ssr ? 0 : this.getClientHeight();
                const width = ssr ? 0 : this.getClientWidth();
                const xs = width < this.thresholds.xs;
                const sm = width < this.thresholds.sm && !xs;
                const md = width < this.thresholds.md - this.scrollBarWidth && !(sm || xs);
                const lg = width < this.thresholds.lg - this.scrollBarWidth && !(md || sm || xs);
                const xl = width >= this.thresholds.lg - this.scrollBarWidth;
                this.height = height;
                this.width = width;
                this.xs = xs;
                this.sm = sm;
                this.md = md;
                this.lg = lg;
                this.xl = xl;
                this.xsOnly = xs;
                this.smOnly = sm;
                this.smAndDown = (xs || sm) && !(md || lg || xl);
                this.smAndUp = !xs && (sm || md || lg || xl);
                this.mdOnly = md;
                this.mdAndDown = (xs || sm || md) && !(lg || xl);
                this.mdAndUp = !(xs || sm) && (md || lg || xl);
                this.lgOnly = lg;
                this.lgAndDown = (xs || sm || md || lg) && !xl;
                this.lgAndUp = !(xs || sm || md) && (lg || xl);
                this.xlOnly = xl;
                switch (true) {
                  case xs:
                    this.name = "xs";
                    break;

                  case sm:
                    this.name = "sm";
                    break;

                  case md:
                    this.name = "md";
                    break;

                  case lg:
                    this.name = "lg";
                    break;

                  default:
                    this.name = "xl";
                    break;
                }
                if (typeof this.mobileBreakpoint === "number") {
                    this.mobile = width < parseInt(this.mobileBreakpoint, 10);
                    return;
                }
                const breakpoints = {
                    xs: 0,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 4
                };
                const current = breakpoints[this.name];
                const max = breakpoints[this.mobileBreakpoint];
                this.mobile = current <= max;
            }
            onResize() {
                clearTimeout(this.resizeTimeout);
                this.resizeTimeout = window.setTimeout(this.update.bind(this), 200);
            }
            getClientWidth() {
                if (typeof document === "undefined") return 0;
                return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
            getClientHeight() {
                if (typeof document === "undefined") return 0;
                return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
        }
        Breakpoint.property = "breakpoint";
        const linear = t => t;
        const easeInQuad = t => t ** 2;
        const easeOutQuad = t => t * (2 - t);
        const easeInOutQuad = t => t < .5 ? 2 * t ** 2 : -1 + (4 - 2 * t) * t;
        const easeInCubic = t => t ** 3;
        const easeOutCubic = t => --t ** 3 + 1;
        const easeInOutCubic = t => t < .5 ? 4 * t ** 3 : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        const easeInQuart = t => t ** 4;
        const easeOutQuart = t => 1 - --t ** 4;
        const easeInOutQuart = t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
        const easeInQuint = t => t ** 5;
        const easeOutQuint = t => 1 + --t ** 5;
        const easeInOutQuint = t => t < .5 ? 16 * t ** 5 : 1 + 16 * --t ** 5;
        function getOffset(target) {
            if (typeof target === "number") {
                return target;
            }
            let el = util_$(target);
            if (!el) {
                throw typeof target === "string" ? new Error(`Target element "${target}" not found.`) : new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(target)} instead.`);
            }
            let totalOffset = 0;
            while (el) {
                totalOffset += el.offsetTop;
                el = el.offsetParent;
            }
            return totalOffset;
        }
        function getContainer(container) {
            const el = util_$(container);
            if (el) return el;
            throw typeof container === "string" ? new Error(`Container element "${container}" not found.`) : new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(container)} instead.`);
        }
        function type(el) {
            return el == null ? el : el.constructor.name;
        }
        function util_$(el) {
            if (typeof el === "string") {
                return document.querySelector(el);
            } else if (el && el._isVue) {
                return el.$el;
            } else if (el instanceof HTMLElement) {
                return el;
            } else {
                return null;
            }
        }
        function goTo(_target, _settings = {}) {
            const settings = {
                container: document.scrollingElement || document.body || document.documentElement,
                duration: 500,
                offset: 0,
                easing: "easeInOutCubic",
                appOffset: true,
                ..._settings
            };
            const container = getContainer(settings.container);
            if (settings.appOffset && goTo.framework.application) {
                const isDrawer = container.classList.contains("v-navigation-drawer");
                const isClipped = container.classList.contains("v-navigation-drawer--clipped");
                const {bar, top} = goTo.framework.application;
                settings.offset += bar;
                if (!isDrawer || isClipped) settings.offset += top;
            }
            const startTime = performance.now();
            let targetLocation;
            if (typeof _target === "number") {
                targetLocation = getOffset(_target) - settings.offset;
            } else {
                targetLocation = getOffset(_target) - getOffset(container) - settings.offset;
            }
            const startLocation = container.scrollTop;
            if (targetLocation === startLocation) return Promise.resolve(targetLocation);
            const ease = typeof settings.easing === "function" ? settings.easing : easing_patterns_namespaceObject[settings.easing];
            if (!ease) throw new TypeError(`Easing function "${settings.easing}" not found.`);
            return new Promise((resolve => requestAnimationFrame((function step(currentTime) {
                const timeElapsed = currentTime - startTime;
                const progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1);
                container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress));
                const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight;
                const reachBottom = clientHeight + container.scrollTop >= container.scrollHeight;
                if (progress === 1 || targetLocation > container.scrollTop && reachBottom) {
                    return resolve(targetLocation);
                }
                requestAnimationFrame(step);
            }))));
        }
        goTo.framework = {};
        goTo.init = () => {};
        class Goto extends Service {
            constructor() {
                super();
                return goTo;
            }
        }
        Goto.property = "goTo";
        const icons = {
            complete: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z",
            cancel: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
            close: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
            delete: "M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z",
            clear: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z",
            success: "M12,2C17.52,2 22,6.48 22,12C22,17.52 17.52,22 12,22C6.48,22 2,17.52 2,12C2,6.48 6.48,2 12,2M11,16.5L18,9.5L16.59,8.09L11,13.67L7.91,10.59L6.5,12L11,16.5Z",
            info: "M13,9H11V7H13M13,17H11V11H13M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
            warning: "M11,4.5H13V15.5H11V4.5M13,17.5V19.5H11V17.5H13Z",
            error: "M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z",
            prev: "M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",
            next: "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",
            checkboxOn: "M10,17L5,12L6.41,10.58L10,14.17L17.59,6.58L19,8M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
            checkboxOff: "M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z",
            checkboxIndeterminate: "M17,13H7V11H17M19,3H5C3.89,3 3,3.89 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.89 20.1,3 19,3Z",
            delimiter: "M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
            sort: "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z",
            expand: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z",
            menu: "M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z",
            subgroup: "M7,10L12,15L17,10H7Z",
            dropdown: "M7,10L12,15L17,10H7Z",
            radioOn: "M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M12,7C9.24,7 7,9.24 7,12C7,14.76 9.24,17 12,17C14.76,17 17,14.76 17,12C17,9.24 14.76,7 12,7Z",
            radioOff: "M12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12C20,16.42 16.42,20 12,20M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2Z",
            edit: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
            ratingEmpty: "M12,15.39L8.24,17.66L9.23,13.38L5.91,10.5L10.29,10.13L12,6.09L13.71,10.13L18.09,10.5L14.77,13.38L15.76,17.66M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
            ratingFull: "M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z",
            ratingHalf: "M12,15.4V6.1L13.71,10.13L18.09,10.5L14.77,13.39L15.76,17.67M22,9.24L14.81,8.63L12,2L9.19,8.63L2,9.24L7.45,13.97L5.82,21L12,17.27L18.18,21L16.54,13.97L22,9.24Z",
            loading: "M19,8L15,12H18C18,15.31 15.31,18 12,18C11,18 10.03,17.75 9.2,17.3L7.74,18.76C8.97,19.54 10.43,20 12,20C16.42,20 20,16.42 20,12H23M6,12C6,8.69 8.69,6 12,6C13,6 13.97,6.25 14.8,6.7L16.26,5.24C15.03,4.46 13.57,4 12,4C7.58,4 4,7.58 4,12H1L5,16L9,12",
            first: "M18.41,16.59L13.82,12L18.41,7.41L17,6L11,12L17,18L18.41,16.59M6,6H8V18H6V6Z",
            last: "M5.59,7.41L10.18,12L5.59,16.59L7,18L13,12L7,6L5.59,7.41M16,6H18V18H16V6Z",
            unfold: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z",
            file: "M16.5,6V17.5C16.5,19.71 14.71,21.5 12.5,21.5C10.29,21.5 8.5,19.71 8.5,17.5V5C8.5,3.62 9.62,2.5 11,2.5C12.38,2.5 13.5,3.62 13.5,5V15.5C13.5,16.05 13.05,16.5 12.5,16.5C11.95,16.5 11.5,16.05 11.5,15.5V6H10V15.5C10,16.88 11.12,18 12.5,18C13.88,18 15,16.88 15,15.5V5C15,2.79 13.21,1 11,1C8.79,1 7,2.79 7,5V17.5C7,20.54 9.46,23 12.5,23C15.54,23 18,20.54 18,17.5V6H16.5Z",
            plus: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z",
            minus: "M19,13H5V11H19V13Z"
        };
        const mdi_svg = icons;
        const md_icons = {
            complete: "check",
            cancel: "cancel",
            close: "close",
            delete: "cancel",
            clear: "clear",
            success: "check_circle",
            info: "info",
            warning: "priority_high",
            error: "warning",
            prev: "chevron_left",
            next: "chevron_right",
            checkboxOn: "check_box",
            checkboxOff: "check_box_outline_blank",
            checkboxIndeterminate: "indeterminate_check_box",
            delimiter: "fiber_manual_record",
            sort: "arrow_upward",
            expand: "keyboard_arrow_down",
            menu: "menu",
            subgroup: "arrow_drop_down",
            dropdown: "arrow_drop_down",
            radioOn: "radio_button_checked",
            radioOff: "radio_button_unchecked",
            edit: "edit",
            ratingEmpty: "star_border",
            ratingFull: "star",
            ratingHalf: "star_half",
            loading: "cached",
            first: "first_page",
            last: "last_page",
            unfold: "unfold_more",
            file: "attach_file",
            plus: "add",
            minus: "remove"
        };
        const md = md_icons;
        const mdi_icons = {
            complete: "mdi-check",
            cancel: "mdi-close-circle",
            close: "mdi-close",
            delete: "mdi-close-circle",
            clear: "mdi-close",
            success: "mdi-check-circle",
            info: "mdi-information",
            warning: "mdi-exclamation",
            error: "mdi-alert",
            prev: "mdi-chevron-left",
            next: "mdi-chevron-right",
            checkboxOn: "mdi-checkbox-marked",
            checkboxOff: "mdi-checkbox-blank-outline",
            checkboxIndeterminate: "mdi-minus-box",
            delimiter: "mdi-circle",
            sort: "mdi-arrow-up",
            expand: "mdi-chevron-down",
            menu: "mdi-menu",
            subgroup: "mdi-menu-down",
            dropdown: "mdi-menu-down",
            radioOn: "mdi-radiobox-marked",
            radioOff: "mdi-radiobox-blank",
            edit: "mdi-pencil",
            ratingEmpty: "mdi-star-outline",
            ratingFull: "mdi-star",
            ratingHalf: "mdi-star-half-full",
            loading: "mdi-cached",
            first: "mdi-page-first",
            last: "mdi-page-last",
            unfold: "mdi-unfold-more-horizontal",
            file: "mdi-paperclip",
            plus: "mdi-plus",
            minus: "mdi-minus"
        };
        const mdi = mdi_icons;
        const fa_icons = {
            complete: "fas fa-check",
            cancel: "fas fa-times-circle",
            close: "fas fa-times",
            delete: "fas fa-times-circle",
            clear: "fas fa-times-circle",
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation",
            error: "fas fa-exclamation-triangle",
            prev: "fas fa-chevron-left",
            next: "fas fa-chevron-right",
            checkboxOn: "fas fa-check-square",
            checkboxOff: "far fa-square",
            checkboxIndeterminate: "fas fa-minus-square",
            delimiter: "fas fa-circle",
            sort: "fas fa-sort-up",
            expand: "fas fa-chevron-down",
            menu: "fas fa-bars",
            subgroup: "fas fa-caret-down",
            dropdown: "fas fa-caret-down",
            radioOn: "far fa-dot-circle",
            radioOff: "far fa-circle",
            edit: "fas fa-edit",
            ratingEmpty: "far fa-star",
            ratingFull: "fas fa-star",
            ratingHalf: "fas fa-star-half",
            loading: "fas fa-sync",
            first: "fas fa-step-backward",
            last: "fas fa-step-forward",
            unfold: "fas fa-arrows-alt-v",
            file: "fas fa-paperclip",
            plus: "fas fa-plus",
            minus: "fas fa-minus"
        };
        const fa = fa_icons;
        const fa4_icons = {
            complete: "fa fa-check",
            cancel: "fa fa-times-circle",
            close: "fa fa-times",
            delete: "fa fa-times-circle",
            clear: "fa fa-times-circle",
            success: "fa fa-check-circle",
            info: "fa fa-info-circle",
            warning: "fa fa-exclamation",
            error: "fa fa-exclamation-triangle",
            prev: "fa fa-chevron-left",
            next: "fa fa-chevron-right",
            checkboxOn: "fa fa-check-square",
            checkboxOff: "fa fa-square-o",
            checkboxIndeterminate: "fa fa-minus-square",
            delimiter: "fa fa-circle",
            sort: "fa fa-sort-up",
            expand: "fa fa-chevron-down",
            menu: "fa fa-bars",
            subgroup: "fa fa-caret-down",
            dropdown: "fa fa-caret-down",
            radioOn: "fa fa-dot-circle-o",
            radioOff: "fa fa-circle-o",
            edit: "fa fa-pencil",
            ratingEmpty: "fa fa-star-o",
            ratingFull: "fa fa-star",
            ratingHalf: "fa fa-star-half-o",
            loading: "fa fa-refresh",
            first: "fa fa-step-backward",
            last: "fa fa-step-forward",
            unfold: "fa fa-angle-double-down",
            file: "fa fa-paperclip",
            plus: "fa fa-plus",
            minus: "fa fa-minus"
        };
        const fa4 = fa4_icons;
        function convertToComponentDeclarations(component, iconSet) {
            const result = {};
            for (const key in iconSet) {
                result[key] = {
                    component,
                    props: {
                        icon: iconSet[key].split(" fa-")
                    }
                };
            }
            return result;
        }
        const fa_svg = convertToComponentDeclarations("font-awesome-icon", fa);
        const presets = Object.freeze({
            mdiSvg: mdi_svg,
            md,
            mdi,
            fa,
            fa4,
            faSvg: fa_svg
        });
        class Icons extends Service {
            constructor(preset) {
                super();
                const {iconfont, values, component} = preset[Icons.property];
                this.component = component;
                this.iconfont = iconfont;
                this.values = mergeDeep(presets[iconfont], values);
            }
        }
        Icons.property = "icons";
        const LANG_PREFIX = "$vuetify.";
        const fallback = Symbol("Lang fallback");
        function getTranslation(locale, key, usingDefault = false, defaultLocale) {
            const shortKey = key.replace(LANG_PREFIX, "");
            let translation = getObjectValueByPath(locale, shortKey, fallback);
            if (translation === fallback) {
                if (usingDefault) {
                    consoleError(`Translation key "${shortKey}" not found in fallback`);
                    translation = key;
                } else {
                    consoleWarn(`Translation key "${shortKey}" not found, falling back to default`);
                    translation = getTranslation(defaultLocale, key, true, defaultLocale);
                }
            }
            return translation;
        }
        class Lang extends Service {
            constructor(preset) {
                super();
                this.defaultLocale = "en";
                const {current, locales, t} = preset[Lang.property];
                this.current = current;
                this.locales = locales;
                this.translator = t || this.defaultTranslator;
            }
            currentLocale(key) {
                const translation = this.locales[this.current];
                const defaultLocale = this.locales[this.defaultLocale];
                return getTranslation(translation, key, false, defaultLocale);
            }
            t(key, ...params) {
                if (!key.startsWith(LANG_PREFIX)) return this.replace(key, params);
                return this.translator(key, ...params);
            }
            defaultTranslator(key, ...params) {
                return this.replace(this.currentLocale(key), params);
            }
            replace(str, params) {
                return str.replace(/\{(\d+)\}/g, ((match, index) => String(params[+index])));
            }
        }
        Lang.property = "lang";
        function isCssColor(color) {
            return !!color && !!color.match(/^(#|var\(--|(rgb|hsl)a?\()/);
        }
        function colorToInt(color) {
            let rgb;
            if (typeof color === "number") {
                rgb = color;
            } else if (typeof color === "string") {
                let c = color[0] === "#" ? color.substring(1) : color;
                if (c.length === 3) {
                    c = c.split("").map((char => char + char)).join("");
                }
                if (c.length !== 6) {
                    consoleWarn(`'${color}' is not a valid rgb color`);
                }
                rgb = parseInt(c, 16);
            } else {
                throw new TypeError(`Colors can only be numbers or strings, recieved ${color == null ? color : color.constructor.name} instead`);
            }
            if (rgb < 0) {
                consoleWarn(`Colors cannot be negative: '${color}'`);
                rgb = 0;
            } else if (rgb > 16777215 || isNaN(rgb)) {
                consoleWarn(`'${color}' is not a valid rgb color`);
                rgb = 16777215;
            }
            return rgb;
        }
        function classToHex(color, colors, currentTheme) {
            const [colorName, colorModifier] = color.toString().trim().replace("-", "").split(" ", 2);
            let hexColor = "";
            if (colorName && colorName in colors) {
                if (colorModifier && colorModifier in colors[colorName]) {
                    hexColor = colors[colorName][colorModifier];
                } else if ("base" in colors[colorName]) {
                    hexColor = colors[colorName].base;
                }
            } else if (colorName && colorName in currentTheme) {
                hexColor = currentTheme[colorName];
            }
            return hexColor;
        }
        function intToHex(color) {
            let hexColor = color.toString(16);
            if (hexColor.length < 6) hexColor = "0".repeat(6 - hexColor.length) + hexColor;
            return "#" + hexColor;
        }
        function colorToHex(color) {
            return intToHex(colorToInt(color));
        }
        function HSVAtoRGBA(hsva) {
            const {h, s, v, a} = hsva;
            const f = n => {
                const k = (n + h / 60) % 6;
                return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
            };
            const rgb = [ f(5), f(3), f(1) ].map((v => Math.round(v * 255)));
            return {
                r: rgb[0],
                g: rgb[1],
                b: rgb[2],
                a
            };
        }
        function RGBAtoHSVA(rgba) {
            if (!rgba) return {
                h: 0,
                s: 1,
                v: 1,
                a: 1
            };
            const r = rgba.r / 255;
            const g = rgba.g / 255;
            const b = rgba.b / 255;
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            let h = 0;
            if (max !== min) {
                if (max === r) {
                    h = 60 * (0 + (g - b) / (max - min));
                } else if (max === g) {
                    h = 60 * (2 + (b - r) / (max - min));
                } else if (max === b) {
                    h = 60 * (4 + (r - g) / (max - min));
                }
            }
            if (h < 0) h = h + 360;
            const s = max === 0 ? 0 : (max - min) / max;
            const hsv = [ h, s, max ];
            return {
                h: hsv[0],
                s: hsv[1],
                v: hsv[2],
                a: rgba.a
            };
        }
        function HSVAtoHSLA(hsva) {
            const {h, s, v, a} = hsva;
            const l = v - v * s / 2;
            const sprime = l === 1 || l === 0 ? 0 : (v - l) / Math.min(l, 1 - l);
            return {
                h,
                s: sprime,
                l,
                a
            };
        }
        function HSLAtoHSVA(hsl) {
            const {h, s, l, a} = hsl;
            const v = l + s * Math.min(l, 1 - l);
            const sprime = v === 0 ? 0 : 2 - 2 * l / v;
            return {
                h,
                s: sprime,
                v,
                a
            };
        }
        function RGBAtoCSS(rgba) {
            return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
        }
        function RGBtoCSS(rgba) {
            return RGBAtoCSS({
                ...rgba,
                a: 1
            });
        }
        function RGBAtoHex(rgba) {
            const toHex = v => {
                const h = Math.round(v).toString(16);
                return ("00".substr(0, 2 - h.length) + h).toUpperCase();
            };
            return `#${[ toHex(rgba.r), toHex(rgba.g), toHex(rgba.b), toHex(Math.round(rgba.a * 255)) ].join("")}`;
        }
        function HexToRGBA(hex) {
            const rgba = chunk(hex.slice(1), 2).map((c => parseInt(c, 16)));
            return {
                r: rgba[0],
                g: rgba[1],
                b: rgba[2],
                a: Math.round(rgba[3] / 255 * 100) / 100
            };
        }
        function HexToHSVA(hex) {
            const rgb = HexToRGBA(hex);
            return RGBAtoHSVA(rgb);
        }
        function HSVAtoHex(hsva) {
            return RGBAtoHex(HSVAtoRGBA(hsva));
        }
        function parseHex(hex) {
            if (hex.startsWith("#")) {
                hex = hex.slice(1);
            }
            hex = hex.replace(/([^0-9a-f])/gi, "F");
            if (hex.length === 3 || hex.length === 4) {
                hex = hex.split("").map((x => x + x)).join("");
            }
            if (hex.length === 6) {
                hex = padEnd(hex, 8, "F");
            } else {
                hex = padEnd(padEnd(hex, 6), 8, "F");
            }
            return `#${hex}`.toUpperCase().substr(0, 9);
        }
        function parseGradient(gradient, colors, currentTheme) {
            return gradient.replace(/([a-z]+(\s[a-z]+-[1-5])?)(?=$|,)/gi, (x => classToHex(x, colors, currentTheme) || x)).replace(/(rgba\()#[0-9a-f]+(?=,)/gi, (x => "rgba(" + Object.values(HexToRGBA(parseHex(x.replace(/rgba\(/, "")))).slice(0, 3).join(",")));
        }
        function RGBtoInt(rgba) {
            return (rgba.r << 16) + (rgba.g << 8) + rgba.b;
        }
        function contrastRatio(c1, c2) {
            const [, y1] = toXYZ(RGBtoInt(c1));
            const [, y2] = toXYZ(RGBtoInt(c2));
            return (Math.max(y1, y2) + .05) / (Math.min(y1, y2) + .05);
        }
        const srgbForwardMatrix = [ [ 3.2406, -1.5372, -.4986 ], [ -.9689, 1.8758, .0415 ], [ .0557, -.204, 1.057 ] ];
        const srgbForwardTransform = C => C <= .0031308 ? C * 12.92 : 1.055 * C ** (1 / 2.4) - .055;
        const srgbReverseMatrix = [ [ .4124, .3576, .1805 ], [ .2126, .7152, .0722 ], [ .0193, .1192, .9505 ] ];
        const srgbReverseTransform = C => C <= .04045 ? C / 12.92 : ((C + .055) / 1.055) ** 2.4;
        function fromXYZ(xyz) {
            const rgb = Array(3);
            const transform = srgbForwardTransform;
            const matrix = srgbForwardMatrix;
            for (let i = 0; i < 3; ++i) {
                rgb[i] = Math.round(clamp(transform(matrix[i][0] * xyz[0] + matrix[i][1] * xyz[1] + matrix[i][2] * xyz[2])) * 255);
            }
            return (rgb[0] << 16) + (rgb[1] << 8) + (rgb[2] << 0);
        }
        function transformSRGB_toXYZ(rgb) {
            const xyz = [ 0, 0, 0 ];
            const transform = srgbReverseTransform;
            const matrix = srgbReverseMatrix;
            const r = transform((rgb >> 16 & 255) / 255);
            const g = transform((rgb >> 8 & 255) / 255);
            const b = transform((rgb >> 0 & 255) / 255);
            for (let i = 0; i < 3; ++i) {
                xyz[i] = matrix[i][0] * r + matrix[i][1] * g + matrix[i][2] * b;
            }
            return xyz;
        }
        const delta = .20689655172413793;
        const cielabForwardTransform = t => t > delta ** 3 ? Math.cbrt(t) : t / (3 * delta ** 2) + 4 / 29;
        const cielabReverseTransform = t => t > delta ? t ** 3 : 3 * delta ** 2 * (t - 4 / 29);
        function transformCIELAB_fromXYZ(xyz) {
            const transform = cielabForwardTransform;
            const transformedY = transform(xyz[1]);
            return [ 116 * transformedY - 16, 500 * (transform(xyz[0] / .95047) - transformedY), 200 * (transformedY - transform(xyz[2] / 1.08883)) ];
        }
        function transformCIELAB_toXYZ(lab) {
            const transform = cielabReverseTransform;
            const Ln = (lab[0] + 16) / 116;
            return [ transform(Ln + lab[1] / 500) * .95047, transform(Ln), transform(Ln - lab[2] / 200) * 1.08883 ];
        }
        function parse(theme, isItem = false, variations = true) {
            const {anchor, ...variant} = theme;
            const colors = Object.keys(variant);
            const parsedTheme = {};
            for (let i = 0; i < colors.length; ++i) {
                const name = colors[i];
                const value = theme[name];
                if (value == null) continue;
                if (!variations) {
                    parsedTheme[name] = {
                        base: intToHex(colorToInt(value))
                    };
                } else if (isItem) {
                    if (name === "base" || name.startsWith("lighten") || name.startsWith("darken")) {
                        parsedTheme[name] = colorToHex(value);
                    }
                } else if (typeof value === "object") {
                    parsedTheme[name] = parse(value, true, variations);
                } else {
                    parsedTheme[name] = genVariations(name, colorToInt(value));
                }
            }
            if (!isItem) {
                parsedTheme.anchor = anchor || parsedTheme.base || parsedTheme.primary.base;
            }
            return parsedTheme;
        }
        const genBaseColor = (name, value) => `\n.v-application .${name} {\n  background-color: ${value} !important;\n  border-color: ${value} !important;\n}\n.v-application .${name}--text {\n  color: ${value} !important;\n  caret-color: ${value} !important;\n}`;
        const genVariantColor = (name, variant, value) => {
            const [type, n] = variant.split(/(\d)/, 2);
            return `\n.v-application .${name}.${type}-${n} {\n  background-color: ${value} !important;\n  border-color: ${value} !important;\n}\n.v-application .${name}--text.text--${type}-${n} {\n  color: ${value} !important;\n  caret-color: ${value} !important;\n}`;
        };
        const genColorVariableName = (name, variant = "base") => `--v-${name}-${variant}`;
        const genColorVariable = (name, variant = "base") => `var(${genColorVariableName(name, variant)})`;
        function genStyles(theme, cssVar = false) {
            const {anchor, ...variant} = theme;
            const colors = Object.keys(variant);
            if (!colors.length) return "";
            let variablesCss = "";
            let css = "";
            const aColor = cssVar ? genColorVariable("anchor") : anchor;
            css += `.v-application a { color: ${aColor}; }`;
            cssVar && (variablesCss += `  ${genColorVariableName("anchor")}: ${anchor};\n`);
            for (let i = 0; i < colors.length; ++i) {
                const name = colors[i];
                const value = theme[name];
                css += genBaseColor(name, cssVar ? genColorVariable(name) : value.base);
                cssVar && (variablesCss += `  ${genColorVariableName(name)}: ${value.base};\n`);
                const variants = keys(value);
                for (let i = 0; i < variants.length; ++i) {
                    const variant = variants[i];
                    const variantValue = value[variant];
                    if (variant === "base") continue;
                    css += genVariantColor(name, variant, cssVar ? genColorVariable(name, variant) : variantValue);
                    cssVar && (variablesCss += `  ${genColorVariableName(name, variant)}: ${variantValue};\n`);
                }
            }
            if (cssVar) {
                variablesCss = `:root {\n${variablesCss}}\n\n`;
            }
            return variablesCss + css;
        }
        function genVariations(name, value) {
            const values = {
                base: intToHex(value)
            };
            for (let i = 5; i > 0; --i) {
                values[`lighten${i}`] = intToHex(lighten(value, i));
            }
            for (let i = 1; i <= 4; ++i) {
                values[`darken${i}`] = intToHex(darken(value, i));
            }
            return values;
        }
        function lighten(value, amount) {
            const lab = transformCIELAB_fromXYZ(transformSRGB_toXYZ(value));
            lab[0] = lab[0] + amount * 10;
            return fromXYZ(transformCIELAB_toXYZ(lab));
        }
        function darken(value, amount) {
            const lab = transformCIELAB_fromXYZ(transformSRGB_toXYZ(value));
            lab[0] = lab[0] - amount * 10;
            return fromXYZ(transformCIELAB_toXYZ(lab));
        }
        class Theme extends Service {
            constructor(preset) {
                super();
                this.disabled = false;
                this.isDark = null;
                this.unwatch = null;
                this.vueMeta = null;
                const {dark, disable, options, themes} = preset[Theme.property];
                this.dark = Boolean(dark);
                this.defaults = this.themes = themes;
                this.options = options;
                if (disable) {
                    this.disabled = true;
                    return;
                }
                this.themes = {
                    dark: this.fillVariant(themes.dark, true),
                    light: this.fillVariant(themes.light, false)
                };
            }
            set css(val) {
                if (this.vueMeta) {
                    if (this.isVueMeta23) {
                        this.applyVueMeta23();
                    }
                    return;
                }
                this.checkOrCreateStyleElement() && (this.styleEl.innerHTML = val);
            }
            set dark(val) {
                const oldDark = this.isDark;
                this.isDark = val;
                oldDark != null && this.applyTheme();
            }
            get dark() {
                return Boolean(this.isDark);
            }
            applyTheme() {
                if (this.disabled) return this.clearCss();
                this.css = this.generatedStyles;
            }
            clearCss() {
                this.css = "";
            }
            init(root, ssrContext) {
                if (this.disabled) return;
                if (root.$meta) {
                    this.initVueMeta(root);
                } else if (ssrContext) {
                    this.initSSR(ssrContext);
                }
                this.initTheme(root);
            }
            setTheme(theme, value) {
                this.themes[theme] = Object.assign(this.themes[theme], value);
                this.applyTheme();
            }
            resetThemes() {
                this.themes.light = Object.assign({}, this.defaults.light);
                this.themes.dark = Object.assign({}, this.defaults.dark);
                this.applyTheme();
            }
            checkOrCreateStyleElement() {
                this.styleEl = document.getElementById("vuetify-theme-stylesheet");
                if (this.styleEl) return true;
                this.genStyleElement();
                return Boolean(this.styleEl);
            }
            fillVariant(theme = {}, dark) {
                const defaultTheme = this.themes[dark ? "dark" : "light"];
                return Object.assign({}, defaultTheme, theme);
            }
            genStyleElement() {
                if (typeof document === "undefined") return;
                this.styleEl = document.createElement("style");
                this.styleEl.type = "text/css";
                this.styleEl.id = "vuetify-theme-stylesheet";
                if (this.options.cspNonce) {
                    this.styleEl.setAttribute("nonce", this.options.cspNonce);
                }
                document.head.appendChild(this.styleEl);
            }
            initVueMeta(root) {
                this.vueMeta = root.$meta();
                if (this.isVueMeta23) {
                    root.$nextTick((() => {
                        this.applyVueMeta23();
                    }));
                    return;
                }
                const metaKeyName = typeof this.vueMeta.getOptions === "function" ? this.vueMeta.getOptions().keyName : "metaInfo";
                const metaInfo = root.$options[metaKeyName] || {};
                root.$options[metaKeyName] = () => {
                    metaInfo.style = metaInfo.style || [];
                    const vuetifyStylesheet = metaInfo.style.find((s => s.id === "vuetify-theme-stylesheet"));
                    if (!vuetifyStylesheet) {
                        metaInfo.style.push({
                            cssText: this.generatedStyles,
                            type: "text/css",
                            id: "vuetify-theme-stylesheet",
                            nonce: (this.options || {}).cspNonce
                        });
                    } else {
                        vuetifyStylesheet.cssText = this.generatedStyles;
                    }
                    return metaInfo;
                };
            }
            applyVueMeta23() {
                const {set} = this.vueMeta.addApp("vuetify");
                set({
                    style: [ {
                        cssText: this.generatedStyles,
                        type: "text/css",
                        id: "vuetify-theme-stylesheet",
                        nonce: this.options.cspNonce
                    } ]
                });
            }
            initSSR(ssrContext) {
                const nonce = this.options.cspNonce ? ` nonce="${this.options.cspNonce}"` : "";
                ssrContext.head = ssrContext.head || "";
                ssrContext.head += `<style type="text/css" id="vuetify-theme-stylesheet"${nonce}>${this.generatedStyles}</style>`;
            }
            initTheme(root) {
                if (typeof document === "undefined") return;
                if (this.unwatch) {
                    this.unwatch();
                    this.unwatch = null;
                }
                root.$once("hook:created", (() => {
                    const obs = vue_runtime_esm.observable({
                        themes: this.themes
                    });
                    this.unwatch = root.$watch((() => obs.themes), (() => this.applyTheme()), {
                        deep: true
                    });
                }));
                this.applyTheme();
            }
            get currentTheme() {
                const target = this.dark ? "dark" : "light";
                return this.themes[target];
            }
            get generatedStyles() {
                const theme = this.parsedTheme;
                const options = this.options || {};
                let css;
                if (options.themeCache != null) {
                    css = options.themeCache.get(theme);
                    if (css != null) return css;
                }
                css = genStyles(theme, options.customProperties);
                if (options.minifyTheme != null) {
                    css = options.minifyTheme(css);
                }
                if (options.themeCache != null) {
                    options.themeCache.set(theme, css);
                }
                return css;
            }
            get parsedTheme() {
                return parse(this.currentTheme || {}, undefined, getNestedValue(this.options, [ "variations" ], true));
            }
            get isVueMeta23() {
                return typeof this.vueMeta.addApp === "function";
            }
        }
        Theme.property = "theme";
        class Vuetify {
            constructor(userPreset = {}) {
                this.framework = {
                    isHydrating: false
                };
                this.installed = [];
                this.preset = {};
                this.userPreset = {};
                this.userPreset = userPreset;
                this.use(Presets);
                this.use(Application);
                this.use(Breakpoint);
                this.use(Goto);
                this.use(Icons);
                this.use(Lang);
                this.use(Theme);
            }
            init(root, ssrContext) {
                this.installed.forEach((property => {
                    const service = this.framework[property];
                    service.framework = this.framework;
                    service.init(root, ssrContext);
                }));
                this.framework.rtl = Boolean(this.preset.rtl);
            }
            use(Service) {
                const property = Service.property;
                if (this.installed.includes(property)) return;
                this.framework[property] = new Service(this.preset, this);
                this.installed.push(property);
            }
        }
        Vuetify.install = install;
        Vuetify.installed = false;
        Vuetify.version = "2.5.10";
        Vuetify.config = {
            silent: false
        };
        vue_runtime_esm.use(Vuetify);
        var vuetify_opts = {};
        const vuetify = new Vuetify(vuetify_opts);
        $("body").append('<div id="app"></div>');
        $("body").append('<div id="ee">xxxxxxxxxxxxxxx</div>');
        window.Vue = vue_runtime_esm;
        (function(x) {
            return x;
        });
        new vue_runtime_esm({
            vuetify
        }).$mount("#app");
    })();
})();
//# sourceMappingURL=bestteacher.user.js.map