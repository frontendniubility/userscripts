// ==UserScript==
// @name        Best Teachers(Vuetify)
// @version     2022.10.527175723
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
    "use strict";
    var __webpack_require__ = {};
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
    var __webpack_exports__ = {};
    var emptyObject = Object.freeze({});
    var isArray = Array.isArray;
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
    function isFunction(value) {
        return typeof value === "function";
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
    function remove$2(arr, item) {
        var len = arr.length;
        if (len) {
            if (item === arr[len - 1]) {
                arr.length = len - 1;
                return;
            }
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
        if (a === b) return true;
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
            if (looseEqual(arr[i], val)) return i;
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
    function hasChanged(x, y) {
        if (x === y) {
            return x === 0 && 1 / x !== 1 / y;
        } else {
            return x === x || y === y;
        }
    }
    var SSR_ATTR = "data-server-rendered";
    var ASSET_TYPES = [ "component", "directive", "filter" ];
    var LIFECYCLE_HOOKS = [ "beforeCreate", "created", "beforeMount", "mounted", "beforeUpdate", "updated", "beforeDestroy", "destroyed", "activated", "deactivated", "errorCaptured", "serverPrefetch", "renderTracked", "renderTriggered" ];
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
    var bailRE = new RegExp("[^".concat(unicodeRegExp.source, ".$_\\d]"));
    function parsePath(path) {
        if (bailRE.test(path)) {
            return;
        }
        var segments = path.split(".");
        return function(obj) {
            for (var i = 0; i < segments.length; i++) {
                if (!obj) return;
                obj = obj[segments[i]];
            }
            return obj;
        };
    }
    var hasProto = "__proto__" in {};
    var inBrowser = typeof window !== "undefined";
    var UA = inBrowser && window.navigator.userAgent.toLowerCase();
    var isIE = UA && /msie|trident/.test(UA);
    var isIE9 = UA && UA.indexOf("msie 9.0") > 0;
    var isEdge = UA && UA.indexOf("edge/") > 0;
    UA && UA.indexOf("android") > 0;
    var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
    UA && /chrome\/\d+/.test(UA) && !isEdge;
    UA && /phantomjs/.test(UA);
    var isFF = UA && UA.match(/firefox\/(\d+)/);
    var nativeWatch = {}.watch;
    var supportsPassive = false;
    if (inBrowser) {
        try {
            var opts = {};
            Object.defineProperty(opts, "passive", {
                get: function() {
                    supportsPassive = true;
                }
            });
            window.addEventListener("test-passive", null, opts);
        } catch (e) {}
    }
    var _isServer;
    var isServerRendering = function() {
        if (_isServer === undefined) {
            if (!inBrowser && typeof __webpack_require__.g !== "undefined") {
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
            Set.prototype.has = function(key) {
                return this.set[key] === true;
            };
            Set.prototype.add = function(key) {
                this.set[key] = true;
            };
            Set.prototype.clear = function() {
                this.set = Object.create(null);
            };
            return Set;
        }();
    }
    var currentInstance = null;
    function getCurrentInstance() {
        return currentInstance && {
            proxy: currentInstance
        };
    }
    function setCurrentInstance(vm) {
        if (vm === void 0) {
            vm = null;
        }
        if (!vm) currentInstance && currentInstance._scope.off();
        currentInstance = vm;
        vm && vm._scope.on();
    }
    var VNode = function() {
        function VNode(tag, data, children, text, elm, context, componentOptions, asyncFactory) {
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
        }
        Object.defineProperty(VNode.prototype, "child", {
            get: function() {
                return this.componentInstance;
            },
            enumerable: false,
            configurable: true
        });
        return VNode;
    }();
    var createEmptyVNode = function(text) {
        if (text === void 0) {
            text = "";
        }
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
    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var uid$2 = 0;
    var pendingCleanupDeps = [];
    var cleanupDeps = function() {
        for (var i = 0; i < pendingCleanupDeps.length; i++) {
            var dep = pendingCleanupDeps[i];
            dep.subs = dep.subs.filter((function(s) {
                return s;
            }));
            dep._pending = false;
        }
        pendingCleanupDeps.length = 0;
    };
    var Dep = function() {
        function Dep() {
            this._pending = false;
            this.id = uid$2++;
            this.subs = [];
        }
        Dep.prototype.addSub = function(sub) {
            this.subs.push(sub);
        };
        Dep.prototype.removeSub = function(sub) {
            this.subs[this.subs.indexOf(sub)] = null;
            if (!this._pending) {
                this._pending = true;
                pendingCleanupDeps.push(this);
            }
        };
        Dep.prototype.depend = function(info) {
            if (Dep.target) {
                Dep.target.addDep(this);
                if (false) {}
            }
        };
        Dep.prototype.notify = function(info) {
            var subs = this.subs.filter((function(s) {
                return s;
            }));
            if (false) {}
            for (var i = 0, l = subs.length; i < l; i++) {
                var sub = subs[i];
                if (false) {}
                sub.update();
            }
        };
        return Dep;
    }();
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
    var arrayProto = Array.prototype;
    var arrayMethods = Object.create(arrayProto);
    var methodsToPatch = [ "push", "pop", "shift", "unshift", "splice", "sort", "reverse" ];
    methodsToPatch.forEach((function(method) {
        var original = arrayProto[method];
        def(arrayMethods, method, (function mutator() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
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
            if (inserted) ob.observeArray(inserted);
            if (false) {} else {
                ob.dep.notify();
            }
            return result;
        }));
    }));
    var rawMap = new WeakMap;
    function reactive(target) {
        makeReactive(target, false);
        return target;
    }
    function shallowReactive(target) {
        makeReactive(target, true);
        def(target, "__v_isShallow", true);
        return target;
    }
    function makeReactive(target, shallow) {
        if (!isReadonly(target)) {
            if (false) {
                var existingOb;
            }
            var ob = observe(target, shallow, isServerRendering());
            if (false) {}
        }
    }
    function isReactive(value) {
        if (isReadonly(value)) {
            return isReactive(value["__v_raw"]);
        }
        return !!(value && value.__ob__);
    }
    function isShallow(value) {
        return !!(value && value.__v_isShallow);
    }
    function isReadonly(value) {
        return !!(value && value.__v_isReadonly);
    }
    function isProxy(value) {
        return isReactive(value) || isReadonly(value);
    }
    function toRaw(observed) {
        var raw = observed && observed["__v_raw"];
        return raw ? toRaw(raw) : observed;
    }
    function markRaw(value) {
        if (isObject(value)) {
            rawMap.set(value, true);
        }
        return value;
    }
    function isCollectionType(value) {
        var type = toRawType(value);
        return type === "Map" || type === "WeakMap" || type === "Set" || type === "WeakSet";
    }
    var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
    var NO_INIITIAL_VALUE = {};
    var shouldObserve = true;
    function toggleObserving(value) {
        shouldObserve = value;
    }
    var mockDep = {
        notify: noop,
        depend: noop,
        addSub: noop,
        removeSub: noop
    };
    var Observer = function() {
        function Observer(value, shallow, mock) {
            if (shallow === void 0) {
                shallow = false;
            }
            if (mock === void 0) {
                mock = false;
            }
            this.value = value;
            this.shallow = shallow;
            this.mock = mock;
            this.dep = mock ? mockDep : new Dep;
            this.vmCount = 0;
            def(value, "__ob__", this);
            if (isArray(value)) {
                if (!mock) {
                    if (hasProto) {
                        value.__proto__ = arrayMethods;
                    } else {
                        for (var i = 0, l = arrayKeys.length; i < l; i++) {
                            var key = arrayKeys[i];
                            def(value, key, arrayMethods[key]);
                        }
                    }
                }
                if (!shallow) {
                    this.observeArray(value);
                }
            } else {
                var keys = Object.keys(value);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    defineReactive(value, key, NO_INIITIAL_VALUE, undefined, shallow, mock);
                }
            }
        }
        Observer.prototype.observeArray = function(value) {
            for (var i = 0, l = value.length; i < l; i++) {
                observe(value[i], false, this.mock);
            }
        };
        return Observer;
    }();
    function observe(value, shallow, ssrMockReactivity) {
        if (value && hasOwn(value, "__ob__") && value.__ob__ instanceof Observer) {
            return value.__ob__;
        }
        if (shouldObserve && (ssrMockReactivity || !isServerRendering()) && (isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value.__v_skip && !rawMap.has(value) && !isRef(value) && !(value instanceof VNode)) {
            return new Observer(value, shallow, ssrMockReactivity);
        }
    }
    function defineReactive(obj, key, val, customSetter, shallow, mock) {
        var dep = new Dep;
        var property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
            return;
        }
        var getter = property && property.get;
        var setter = property && property.set;
        if ((!getter || setter) && (val === NO_INIITIAL_VALUE || arguments.length === 2)) {
            val = obj[key];
        }
        var childOb = !shallow && observe(val, false, mock);
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get: function reactiveGetter() {
                var value = getter ? getter.call(obj) : val;
                if (Dep.target) {
                    if (false) {} else {
                        dep.depend();
                    }
                    if (childOb) {
                        childOb.dep.depend();
                        if (isArray(value)) {
                            dependArray(value);
                        }
                    }
                }
                return isRef(value) && !shallow ? value.value : value;
            },
            set: function reactiveSetter(newVal) {
                var value = getter ? getter.call(obj) : val;
                if (!hasChanged(value, newVal)) {
                    return;
                }
                if (false) {}
                if (setter) {
                    setter.call(obj, newVal);
                } else if (getter) {
                    return;
                } else if (!shallow && isRef(value) && !isRef(newVal)) {
                    value.value = newVal;
                    return;
                } else {
                    val = newVal;
                }
                childOb = !shallow && observe(newVal, false, mock);
                if (false) {} else {
                    dep.notify();
                }
            }
        });
        return dep;
    }
    function set(target, key, val) {
        if (false) {}
        if (isReadonly(target)) {
            false && 0;
            return;
        }
        var ob = target.__ob__;
        if (isArray(target) && isValidArrayIndex(key)) {
            target.length = Math.max(target.length, key);
            target.splice(key, 1, val);
            if (ob && !ob.shallow && ob.mock) {
                observe(val, false, true);
            }
            return val;
        }
        if (key in target && !(key in Object.prototype)) {
            target[key] = val;
            return val;
        }
        if (target._isVue || ob && ob.vmCount) {
            false && 0;
            return val;
        }
        if (!ob) {
            target[key] = val;
            return val;
        }
        defineReactive(ob.value, key, val, undefined, ob.shallow, ob.mock);
        if (false) {} else {
            ob.dep.notify();
        }
        return val;
    }
    function del(target, key) {
        if (false) {}
        if (isArray(target) && isValidArrayIndex(key)) {
            target.splice(key, 1);
            return;
        }
        var ob = target.__ob__;
        if (target._isVue || ob && ob.vmCount) {
            false && 0;
            return;
        }
        if (isReadonly(target)) {
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
        if (false) {} else {
            ob.dep.notify();
        }
    }
    function dependArray(value) {
        for (var e = void 0, i = 0, l = value.length; i < l; i++) {
            e = value[i];
            if (e && e.__ob__) {
                e.__ob__.dep.depend();
            }
            if (isArray(e)) {
                dependArray(e);
            }
        }
    }
    var RefFlag = "__v_isRef";
    function isRef(r) {
        return !!(r && r.__v_isRef === true);
    }
    function ref$1(value) {
        return createRef(value, false);
    }
    function shallowRef(value) {
        return createRef(value, true);
    }
    function createRef(rawValue, shallow) {
        if (isRef(rawValue)) {
            return rawValue;
        }
        var ref = {};
        def(ref, RefFlag, true);
        def(ref, "__v_isShallow", shallow);
        def(ref, "dep", defineReactive(ref, "value", rawValue, null, shallow, isServerRendering()));
        return ref;
    }
    function triggerRef(ref) {
        if (false) {}
        if (false) {} else {
            ref.dep && ref.dep.notify();
        }
    }
    function unref(ref) {
        return isRef(ref) ? ref.value : ref;
    }
    function proxyRefs(objectWithRefs) {
        if (isReactive(objectWithRefs)) {
            return objectWithRefs;
        }
        var proxy = {};
        var keys = Object.keys(objectWithRefs);
        for (var i = 0; i < keys.length; i++) {
            proxyWithRefUnwrap(proxy, objectWithRefs, keys[i]);
        }
        return proxy;
    }
    function proxyWithRefUnwrap(target, source, key) {
        Object.defineProperty(target, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                var val = source[key];
                if (isRef(val)) {
                    return val.value;
                } else {
                    var ob = val && val.__ob__;
                    if (ob) ob.dep.depend();
                    return val;
                }
            },
            set: function(value) {
                var oldValue = source[key];
                if (isRef(oldValue) && !isRef(value)) {
                    oldValue.value = value;
                } else {
                    source[key] = value;
                }
            }
        });
    }
    function customRef(factory) {
        var dep = new Dep;
        var _a = factory((function() {
            if (false) {} else {
                dep.depend();
            }
        }), (function() {
            if (false) {} else {
                dep.notify();
            }
        })), get = _a.get, set = _a.set;
        var ref = {
            get value() {
                return get();
            },
            set value(newVal) {
                set(newVal);
            }
        };
        def(ref, RefFlag, true);
        return ref;
    }
    function toRefs(object) {
        if (false) {}
        var ret = isArray(object) ? new Array(object.length) : {};
        for (var key in object) {
            ret[key] = toRef(object, key);
        }
        return ret;
    }
    function toRef(object, key, defaultValue) {
        var val = object[key];
        if (isRef(val)) {
            return val;
        }
        var ref = {
            get value() {
                var val = object[key];
                return val === undefined ? defaultValue : val;
            },
            set value(newVal) {
                object[key] = newVal;
            }
        };
        def(ref, RefFlag, true);
        return ref;
    }
    var rawToReadonlyMap = new WeakMap;
    var rawToShallowReadonlyMap = new WeakMap;
    function readonly(target) {
        return createReadonly(target, false);
    }
    function createReadonly(target, shallow) {
        if (!isPlainObject(target)) {
            if (false) {}
            return target;
        }
        if (isReadonly(target)) {
            return target;
        }
        var map = shallow ? rawToShallowReadonlyMap : rawToReadonlyMap;
        var existingProxy = map.get(target);
        if (existingProxy) {
            return existingProxy;
        }
        var proxy = Object.create(Object.getPrototypeOf(target));
        map.set(target, proxy);
        def(proxy, "__v_isReadonly", true);
        def(proxy, "__v_raw", target);
        if (isRef(target)) {
            def(proxy, RefFlag, true);
        }
        if (shallow || isShallow(target)) {
            def(proxy, "__v_isShallow", true);
        }
        var keys = Object.keys(target);
        for (var i = 0; i < keys.length; i++) {
            defineReadonlyProperty(proxy, target, keys[i], shallow);
        }
        return proxy;
    }
    function defineReadonlyProperty(proxy, target, key, shallow) {
        Object.defineProperty(proxy, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                var val = target[key];
                return shallow || !isPlainObject(val) ? val : readonly(val);
            },
            set: function() {
                false && 0;
            }
        });
    }
    function shallowReadonly(target) {
        return createReadonly(target, true);
    }
    function computed(getterOrOptions, debugOptions) {
        var getter;
        var setter;
        var onlyGetter = isFunction(getterOrOptions);
        if (onlyGetter) {
            getter = getterOrOptions;
            setter = false ? 0 : noop;
        } else {
            getter = getterOrOptions.get;
            setter = getterOrOptions.set;
        }
        var watcher = isServerRendering() ? null : new Watcher(currentInstance, getter, noop, {
            lazy: true
        });
        if (false) {}
        var ref = {
            effect: watcher,
            get value() {
                if (watcher) {
                    if (watcher.dirty) {
                        watcher.evaluate();
                    }
                    if (Dep.target) {
                        if (false) {}
                        watcher.depend();
                    }
                    return watcher.value;
                } else {
                    return getter();
                }
            },
            set value(newVal) {
                setter(newVal);
            }
        };
        def(ref, RefFlag, true);
        def(ref, "__v_isReadonly", onlyGetter);
        return ref;
    }
    var WATCHER = "watcher";
    var WATCHER_CB = "".concat(WATCHER, " callback");
    var WATCHER_GETTER = "".concat(WATCHER, " getter");
    var WATCHER_CLEANUP = "".concat(WATCHER, " cleanup");
    function watchEffect(effect, options) {
        return doWatch(effect, null, options);
    }
    function watchPostEffect(effect, options) {
        return doWatch(effect, null, false ? 0 : {
            flush: "post"
        });
    }
    function watchSyncEffect(effect, options) {
        return doWatch(effect, null, false ? 0 : {
            flush: "sync"
        });
    }
    var INITIAL_WATCHER_VALUE = {};
    function watch(source, cb, options) {
        if (false) {}
        return doWatch(source, cb, options);
    }
    function doWatch(source, cb, _a) {
        var _b = _a === void 0 ? emptyObject : _a, immediate = _b.immediate, deep = _b.deep, _c = _b.flush, flush = _c === void 0 ? "pre" : _c, onTrack = _b.onTrack, onTrigger = _b.onTrigger;
        if (false) {}
        var warnInvalidSource = function(s) {
            warn("Invalid watch source: ".concat(s, ". A watch source can only be a getter/effect ") + "function, a ref, a reactive object, or an array of these types.");
        };
        var instance = currentInstance;
        var call = function(fn, type, args) {
            if (args === void 0) {
                args = null;
            }
            return invokeWithErrorHandling(fn, null, args, instance, type);
        };
        var getter;
        var forceTrigger = false;
        var isMultiSource = false;
        if (isRef(source)) {
            getter = function() {
                return source.value;
            };
            forceTrigger = isShallow(source);
        } else if (isReactive(source)) {
            getter = function() {
                source.__ob__.dep.depend();
                return source;
            };
            deep = true;
        } else if (isArray(source)) {
            isMultiSource = true;
            forceTrigger = source.some((function(s) {
                return isReactive(s) || isShallow(s);
            }));
            getter = function() {
                return source.map((function(s) {
                    if (isRef(s)) {
                        return s.value;
                    } else if (isReactive(s)) {
                        return traverse(s);
                    } else if (isFunction(s)) {
                        return call(s, WATCHER_GETTER);
                    } else {
                        false && 0;
                    }
                }));
            };
        } else if (isFunction(source)) {
            if (cb) {
                getter = function() {
                    return call(source, WATCHER_GETTER);
                };
            } else {
                getter = function() {
                    if (instance && instance._isDestroyed) {
                        return;
                    }
                    if (cleanup) {
                        cleanup();
                    }
                    return call(source, WATCHER, [ onCleanup ]);
                };
            }
        } else {
            getter = noop;
            false && 0;
        }
        if (cb && deep) {
            var baseGetter_1 = getter;
            getter = function() {
                return traverse(baseGetter_1());
            };
        }
        var cleanup;
        var onCleanup = function(fn) {
            cleanup = watcher.onStop = function() {
                call(fn, WATCHER_CLEANUP);
            };
        };
        if (isServerRendering()) {
            onCleanup = noop;
            if (!cb) {
                getter();
            } else if (immediate) {
                call(cb, WATCHER_CB, [ getter(), isMultiSource ? [] : undefined, onCleanup ]);
            }
            return noop;
        }
        var watcher = new Watcher(currentInstance, getter, noop, {
            lazy: true
        });
        watcher.noRecurse = !cb;
        var oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
        watcher.run = function() {
            if (!watcher.active) {
                return;
            }
            if (cb) {
                var newValue = watcher.get();
                if (deep || forceTrigger || (isMultiSource ? newValue.some((function(v, i) {
                    return hasChanged(v, oldValue[i]);
                })) : hasChanged(newValue, oldValue))) {
                    if (cleanup) {
                        cleanup();
                    }
                    call(cb, WATCHER_CB, [ newValue, oldValue === INITIAL_WATCHER_VALUE ? undefined : oldValue, onCleanup ]);
                    oldValue = newValue;
                }
            } else {
                watcher.get();
            }
        };
        if (flush === "sync") {
            watcher.update = watcher.run;
        } else if (flush === "post") {
            watcher.post = true;
            watcher.update = function() {
                return queueWatcher(watcher);
            };
        } else {
            watcher.update = function() {
                if (instance && instance === currentInstance && !instance._isMounted) {
                    var buffer = instance._preWatchers || (instance._preWatchers = []);
                    if (buffer.indexOf(watcher) < 0) buffer.push(watcher);
                } else {
                    queueWatcher(watcher);
                }
            };
        }
        if (false) {}
        if (cb) {
            if (immediate) {
                watcher.run();
            } else {
                oldValue = watcher.get();
            }
        } else if (flush === "post" && instance) {
            instance.$once("hook:mounted", (function() {
                return watcher.get();
            }));
        } else {
            watcher.get();
        }
        return function() {
            watcher.teardown();
        };
    }
    var activeEffectScope;
    var EffectScope = function() {
        function EffectScope(detached) {
            if (detached === void 0) {
                detached = false;
            }
            this.detached = detached;
            this.active = true;
            this.effects = [];
            this.cleanups = [];
            this.parent = activeEffectScope;
            if (!detached && activeEffectScope) {
                this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
            }
        }
        EffectScope.prototype.run = function(fn) {
            if (this.active) {
                var currentEffectScope = activeEffectScope;
                try {
                    activeEffectScope = this;
                    return fn();
                } finally {
                    activeEffectScope = currentEffectScope;
                }
            } else if (false) {}
        };
        EffectScope.prototype.on = function() {
            activeEffectScope = this;
        };
        EffectScope.prototype.off = function() {
            activeEffectScope = this.parent;
        };
        EffectScope.prototype.stop = function(fromParent) {
            if (this.active) {
                var i = void 0, l = void 0;
                for (i = 0, l = this.effects.length; i < l; i++) {
                    this.effects[i].teardown();
                }
                for (i = 0, l = this.cleanups.length; i < l; i++) {
                    this.cleanups[i]();
                }
                if (this.scopes) {
                    for (i = 0, l = this.scopes.length; i < l; i++) {
                        this.scopes[i].stop(true);
                    }
                }
                if (!this.detached && this.parent && !fromParent) {
                    var last = this.parent.scopes.pop();
                    if (last && last !== this) {
                        this.parent.scopes[this.index] = last;
                        last.index = this.index;
                    }
                }
                this.parent = undefined;
                this.active = false;
            }
        };
        return EffectScope;
    }();
    function effectScope(detached) {
        return new EffectScope(detached);
    }
    function recordEffectScope(effect, scope) {
        if (scope === void 0) {
            scope = activeEffectScope;
        }
        if (scope && scope.active) {
            scope.effects.push(effect);
        }
    }
    function getCurrentScope() {
        return activeEffectScope;
    }
    function onScopeDispose(fn) {
        if (activeEffectScope) {
            activeEffectScope.cleanups.push(fn);
        } else if (false) {}
    }
    function provide(key, value) {
        if (!currentInstance) {
            if (false) {}
        } else {
            resolveProvided(currentInstance)[key] = value;
        }
    }
    function resolveProvided(vm) {
        var existing = vm._provided;
        var parentProvides = vm.$parent && vm.$parent._provided;
        if (parentProvides === existing) {
            return vm._provided = Object.create(parentProvides);
        } else {
            return existing;
        }
    }
    function inject(key, defaultValue, treatDefaultAsFactory) {
        if (treatDefaultAsFactory === void 0) {
            treatDefaultAsFactory = false;
        }
        var instance = currentInstance;
        if (instance) {
            var provides = instance.$parent && instance.$parent._provided;
            if (provides && key in provides) {
                return provides[key];
            } else if (arguments.length > 1) {
                return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance) : defaultValue;
            } else if (false) {}
        } else if (false) {}
    }
    var normalizeEvent = cached((function(name) {
        var passive = name.charAt(0) === "&";
        name = passive ? name.slice(1) : name;
        var once = name.charAt(0) === "~";
        name = once ? name.slice(1) : name;
        var capture = name.charAt(0) === "!";
        name = capture ? name.slice(1) : name;
        return {
            name,
            once,
            capture,
            passive
        };
    }));
    function createFnInvoker(fns, vm) {
        function invoker() {
            var fns = invoker.fns;
            if (isArray(fns)) {
                var cloned = fns.slice();
                for (var i = 0; i < cloned.length; i++) {
                    invokeWithErrorHandling(cloned[i], null, arguments, vm, "v-on handler");
                }
            } else {
                return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler");
            }
        }
        invoker.fns = fns;
        return invoker;
    }
    function updateListeners(on, oldOn, add, remove, createOnceHandler, vm) {
        var name, cur, old, event;
        for (name in on) {
            cur = on[name];
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
                remove(event.name, oldOn[name], event.capture);
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
            remove$2(invoker.fns, wrappedHook);
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
        var attrs = data.attrs, props = data.props;
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
            if (isArray(children[i])) {
                return Array.prototype.concat.apply([], children);
            }
        }
        return children;
    }
    function normalizeChildren(children) {
        return isPrimitive(children) ? [ createTextVNode(children) ] : isArray(children) ? normalizeArrayChildren(children) : undefined;
    }
    function isTextNode(node) {
        return isDef(node) && isDef(node.text) && isFalse(node.isComment);
    }
    function normalizeArrayChildren(children, nestedIndex) {
        var res = [];
        var i, c, lastIndex, last;
        for (i = 0; i < children.length; i++) {
            c = children[i];
            if (isUndef(c) || typeof c === "boolean") continue;
            lastIndex = res.length - 1;
            last = res[lastIndex];
            if (isArray(c)) {
                if (c.length > 0) {
                    c = normalizeArrayChildren(c, "".concat(nestedIndex || "", "_").concat(i));
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
                        c.key = "__vlist".concat(nestedIndex, "_").concat(i, "__");
                    }
                    res.push(c);
                }
            }
        }
        return res;
    }
    function renderList(val, render) {
        var ret = null, i, l, keys, key;
        if (isArray(val) || typeof val === "string") {
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
            nodes = scopedSlotFn(props) || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
        } else {
            nodes = this.$slots[name] || (isFunction(fallbackRender) ? fallbackRender() : fallbackRender);
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
        if (isArray(expect)) {
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
                if (isArray(value)) {
                    value = toObject(value);
                }
                var hash = void 0;
                var _loop_1 = function(key) {
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
                            on["update:".concat(key)] = function($event) {
                                value[key] = $event;
                            };
                        }
                    }
                };
                for (var key in value) {
                    _loop_1(key);
                }
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
        tree = cached[index] = this.$options.staticRenderFns[index].call(this._renderProxy, this._c, this);
        markStatic(tree, "__static__".concat(index), false);
        return tree;
    }
    function markOnce(tree, index, key) {
        markStatic(tree, "__once__".concat(index).concat(key ? "_".concat(key) : ""), true);
        return tree;
    }
    function markStatic(tree, key, isOnce) {
        if (isArray(tree)) {
            for (var i = 0; i < tree.length; i++) {
                if (tree[i] && typeof tree[i] !== "string") {
                    markStaticNode(tree[i], "".concat(key, "_").concat(i), isOnce);
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
            if (isArray(slot)) {
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
                var name_1 = data.slot;
                var slot = slots[name_1] || (slots[name_1] = []);
                if (child.tag === "template") {
                    slot.push.apply(slot, child.children || []);
                } else {
                    slot.push(child);
                }
            } else {
                (slots.default || (slots.default = [])).push(child);
            }
        }
        for (var name_2 in slots) {
            if (slots[name_2].every(isWhitespace)) {
                delete slots[name_2];
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
    function normalizeScopedSlots(ownerVm, scopedSlots, normalSlots, prevScopedSlots) {
        var res;
        var hasNormalSlots = Object.keys(normalSlots).length > 0;
        var isStable = scopedSlots ? !!scopedSlots.$stable : !hasNormalSlots;
        var key = scopedSlots && scopedSlots.$key;
        if (!scopedSlots) {
            res = {};
        } else if (scopedSlots._normalized) {
            return scopedSlots._normalized;
        } else if (isStable && prevScopedSlots && prevScopedSlots !== emptyObject && key === prevScopedSlots.$key && !hasNormalSlots && !prevScopedSlots.$hasNormal) {
            return prevScopedSlots;
        } else {
            res = {};
            for (var key_1 in scopedSlots) {
                if (scopedSlots[key_1] && key_1[0] !== "$") {
                    res[key_1] = normalizeScopedSlot(ownerVm, normalSlots, key_1, scopedSlots[key_1]);
                }
            }
        }
        for (var key_2 in normalSlots) {
            if (!(key_2 in res)) {
                res[key_2] = proxyNormalSlot(normalSlots, key_2);
            }
        }
        if (scopedSlots && Object.isExtensible(scopedSlots)) {
            scopedSlots._normalized = res;
        }
        def(res, "$stable", isStable);
        def(res, "$key", key);
        def(res, "$hasNormal", hasNormalSlots);
        return res;
    }
    function normalizeScopedSlot(vm, normalSlots, key, fn) {
        var normalized = function() {
            var cur = currentInstance;
            setCurrentInstance(vm);
            var res = arguments.length ? fn.apply(null, arguments) : fn({});
            res = res && typeof res === "object" && !isArray(res) ? [ res ] : normalizeChildren(res);
            var vnode = res && res[0];
            setCurrentInstance(cur);
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
    function initSetup(vm) {
        var options = vm.$options;
        var setup = options.setup;
        if (setup) {
            var ctx = vm._setupContext = createSetupContext(vm);
            setCurrentInstance(vm);
            pushTarget();
            var setupResult = invokeWithErrorHandling(setup, null, [ vm._props || shallowReactive({}), ctx ], vm, "setup");
            popTarget();
            setCurrentInstance();
            if (isFunction(setupResult)) {
                options.render = setupResult;
            } else if (isObject(setupResult)) {
                if (false) {}
                vm._setupState = setupResult;
                if (!setupResult.__sfc) {
                    for (var key in setupResult) {
                        if (!isReserved(key)) {
                            proxyWithRefUnwrap(vm, setupResult, key);
                        } else if (false) {}
                    }
                } else {
                    var proxy = vm._setupProxy = {};
                    for (var key in setupResult) {
                        if (key !== "__sfc") {
                            proxyWithRefUnwrap(proxy, setupResult, key);
                        }
                    }
                }
            } else if (false) {}
        }
    }
    function createSetupContext(vm) {
        var exposeCalled = false;
        return {
            get attrs() {
                if (!vm._attrsProxy) {
                    var proxy = vm._attrsProxy = {};
                    def(proxy, "_v_attr_proxy", true);
                    syncSetupProxy(proxy, vm.$attrs, emptyObject, vm, "$attrs");
                }
                return vm._attrsProxy;
            },
            get listeners() {
                if (!vm._listenersProxy) {
                    var proxy = vm._listenersProxy = {};
                    syncSetupProxy(proxy, vm.$listeners, emptyObject, vm, "$listeners");
                }
                return vm._listenersProxy;
            },
            get slots() {
                return initSlotsProxy(vm);
            },
            emit: bind(vm.$emit, vm),
            expose: function(exposed) {
                if (false) {}
                if (exposed) {
                    Object.keys(exposed).forEach((function(key) {
                        return proxyWithRefUnwrap(vm, exposed, key);
                    }));
                }
            }
        };
    }
    function syncSetupProxy(to, from, prev, instance, type) {
        var changed = false;
        for (var key in from) {
            if (!(key in to)) {
                changed = true;
                defineProxyAttr(to, key, instance, type);
            } else if (from[key] !== prev[key]) {
                changed = true;
            }
        }
        for (var key in to) {
            if (!(key in from)) {
                changed = true;
                delete to[key];
            }
        }
        return changed;
    }
    function defineProxyAttr(proxy, key, instance, type) {
        Object.defineProperty(proxy, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                return instance[type][key];
            }
        });
    }
    function initSlotsProxy(vm) {
        if (!vm._slotsProxy) {
            syncSetupSlots(vm._slotsProxy = {}, vm.$scopedSlots);
        }
        return vm._slotsProxy;
    }
    function syncSetupSlots(to, from) {
        for (var key in from) {
            to[key] = from[key];
        }
        for (var key in to) {
            if (!(key in from)) {
                delete to[key];
            }
        }
    }
    function useSlots() {
        return getContext().slots;
    }
    function useAttrs() {
        return getContext().attrs;
    }
    function useListeners() {
        return getContext().listeners;
    }
    function getContext() {
        if (false) {}
        var vm = currentInstance;
        return vm._setupContext || (vm._setupContext = createSetupContext(vm));
    }
    function mergeDefaults(raw, defaults) {
        var props = isArray(raw) ? raw.reduce((function(normalized, p) {
            return normalized[p] = {}, normalized;
        }), {}) : raw;
        for (var key in defaults) {
            var opt = props[key];
            if (opt) {
                if (isArray(opt) || isFunction(opt)) {
                    props[key] = {
                        type: opt,
                        default: defaults[key]
                    };
                } else {
                    opt.default = defaults[key];
                }
            } else if (opt === null) {
                props[key] = {
                    default: defaults[key]
                };
            } else if (false) {}
        }
        return props;
    }
    function initRender(vm) {
        vm._vnode = null;
        vm._staticTrees = null;
        var options = vm.$options;
        var parentVnode = vm.$vnode = options._parentVnode;
        var renderContext = parentVnode && parentVnode.context;
        vm.$slots = resolveSlots(options._renderChildren, renderContext);
        vm.$scopedSlots = parentVnode ? normalizeScopedSlots(vm.$parent, parentVnode.data.scopedSlots, vm.$slots) : emptyObject;
        vm._c = function(a, b, c, d) {
            return createElement$1(vm, a, b, c, d, false);
        };
        vm.$createElement = function(a, b, c, d) {
            return createElement$1(vm, a, b, c, d, true);
        };
        var parentData = parentVnode && parentVnode.data;
        if (false) {} else {
            defineReactive(vm, "$attrs", parentData && parentData.attrs || emptyObject, null, true);
            defineReactive(vm, "$listeners", options._parentListeners || emptyObject, null, true);
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
            var _a = vm.$options, render = _a.render, _parentVnode = _a._parentVnode;
            if (_parentVnode && vm._isMounted) {
                vm.$scopedSlots = normalizeScopedSlots(vm.$parent, _parentVnode.data.scopedSlots, vm.$slots, vm.$scopedSlots);
                if (vm._slotsProxy) {
                    syncSetupSlots(vm._slotsProxy, vm.$scopedSlots);
                }
            }
            vm.$vnode = _parentVnode;
            var vnode;
            try {
                setCurrentInstance(vm);
                currentRenderingInstance = vm;
                vnode = render.call(vm._renderProxy, vm.$createElement);
            } catch (e) {
                handleError(e, vm, "render");
                if (false) {} else {
                    vnode = vm._vnode;
                }
            } finally {
                currentRenderingInstance = null;
                setCurrentInstance();
            }
            if (isArray(vnode) && vnode.length === 1) {
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
            var owners_1 = factory.owners = [ owner ];
            var sync_1 = true;
            var timerLoading_1 = null;
            var timerTimeout_1 = null;
            owner.$on("hook:destroyed", (function() {
                return remove$2(owners_1, owner);
            }));
            var forceRender_1 = function(renderCompleted) {
                for (var i = 0, l = owners_1.length; i < l; i++) {
                    owners_1[i].$forceUpdate();
                }
                if (renderCompleted) {
                    owners_1.length = 0;
                    if (timerLoading_1 !== null) {
                        clearTimeout(timerLoading_1);
                        timerLoading_1 = null;
                    }
                    if (timerTimeout_1 !== null) {
                        clearTimeout(timerTimeout_1);
                        timerTimeout_1 = null;
                    }
                }
            };
            var resolve = once((function(res) {
                factory.resolved = ensureCtor(res, baseCtor);
                if (!sync_1) {
                    forceRender_1(true);
                } else {
                    owners_1.length = 0;
                }
            }));
            var reject_1 = once((function(reason) {
                false && 0;
                if (isDef(factory.errorComp)) {
                    factory.error = true;
                    forceRender_1(true);
                }
            }));
            var res_1 = factory(resolve, reject_1);
            if (isObject(res_1)) {
                if (isPromise(res_1)) {
                    if (isUndef(factory.resolved)) {
                        res_1.then(resolve, reject_1);
                    }
                } else if (isPromise(res_1.component)) {
                    res_1.component.then(resolve, reject_1);
                    if (isDef(res_1.error)) {
                        factory.errorComp = ensureCtor(res_1.error, baseCtor);
                    }
                    if (isDef(res_1.loading)) {
                        factory.loadingComp = ensureCtor(res_1.loading, baseCtor);
                        if (res_1.delay === 0) {
                            factory.loading = true;
                        } else {
                            timerLoading_1 = setTimeout((function() {
                                timerLoading_1 = null;
                                if (isUndef(factory.resolved) && isUndef(factory.error)) {
                                    factory.loading = true;
                                    forceRender_1(false);
                                }
                            }), res_1.delay || 200);
                        }
                    }
                    if (isDef(res_1.timeout)) {
                        timerTimeout_1 = setTimeout((function() {
                            timerTimeout_1 = null;
                            if (isUndef(factory.resolved)) {
                                reject_1(false ? 0 : null);
                            }
                        }), res_1.timeout);
                    }
                }
            }
            sync_1 = false;
            return factory.loading ? factory.loadingComp : factory.resolved;
        }
    }
    function getFirstComponentChild(children) {
        if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                var c = children[i];
                if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
                    return c;
                }
            }
        }
    }
    var SIMPLE_NORMALIZE = 1;
    var ALWAYS_NORMALIZE = 2;
    function createElement$1(context, tag, data, children, normalizationType, alwaysNormalize) {
        if (isArray(data) || isPrimitive(data)) {
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
        if (isArray(children) && isFunction(children[0])) {
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
            var Ctor = void 0;
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
        if (isArray(vnode)) {
            return vnode;
        } else if (isDef(vnode)) {
            if (isDef(ns)) applyNS(vnode, ns);
            if (isDef(data)) registerDeepBindings(data);
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
    function h(type, props, children) {
        if (!currentInstance) {
            false && 0;
        }
        return createElement$1(currentInstance, type, props, children, 2, true);
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
                                if (capture) return;
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
        if (inBrowser && typeof console !== "undefined") {
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
        var p_1 = Promise.resolve();
        timerFunc = function() {
            p_1.then(flushCallbacks);
            if (isIOS) setTimeout(noop);
        };
        isUsingMicroTask = true;
    } else if (!isIE && typeof MutationObserver !== "undefined" && (isNative(MutationObserver) || MutationObserver.toString() === "[object MutationObserverConstructor]")) {
        var counter_1 = 1;
        var observer = new MutationObserver(flushCallbacks);
        var textNode_1 = document.createTextNode(String(counter_1));
        observer.observe(textNode_1, {
            characterData: true
        });
        timerFunc = function() {
            counter_1 = (counter_1 + 1) % 2;
            textNode_1.data = String(counter_1);
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
    function useCssModule(name) {
        if (name === void 0) {
            name = "$style";
        }
        {
            if (!currentInstance) {
                false && 0;
                return emptyObject;
            }
            var mod = currentInstance[name];
            if (!mod) {
                false && 0;
                return emptyObject;
            }
            return mod;
        }
    }
    function useCssVars(getter) {
        if (!inBrowser && !false) return;
        var instance = currentInstance;
        if (!instance) {
            false && 0;
            return;
        }
        watchPostEffect((function() {
            var el = instance.$el;
            var vars = getter(instance, instance._setupProxy);
            if (el && el.nodeType === 1) {
                var style = el.style;
                for (var key in vars) {
                    style.setProperty("--".concat(key), vars[key]);
                }
            }
        }));
    }
    function defineAsyncComponent(source) {
        if (isFunction(source)) {
            source = {
                loader: source
            };
        }
        var loader = source.loader, loadingComponent = source.loadingComponent, errorComponent = source.errorComponent, _a = source.delay, delay = _a === void 0 ? 200 : _a, timeout = source.timeout, _b = source.suspensible, suspensible = _b === void 0 ? false : _b, userOnError = source.onError;
        if (false) {}
        var pendingRequest = null;
        var retries = 0;
        var retry = function() {
            retries++;
            pendingRequest = null;
            return load();
        };
        var load = function() {
            var thisRequest;
            return pendingRequest || (thisRequest = pendingRequest = loader().catch((function(err) {
                err = err instanceof Error ? err : new Error(String(err));
                if (userOnError) {
                    return new Promise((function(resolve, reject) {
                        var userRetry = function() {
                            return resolve(retry());
                        };
                        var userFail = function() {
                            return reject(err);
                        };
                        userOnError(err, userRetry, userFail, retries + 1);
                    }));
                } else {
                    throw err;
                }
            })).then((function(comp) {
                if (thisRequest !== pendingRequest && pendingRequest) {
                    return pendingRequest;
                }
                if (false) {}
                if (comp && (comp.__esModule || comp[Symbol.toStringTag] === "Module")) {
                    comp = comp.default;
                }
                if (false) {}
                return comp;
            })));
        };
        return function() {
            var component = load();
            return {
                component,
                delay,
                timeout,
                error: errorComponent,
                loading: loadingComponent
            };
        };
    }
    function createLifeCycle(hookName) {
        return function(fn, target) {
            if (target === void 0) {
                target = currentInstance;
            }
            if (!target) {
                false && 0;
                return;
            }
            return injectHook(target, hookName, fn);
        };
    }
    function formatName(name) {
        if (name === "beforeDestroy") {
            name = "beforeUnmount";
        } else if (name === "destroyed") {
            name = "unmounted";
        }
        return "on".concat(name[0].toUpperCase() + name.slice(1));
    }
    function injectHook(instance, hookName, fn) {
        var options = instance.$options;
        options[hookName] = mergeLifecycleHook(options[hookName], fn);
    }
    var onBeforeMount = createLifeCycle("beforeMount");
    var onMounted = createLifeCycle("mounted");
    var onBeforeUpdate = createLifeCycle("beforeUpdate");
    var onUpdated = createLifeCycle("updated");
    var onBeforeUnmount = createLifeCycle("beforeDestroy");
    var onUnmounted = createLifeCycle("destroyed");
    var onActivated = createLifeCycle("activated");
    var onDeactivated = createLifeCycle("deactivated");
    var onServerPrefetch = createLifeCycle("serverPrefetch");
    var onRenderTracked = createLifeCycle("renderTracked");
    var onRenderTriggered = createLifeCycle("renderTriggered");
    var injectErrorCapturedHook = createLifeCycle("errorCaptured");
    function onErrorCaptured(hook, target) {
        if (target === void 0) {
            target = currentInstance;
        }
        injectErrorCapturedHook(hook, target);
    }
    var version = "2.7.13";
    function defineComponent(options) {
        return options;
    }
    var seenObjects = new _Set;
    function traverse(val) {
        _traverse(val, seenObjects);
        seenObjects.clear();
        return val;
    }
    function _traverse(val, seen) {
        var i, keys;
        var isA = isArray(val);
        if (!isA && !isObject(val) || val.__v_skip || Object.isFrozen(val) || val instanceof VNode) {
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
            while (i--) _traverse(val[i], seen);
        } else if (isRef(val)) {
            _traverse(val.value, seen);
        } else {
            keys = Object.keys(val);
            i = keys.length;
            while (i--) _traverse(val[keys[i]], seen);
        }
    }
    var uid$1 = 0;
    var Watcher = function() {
        function Watcher(vm, expOrFn, cb, options, isRenderWatcher) {
            recordEffectScope(this, activeEffectScope && !activeEffectScope._vm ? activeEffectScope : vm ? vm._scope : undefined);
            if ((this.vm = vm) && isRenderWatcher) {
                vm._watcher = this;
            }
            if (options) {
                this.deep = !!options.deep;
                this.user = !!options.user;
                this.lazy = !!options.lazy;
                this.sync = !!options.sync;
                this.before = options.before;
                if (false) {}
            } else {
                this.deep = this.user = this.lazy = this.sync = false;
            }
            this.cb = cb;
            this.id = ++uid$1;
            this.active = true;
            this.post = false;
            this.dirty = this.lazy;
            this.deps = [];
            this.newDeps = [];
            this.depIds = new _Set;
            this.newDepIds = new _Set;
            this.expression = false ? 0 : "";
            if (isFunction(expOrFn)) {
                this.getter = expOrFn;
            } else {
                this.getter = parsePath(expOrFn);
                if (!this.getter) {
                    this.getter = noop;
                    false && 0;
                }
            }
            this.value = this.lazy ? undefined : this.get();
        }
        Watcher.prototype.get = function() {
            pushTarget(this);
            var value;
            var vm = this.vm;
            try {
                value = this.getter.call(vm, vm);
            } catch (e) {
                if (this.user) {
                    handleError(e, vm, 'getter for watcher "'.concat(this.expression, '"'));
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
        Watcher.prototype.addDep = function(dep) {
            var id = dep.id;
            if (!this.newDepIds.has(id)) {
                this.newDepIds.add(id);
                this.newDeps.push(dep);
                if (!this.depIds.has(id)) {
                    dep.addSub(this);
                }
            }
        };
        Watcher.prototype.cleanupDeps = function() {
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
        Watcher.prototype.update = function() {
            if (this.lazy) {
                this.dirty = true;
            } else if (this.sync) {
                this.run();
            } else {
                queueWatcher(this);
            }
        };
        Watcher.prototype.run = function() {
            if (this.active) {
                var value = this.get();
                if (value !== this.value || isObject(value) || this.deep) {
                    var oldValue = this.value;
                    this.value = value;
                    if (this.user) {
                        var info = 'callback for watcher "'.concat(this.expression, '"');
                        invokeWithErrorHandling(this.cb, this.vm, [ value, oldValue ], this.vm, info);
                    } else {
                        this.cb.call(this.vm, value, oldValue);
                    }
                }
            }
        };
        Watcher.prototype.evaluate = function() {
            this.value = this.get();
            this.dirty = false;
        };
        Watcher.prototype.depend = function() {
            var i = this.deps.length;
            while (i--) {
                this.deps[i].depend();
            }
        };
        Watcher.prototype.teardown = function() {
            if (this.vm && !this.vm._isBeingDestroyed) {
                remove$2(this.vm._scope.effects, this);
            }
            if (this.active) {
                var i = this.deps.length;
                while (i--) {
                    this.deps[i].removeSub(this);
                }
                this.active = false;
                if (this.onStop) {
                    this.onStop();
                }
            }
        };
        return Watcher;
    }();
    var mark;
    var measure;
    if (false) {
        var perf_1;
    }
    function initEvents(vm) {
        vm._events = Object.create(null);
        vm._hasHookEvent = false;
        var listeners = vm.$options._parentListeners;
        if (listeners) {
            updateComponentListeners(vm, listeners);
        }
    }
    var target$1;
    function add$1(event, fn) {
        target$1.$on(event, fn);
    }
    function remove$1(event, fn) {
        target$1.$off(event, fn);
    }
    function createOnceHandler$1(event, fn) {
        var _target = target$1;
        return function onceHandler() {
            var res = fn.apply(null, arguments);
            if (res !== null) {
                _target.$off(event, onceHandler);
            }
        };
    }
    function updateComponentListeners(vm, listeners, oldListeners) {
        target$1 = vm;
        updateListeners(listeners, oldListeners || {}, add$1, remove$1, createOnceHandler$1, vm);
        target$1 = undefined;
    }
    function eventsMixin(Vue) {
        var hookRE = /^hook:/;
        Vue.prototype.$on = function(event, fn) {
            var vm = this;
            if (isArray(event)) {
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
            if (isArray(event)) {
                for (var i_1 = 0, l = event.length; i_1 < l; i_1++) {
                    vm.$off(event[i_1], fn);
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
                var info = 'event handler for "'.concat(event, '"');
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
        vm._provided = parent ? parent._provided : Object.create(null);
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
            var wrapper = vm;
            while (wrapper && wrapper.$vnode && wrapper.$parent && wrapper.$vnode === wrapper.$parent._vnode) {
                wrapper.$parent.$el = wrapper.$el;
                wrapper = wrapper.$parent;
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
            callHook$1(vm, "beforeDestroy");
            vm._isBeingDestroyed = true;
            var parent = vm.$parent;
            if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
                remove$2(parent.$children, vm);
            }
            vm._scope.stop();
            if (vm._data.__ob__) {
                vm._data.__ob__.vmCount--;
            }
            vm._isDestroyed = true;
            vm.__patch__(vm._vnode, null);
            callHook$1(vm, "destroyed");
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
        callHook$1(vm, "beforeMount");
        var updateComponent;
        if (false) {} else {
            updateComponent = function() {
                vm._update(vm._render(), hydrating);
            };
        }
        var watcherOptions = {
            before: function() {
                if (vm._isMounted && !vm._isDestroyed) {
                    callHook$1(vm, "beforeUpdate");
                }
            }
        };
        if (false) {}
        new Watcher(vm, updateComponent, noop, watcherOptions, true);
        hydrating = false;
        var preWatchers = vm._preWatchers;
        if (preWatchers) {
            for (var i = 0; i < preWatchers.length; i++) {
                preWatchers[i].run();
            }
        }
        if (vm.$vnode == null) {
            vm._isMounted = true;
            callHook$1(vm, "mounted");
        }
        return vm;
    }
    function updateChildComponent(vm, propsData, listeners, parentVnode, renderChildren) {
        if (false) {}
        var newScopedSlots = parentVnode.data.scopedSlots;
        var oldScopedSlots = vm.$scopedSlots;
        var hasDynamicScopedSlot = !!(newScopedSlots && !newScopedSlots.$stable || oldScopedSlots !== emptyObject && !oldScopedSlots.$stable || newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key || !newScopedSlots && vm.$scopedSlots.$key);
        var needsForceUpdate = !!(renderChildren || vm.$options._renderChildren || hasDynamicScopedSlot);
        var prevVNode = vm.$vnode;
        vm.$options._parentVnode = parentVnode;
        vm.$vnode = parentVnode;
        if (vm._vnode) {
            vm._vnode.parent = parentVnode;
        }
        vm.$options._renderChildren = renderChildren;
        var attrs = parentVnode.data.attrs || emptyObject;
        if (vm._attrsProxy) {
            if (syncSetupProxy(vm._attrsProxy, attrs, prevVNode.data && prevVNode.data.attrs || emptyObject, vm, "$attrs")) {
                needsForceUpdate = true;
            }
        }
        vm.$attrs = attrs;
        listeners = listeners || emptyObject;
        var prevListeners = vm.$options._parentListeners;
        if (vm._listenersProxy) {
            syncSetupProxy(vm._listenersProxy, listeners, prevListeners || emptyObject, vm, "$listeners");
        }
        vm.$listeners = vm.$options._parentListeners = listeners;
        updateComponentListeners(vm, listeners, prevListeners);
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
        if (needsForceUpdate) {
            vm.$slots = resolveSlots(renderChildren, parentVnode.context);
            vm.$forceUpdate();
        }
        if (false) {}
    }
    function isInInactiveTree(vm) {
        while (vm && (vm = vm.$parent)) {
            if (vm._inactive) return true;
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
            callHook$1(vm, "activated");
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
            callHook$1(vm, "deactivated");
        }
    }
    function callHook$1(vm, hook, args, setContext) {
        if (setContext === void 0) {
            setContext = true;
        }
        pushTarget();
        var prev = currentInstance;
        setContext && setCurrentInstance(vm);
        var handlers = vm.$options[hook];
        var info = "".concat(hook, " hook");
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                invokeWithErrorHandling(handlers[i], vm, args || null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit("hook:" + hook);
        }
        setContext && setCurrentInstance(prev);
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
        var performance_1 = window.performance;
        if (performance_1 && typeof performance_1.now === "function" && getNow() > document.createEvent("Event").timeStamp) {
            getNow = function() {
                return performance_1.now();
            };
        }
    }
    var sortCompareFn = function(a, b) {
        if (a.post) {
            if (!b.post) return 1;
        } else if (b.post) {
            return -1;
        }
        return a.id - b.id;
    };
    function flushSchedulerQueue() {
        currentFlushTimestamp = getNow();
        flushing = true;
        var watcher, id;
        queue.sort(sortCompareFn);
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
        cleanupDeps();
        if (devtools && config.devtools) {
            devtools.emit("flush");
        }
    }
    function callUpdatedHooks(queue) {
        var i = queue.length;
        while (i--) {
            var watcher = queue[i];
            var vm = watcher.vm;
            if (vm && vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
                callHook$1(vm, "updated");
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
        if (has[id] != null) {
            return;
        }
        if (watcher === Dep.target && watcher.noRecurse) {
            return;
        }
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
    function initProvide(vm) {
        var provideOption = vm.$options.provide;
        if (provideOption) {
            var provided = isFunction(provideOption) ? provideOption.call(vm) : provideOption;
            if (!isObject(provided)) {
                return;
            }
            var source = resolveProvided(vm);
            var keys = hasSymbol ? Reflect.ownKeys(provided) : Object.keys(provided);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                Object.defineProperty(source, key, Object.getOwnPropertyDescriptor(provided, key));
            }
        }
    }
    function initInjections(vm) {
        var result = resolveInject(vm.$options.inject, vm);
        if (result) {
            toggleObserving(false);
            Object.keys(result).forEach((function(key) {
                if (false) {} else {
                    defineReactive(vm, key, result[key]);
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
                if (key === "__ob__") continue;
                var provideKey = inject[key].from;
                if (provideKey in vm._provided) {
                    result[key] = vm._provided[provideKey];
                } else if ("default" in inject[key]) {
                    var provideDefault = inject[key].default;
                    result[key] = isFunction(provideDefault) ? provideDefault.call(vm) : provideDefault;
                } else if (false) {}
            }
            return result;
        }
    }
    function FunctionalRenderContext(data, props, children, parent, Ctor) {
        var _this = this;
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
            if (!_this.$slots) {
                normalizeScopedSlots(parent, data.scopedSlots, _this.$slots = resolveSlots(children, parent));
            }
            return _this.$slots;
        };
        Object.defineProperty(this, "scopedSlots", {
            enumerable: true,
            get: function() {
                return normalizeScopedSlots(parent, data.scopedSlots, this.slots());
            }
        });
        if (isCompiled) {
            this.$options = options;
            this.$slots = this.slots();
            this.$scopedSlots = normalizeScopedSlots(parent, data.scopedSlots, this.$slots);
        }
        if (options._scopeId) {
            this._c = function(a, b, c, d) {
                var vnode = createElement$1(contextVm, a, b, c, d, needNormalization);
                if (vnode && !isArray(vnode)) {
                    vnode.fnScopeId = options._scopeId;
                    vnode.fnContext = parent;
                }
                return vnode;
            };
        } else {
            this._c = function(a, b, c, d) {
                return createElement$1(contextVm, a, b, c, d, needNormalization);
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
            if (isDef(data.attrs)) mergeProps(props, data.attrs);
            if (isDef(data.props)) mergeProps(props, data.props);
        }
        var renderContext = new FunctionalRenderContext(data, props, children, contextVm, Ctor);
        var vnode = options.render.call(null, renderContext._c, renderContext);
        if (vnode instanceof VNode) {
            return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext);
        } else if (isArray(vnode)) {
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
    function getComponentName(options) {
        return options.name || options.__name || options._componentTag;
    }
    var componentVNodeHooks = {
        init: function(vnode, hydrating) {
            if (vnode.componentInstance && !vnode.componentInstance._isDestroyed && vnode.data.keepAlive) {
                var mountedNode = vnode;
                componentVNodeHooks.prepatch(mountedNode, mountedNode);
            } else {
                var child = vnode.componentInstance = createComponentInstanceForVnode(vnode, activeInstance);
                child.$mount(hydrating ? vnode.elm : undefined, hydrating);
            }
        },
        prepatch: function(oldVnode, vnode) {
            var options = vnode.componentOptions;
            var child = vnode.componentInstance = oldVnode.componentInstance;
            updateChildComponent(child, options.propsData, options.listeners, vnode, options.children);
        },
        insert: function(vnode) {
            var context = vnode.context, componentInstance = vnode.componentInstance;
            if (!componentInstance._isMounted) {
                componentInstance._isMounted = true;
                callHook$1(componentInstance, "mounted");
            }
            if (vnode.data.keepAlive) {
                if (context._isMounted) {
                    queueActivatedComponent(componentInstance);
                } else {
                    activateChildComponent(componentInstance, true);
                }
            }
        },
        destroy: function(vnode) {
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
        var name = getComponentName(Ctor.options) || tag;
        var vnode = new VNode("vue-component-".concat(Ctor.cid).concat(name ? "-".concat(name) : ""), data, undefined, undefined, undefined, context, {
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
                hooks[key] = existing ? mergeHook(toMerge, existing) : toMerge;
            }
        }
    }
    function mergeHook(f1, f2) {
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
            if (isArray(existing) ? existing.indexOf(callback) === -1 : existing !== callback) {
                on[event] = [ callback ].concat(existing);
            }
        } else {
            on[event] = callback;
        }
    }
    var warn = noop;
    var tip = null && noop;
    var generateComponentTrace;
    var formatComponentName;
    if (false) {
        var repeat_1, classify_1, classifyRE_1, hasConsole_1;
    }
    var strats = config.optionMergeStrategies;
    if (false) {}
    function mergeData(to, from) {
        if (!from) return to;
        var key, toVal, fromVal;
        var keys = hasSymbol ? Reflect.ownKeys(from) : Object.keys(from);
        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (key === "__ob__") continue;
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
                return mergeData(isFunction(childVal) ? childVal.call(this, this) : childVal, isFunction(parentVal) ? parentVal.call(this, this) : parentVal);
            };
        } else {
            return function mergedInstanceDataFn() {
                var instanceData = isFunction(childVal) ? childVal.call(vm, vm) : childVal;
                var defaultData = isFunction(parentVal) ? parentVal.call(vm, vm) : parentVal;
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
    function mergeLifecycleHook(parentVal, childVal) {
        var res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [ childVal ] : parentVal;
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
        strats[hook] = mergeLifecycleHook;
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
        if (parentVal === nativeWatch) parentVal = undefined;
        if (childVal === nativeWatch) childVal = undefined;
        if (!childVal) return Object.create(parentVal || null);
        if (false) {}
        if (!parentVal) return childVal;
        var ret = {};
        extend(ret, parentVal);
        for (var key_1 in childVal) {
            var parent_1 = ret[key_1];
            var child = childVal[key_1];
            if (parent_1 && !isArray(parent_1)) {
                parent_1 = [ parent_1 ];
            }
            ret[key_1] = parent_1 ? parent_1.concat(child) : isArray(child) ? child : [ child ];
        }
        return ret;
    };
    strats.props = strats.methods = strats.inject = strats.computed = function(parentVal, childVal, vm, key) {
        if (childVal && "production" !== "production") {}
        if (!parentVal) return childVal;
        var ret = Object.create(null);
        extend(ret, parentVal);
        if (childVal) extend(ret, childVal);
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
        if (!new RegExp("^[a-zA-Z][\\-\\.0-9_".concat(unicodeRegExp.source, "]*$")).test(name)) {
            warn('Invalid component name: "' + name + '". Component names ' + "should conform to valid custom element name in html5 specification.");
        }
        if (isBuiltInTag(name) || config.isReservedTag(name)) {
            warn("Do not use built-in or reserved HTML elements as component " + "id: " + name);
        }
    }
    function normalizeProps(options, vm) {
        var props = options.props;
        if (!props) return;
        var res = {};
        var i, val, name;
        if (isArray(props)) {
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
        if (!inject) return;
        var normalized = options.inject = {};
        if (isArray(inject)) {
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
    function normalizeDirectives$1(options) {
        var dirs = options.directives;
        if (dirs) {
            for (var key in dirs) {
                var def = dirs[key];
                if (isFunction(def)) {
                    dirs[key] = {
                        bind: def,
                        update: def
                    };
                }
            }
        }
    }
    function assertObjectType(name, value, vm) {
        if (!isPlainObject(value)) {
            warn('Invalid value for option "'.concat(name, '": expected an Object, ') + "but got ".concat(toRawType(value), "."), vm);
        }
    }
    function mergeOptions(parent, child, vm) {
        if (false) {}
        if (isFunction(child)) {
            child = child.options;
        }
        normalizeProps(child, vm);
        normalizeInject(child, vm);
        normalizeDirectives$1(child);
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
        if (hasOwn(assets, id)) return assets[id];
        var camelizedId = camelize(id);
        if (hasOwn(assets, camelizedId)) return assets[camelizedId];
        var PascalCaseId = capitalize(camelizedId);
        if (hasOwn(assets, PascalCaseId)) return assets[PascalCaseId];
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
        return isFunction(def) && getType(prop.type) !== "Function" ? def.call(vm) : def;
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
            if (!isArray(type)) {
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
            valid = isArray(value);
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
        if (!isArray(expectedTypes)) {
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
        var message = 'Invalid prop: type check failed for prop "'.concat(name, '".') + " Expected ".concat(expectedTypes.map(capitalize).join(", "));
        var expectedType = expectedTypes[0];
        var receivedType = toRawType(value);
        if (expectedTypes.length === 1 && isExplicable(expectedType) && isExplicable(typeof value) && !isBoolean(expectedType, receivedType)) {
            message += " with value ".concat(styleValue(value, expectedType));
        }
        message += ", got ".concat(receivedType, " ");
        if (isExplicable(receivedType)) {
            message += "with value ".concat(styleValue(value, receivedType), ".");
        }
        return message;
    }
    function styleValue(value, type) {
        if (type === "String") {
            return '"'.concat(value, '"');
        } else if (type === "Number") {
            return "".concat(Number(value));
        } else {
            return "".concat(value);
        }
    }
    var EXPLICABLE_TYPES = null && [ "string", "number", "boolean" ];
    function isExplicable(value) {
        return EXPLICABLE_TYPES.some((function(elem) {
            return value.toLowerCase() === elem;
        }));
    }
    function isBoolean() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.some((function(elem) {
            return elem.toLowerCase() === "boolean";
        }));
    }
    var initProxy;
    if (false) {
        var getHandler_1, hasHandler_1, isBuiltInModifier_1, hasProxy_1, warnReservedPrefix_1, warnNonPresent_1, allowedGlobals_1;
    }
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
        var opts = vm.$options;
        if (opts.props) initProps$1(vm, opts.props);
        initSetup(vm);
        if (opts.methods) initMethods(vm, opts.methods);
        if (opts.data) {
            initData(vm);
        } else {
            var ob = observe(vm._data = {});
            ob && ob.vmCount++;
        }
        if (opts.computed) initComputed$1(vm, opts.computed);
        if (opts.watch && opts.watch !== nativeWatch) {
            initWatch(vm, opts.watch);
        }
    }
    function initProps$1(vm, propsOptions) {
        var propsData = vm.$options.propsData || {};
        var props = vm._props = shallowReactive({});
        var keys = vm.$options._propKeys = [];
        var isRoot = !vm.$parent;
        if (!isRoot) {
            toggleObserving(false);
        }
        var _loop_1 = function(key) {
            keys.push(key);
            var value = validateProp(key, propsOptions, propsData, vm);
            if (false) {
                var hyphenatedKey;
            } else {
                defineReactive(props, key, value);
            }
            if (!(key in vm)) {
                proxy(vm, "_props", key);
            }
        };
        for (var key in propsOptions) {
            _loop_1(key);
        }
        toggleObserving(true);
    }
    function initData(vm) {
        var data = vm.$options.data;
        data = vm._data = isFunction(data) ? getData(data, vm) : data || {};
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
        var ob = observe(data);
        ob && ob.vmCount++;
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
    function initComputed$1(vm, computed) {
        var watchers = vm._computedWatchers = Object.create(null);
        var isSSR = isServerRendering();
        for (var key in computed) {
            var userDef = computed[key];
            var getter = isFunction(userDef) ? userDef : userDef.get;
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
        if (isFunction(userDef)) {
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
                    if (false) {}
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
            if (isArray(handler)) {
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
                var info = 'callback for immediate watcher "'.concat(watcher.expression, '"');
                pushTarget();
                invokeWithErrorHandling(cb, vm, [ watcher.value ], vm, info);
                popTarget();
            }
            return function unwatchFn() {
                watcher.teardown();
            };
        };
    }
    var uid = 0;
    function initMixin$1(Vue) {
        Vue.prototype._init = function(options) {
            var vm = this;
            vm._uid = uid++;
            var startTag, endTag;
            if (false) {}
            vm._isVue = true;
            vm.__v_skip = true;
            vm._scope = new EffectScope(true);
            vm._scope._vm = true;
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
            callHook$1(vm, "beforeCreate", undefined, false);
            initInjections(vm);
            initState(vm);
            initProvide(vm);
            callHook$1(vm, "created");
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
                if (!modified) modified = {};
                modified[key] = latest[key];
            }
        }
        return modified;
    }
    function Vue(options) {
        if (false) {}
        this._init(options);
    }
    initMixin$1(Vue);
    stateMixin(Vue);
    eventsMixin(Vue);
    lifecycleMixin(Vue);
    renderMixin(Vue);
    function initUse(Vue) {
        Vue.use = function(plugin) {
            var installedPlugins = this._installedPlugins || (this._installedPlugins = []);
            if (installedPlugins.indexOf(plugin) > -1) {
                return this;
            }
            var args = toArray(arguments, 1);
            args.unshift(this);
            if (isFunction(plugin.install)) {
                plugin.install.apply(plugin, args);
            } else if (isFunction(plugin)) {
                plugin.apply(null, args);
            }
            installedPlugins.push(plugin);
            return this;
        };
    }
    function initMixin(Vue) {
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
            var name = getComponentName(extendOptions) || getComponentName(Super.options);
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
                initProps(Sub);
            }
            if (Sub.options.computed) {
                initComputed(Sub);
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
    function initProps(Comp) {
        var props = Comp.options.props;
        for (var key in props) {
            proxy(Comp.prototype, "_props", key);
        }
    }
    function initComputed(Comp) {
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
                    if (type === "directive" && isFunction(definition)) {
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
    function _getComponentName(opts) {
        return opts && (getComponentName(opts.Ctor.options) || opts.tag);
    }
    function matches(pattern, name) {
        if (isArray(pattern)) {
            return pattern.indexOf(name) > -1;
        } else if (typeof pattern === "string") {
            return pattern.split(",").indexOf(name) > -1;
        } else if (isRegExp(pattern)) {
            return pattern.test(name);
        }
        return false;
    }
    function pruneCache(keepAliveInstance, filter) {
        var cache = keepAliveInstance.cache, keys = keepAliveInstance.keys, _vnode = keepAliveInstance._vnode;
        for (var key in cache) {
            var entry = cache[key];
            if (entry) {
                var name_1 = entry.name;
                if (name_1 && !filter(name_1)) {
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
        remove$2(keys, key);
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
            cacheVNode: function() {
                var _a = this, cache = _a.cache, keys = _a.keys, vnodeToCache = _a.vnodeToCache, keyToCache = _a.keyToCache;
                if (vnodeToCache) {
                    var tag = vnodeToCache.tag, componentInstance = vnodeToCache.componentInstance, componentOptions = vnodeToCache.componentOptions;
                    cache[keyToCache] = {
                        name: _getComponentName(componentOptions),
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
        created: function() {
            this.cache = Object.create(null);
            this.keys = [];
        },
        destroyed: function() {
            for (var key in this.cache) {
                pruneCacheEntry(this.cache, key, this.keys);
            }
        },
        mounted: function() {
            var _this = this;
            this.cacheVNode();
            this.$watch("include", (function(val) {
                pruneCache(_this, (function(name) {
                    return matches(val, name);
                }));
            }));
            this.$watch("exclude", (function(val) {
                pruneCache(_this, (function(name) {
                    return !matches(val, name);
                }));
            }));
        },
        updated: function() {
            this.cacheVNode();
        },
        render: function() {
            var slot = this.$slots.default;
            var vnode = getFirstComponentChild(slot);
            var componentOptions = vnode && vnode.componentOptions;
            if (componentOptions) {
                var name_2 = _getComponentName(componentOptions);
                var _a = this, include = _a.include, exclude = _a.exclude;
                if (include && (!name_2 || !matches(include, name_2)) || exclude && name_2 && matches(exclude, name_2)) {
                    return vnode;
                }
                var _b = this, cache = _b.cache, keys = _b.keys;
                var key = vnode.key == null ? componentOptions.Ctor.cid + (componentOptions.tag ? "::".concat(componentOptions.tag) : "") : vnode.key;
                if (cache[key]) {
                    vnode.componentInstance = cache[key].componentInstance;
                    remove$2(keys, key);
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
            defineReactive
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
        initMixin(Vue);
        initExtend(Vue);
        initAssetRegisters(Vue);
    }
    initGlobalAPI(Vue);
    Object.defineProperty(Vue.prototype, "$isServer", {
        get: isServerRendering
    });
    Object.defineProperty(Vue.prototype, "$ssrContext", {
        get: function() {
            return this.$vnode && this.$vnode.ssrContext;
        }
    });
    Object.defineProperty(Vue, "FunctionalRenderContext", {
        value: FunctionalRenderContext
    });
    Vue.version = version;
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
                if (res) res += " ";
                res += stringified;
            }
        }
        return res;
    }
    function stringifyObject(value) {
        var res = "";
        for (var key in value) {
            if (value[key]) {
                if (res) res += " ";
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
    function createElement(tagName, vnode) {
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
        __proto__: null,
        createElement,
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
        create: function(_, vnode) {
            registerRef(vnode);
        },
        update: function(oldVnode, vnode) {
            if (oldVnode.data.ref !== vnode.data.ref) {
                registerRef(oldVnode, true);
                registerRef(vnode);
            }
        },
        destroy: function(vnode) {
            registerRef(vnode, true);
        }
    };
    function registerRef(vnode, isRemoval) {
        var ref = vnode.data.ref;
        if (!isDef(ref)) return;
        var vm = vnode.context;
        var refValue = vnode.componentInstance || vnode.elm;
        var value = isRemoval ? null : refValue;
        var $refsValue = isRemoval ? undefined : refValue;
        if (isFunction(ref)) {
            invokeWithErrorHandling(ref, vm, [ value ], vm, "template ref function");
            return;
        }
        var isFor = vnode.data.refInFor;
        var _isString = typeof ref === "string" || typeof ref === "number";
        var _isRef = isRef(ref);
        var refs = vm.$refs;
        if (_isString || _isRef) {
            if (isFor) {
                var existing = _isString ? refs[ref] : ref.value;
                if (isRemoval) {
                    isArray(existing) && remove$2(existing, refValue);
                } else {
                    if (!isArray(existing)) {
                        if (_isString) {
                            refs[ref] = [ refValue ];
                            setSetupRef(vm, ref, refs[ref]);
                        } else {
                            ref.value = [ refValue ];
                        }
                    } else if (!existing.includes(refValue)) {
                        existing.push(refValue);
                    }
                }
            } else if (_isString) {
                if (isRemoval && refs[ref] !== refValue) {
                    return;
                }
                refs[ref] = $refsValue;
                setSetupRef(vm, ref, value);
            } else if (_isRef) {
                if (isRemoval && ref.value !== refValue) {
                    return;
                }
                ref.value = value;
            } else if (false) {}
        }
    }
    function setSetupRef(_a, key, val) {
        var _setupState = _a._setupState;
        if (_setupState && hasOwn(_setupState, key)) {
            if (isRef(_setupState[key])) {
                _setupState[key].value = val;
            } else {
                _setupState[key] = val;
            }
        }
    }
    var emptyNode = new VNode("", {}, []);
    var hooks = [ "create", "activate", "update", "remove", "destroy" ];
    function sameVnode(a, b) {
        return a.key === b.key && a.asyncFactory === b.asyncFactory && (a.tag === b.tag && a.isComment === b.isComment && isDef(a.data) === isDef(b.data) && sameInputType(a, b) || isTrue(a.isAsyncPlaceholder) && isUndef(b.asyncFactory.error));
    }
    function sameInputType(a, b) {
        if (a.tag !== "input") return true;
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
            if (isDef(key)) map[key] = i;
        }
        return map;
    }
    function createPatchFunction(backend) {
        var i, j;
        var cbs = {};
        var modules = backend.modules, nodeOps = backend.nodeOps;
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
            function remove() {
                if (--remove.listeners === 0) {
                    removeNode(childElm);
                }
            }
            remove.listeners = listeners;
            return remove;
        }
        function removeNode(el) {
            var parent = nodeOps.parentNode(el);
            if (isDef(parent)) {
                nodeOps.removeChild(parent, el);
            }
        }
        function isUnknownElement(vnode, inVPre) {
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
                createChildren(vnode, children, insertedVnodeQueue);
                if (isDef(data)) {
                    invokeCreateHooks(vnode, insertedVnodeQueue);
                }
                insert(parentElm, vnode.elm, refElm);
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
        function insert(parent, elm, ref) {
            if (isDef(parent)) {
                if (isDef(ref)) {
                    if (nodeOps.parentNode(ref) === parent) {
                        nodeOps.insertBefore(parent, elm, ref);
                    }
                } else {
                    nodeOps.appendChild(parent, elm);
                }
            }
        }
        function createChildren(vnode, children, insertedVnodeQueue) {
            if (isArray(children)) {
                if (false) {}
                for (var i_1 = 0; i_1 < children.length; ++i_1) {
                    createElm(children[i_1], insertedVnodeQueue, vnode.elm, null, true, children, i_1);
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
            for (var i_2 = 0; i_2 < cbs.create.length; ++i_2) {
                cbs.create[i_2](emptyNode, vnode);
            }
            i = vnode.data.hook;
            if (isDef(i)) {
                if (isDef(i.create)) i.create(emptyNode, vnode);
                if (isDef(i.insert)) insertedVnodeQueue.push(vnode);
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
                if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
                for (i = 0; i < cbs.destroy.length; ++i) cbs.destroy[i](vnode);
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
                var i_3;
                var listeners = cbs.remove.length + 1;
                if (isDef(rm)) {
                    rm.listeners += listeners;
                } else {
                    rm = createRmCb(vnode.elm, listeners);
                }
                if (isDef(i_3 = vnode.componentInstance) && isDef(i_3 = i_3._vnode) && isDef(i_3.data)) {
                    removeAndInvokeRemoveHook(i_3, rm);
                }
                for (i_3 = 0; i_3 < cbs.remove.length; ++i_3) {
                    cbs.remove[i_3](vnode, rm);
                }
                if (isDef(i_3 = vnode.data.hook) && isDef(i_3 = i_3.remove)) {
                    i_3(vnode, rm);
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
                    if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
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
            for (var i_4 = 0; i_4 < children.length; i_4++) {
                var vnode = children[i_4];
                var key = vnode.key;
                if (isDef(key)) {
                    if (seenKeys[key]) {
                        warn("Duplicate keys detected: '".concat(key, "'. This may cause an update error."), vnode.context);
                    } else {
                        seenKeys[key] = true;
                    }
                }
            }
        }
        function findIdxInOld(node, oldCh, start, end) {
            for (var i_5 = start; i_5 < end; i_5++) {
                var c = oldCh[i_5];
                if (isDef(c) && sameVnode(node, c)) return i_5;
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
                for (i = 0; i < cbs.update.length; ++i) cbs.update[i](oldVnode, vnode);
                if (isDef(i = data.hook) && isDef(i = i.update)) i(oldVnode, vnode);
            }
            if (isUndef(vnode.text)) {
                if (isDef(oldCh) && isDef(ch)) {
                    if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly);
                } else if (isDef(ch)) {
                    if (false) {}
                    if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, "");
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
                if (isDef(i = data.hook) && isDef(i = i.postpatch)) i(oldVnode, vnode);
            }
        }
        function invokeInsertHook(vnode, queue, initial) {
            if (isTrue(initial) && isDef(vnode.parent)) {
                vnode.parent.data.pendingInsert = queue;
            } else {
                for (var i_6 = 0; i_6 < queue.length; ++i_6) {
                    queue[i_6].data.hook.insert(queue[i_6]);
                }
            }
        }
        var hydrationBailed = false;
        var isRenderedModule = makeMap("attrs,class,staticClass,staticStyle,key");
        function hydrate(elm, vnode, insertedVnodeQueue, inVPre) {
            var i;
            var tag = vnode.tag, data = vnode.data, children = vnode.children;
            inVPre = inVPre || data && data.pre;
            vnode.elm = elm;
            if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
                vnode.isAsyncPlaceholder = true;
                return true;
            }
            if (false) {}
            if (isDef(data)) {
                if (isDef(i = data.hook) && isDef(i = i.init)) i(vnode, true);
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
                            for (var i_7 = 0; i_7 < children.length; i_7++) {
                                if (!childNode || !hydrate(childNode, children[i_7], insertedVnodeQueue, inVPre)) {
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
                return vnode.tag.indexOf("vue-component") === 0 || !isUnknownElement(vnode, inVPre) && vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase());
            } else {
                return node.nodeType === (vnode.isComment ? 8 : 3);
            }
        }
        return function patch(oldVnode, vnode, hydrating, removeOnly) {
            if (isUndef(vnode)) {
                if (isDef(oldVnode)) invokeDestroyHook(oldVnode);
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
                            for (var i_8 = 0; i_8 < cbs.destroy.length; ++i_8) {
                                cbs.destroy[i_8](ancestor);
                            }
                            ancestor.elm = vnode.elm;
                            if (patchable) {
                                for (var i_9 = 0; i_9 < cbs.create.length; ++i_9) {
                                    cbs.create[i_9](emptyNode, ancestor);
                                }
                                var insert_1 = ancestor.data.hook.insert;
                                if (insert_1.merged) {
                                    for (var i_10 = 1; i_10 < insert_1.fns.length; i_10++) {
                                        insert_1.fns[i_10]();
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
        var oldDirs = normalizeDirectives(oldVnode.data.directives, oldVnode.context);
        var newDirs = normalizeDirectives(vnode.data.directives, vnode.context);
        var dirsWithInsert = [];
        var dirsWithPostpatch = [];
        var key, oldDir, dir;
        for (key in newDirs) {
            oldDir = oldDirs[key];
            dir = newDirs[key];
            if (!oldDir) {
                callHook(dir, "bind", vnode, oldVnode);
                if (dir.def && dir.def.inserted) {
                    dirsWithInsert.push(dir);
                }
            } else {
                dir.oldValue = oldDir.value;
                dir.oldArg = oldDir.arg;
                callHook(dir, "update", vnode, oldVnode);
                if (dir.def && dir.def.componentUpdated) {
                    dirsWithPostpatch.push(dir);
                }
            }
        }
        if (dirsWithInsert.length) {
            var callInsert = function() {
                for (var i = 0; i < dirsWithInsert.length; i++) {
                    callHook(dirsWithInsert[i], "inserted", vnode, oldVnode);
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
                    callHook(dirsWithPostpatch[i], "componentUpdated", vnode, oldVnode);
                }
            }));
        }
        if (!isCreate) {
            for (key in oldDirs) {
                if (!newDirs[key]) {
                    callHook(oldDirs[key], "unbind", oldVnode, oldVnode, isDestroy);
                }
            }
        }
    }
    var emptyModifiers = Object.create(null);
    function normalizeDirectives(dirs, vm) {
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
            if (vm._setupState && vm._setupState.__sfc) {
                var setupDef = dir.def || resolveAsset(vm, "_setupState", "v-" + dir.name);
                if (typeof setupDef === "function") {
                    dir.def = {
                        bind: setupDef,
                        update: setupDef
                    };
                } else {
                    dir.def = setupDef;
                }
            }
            dir.def = dir.def || resolveAsset(vm.$options, "directives", dir.name, true);
        }
        return res;
    }
    function getRawDirName(dir) {
        return dir.rawName || "".concat(dir.name, ".").concat(Object.keys(dir.modifiers || {}).join("."));
    }
    function callHook(dir, hook, vnode, oldVnode, isDestroy) {
        var fn = dir.def && dir.def[hook];
        if (fn) {
            try {
                fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
            } catch (e) {
                handleError(e, vnode.context, "directive ".concat(dir.name, " ").concat(hook, " hook"));
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
        if (isDef(attrs.__ob__) || isTrue(attrs._v_attr_proxy)) {
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
                var blocker_1 = function(e) {
                    e.stopImmediatePropagation();
                    el.removeEventListener("input", blocker_1);
                };
                el.addEventListener("input", blocker_1);
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
            var event_1 = isIE ? "change" : "input";
            on[event_1] = [].concat(on[RANGE_TOKEN], on[event_1] || []);
            delete on[RANGE_TOKEN];
        }
        if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
            on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
            delete on[CHECKBOX_RADIO_TOKEN];
        }
    }
    var target;
    function createOnceHandler(event, handler, capture) {
        var _target = target;
        return function onceHandler() {
            var res = handler.apply(null, arguments);
            if (res !== null) {
                remove(event, onceHandler, capture, _target);
            }
        };
    }
    var useMicrotaskFix = isUsingMicroTask && !(isFF && Number(isFF[1]) <= 53);
    function add(name, handler, capture, passive) {
        if (useMicrotaskFix) {
            var attachedTimestamp_1 = currentFlushTimestamp;
            var original_1 = handler;
            handler = original_1._wrapper = function(e) {
                if (e.target === e.currentTarget || e.timeStamp >= attachedTimestamp_1 || e.timeStamp <= 0 || e.target.ownerDocument !== document) {
                    return original_1.apply(this, arguments);
                }
            };
        }
        target.addEventListener(name, handler, supportsPassive ? {
            capture,
            passive
        } : capture);
    }
    function remove(name, handler, capture, _target) {
        (_target || target).removeEventListener(name, handler._wrapper || handler, capture);
    }
    function updateDOMListeners(oldVnode, vnode) {
        if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
            return;
        }
        var on = vnode.data.on || {};
        var oldOn = oldVnode.data.on || {};
        target = vnode.elm || oldVnode.elm;
        normalizeEvents(on);
        updateListeners(on, oldOn, add, remove, createOnceHandler, vnode.context);
        target = undefined;
    }
    var events = {
        create: updateDOMListeners,
        update: updateDOMListeners,
        destroy: function(vnode) {
            return updateDOMListeners(vnode, emptyNode);
        }
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
        if (isDef(props.__ob__) || isTrue(props._v_attr_proxy)) {
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
                if (vnode.children) vnode.children.length = 0;
                if (cur === oldProps[key]) continue;
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
                svgContainer.innerHTML = "<svg>".concat(cur, "</svg>");
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
            var name_1 = vendorNames[i] + capName;
            if (name_1 in emptyStyle) {
                return name_1;
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
            var cur = " ".concat(el.getAttribute("class") || "", " ");
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
            var cur = " ".concat(el.getAttribute("class") || "", " ");
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
    function resolveTransition(def) {
        if (!def) {
            return;
        }
        if (typeof def === "object") {
            var res = {};
            if (def.css !== false) {
                extend(res, autoCssTransition(def.name || "v"));
            }
            extend(res, def);
            return res;
        } else if (typeof def === "string") {
            return autoCssTransition(def);
        }
    }
    var autoCssTransition = cached((function(name) {
        return {
            enterClass: "".concat(name, "-enter"),
            enterToClass: "".concat(name, "-enter-to"),
            enterActiveClass: "".concat(name, "-enter-active"),
            leaveClass: "".concat(name, "-leave"),
            leaveToClass: "".concat(name, "-leave-to"),
            leaveActiveClass: "".concat(name, "-leave-active")
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
            remove$2(el._transitionClasses, cls);
        }
        removeClass(el, cls);
    }
    function whenTransitionEnds(el, expectedType, cb) {
        var _a = getTransitionInfo(el, expectedType), type = _a.type, timeout = _a.timeout, propCount = _a.propCount;
        if (!type) return cb();
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
        var css = data.css, type = data.type, enterClass = data.enterClass, enterToClass = data.enterToClass, enterActiveClass = data.enterActiveClass, appearClass = data.appearClass, appearToClass = data.appearToClass, appearActiveClass = data.appearActiveClass, beforeEnter = data.beforeEnter, enter = data.enter, afterEnter = data.afterEnter, enterCancelled = data.enterCancelled, beforeAppear = data.beforeAppear, appear = data.appear, afterAppear = data.afterAppear, appearCancelled = data.appearCancelled, duration = data.duration;
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
        var enterHook = isAppear ? isFunction(appear) ? appear : enter : enter;
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
        var css = data.css, type = data.type, leaveClass = data.leaveClass, leaveToClass = data.leaveToClass, leaveActiveClass = data.leaveActiveClass, beforeLeave = data.beforeLeave, leave = data.leave, afterLeave = data.afterLeave, leaveCancelled = data.leaveCancelled, delayLeave = data.delayLeave, duration = data.duration;
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
            warn("<transition> explicit ".concat(name, " duration is not a valid number - ") + "got ".concat(JSON.stringify(val), "."), vnode.context);
        } else if (isNaN(val)) {
            warn("<transition> explicit ".concat(name, " duration is NaN - ") + "the duration expression might be incorrect.", vnode.context);
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
        remove: function(vnode, rm) {
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
        inserted: function(el, binding, vnode, oldVnode) {
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
        componentUpdated: function(el, binding, vnode) {
            if (vnode.tag === "select") {
                setSelected(el, binding, vnode.context);
                var prevOptions_1 = el._vOptions;
                var curOptions_1 = el._vOptions = [].map.call(el.options, getValue);
                if (curOptions_1.some((function(o, i) {
                    return !looseEqual(o, prevOptions_1[i]);
                }))) {
                    var needReset = el.multiple ? binding.value.some((function(v) {
                        return hasNoMatchingOption(v, curOptions_1);
                    })) : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions_1);
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
        if (!e.target.composing) return;
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
        bind: function(el, _a, vnode) {
            var value = _a.value;
            vnode = locateNode(vnode);
            var transition = vnode.data && vnode.data.transition;
            var originalDisplay = el.__vOriginalDisplay = el.style.display === "none" ? "" : el.style.display;
            if (value && transition) {
                vnode.data.show = true;
                enter(vnode, (function() {
                    el.style.display = originalDisplay;
                }));
            } else {
                el.style.display = value ? originalDisplay : "none";
            }
        },
        update: function(el, _a, vnode) {
            var value = _a.value, oldValue = _a.oldValue;
            if (!value === !oldValue) return;
            vnode = locateNode(vnode);
            var transition = vnode.data && vnode.data.transition;
            if (transition) {
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
        unbind: function(el, binding, vnode, oldVnode, isDestroy) {
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
        for (var key in listeners) {
            data[camelize(key)] = listeners[key];
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
        render: function(h) {
            var _this = this;
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
            var id = "__transition-".concat(this._uid, "-");
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
                        _this._leaving = false;
                        _this.$forceUpdate();
                    }));
                    return placeholder(h, rawChild);
                } else if (mode === "in-out") {
                    if (isAsyncPlaceholder(child)) {
                        return oldRawChild;
                    }
                    var delayedLeave_1;
                    var performLeave = function() {
                        delayedLeave_1();
                    };
                    mergeVNodeHook(data, "afterEnter", performLeave);
                    mergeVNodeHook(data, "enterCancelled", performLeave);
                    mergeVNodeHook(oldData, "delayLeave", (function(leave) {
                        delayedLeave_1 = leave;
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
        beforeMount: function() {
            var _this = this;
            var update = this._update;
            this._update = function(vnode, hydrating) {
                var restoreActiveInstance = setActiveInstance(_this);
                _this.__patch__(_this._vnode, _this.kept, false, true);
                _this._vnode = _this.kept;
                restoreActiveInstance();
                update.call(_this, vnode, hydrating);
            };
        },
        render: function(h) {
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
                        var name_1, opts;
                    }
                }
            }
            if (prevChildren) {
                var kept = [];
                var removed = [];
                for (var i = 0; i < prevChildren.length; i++) {
                    var c = prevChildren[i];
                    c.data.transition = transitionData;
                    c.data.pos = c.elm.getBoundingClientRect();
                    if (map[c.key]) {
                        kept.push(c);
                    } else {
                        removed.push(c);
                    }
                }
                this.kept = h(tag, null, kept);
                this.removed = removed;
            }
            return h(tag, null, children);
        },
        updated: function() {
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
                    var el_1 = c.elm;
                    var s = el_1.style;
                    addTransitionClass(el_1, moveClass);
                    s.transform = s.WebkitTransform = s.transitionDuration = "";
                    el_1.addEventListener(transitionEndEvent, el_1._moveCb = function cb(e) {
                        if (e && e.target !== el_1) {
                            return;
                        }
                        if (!e || /transform$/.test(e.propertyName)) {
                            el_1.removeEventListener(transitionEndEvent, cb);
                            el_1._moveCb = null;
                            removeTransitionClass(el_1, moveClass);
                        }
                    });
                }
            }));
        },
        methods: {
            hasMove: function(el, moveClass) {
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
            s.transform = s.WebkitTransform = "translate(".concat(dx, "px,").concat(dy, "px)");
            s.transitionDuration = "0s";
        }
    }
    var platformComponents = {
        Transition,
        TransitionGroup
    };
    Vue.config.mustUseProp = mustUseProp;
    Vue.config.isReservedTag = isReservedTag;
    Vue.config.isReservedAttr = isReservedAttr;
    Vue.config.getTagNamespace = getTagNamespace;
    Vue.config.isUnknownElement = isUnknownElement;
    extend(Vue.options.directives, platformDirectives);
    extend(Vue.options.components, platformComponents);
    Vue.prototype.__patch__ = inBrowser ? patch : noop;
    Vue.prototype.$mount = function(el, hydrating) {
        el = el && inBrowser ? query(el) : undefined;
        return mountComponent(this, el, hydrating);
    };
    if (inBrowser) {
        setTimeout((function() {
            if (config.devtools) {
                if (devtools) {
                    devtools.emit("init", Vue);
                } else if (false) {}
            }
            if (false) {}
        }), 0);
    }
    Object(function webpackMissingModule() {
        var e = new Error("Cannot find module 'vuetify/lib'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
    }());
    Vue.use(Object(function webpackMissingModule() {
        var e = new Error("Cannot find module 'vuetify/lib'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
    }()));
    var vuetify_opts = {};
    const vuetify = new Object(function webpackMissingModule() {
        var e = new Error("Cannot find module 'vuetify/lib'");
        e.code = "MODULE_NOT_FOUND";
        throw e;
    }())(vuetify_opts);
    $("body").append('<div id="app"></div>');
    $("body").append('<div id="ee">xxxxxxxxxxxxxxx</div>');
    window.Vue = Vue;
    (function(x) {
        return x;
    });
    new Vue({
        vuetify
    }).$mount("#app");
})();
//# sourceMappingURL=bestteacher.user.js.map