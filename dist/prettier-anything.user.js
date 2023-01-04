// ==UserScript==
// @name        Prettier Anything
// @version     2023.104.5101320
// @author      fuzetsu
// @description Apply prettier formatting to any text input
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*/*
// @namespace   prettier-anything
// @inject-into content
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @require     https://cdn.jsdelivr.net/gh/kufii/My-UserScripts@00302ac8bd875599ed97df07b379b58f9b4932bd/libs/gm_config.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/prettier-anything.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/prettier-anything.meta.js
// ==/UserScript==

(() => {
    "use strict";
    var __webpack_exports__ = {};
    function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
    }
    function _regeneratorRuntime() {
        "use strict";
        _regeneratorRuntime = function _regeneratorRuntime() {
            return exports;
        };
        var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
            obj[key] = desc.value;
        }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
            return Object.defineProperty(obj, key, {
                value,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }), obj[key];
        }
        try {
            define({}, "");
        } catch (err) {
            define = function define(obj, key, value) {
                return obj[key] = value;
            };
        }
        function wrap(innerFn, outerFn, self, tryLocsList) {
            var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
            return defineProperty(generator, "_invoke", {
                value: makeInvokeMethod(innerFn, self, context)
            }), generator;
        }
        function tryCatch(fn, obj, arg) {
            try {
                return {
                    type: "normal",
                    arg: fn.call(obj, arg)
                };
            } catch (err) {
                return {
                    type: "throw",
                    arg: err
                };
            }
        }
        exports.wrap = wrap;
        var ContinueSentinel = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var IteratorPrototype = {};
        define(IteratorPrototype, iteratorSymbol, (function() {
            return this;
        }));
        var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        function defineIteratorMethods(prototype) {
            [ "next", "throw", "return" ].forEach((function(method) {
                define(prototype, method, (function(arg) {
                    return this._invoke(method, arg);
                }));
            }));
        }
        function AsyncIterator(generator, PromiseImpl) {
            function invoke(method, arg, resolve, reject) {
                var record = tryCatch(generator[method], generator, arg);
                if ("throw" !== record.type) {
                    var result = record.arg, value = result.value;
                    return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then((function(value) {
                        invoke("next", value, resolve, reject);
                    }), (function(err) {
                        invoke("throw", err, resolve, reject);
                    })) : PromiseImpl.resolve(value).then((function(unwrapped) {
                        result.value = unwrapped, resolve(result);
                    }), (function(error) {
                        return invoke("throw", error, resolve, reject);
                    }));
                }
                reject(record.arg);
            }
            var previousPromise;
            defineProperty(this, "_invoke", {
                value: function value(method, arg) {
                    function callInvokeWithMethodAndArg() {
                        return new PromiseImpl((function(resolve, reject) {
                            invoke(method, arg, resolve, reject);
                        }));
                    }
                    return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
                }
            });
        }
        function makeInvokeMethod(innerFn, self, context) {
            var state = "suspendedStart";
            return function(method, arg) {
                if ("executing" === state) throw new Error("Generator is already running");
                if ("completed" === state) {
                    if ("throw" === method) throw arg;
                    return doneResult();
                }
                for (context.method = method, context.arg = arg; ;) {
                    var delegate = context.delegate;
                    if (delegate) {
                        var delegateResult = maybeInvokeDelegate(delegate, context);
                        if (delegateResult) {
                            if (delegateResult === ContinueSentinel) continue;
                            return delegateResult;
                        }
                    }
                    if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
                        if ("suspendedStart" === state) throw state = "completed", context.arg;
                        context.dispatchException(context.arg);
                    } else "return" === context.method && context.abrupt("return", context.arg);
                    state = "executing";
                    var record = tryCatch(innerFn, self, context);
                    if ("normal" === record.type) {
                        if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                        return {
                            value: record.arg,
                            done: context.done
                        };
                    }
                    "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
                }
            };
        }
        function maybeInvokeDelegate(delegate, context) {
            var methodName = context.method, method = delegate.iterator[methodName];
            if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", 
            context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", 
            context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), 
            ContinueSentinel;
            var record = tryCatch(method, delegate.iterator, context.arg);
            if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
            context.delegate = null, ContinueSentinel;
            var info = record.arg;
            return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
            "return" !== context.method && (context.method = "next", context.arg = undefined), 
            context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
            context.delegate = null, ContinueSentinel);
        }
        function pushTryEntry(locs) {
            var entry = {
                tryLoc: locs[0]
            };
            1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
            entry.afterLoc = locs[3]), this.tryEntries.push(entry);
        }
        function resetTryEntry(entry) {
            var record = entry.completion || {};
            record.type = "normal", delete record.arg, entry.completion = record;
        }
        function Context(tryLocsList) {
            this.tryEntries = [ {
                tryLoc: "root"
            } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(iterable) {
            if (iterable) {
                var iteratorMethod = iterable[iteratorSymbol];
                if (iteratorMethod) return iteratorMethod.call(iterable);
                if ("function" == typeof iterable.next) return iterable;
                if (!isNaN(iterable.length)) {
                    var i = -1, next = function next() {
                        for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next.value = iterable[i], 
                        next.done = !1, next;
                        return next.value = undefined, next.done = !0, next;
                    };
                    return next.next = next;
                }
            }
            return {
                next: doneResult
            };
        }
        function doneResult() {
            return {
                value: undefined,
                done: !0
            };
        }
        return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
            value: GeneratorFunctionPrototype,
            configurable: !0
        }), defineProperty(GeneratorFunctionPrototype, "constructor", {
            value: GeneratorFunction,
            configurable: !0
        }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), 
        exports.isGeneratorFunction = function(genFun) {
            var ctor = "function" == typeof genFun && genFun.constructor;
            return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
        }, exports.mark = function(genFun) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
            define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), 
            genFun;
        }, exports.awrap = function(arg) {
            return {
                __await: arg
            };
        }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, (function() {
            return this;
        })), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
            void 0 === PromiseImpl && (PromiseImpl = Promise);
            var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
            return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then((function(result) {
                return result.done ? result.value : iter.next();
            }));
        }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, (function() {
            return this;
        })), define(Gp, "toString", (function() {
            return "[object Generator]";
        })), exports.keys = function(val) {
            var object = Object(val), keys = [];
            for (var key in object) keys.push(key);
            return keys.reverse(), function next() {
                for (;keys.length; ) {
                    var key = keys.pop();
                    if (key in object) return next.value = key, next.done = !1, next;
                }
                return next.done = !0, next;
            };
        }, exports.values = values, Context.prototype = {
            constructor: Context,
            reset: function reset(skipTempReset) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, 
                this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), 
                !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
            },
            stop: function stop() {
                this.done = !0;
                var rootRecord = this.tryEntries[0].completion;
                if ("throw" === rootRecord.type) throw rootRecord.arg;
                return this.rval;
            },
            dispatchException: function dispatchException(exception) {
                if (this.done) throw exception;
                var context = this;
                function handle(loc, caught) {
                    return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
                    context.arg = undefined), !!caught;
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var entry = this.tryEntries[i], record = entry.completion;
                    if ("root" === entry.tryLoc) return handle("end");
                    if (entry.tryLoc <= this.prev) {
                        var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                        if (hasCatch && hasFinally) {
                            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                        } else if (hasCatch) {
                            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                        } else {
                            if (!hasFinally) throw new Error("try statement without catch or finally");
                            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                        }
                    }
                }
            },
            abrupt: function abrupt(type, arg) {
                for (var i = this.tryEntries.length - 1, entry; i >= 0; --i) {
                    entry = this.tryEntries[i];
                    if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                        var finallyEntry = entry;
                        break;
                    }
                }
                finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
                var record = finallyEntry ? finallyEntry.completion : {};
                return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
                this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
            },
            complete: function complete(record, afterLoc) {
                if ("throw" === record.type) throw record.arg;
                return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
                this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
                ContinueSentinel;
            },
            finish: function finish(finallyLoc) {
                for (var i = this.tryEntries.length - 1, entry; i >= 0; --i) {
                    entry = this.tryEntries[i];
                    if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
                    resetTryEntry(entry), ContinueSentinel;
                }
            },
            catch: function _catch(tryLoc) {
                for (var i = this.tryEntries.length - 1, entry; i >= 0; --i) {
                    entry = this.tryEntries[i];
                    if (entry.tryLoc === tryLoc) {
                        var record = entry.completion;
                        if ("throw" === record.type) {
                            var thrown = record.arg;
                            resetTryEntry(entry);
                        }
                        return thrown;
                    }
                }
                throw new Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(iterable, resultName, nextLoc) {
                return this.delegate = {
                    iterator: values(iterable),
                    resultName,
                    nextLoc
                }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
            }
        }, exports;
    }
    function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(object);
            enumerableOnly && (symbols = symbols.filter((function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            }))), keys.push.apply(keys, symbols);
        }
        return keys;
    }
    function _objectSpread(target) {
        for (var i = 1, source; i < arguments.length; i++) {
            source = null != arguments[i] ? arguments[i] : {};
            i % 2 ? ownKeys(Object(source), !0).forEach((function(key) {
                _defineProperty(target, key, source[key]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            }));
        }
        return target;
    }
    function _defineProperty(obj, key, value) {
        key = _toPropertyKey(key);
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }
        return obj;
    }
    function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return _typeof(key) === "symbol" ? key : String(key);
    }
    function _toPrimitive(input, hint) {
        if (_typeof(input) !== "object" || input === null) return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== undefined) {
            var res = prim.call(input, hint || "default");
            if (_typeof(res) !== "object") return res;
            throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
    }
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
            var info = gen[key](arg), value = info.value;
        } catch (error) {
            reject(error);
            return;
        }
        if (info.done) {
            resolve(value);
        } else {
            Promise.resolve(value).then(_next, _throw);
        }
    }
    function _asyncToGenerator(fn) {
        return function() {
            var self = this, args = arguments;
            return new Promise((function(resolve, reject) {
                var gen = fn.apply(self, args);
                function _next(value) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
                }
                function _throw(err) {
                    asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
                }
                _next(undefined);
            }));
        };
    }
    var deps = [ "https://unpkg.com/prettier@2/standalone.js", "https://unpkg.com/prettier@2/parser-babel.js" ], loadDep = function loadDep(url) {
        return new Promise((function(resolve, reject) {
            GM_xmlhttpRequest({
                method: "GET",
                url,
                onload: function onload(res) {
                    return resolve(res.responseText);
                },
                onerror: function onerror() {
                    return reject(new Error("Failed to load ".concat(url)));
                }
            });
        }));
    }, Config = GM_config([ {
        key: "prettierrc",
        label: "Prettier Config",
        default: "{}",
        type: "text",
        multiline: true,
        resizable: true
    }, {
        key: "binding",
        label: "Key Binding",
        type: "keybinding",
        default: {
            altKey: true,
            shiftKey: true,
            key: "I"
        },
        requireModifier: true,
        requireKey: true
    }, {
        key: "copyBinding",
        label: "Copy Key Binding",
        type: "keybinding",
        default: {
            ctrlKey: true,
            altKey: true,
            shiftKey: true,
            key: "I"
        },
        requireModifier: true,
        requireKey: true
    } ]);
    GM_registerMenuCommand("Prettier Anywhere Settings", (function() {
        if (window.top === window.self) Config.setup();
    }));
    var config = Config.load();
    Config.onsave = function(cfg) {
        return config = cfg;
    };
    var p = function p() {
        var _console;
        return (_console = console).log.apply(_console, arguments), arguments.length <= 0 ? undefined : arguments[0];
    };
    var loaded = false;
    var load = function load() {
        if (loaded) return;
        loaded = true;
        return Promise.all(deps.map(loadDep)).then((function(scripts) {
            return scripts.map(eval);
        }));
    }, getSelection = function getSelection() {
        var elem = document.activeElement;
        if ([ "INPUT", "TEXTAREA" ].includes(elem.nodeName)) {
            return elem.value.slice(elem.selectionStart, elem.selectionEnd);
        } else if (elem.contentEditable) {
            if (!document.getSelection().toString()) return;
            document.execCommand("copy");
            return navigator.clipboard.readText();
        } else return document.getSelection().toString();
    }, insertText = function insertText(text) {
        var elem = document.activeElement;
        if (typeof InstallTrigger !== "undefined" && [ "INPUT", "TEXTAREA" ].includes(elem.nodeName)) {
            elem.value = elem.value.slice(0, elem.selectionStart) + text + elem.value.slice(elem.selectionEnd);
        } else {
            document.execCommand("insertText", false, text);
        }
    }, prettify = function() {
        var _ref = _asyncToGenerator(_regeneratorRuntime().mark((function _callee(clip) {
            var code, loadStart, conf, formatted;
            return _regeneratorRuntime().wrap((function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    code = getSelection();
                    p("key combo HIT, selection = ", code, "; clip = ", clip);
                    if (code) {
                        _context.next = 4;
                        break;
                    }
                    return _context.abrupt("return", p("no selection, so nothing to do"));

                  case 4:
                    p("--- PRETTIER START ---");
                    p("Loading Prettier");
                    loadStart = Date.now();
                    _context.next = 9;
                    return load();

                  case 9:
                    p("Loaded, delta = ", Date.now() - loadStart);
                    conf = _objectSpread(_objectSpread({}, JSON.parse(config.prettierrc || "{}")), {}, {
                        parser: "babel",
                        plugins: prettierPlugins
                    });
                    p("formatting using conf:", conf);
                    formatted = prettier.format(code, conf);
                    if (clip) GM_setClipboard(formatted); else insertText(formatted);
                    document.getSelection().empty();
                    p("BEFORE:\n", code);
                    p("AFTER:\n", formatted);
                    p("--- PRETTIER END ---");

                  case 18:
                  case "end":
                    return _context.stop();
                }
            }), _callee);
        })));
        return function prettify(_x) {
            return _ref.apply(this, arguments);
        };
    }(), keyBindingsMatch = function keyBindingsMatch(a, b) {
        return !a.ctrlKey === !b.ctrlKey && !a.altKey === !b.altKey && !a.shiftKey === !b.shiftKey && !a.metaKey === !b.metaKey && a.key.toUpperCase() === b.key.toUpperCase();
    };
    window.addEventListener("keydown", (function(e) {
        if (keyBindingsMatch(e, config.binding)) {
            e.preventDefault();
            prettify();
        } else if (keyBindingsMatch(e, config.copyBinding)) {
            e.preventDefault();
            prettify(true);
        }
    }));
})();
//# sourceMappingURL=prettier-anything.user.js.map