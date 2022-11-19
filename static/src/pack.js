/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/ 		var prefetchChunks = data[3] || [];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		// chunk prefetching for javascript
/******/ 		prefetchChunks.forEach(function(chunkId) {
/******/ 			if(installedChunks[chunkId] === undefined) {
/******/ 				installedChunks[chunkId] = null;
/******/ 				var link = document.createElement('link');
/******/
/******/ 				if (__webpack_require__.nc) {
/******/ 					link.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				link.rel = "prefetch";
/******/ 				link.as = "script";
/******/ 				link.href = jsonpScriptSrc(chunkId);
/******/ 				document.head.appendChild(link);
/******/ 			}
/******/ 		});
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + chunkId + ".pack.js"
/******/ 	}
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	function promiseResolve() { return Promise.resolve(); }
/******/
/******/ 	var wasmImportObjects = {
/******/ 		"../kbgb-wasm/pkg/kbgb_wasm_bg.wasm": function() {
/******/ 			return {
/******/ 				"./kbgb_wasm_bg.js": {
/******/ 					"__wbindgen_object_drop_ref": function(p0i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["i"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_string_new": function(p0i32,p1i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["j"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbindgen_json_parse": function(p0i32,p1i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["h"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_new_59cb74e423758ede": function() {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["f"]();
/******/ 					},
/******/ 					"__wbg_stack_558ba5917b466edd": function(p0i32,p1i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["g"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_error_4bb6c2a97407129a": function(p0i32,p1i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["d"](p0i32,p1i32);
/******/ 					},
/******/ 					"__wbg_log_386a8115a84a780d": function(p0i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["e"](p0i32);
/******/ 					},
/******/ 					"__wbindgen_throw": function(p0i32,p1i32) {
/******/ 						return installedModules["../kbgb-wasm/pkg/kbgb_wasm_bg.js"].exports["k"](p0i32,p1i32);
/******/ 					}
/******/ 				}
/******/ 			};
/******/ 		},
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/
/******/ 		// Fetch + compile chunk loading for webassembly
/******/
/******/ 		var wasmModules = {"0":["../kbgb-wasm/pkg/kbgb_wasm_bg.wasm"]}[chunkId] || [];
/******/
/******/ 		wasmModules.forEach(function(wasmModuleId) {
/******/ 			var installedWasmModuleData = installedWasmModules[wasmModuleId];
/******/
/******/ 			// a Promise means "currently loading" or "already loaded".
/******/ 			if(installedWasmModuleData)
/******/ 				promises.push(installedWasmModuleData);
/******/ 			else {
/******/ 				var importObject = wasmImportObjects[wasmModuleId]();
/******/ 				var req = fetch(__webpack_require__.p + "" + {"../kbgb-wasm/pkg/kbgb_wasm_bg.wasm":"fdfcc0ffff92b789f068"}[wasmModuleId] + ".module.wasm");
/******/ 				var promise;
/******/ 				if(importObject instanceof Promise && typeof WebAssembly.compileStreaming === 'function') {
/******/ 					promise = Promise.all([WebAssembly.compileStreaming(req), importObject]).then(function(items) {
/******/ 						return WebAssembly.instantiate(items[0], items[1]);
/******/ 					});
/******/ 				} else if(typeof WebAssembly.instantiateStreaming === 'function') {
/******/ 					promise = WebAssembly.instantiateStreaming(req, importObject);
/******/ 				} else {
/******/ 					var bytesPromise = req.then(function(x) { return x.arrayBuffer(); });
/******/ 					promise = bytesPromise.then(function(bytes) {
/******/ 						return WebAssembly.instantiate(bytes, importObject);
/******/ 					});
/******/ 				}
/******/ 				promises.push(installedWasmModules[wasmModuleId] = promise.then(function(res) {
/******/ 					return __webpack_require__.w[wasmModuleId] = (res.instance || res).exports;
/******/ 				}));
/******/ 			}
/******/ 		});
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "src/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// object with all WebAssembly.instance exports
/******/ 	__webpack_require__.w = {};
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	var startupResult = (function() {
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/base.js");
/******/ 	})();
/******/
/******/ 	webpackJsonpCallback([[], {}, 0, [0]]);
/******/ 	return startupResult;
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@ijprest/kle-serial/dist/index.js":
/*!********************************************************!*\
  !*** ./node_modules/@ijprest/kle-serial/dist/index.js ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: Serial */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var JSON5 = __webpack_require__(/*! json5 */ "./node_modules/json5/dist/index.js");
var Key = /** @class */ (function () {
    function Key() {
        this.color = "#cccccc";
        this.labels = [];
        this.textColor = [];
        this.textSize = [];
        this.default = {
            textColor: "#000000",
            textSize: 3
        };
        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
        this.x2 = 0;
        this.y2 = 0;
        this.width2 = 1;
        this.height2 = 1;
        this.rotation_x = 0;
        this.rotation_y = 0;
        this.rotation_angle = 0;
        this.decal = false;
        this.ghost = false;
        this.stepped = false;
        this.nub = false;
        this.profile = "";
        this.sm = ""; // switch mount
        this.sb = ""; // switch brand
        this.st = ""; // switch type
    }
    return Key;
}());
exports.Key = Key;
var KeyboardMetadata = /** @class */ (function () {
    function KeyboardMetadata() {
        this.author = "";
        this.backcolor = "#eeeeee";
        this.background = null;
        this.name = "";
        this.notes = "";
        this.radii = "";
        this.switchBrand = "";
        this.switchMount = "";
        this.switchType = "";
    }
    return KeyboardMetadata;
}());
exports.KeyboardMetadata = KeyboardMetadata;
var Keyboard = /** @class */ (function () {
    function Keyboard() {
        this.meta = new KeyboardMetadata();
        this.keys = [];
    }
    return Keyboard;
}());
exports.Keyboard = Keyboard;
var Serial = /** @class */ (function () {
    function Serial() {
    }
    // Helper to copy an object; doesn't handle loops/circular refs, etc.
    Serial.copy = function (o) {
        if (typeof o !== "object") {
            return o; // primitive value
        }
        else if (o instanceof Array) {
            var result = [];
            for (var i = 0; i < o.length; i++) {
                result[i] = Serial.copy(o[i]);
            }
            return result;
        }
        else {
            var oresult = Object.create(Object.getPrototypeOf(o));
            if (o.constructor)
                oresult.constructor();
            for (var prop in o) {
                if (typeof o[prop] !== "function" || !oresult[prop])
                    oresult[prop] = Serial.copy(o[prop]);
            }
            return oresult;
        }
    };
    Serial.reorderLabelsIn = function (labels, align, def) {
        if (def === void 0) { def = null; }
        var ret = [];
        for (var i = 0; i < labels.length; ++i) {
            if (labels[i] && labels[i] !== def)
                ret[Serial.labelMap[align][i]] = labels[i];
        }
        return ret;
    };
    Serial.deserializeError = function (msg, data) {
        throw "Error: " + msg + (data ? ":\n  " + JSON5.stringify(data) : "");
    };
    Serial.deserialize = function (rows) {
        if (!(rows instanceof Array))
            Serial.deserializeError("expected an array of objects");
        // Initialize with defaults
        var current = new Key();
        var kbd = new Keyboard();
        var align = 4;
        for (var r = 0; r < rows.length; ++r) {
            if (rows[r] instanceof Array) {
                for (var k = 0; k < rows[r].length; ++k) {
                    var item = rows[r][k];
                    if (typeof item === "string") {
                        var newKey = Serial.copy(current);
                        // Calculate some generated values
                        newKey.width2 =
                            newKey.width2 === 0 ? current.width : current.width2;
                        newKey.height2 =
                            newKey.height2 === 0 ? current.height : current.height2;
                        newKey.labels = Serial.reorderLabelsIn(item.split("\n"), align);
                        newKey.textSize = Serial.reorderLabelsIn(newKey.textSize, align);
                        // Clean up the data
                        for (var i = 0; i < 12; ++i) {
                            if (!newKey.labels[i]) {
                                delete newKey.textSize[i];
                                delete newKey.textColor[i];
                            }
                            if (newKey.textSize[i] == newKey.default.textSize)
                                delete newKey.textSize[i];
                            if (newKey.textColor[i] == newKey.default.textColor)
                                delete newKey.textColor[i];
                        }
                        // Add the key!
                        kbd.keys.push(newKey);
                        // Set up for the next key
                        current.x += current.width;
                        current.width = current.height = 1;
                        current.x2 = current.y2 = current.width2 = current.height2 = 0;
                        current.nub = current.stepped = current.decal = false;
                    }
                    else {
                        if (k != 0 &&
                            (item.r != null || item.rx != null || item.ry != null)) {
                            Serial.deserializeError("rotation can only be specified on the first key in a row", item);
                        }
                        if (item.r != null)
                            current.rotation_angle = item.r;
                        if (item.rx != null)
                            current.rotation_x = item.rx;
                        if (item.ry != null)
                            current.rotation_y = item.ry;
                        if (item.a != null)
                            align = item.a;
                        if (item.f) {
                            current.default.textSize = item.f;
                            current.textSize = [];
                        }
                        if (item.f2)
                            for (var i = 1; i < 12; ++i)
                                current.textSize[i] = item.f2;
                        if (item.fa)
                            current.textSize = item.fa;
                        if (item.p)
                            current.profile = item.p;
                        if (item.c)
                            current.color = item.c;
                        if (item.t) {
                            var split = item.t.split("\n");
                            current.default.textColor = split[0];
                            current.textColor = Serial.reorderLabelsIn(split, align, current.default.textColor);
                        }
                        if (item.x)
                            current.x += item.x;
                        if (item.y)
                            current.y += item.y;
                        if (item.w)
                            current.width = current.width2 = item.w;
                        if (item.h)
                            current.height = current.height2 = item.h;
                        if (item.x2)
                            current.x2 = item.x2;
                        if (item.y2)
                            current.y2 = item.y2;
                        if (item.w2)
                            current.width2 = item.w2;
                        if (item.h2)
                            current.height2 = item.h2;
                        if (item.n)
                            current.nub = item.n;
                        if (item.l)
                            current.stepped = item.l;
                        if (item.d)
                            current.decal = item.d;
                        if (item.g != null)
                            current.ghost = item.g;
                        if (item.sm)
                            current.sm = item.sm;
                        if (item.sb)
                            current.sb = item.sb;
                        if (item.st)
                            current.st = item.st;
                    }
                }
                // End of the row
                current.y++;
                current.x = current.rotation_x;
            }
            else if (typeof rows[r] === "object") {
                if (r != 0) {
                    Serial.deserializeError("keyboard metadata must the be first element", rows[r]);
                }
                for (var prop in kbd.meta) {
                    if (rows[r][prop])
                        kbd.meta[prop] = rows[r][prop];
                }
            }
        }
        return kbd;
    };
    Serial.parse = function (json) {
        return Serial.deserialize(JSON5.parse(json));
    };
    // Map from serialized label position to normalized position,
    // depending on the alignment flags.
    // prettier-ignore
    Serial.labelMap = [
        //0  1  2  3  4  5  6  7  8  9 10 11   // align flags
        [0, 6, 2, 8, 9, 11, 3, 5, 1, 4, 7, 10],
        [1, 7, -1, -1, 9, 11, 4, -1, -1, -1, -1, 10],
        [3, -1, 5, -1, 9, 11, -1, -1, 4, -1, -1, 10],
        [4, -1, -1, -1, 9, 11, -1, -1, -1, -1, -1, 10],
        [0, 6, 2, 8, 10, -1, 3, 5, 1, 4, 7, -1],
        [1, 7, -1, -1, 10, -1, 4, -1, -1, -1, -1, -1],
        [3, -1, 5, -1, 10, -1, -1, -1, 4, -1, -1, -1],
        [4, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1],
    ];
    return Serial;
}());
exports.Serial = Serial;


/***/ }),

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/flatqueue/index.mjs":
/*!******************************************!*\
  !*** ./node_modules/flatqueue/index.mjs ***!
  \******************************************/
/*! exports provided: default */
/*! exports used: default */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FlatQueue; });

class FlatQueue {

    constructor() {
        this.ids = [];
        this.values = [];
        this.length = 0;
    }

    clear() {
        this.length = 0;
    }

    push(id, value) {
        let pos = this.length++;
        this.ids[pos] = id;
        this.values[pos] = value;

        while (pos > 0) {
            const parent = (pos - 1) >> 1;
            const parentValue = this.values[parent];
            if (value >= parentValue) break;
            this.ids[pos] = this.ids[parent];
            this.values[pos] = parentValue;
            pos = parent;
        }

        this.ids[pos] = id;
        this.values[pos] = value;
    }

    pop() {
        if (this.length === 0) return undefined;

        const top = this.ids[0];
        this.length--;

        if (this.length > 0) {
            const id = this.ids[0] = this.ids[this.length];
            const value = this.values[0] = this.values[this.length];
            const halfLength = this.length >> 1;
            let pos = 0;

            while (pos < halfLength) {
                let left = (pos << 1) + 1;
                const right = left + 1;
                let bestIndex = this.ids[left];
                let bestValue = this.values[left];
                const rightValue = this.values[right];

                if (right < this.length && rightValue < bestValue) {
                    left = right;
                    bestIndex = this.ids[right];
                    bestValue = rightValue;
                }
                if (bestValue >= value) break;

                this.ids[pos] = bestIndex;
                this.values[pos] = bestValue;
                pos = left;
            }

            this.ids[pos] = id;
            this.values[pos] = value;
        }

        return top;
    }

    peek() {
        if (this.length === 0) return undefined;
        return this.ids[0];
    }

    peekValue() {
        if (this.length === 0) return undefined;
        return this.values[0];
    }
}


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/json5/dist/index.js":
/*!******************************************!*\
  !*** ./node_modules/json5/dist/index.js ***!
  \******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') { __g = global; } // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.5' };
	if (typeof __e == 'number') { __e = core; } // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) { throw TypeError(it + ' is not an object!'); }
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document) && _isObject(document.createElement);
	var _domCreate = function (it) {
	  return is ? document.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) { return it; }
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) { return val; }
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) { try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ } }
	  if ('get' in Attributes || 'set' in Attributes) { throw TypeError('Accessors not supported!'); }
	  if ('value' in Attributes) { O[P] = Attributes.value; }
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var _functionToString = _shared('native-function-to-string', Function.toString);

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');

	var TO_STRING = 'toString';
	var TPL = ('' + _functionToString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return _functionToString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) { _has(val, 'name') || _hide(val, 'name', key); }
	  if (O[key] === val) { return; }
	  if (isFunction) { _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key))); }
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || _functionToString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') { throw TypeError(it + ' is not a function!'); }
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) { return fn; }
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) { source = name; }
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) { _redefine(target, key, out, type & $export.U); }
	    // export
	    if (exports[key] != out) { _hide(exports, key, exp); }
	    if (IS_PROTO && expProto[key] != out) { expProto[key] = out; }
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) { throw TypeError("Can't call method on  " + it); }
	  return it;
	};

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) { return TO_STRING ? '' : undefined; }
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var $at = _stringAt(false);
	_export(_export.P, 'String', {
	  // 21.1.3.3 String.prototype.codePointAt(pos)
	  codePointAt: function codePointAt(pos) {
	    return $at(this, pos);
	  }
	});

	var codePointAt = _core.String.codePointAt;

	var max = Math.max;
	var min = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

	var fromCharCode = String.fromCharCode;
	var $fromCodePoint = String.fromCodePoint;

	// length should be 1, old FF problem
	_export(_export.S + _export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
	  // 21.1.2.2 String.fromCodePoint(...codePoints)
	  fromCodePoint: function fromCodePoint(x) {
	    var arguments$1 = arguments;
	 // eslint-disable-line no-unused-vars
	    var res = [];
	    var aLen = arguments.length;
	    var i = 0;
	    var code;
	    while (aLen > i) {
	      code = +arguments$1[i++];
	      if (_toAbsoluteIndex(code, 0x10ffff) !== code) { throw RangeError(code + ' is not a valid code point'); }
	      res.push(code < 0x10000
	        ? fromCharCode(code)
	        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
	      );
	    } return res.join('');
	  }
	});

	var fromCodePoint = _core.String.fromCodePoint;

	// This is a generated file. Do not edit.
	var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
	var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
	var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;

	var unicode = {
		Space_Separator: Space_Separator,
		ID_Start: ID_Start,
		ID_Continue: ID_Continue
	};

	var util = {
	    isSpaceSeparator: function isSpaceSeparator (c) {
	        return typeof c === 'string' && unicode.Space_Separator.test(c)
	    },

	    isIdStartChar: function isIdStartChar (c) {
	        return typeof c === 'string' && (
	            (c >= 'a' && c <= 'z') ||
	        (c >= 'A' && c <= 'Z') ||
	        (c === '$') || (c === '_') ||
	        unicode.ID_Start.test(c)
	        )
	    },

	    isIdContinueChar: function isIdContinueChar (c) {
	        return typeof c === 'string' && (
	            (c >= 'a' && c <= 'z') ||
	        (c >= 'A' && c <= 'Z') ||
	        (c >= '0' && c <= '9') ||
	        (c === '$') || (c === '_') ||
	        (c === '\u200C') || (c === '\u200D') ||
	        unicode.ID_Continue.test(c)
	        )
	    },

	    isDigit: function isDigit (c) {
	        return typeof c === 'string' && /[0-9]/.test(c)
	    },

	    isHexDigit: function isHexDigit (c) {
	        return typeof c === 'string' && /[0-9A-Fa-f]/.test(c)
	    },
	};

	var source;
	var parseState;
	var stack;
	var pos;
	var line;
	var column;
	var token;
	var key;
	var root;

	var parse = function parse (text, reviver) {
	    source = String(text);
	    parseState = 'start';
	    stack = [];
	    pos = 0;
	    line = 1;
	    column = 0;
	    token = undefined;
	    key = undefined;
	    root = undefined;

	    do {
	        token = lex();

	        // This code is unreachable.
	        // if (!parseStates[parseState]) {
	        //     throw invalidParseState()
	        // }

	        parseStates[parseState]();
	    } while (token.type !== 'eof')

	    if (typeof reviver === 'function') {
	        return internalize({'': root}, '', reviver)
	    }

	    return root
	};

	function internalize (holder, name, reviver) {
	    var value = holder[name];
	    if (value != null && typeof value === 'object') {
	        for (var key in value) {
	            var replacement = internalize(value, key, reviver);
	            if (replacement === undefined) {
	                delete value[key];
	            } else {
	                value[key] = replacement;
	            }
	        }
	    }

	    return reviver.call(holder, name, value)
	}

	var lexState;
	var buffer;
	var doubleQuote;
	var sign;
	var c;

	function lex () {
	    lexState = 'default';
	    buffer = '';
	    doubleQuote = false;
	    sign = 1;

	    for (;;) {
	        c = peek();

	        // This code is unreachable.
	        // if (!lexStates[lexState]) {
	        //     throw invalidLexState(lexState)
	        // }

	        var token = lexStates[lexState]();
	        if (token) {
	            return token
	        }
	    }
	}

	function peek () {
	    if (source[pos]) {
	        return String.fromCodePoint(source.codePointAt(pos))
	    }
	}

	function read () {
	    var c = peek();

	    if (c === '\n') {
	        line++;
	        column = 0;
	    } else if (c) {
	        column += c.length;
	    } else {
	        column++;
	    }

	    if (c) {
	        pos += c.length;
	    }

	    return c
	}

	var lexStates = {
	    default: function default$1 () {
	        switch (c) {
	        case '\t':
	        case '\v':
	        case '\f':
	        case ' ':
	        case '\u00A0':
	        case '\uFEFF':
	        case '\n':
	        case '\r':
	        case '\u2028':
	        case '\u2029':
	            read();
	            return

	        case '/':
	            read();
	            lexState = 'comment';
	            return

	        case undefined:
	            read();
	            return newToken('eof')
	        }

	        if (util.isSpaceSeparator(c)) {
	            read();
	            return
	        }

	        // This code is unreachable.
	        // if (!lexStates[parseState]) {
	        //     throw invalidLexState(parseState)
	        // }

	        return lexStates[parseState]()
	    },

	    comment: function comment () {
	        switch (c) {
	        case '*':
	            read();
	            lexState = 'multiLineComment';
	            return

	        case '/':
	            read();
	            lexState = 'singleLineComment';
	            return
	        }

	        throw invalidChar(read())
	    },

	    multiLineComment: function multiLineComment () {
	        switch (c) {
	        case '*':
	            read();
	            lexState = 'multiLineCommentAsterisk';
	            return

	        case undefined:
	            throw invalidChar(read())
	        }

	        read();
	    },

	    multiLineCommentAsterisk: function multiLineCommentAsterisk () {
	        switch (c) {
	        case '*':
	            read();
	            return

	        case '/':
	            read();
	            lexState = 'default';
	            return

	        case undefined:
	            throw invalidChar(read())
	        }

	        read();
	        lexState = 'multiLineComment';
	    },

	    singleLineComment: function singleLineComment () {
	        switch (c) {
	        case '\n':
	        case '\r':
	        case '\u2028':
	        case '\u2029':
	            read();
	            lexState = 'default';
	            return

	        case undefined:
	            read();
	            return newToken('eof')
	        }

	        read();
	    },

	    value: function value () {
	        switch (c) {
	        case '{':
	        case '[':
	            return newToken('punctuator', read())

	        case 'n':
	            read();
	            literal('ull');
	            return newToken('null', null)

	        case 't':
	            read();
	            literal('rue');
	            return newToken('boolean', true)

	        case 'f':
	            read();
	            literal('alse');
	            return newToken('boolean', false)

	        case '-':
	        case '+':
	            if (read() === '-') {
	                sign = -1;
	            }

	            lexState = 'sign';
	            return

	        case '.':
	            buffer = read();
	            lexState = 'decimalPointLeading';
	            return

	        case '0':
	            buffer = read();
	            lexState = 'zero';
	            return

	        case '1':
	        case '2':
	        case '3':
	        case '4':
	        case '5':
	        case '6':
	        case '7':
	        case '8':
	        case '9':
	            buffer = read();
	            lexState = 'decimalInteger';
	            return

	        case 'I':
	            read();
	            literal('nfinity');
	            return newToken('numeric', Infinity)

	        case 'N':
	            read();
	            literal('aN');
	            return newToken('numeric', NaN)

	        case '"':
	        case "'":
	            doubleQuote = (read() === '"');
	            buffer = '';
	            lexState = 'string';
	            return
	        }

	        throw invalidChar(read())
	    },

	    identifierNameStartEscape: function identifierNameStartEscape () {
	        if (c !== 'u') {
	            throw invalidChar(read())
	        }

	        read();
	        var u = unicodeEscape();
	        switch (u) {
	        case '$':
	        case '_':
	            break

	        default:
	            if (!util.isIdStartChar(u)) {
	                throw invalidIdentifier()
	            }

	            break
	        }

	        buffer += u;
	        lexState = 'identifierName';
	    },

	    identifierName: function identifierName () {
	        switch (c) {
	        case '$':
	        case '_':
	        case '\u200C':
	        case '\u200D':
	            buffer += read();
	            return

	        case '\\':
	            read();
	            lexState = 'identifierNameEscape';
	            return
	        }

	        if (util.isIdContinueChar(c)) {
	            buffer += read();
	            return
	        }

	        return newToken('identifier', buffer)
	    },

	    identifierNameEscape: function identifierNameEscape () {
	        if (c !== 'u') {
	            throw invalidChar(read())
	        }

	        read();
	        var u = unicodeEscape();
	        switch (u) {
	        case '$':
	        case '_':
	        case '\u200C':
	        case '\u200D':
	            break

	        default:
	            if (!util.isIdContinueChar(u)) {
	                throw invalidIdentifier()
	            }

	            break
	        }

	        buffer += u;
	        lexState = 'identifierName';
	    },

	    sign: function sign$1 () {
	        switch (c) {
	        case '.':
	            buffer = read();
	            lexState = 'decimalPointLeading';
	            return

	        case '0':
	            buffer = read();
	            lexState = 'zero';
	            return

	        case '1':
	        case '2':
	        case '3':
	        case '4':
	        case '5':
	        case '6':
	        case '7':
	        case '8':
	        case '9':
	            buffer = read();
	            lexState = 'decimalInteger';
	            return

	        case 'I':
	            read();
	            literal('nfinity');
	            return newToken('numeric', sign * Infinity)

	        case 'N':
	            read();
	            literal('aN');
	            return newToken('numeric', NaN)
	        }

	        throw invalidChar(read())
	    },

	    zero: function zero () {
	        switch (c) {
	        case '.':
	            buffer += read();
	            lexState = 'decimalPoint';
	            return

	        case 'e':
	        case 'E':
	            buffer += read();
	            lexState = 'decimalExponent';
	            return

	        case 'x':
	        case 'X':
	            buffer += read();
	            lexState = 'hexadecimal';
	            return
	        }

	        return newToken('numeric', sign * 0)
	    },

	    decimalInteger: function decimalInteger () {
	        switch (c) {
	        case '.':
	            buffer += read();
	            lexState = 'decimalPoint';
	            return

	        case 'e':
	        case 'E':
	            buffer += read();
	            lexState = 'decimalExponent';
	            return
	        }

	        if (util.isDigit(c)) {
	            buffer += read();
	            return
	        }

	        return newToken('numeric', sign * Number(buffer))
	    },

	    decimalPointLeading: function decimalPointLeading () {
	        if (util.isDigit(c)) {
	            buffer += read();
	            lexState = 'decimalFraction';
	            return
	        }

	        throw invalidChar(read())
	    },

	    decimalPoint: function decimalPoint () {
	        switch (c) {
	        case 'e':
	        case 'E':
	            buffer += read();
	            lexState = 'decimalExponent';
	            return
	        }

	        if (util.isDigit(c)) {
	            buffer += read();
	            lexState = 'decimalFraction';
	            return
	        }

	        return newToken('numeric', sign * Number(buffer))
	    },

	    decimalFraction: function decimalFraction () {
	        switch (c) {
	        case 'e':
	        case 'E':
	            buffer += read();
	            lexState = 'decimalExponent';
	            return
	        }

	        if (util.isDigit(c)) {
	            buffer += read();
	            return
	        }

	        return newToken('numeric', sign * Number(buffer))
	    },

	    decimalExponent: function decimalExponent () {
	        switch (c) {
	        case '+':
	        case '-':
	            buffer += read();
	            lexState = 'decimalExponentSign';
	            return
	        }

	        if (util.isDigit(c)) {
	            buffer += read();
	            lexState = 'decimalExponentInteger';
	            return
	        }

	        throw invalidChar(read())
	    },

	    decimalExponentSign: function decimalExponentSign () {
	        if (util.isDigit(c)) {
	            buffer += read();
	            lexState = 'decimalExponentInteger';
	            return
	        }

	        throw invalidChar(read())
	    },

	    decimalExponentInteger: function decimalExponentInteger () {
	        if (util.isDigit(c)) {
	            buffer += read();
	            return
	        }

	        return newToken('numeric', sign * Number(buffer))
	    },

	    hexadecimal: function hexadecimal () {
	        if (util.isHexDigit(c)) {
	            buffer += read();
	            lexState = 'hexadecimalInteger';
	            return
	        }

	        throw invalidChar(read())
	    },

	    hexadecimalInteger: function hexadecimalInteger () {
	        if (util.isHexDigit(c)) {
	            buffer += read();
	            return
	        }

	        return newToken('numeric', sign * Number(buffer))
	    },

	    string: function string () {
	        switch (c) {
	        case '\\':
	            read();
	            buffer += escape();
	            return

	        case '"':
	            if (doubleQuote) {
	                read();
	                return newToken('string', buffer)
	            }

	            buffer += read();
	            return

	        case "'":
	            if (!doubleQuote) {
	                read();
	                return newToken('string', buffer)
	            }

	            buffer += read();
	            return

	        case '\n':
	        case '\r':
	            throw invalidChar(read())

	        case '\u2028':
	        case '\u2029':
	            separatorChar(c);
	            break

	        case undefined:
	            throw invalidChar(read())
	        }

	        buffer += read();
	    },

	    start: function start () {
	        switch (c) {
	        case '{':
	        case '[':
	            return newToken('punctuator', read())

	        // This code is unreachable since the default lexState handles eof.
	        // case undefined:
	        //     return newToken('eof')
	        }

	        lexState = 'value';
	    },

	    beforePropertyName: function beforePropertyName () {
	        switch (c) {
	        case '$':
	        case '_':
	            buffer = read();
	            lexState = 'identifierName';
	            return

	        case '\\':
	            read();
	            lexState = 'identifierNameStartEscape';
	            return

	        case '}':
	            return newToken('punctuator', read())

	        case '"':
	        case "'":
	            doubleQuote = (read() === '"');
	            lexState = 'string';
	            return
	        }

	        if (util.isIdStartChar(c)) {
	            buffer += read();
	            lexState = 'identifierName';
	            return
	        }

	        throw invalidChar(read())
	    },

	    afterPropertyName: function afterPropertyName () {
	        if (c === ':') {
	            return newToken('punctuator', read())
	        }

	        throw invalidChar(read())
	    },

	    beforePropertyValue: function beforePropertyValue () {
	        lexState = 'value';
	    },

	    afterPropertyValue: function afterPropertyValue () {
	        switch (c) {
	        case ',':
	        case '}':
	            return newToken('punctuator', read())
	        }

	        throw invalidChar(read())
	    },

	    beforeArrayValue: function beforeArrayValue () {
	        if (c === ']') {
	            return newToken('punctuator', read())
	        }

	        lexState = 'value';
	    },

	    afterArrayValue: function afterArrayValue () {
	        switch (c) {
	        case ',':
	        case ']':
	            return newToken('punctuator', read())
	        }

	        throw invalidChar(read())
	    },

	    end: function end () {
	        // This code is unreachable since it's handled by the default lexState.
	        // if (c === undefined) {
	        //     read()
	        //     return newToken('eof')
	        // }

	        throw invalidChar(read())
	    },
	};

	function newToken (type, value) {
	    return {
	        type: type,
	        value: value,
	        line: line,
	        column: column,
	    }
	}

	function literal (s) {
	    for (var i = 0, list = s; i < list.length; i += 1) {
	        var c = list[i];

	        var p = peek();

	        if (p !== c) {
	            throw invalidChar(read())
	        }

	        read();
	    }
	}

	function escape () {
	    var c = peek();
	    switch (c) {
	    case 'b':
	        read();
	        return '\b'

	    case 'f':
	        read();
	        return '\f'

	    case 'n':
	        read();
	        return '\n'

	    case 'r':
	        read();
	        return '\r'

	    case 't':
	        read();
	        return '\t'

	    case 'v':
	        read();
	        return '\v'

	    case '0':
	        read();
	        if (util.isDigit(peek())) {
	            throw invalidChar(read())
	        }

	        return '\0'

	    case 'x':
	        read();
	        return hexEscape()

	    case 'u':
	        read();
	        return unicodeEscape()

	    case '\n':
	    case '\u2028':
	    case '\u2029':
	        read();
	        return ''

	    case '\r':
	        read();
	        if (peek() === '\n') {
	            read();
	        }

	        return ''

	    case '1':
	    case '2':
	    case '3':
	    case '4':
	    case '5':
	    case '6':
	    case '7':
	    case '8':
	    case '9':
	        throw invalidChar(read())

	    case undefined:
	        throw invalidChar(read())
	    }

	    return read()
	}

	function hexEscape () {
	    var buffer = '';
	    var c = peek();

	    if (!util.isHexDigit(c)) {
	        throw invalidChar(read())
	    }

	    buffer += read();

	    c = peek();
	    if (!util.isHexDigit(c)) {
	        throw invalidChar(read())
	    }

	    buffer += read();

	    return String.fromCodePoint(parseInt(buffer, 16))
	}

	function unicodeEscape () {
	    var buffer = '';
	    var count = 4;

	    while (count-- > 0) {
	        var c = peek();
	        if (!util.isHexDigit(c)) {
	            throw invalidChar(read())
	        }

	        buffer += read();
	    }

	    return String.fromCodePoint(parseInt(buffer, 16))
	}

	var parseStates = {
	    start: function start () {
	        if (token.type === 'eof') {
	            throw invalidEOF()
	        }

	        push();
	    },

	    beforePropertyName: function beforePropertyName () {
	        switch (token.type) {
	        case 'identifier':
	        case 'string':
	            key = token.value;
	            parseState = 'afterPropertyName';
	            return

	        case 'punctuator':
	            // This code is unreachable since it's handled by the lexState.
	            // if (token.value !== '}') {
	            //     throw invalidToken()
	            // }

	            pop();
	            return

	        case 'eof':
	            throw invalidEOF()
	        }

	        // This code is unreachable since it's handled by the lexState.
	        // throw invalidToken()
	    },

	    afterPropertyName: function afterPropertyName () {
	        // This code is unreachable since it's handled by the lexState.
	        // if (token.type !== 'punctuator' || token.value !== ':') {
	        //     throw invalidToken()
	        // }

	        if (token.type === 'eof') {
	            throw invalidEOF()
	        }

	        parseState = 'beforePropertyValue';
	    },

	    beforePropertyValue: function beforePropertyValue () {
	        if (token.type === 'eof') {
	            throw invalidEOF()
	        }

	        push();
	    },

	    beforeArrayValue: function beforeArrayValue () {
	        if (token.type === 'eof') {
	            throw invalidEOF()
	        }

	        if (token.type === 'punctuator' && token.value === ']') {
	            pop();
	            return
	        }

	        push();
	    },

	    afterPropertyValue: function afterPropertyValue () {
	        // This code is unreachable since it's handled by the lexState.
	        // if (token.type !== 'punctuator') {
	        //     throw invalidToken()
	        // }

	        if (token.type === 'eof') {
	            throw invalidEOF()
	        }

	        switch (token.value) {
	        case ',':
	            parseState = 'beforePropertyName';
	            return

	        case '}':
	            pop();
	        }

	        // This code is unreachable since it's handled by the lexState.
	        // throw invalidToken()
	    },

	    afterArrayValue: function afterArrayValue () {
	        // This code is unreachable since it's handled by the lexState.
	        // if (token.type !== 'punctuator') {
	        //     throw invalidToken()
	        // }

	        if (token.type === 'eof') {
	            throw invalidEOF()
	        }

	        switch (token.value) {
	        case ',':
	            parseState = 'beforeArrayValue';
	            return

	        case ']':
	            pop();
	        }

	        // This code is unreachable since it's handled by the lexState.
	        // throw invalidToken()
	    },

	    end: function end () {
	        // This code is unreachable since it's handled by the lexState.
	        // if (token.type !== 'eof') {
	        //     throw invalidToken()
	        // }
	    },
	};

	function push () {
	    var value;

	    switch (token.type) {
	    case 'punctuator':
	        switch (token.value) {
	        case '{':
	            value = {};
	            break

	        case '[':
	            value = [];
	            break
	        }

	        break

	    case 'null':
	    case 'boolean':
	    case 'numeric':
	    case 'string':
	        value = token.value;
	        break

	    // This code is unreachable.
	    // default:
	    //     throw invalidToken()
	    }

	    if (root === undefined) {
	        root = value;
	    } else {
	        var parent = stack[stack.length - 1];
	        if (Array.isArray(parent)) {
	            parent.push(value);
	        } else {
	            parent[key] = value;
	        }
	    }

	    if (value !== null && typeof value === 'object') {
	        stack.push(value);

	        if (Array.isArray(value)) {
	            parseState = 'beforeArrayValue';
	        } else {
	            parseState = 'beforePropertyName';
	        }
	    } else {
	        var current = stack[stack.length - 1];
	        if (current == null) {
	            parseState = 'end';
	        } else if (Array.isArray(current)) {
	            parseState = 'afterArrayValue';
	        } else {
	            parseState = 'afterPropertyValue';
	        }
	    }
	}

	function pop () {
	    stack.pop();

	    var current = stack[stack.length - 1];
	    if (current == null) {
	        parseState = 'end';
	    } else if (Array.isArray(current)) {
	        parseState = 'afterArrayValue';
	    } else {
	        parseState = 'afterPropertyValue';
	    }
	}

	// This code is unreachable.
	// function invalidParseState () {
	//     return new Error(`JSON5: invalid parse state '${parseState}'`)
	// }

	// This code is unreachable.
	// function invalidLexState (state) {
	//     return new Error(`JSON5: invalid lex state '${state}'`)
	// }

	function invalidChar (c) {
	    if (c === undefined) {
	        return syntaxError(("JSON5: invalid end of input at " + line + ":" + column))
	    }

	    return syntaxError(("JSON5: invalid character '" + (formatChar(c)) + "' at " + line + ":" + column))
	}

	function invalidEOF () {
	    return syntaxError(("JSON5: invalid end of input at " + line + ":" + column))
	}

	// This code is unreachable.
	// function invalidToken () {
	//     if (token.type === 'eof') {
	//         return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
	//     }

	//     const c = String.fromCodePoint(token.value.codePointAt(0))
	//     return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
	// }

	function invalidIdentifier () {
	    column -= 5;
	    return syntaxError(("JSON5: invalid identifier character at " + line + ":" + column))
	}

	function separatorChar (c) {
	    console.warn(("JSON5: '" + (formatChar(c)) + "' in strings is not valid ECMAScript; consider escaping"));
	}

	function formatChar (c) {
	    var replacements = {
	        "'": "\\'",
	        '"': '\\"',
	        '\\': '\\\\',
	        '\b': '\\b',
	        '\f': '\\f',
	        '\n': '\\n',
	        '\r': '\\r',
	        '\t': '\\t',
	        '\v': '\\v',
	        '\0': '\\0',
	        '\u2028': '\\u2028',
	        '\u2029': '\\u2029',
	    };

	    if (replacements[c]) {
	        return replacements[c]
	    }

	    if (c < ' ') {
	        var hexString = c.charCodeAt(0).toString(16);
	        return '\\x' + ('00' + hexString).substring(hexString.length)
	    }

	    return c
	}

	function syntaxError (message) {
	    var err = new SyntaxError(message);
	    err.lineNumber = line;
	    err.columnNumber = column;
	    return err
	}

	var stringify = function stringify (value, replacer, space) {
	    var stack = [];
	    var indent = '';
	    var propertyList;
	    var replacerFunc;
	    var gap = '';
	    var quote;

	    if (
	        replacer != null &&
	        typeof replacer === 'object' &&
	        !Array.isArray(replacer)
	    ) {
	        space = replacer.space;
	        quote = replacer.quote;
	        replacer = replacer.replacer;
	    }

	    if (typeof replacer === 'function') {
	        replacerFunc = replacer;
	    } else if (Array.isArray(replacer)) {
	        propertyList = [];
	        for (var i = 0, list = replacer; i < list.length; i += 1) {
	            var v = list[i];

	            var item = (void 0);

	            if (typeof v === 'string') {
	                item = v;
	            } else if (
	                typeof v === 'number' ||
	                v instanceof String ||
	                v instanceof Number
	            ) {
	                item = String(v);
	            }

	            if (item !== undefined && propertyList.indexOf(item) < 0) {
	                propertyList.push(item);
	            }
	        }
	    }

	    if (space instanceof Number) {
	        space = Number(space);
	    } else if (space instanceof String) {
	        space = String(space);
	    }

	    if (typeof space === 'number') {
	        if (space > 0) {
	            space = Math.min(10, Math.floor(space));
	            gap = '          '.substr(0, space);
	        }
	    } else if (typeof space === 'string') {
	        gap = space.substr(0, 10);
	    }

	    return serializeProperty('', {'': value})

	    function serializeProperty (key, holder) {
	        var value = holder[key];
	        if (value != null) {
	            if (typeof value.toJSON5 === 'function') {
	                value = value.toJSON5(key);
	            } else if (typeof value.toJSON === 'function') {
	                value = value.toJSON(key);
	            }
	        }

	        if (replacerFunc) {
	            value = replacerFunc.call(holder, key, value);
	        }

	        if (value instanceof Number) {
	            value = Number(value);
	        } else if (value instanceof String) {
	            value = String(value);
	        } else if (value instanceof Boolean) {
	            value = value.valueOf();
	        }

	        switch (value) {
	        case null: return 'null'
	        case true: return 'true'
	        case false: return 'false'
	        }

	        if (typeof value === 'string') {
	            return quoteString(value, false)
	        }

	        if (typeof value === 'number') {
	            return String(value)
	        }

	        if (typeof value === 'object') {
	            return Array.isArray(value) ? serializeArray(value) : serializeObject(value)
	        }

	        return undefined
	    }

	    function quoteString (value) {
	        var quotes = {
	            "'": 0.1,
	            '"': 0.2,
	        };

	        var replacements = {
	            "'": "\\'",
	            '"': '\\"',
	            '\\': '\\\\',
	            '\b': '\\b',
	            '\f': '\\f',
	            '\n': '\\n',
	            '\r': '\\r',
	            '\t': '\\t',
	            '\v': '\\v',
	            '\0': '\\0',
	            '\u2028': '\\u2028',
	            '\u2029': '\\u2029',
	        };

	        var product = '';

	        for (var i = 0; i < value.length; i++) {
	            var c = value[i];
	            switch (c) {
	            case "'":
	            case '"':
	                quotes[c]++;
	                product += c;
	                continue

	            case '\0':
	                if (util.isDigit(value[i + 1])) {
	                    product += '\\x00';
	                    continue
	                }
	            }

	            if (replacements[c]) {
	                product += replacements[c];
	                continue
	            }

	            if (c < ' ') {
	                var hexString = c.charCodeAt(0).toString(16);
	                product += '\\x' + ('00' + hexString).substring(hexString.length);
	                continue
	            }

	            product += c;
	        }

	        var quoteChar = quote || Object.keys(quotes).reduce(function (a, b) { return (quotes[a] < quotes[b]) ? a : b; });

	        product = product.replace(new RegExp(quoteChar, 'g'), replacements[quoteChar]);

	        return quoteChar + product + quoteChar
	    }

	    function serializeObject (value) {
	        if (stack.indexOf(value) >= 0) {
	            throw TypeError('Converting circular structure to JSON5')
	        }

	        stack.push(value);

	        var stepback = indent;
	        indent = indent + gap;

	        var keys = propertyList || Object.keys(value);
	        var partial = [];
	        for (var i = 0, list = keys; i < list.length; i += 1) {
	            var key = list[i];

	            var propertyString = serializeProperty(key, value);
	            if (propertyString !== undefined) {
	                var member = serializeKey(key) + ':';
	                if (gap !== '') {
	                    member += ' ';
	                }
	                member += propertyString;
	                partial.push(member);
	            }
	        }

	        var final;
	        if (partial.length === 0) {
	            final = '{}';
	        } else {
	            var properties;
	            if (gap === '') {
	                properties = partial.join(',');
	                final = '{' + properties + '}';
	            } else {
	                var separator = ',\n' + indent;
	                properties = partial.join(separator);
	                final = '{\n' + indent + properties + ',\n' + stepback + '}';
	            }
	        }

	        stack.pop();
	        indent = stepback;
	        return final
	    }

	    function serializeKey (key) {
	        if (key.length === 0) {
	            return quoteString(key, true)
	        }

	        var firstChar = String.fromCodePoint(key.codePointAt(0));
	        if (!util.isIdStartChar(firstChar)) {
	            return quoteString(key, true)
	        }

	        for (var i = firstChar.length; i < key.length; i++) {
	            if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
	                return quoteString(key, true)
	            }
	        }

	        return key
	    }

	    function serializeArray (value) {
	        if (stack.indexOf(value) >= 0) {
	            throw TypeError('Converting circular structure to JSON5')
	        }

	        stack.push(value);

	        var stepback = indent;
	        indent = indent + gap;

	        var partial = [];
	        for (var i = 0; i < value.length; i++) {
	            var propertyString = serializeProperty(String(i), value);
	            partial.push((propertyString !== undefined) ? propertyString : 'null');
	        }

	        var final;
	        if (partial.length === 0) {
	            final = '[]';
	        } else {
	            if (gap === '') {
	                var properties = partial.join(',');
	                final = '[' + properties + ']';
	            } else {
	                var separator = ',\n' + indent;
	                var properties$1 = partial.join(separator);
	                final = '[\n' + indent + properties$1 + ',\n' + stepback + ']';
	            }
	        }

	        stack.pop();
	        indent = stepback;
	        return final
	    }
	};

	var JSON5 = {
	    parse: parse,
	    stringify: stringify,
	};

	var lib = JSON5;

	var es5 = lib;

	return es5;

})));


/***/ }),

/***/ "./node_modules/jszip/dist/jszip.js":
/*!******************************************!*\
  !*** ./node_modules/jszip/dist/jszip.js ***!
  \******************************************/
/*! no static exports found */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, global, setImmediate) {var require;var require;/*!

JSZip v3.5.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return require(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var support = require('./support');
// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";


// public method for encoding
exports.encode = function(input) {
    var output = [];
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0, len = input.length, remainingBytes = len;

    var isArray = utils.getTypeOf(input) !== "string";
    while (i < input.length) {
        remainingBytes = len - i;

        if (!isArray) {
            chr1 = input.charCodeAt(i++);
            chr2 = i < len ? input.charCodeAt(i++) : 0;
            chr3 = i < len ? input.charCodeAt(i++) : 0;
        } else {
            chr1 = input[i++];
            chr2 = i < len ? input[i++] : 0;
            chr3 = i < len ? input[i++] : 0;
        }

        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = remainingBytes > 1 ? (((chr2 & 15) << 2) | (chr3 >> 6)) : 64;
        enc4 = remainingBytes > 2 ? (chr3 & 63) : 64;

        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));

    }

    return output.join("");
};

// public method for decoding
exports.decode = function(input) {
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0, resultIndex = 0;

    var dataUrlPrefix = "data:";

    if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
        // This is a common error: people give a data url
        // (data:image/png;base64,iVBOR...) with a {base64: true} and
        // wonders why things don't work.
        // We can detect that the string input looks like a data url but we
        // *can't* be sure it is one: removing everything up to the comma would
        // be too dangerous.
        throw new Error("Invalid base64 input, it looks like a data url.");
    }

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    var totalLength = input.length * 3 / 4;
    if(input.charAt(input.length - 1) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if(input.charAt(input.length - 2) === _keyStr.charAt(64)) {
        totalLength--;
    }
    if (totalLength % 1 !== 0) {
        // totalLength is not an integer, the length does not match a valid
        // base64 content. That can happen if:
        // - the input is not a base64 content
        // - the input is *almost* a base64 content, with a extra chars at the
        //   beginning or at the end
        // - the input uses a base64 variant (base64url for example)
        throw new Error("Invalid base64 input, bad content length.");
    }
    var output;
    if (support.uint8array) {
        output = new Uint8Array(totalLength|0);
    } else {
        output = new Array(totalLength|0);
    }

    while (i < input.length) {

        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));

        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;

        output[resultIndex++] = chr1;

        if (enc3 !== 64) {
            output[resultIndex++] = chr2;
        }
        if (enc4 !== 64) {
            output[resultIndex++] = chr3;
        }

    }

    return output;
};

},{"./support":30,"./utils":32}],2:[function(require,module,exports){
'use strict';

var external = require("./external");
var DataWorker = require('./stream/DataWorker');
var DataLengthProbe = require('./stream/DataLengthProbe');
var Crc32Probe = require('./stream/Crc32Probe');
var DataLengthProbe = require('./stream/DataLengthProbe');

/**
 * Represent a compressed object, with everything needed to decompress it.
 * @constructor
 * @param {number} compressedSize the size of the data compressed.
 * @param {number} uncompressedSize the size of the data after decompression.
 * @param {number} crc32 the crc32 of the decompressed file.
 * @param {object} compression the type of compression, see lib/compressions.js.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
 */
function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
    this.compressedSize = compressedSize;
    this.uncompressedSize = uncompressedSize;
    this.crc32 = crc32;
    this.compression = compression;
    this.compressedContent = data;
}

CompressedObject.prototype = {
    /**
     * Create a worker to get the uncompressed content.
     * @return {GenericWorker} the worker.
     */
    getContentWorker : function () {
        var worker = new DataWorker(external.Promise.resolve(this.compressedContent))
        .pipe(this.compression.uncompressWorker())
        .pipe(new DataLengthProbe("data_length"));

        var that = this;
        worker.on("end", function () {
            if(this.streamInfo['data_length'] !== that.uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
            }
        });
        return worker;
    },
    /**
     * Create a worker to get the compressed content.
     * @return {GenericWorker} the worker.
     */
    getCompressedWorker : function () {
        return new DataWorker(external.Promise.resolve(this.compressedContent))
        .withStreamInfo("compressedSize", this.compressedSize)
        .withStreamInfo("uncompressedSize", this.uncompressedSize)
        .withStreamInfo("crc32", this.crc32)
        .withStreamInfo("compression", this.compression)
        ;
    }
};

/**
 * Chain the given worker with other workers to compress the content with the
 * given compression.
 * @param {GenericWorker} uncompressedWorker the worker to pipe.
 * @param {Object} compression the compression object.
 * @param {Object} compressionOptions the options to use when compressing.
 * @return {GenericWorker} the new worker compressing the content.
 */
CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
    return uncompressedWorker
    .pipe(new Crc32Probe())
    .pipe(new DataLengthProbe("uncompressedSize"))
    .pipe(compression.compressWorker(compressionOptions))
    .pipe(new DataLengthProbe("compressedSize"))
    .withStreamInfo("compression", compression);
};

module.exports = CompressedObject;

},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(require,module,exports){
'use strict';

var GenericWorker = require("./stream/GenericWorker");

exports.STORE = {
    magic: "\x00\x00",
    compressWorker : function (compressionOptions) {
        return new GenericWorker("STORE compression");
    },
    uncompressWorker : function () {
        return new GenericWorker("STORE decompression");
    }
};
exports.DEFLATE = require('./flate');

},{"./flate":7,"./stream/GenericWorker":28}],4:[function(require,module,exports){
'use strict';

var utils = require('./utils');

/**
 * The following functions come from pako, from pako/lib/zlib/crc32.js
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Use ordinary array, since untyped makes no boost here
function makeTable() {
    var c, table = [];

    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        table[n] = c;
    }

    return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

// That's all for the pako functions.

/**
 * Compute the crc32 of a string.
 * This is almost the same as the function crc32, but for strings. Using the
 * same function for the two use cases leads to horrible performances.
 * @param {Number} crc the starting value of the crc.
 * @param {String} str the string to use.
 * @param {Number} len the length of the string.
 * @param {Number} pos the starting position for the crc32 computation.
 * @return {Number} the computed crc32.
 */
function crc32str(crc, str, len, pos) {
    var t = crcTable, end = pos + len;

    crc = crc ^ (-1);

    for (var i = pos; i < end; i++ ) {
        crc = (crc >>> 8) ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)); // >>> 0;
}

module.exports = function crc32wrapper(input, crc) {
    if (typeof input === "undefined" || !input.length) {
        return 0;
    }

    var isArray = utils.getTypeOf(input) !== "string";

    if(isArray) {
        return crc32(crc|0, input, input.length, 0);
    } else {
        return crc32str(crc|0, input, input.length, 0);
    }
};

},{"./utils":32}],5:[function(require,module,exports){
'use strict';
exports.base64 = false;
exports.binary = false;
exports.dir = false;
exports.createFolders = true;
exports.date = null;
exports.compression = null;
exports.compressionOptions = null;
exports.comment = null;
exports.unixPermissions = null;
exports.dosPermissions = null;

},{}],6:[function(require,module,exports){
/* global Promise */
'use strict';

// load the global object first:
// - it should be better integrated in the system (unhandledRejection in node)
// - the environment may have a custom Promise implementation (see zone.js)
var ES6Promise = null;
if (typeof Promise !== "undefined") {
    ES6Promise = Promise;
} else {
    ES6Promise = require("lie");
}

/**
 * Let the user use/change some implementations.
 */
module.exports = {
    Promise: ES6Promise
};

},{"lie":37}],7:[function(require,module,exports){
'use strict';
var USE_TYPEDARRAY = (typeof Uint8Array !== 'undefined') && (typeof Uint16Array !== 'undefined') && (typeof Uint32Array !== 'undefined');

var pako = require("pako");
var utils = require("./utils");
var GenericWorker = require("./stream/GenericWorker");

var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";

exports.magic = "\x08\x00";

/**
 * Create a worker that uses pako to inflate/deflate.
 * @constructor
 * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
 * @param {Object} options the options to use when (de)compressing.
 */
function FlateWorker(action, options) {
    GenericWorker.call(this, "FlateWorker/" + action);

    this._pako = null;
    this._pakoAction = action;
    this._pakoOptions = options;
    // the `meta` object from the last chunk received
    // this allow this worker to pass around metadata
    this.meta = {};
}

utils.inherits(FlateWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
FlateWorker.prototype.processChunk = function (chunk) {
    this.meta = chunk.meta;
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
};

/**
 * @see GenericWorker.flush
 */
FlateWorker.prototype.flush = function () {
    GenericWorker.prototype.flush.call(this);
    if (this._pako === null) {
        this._createPako();
    }
    this._pako.push([], true);
};
/**
 * @see GenericWorker.cleanUp
 */
FlateWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this._pako = null;
};

/**
 * Create the _pako object.
 * TODO: lazy-loading this object isn't the best solution but it's the
 * quickest. The best solution is to lazy-load the worker list. See also the
 * issue #446.
 */
FlateWorker.prototype._createPako = function () {
    this._pako = new pako[this._pakoAction]({
        raw: true,
        level: this._pakoOptions.level || -1 // default compression
    });
    var self = this;
    this._pako.onData = function(data) {
        self.push({
            data : data,
            meta : self.meta
        });
    };
};

exports.compressWorker = function (compressionOptions) {
    return new FlateWorker("Deflate", compressionOptions);
};
exports.uncompressWorker = function () {
    return new FlateWorker("Inflate", {});
};

},{"./stream/GenericWorker":28,"./utils":32,"pako":38}],8:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');
var utf8 = require('../utf8');
var crc32 = require('../crc32');
var signature = require('../signature');

/**
 * Transform an integer into a string in hexadecimal.
 * @private
 * @param {number} dec the number to convert.
 * @param {number} bytes the number of bytes to generate.
 * @returns {string} the result.
 */
var decToHex = function(dec, bytes) {
    var hex = "", i;
    for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 0xff);
        dec = dec >>> 8;
    }
    return hex;
};

/**
 * Generate the UNIX part of the external file attributes.
 * @param {Object} unixPermissions the unix permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * adapted from http://unix.stackexchange.com/questions/14705/the-zip-formats-external-file-attribute :
 *
 * TTTTsstrwxrwxrwx0000000000ADVSHR
 * ^^^^____________________________ file type, see zipinfo.c (UNX_*)
 *     ^^^_________________________ setuid, setgid, sticky
 *        ^^^^^^^^^________________ permissions
 *                 ^^^^^^^^^^______ not used ?
 *                           ^^^^^^ DOS attribute bits : Archive, Directory, Volume label, System file, Hidden, Read only
 */
var generateUnixExternalFileAttr = function (unixPermissions, isDir) {

    var result = unixPermissions;
    if (!unixPermissions) {
        // I can't use octal values in strict mode, hence the hexa.
        //  040775 => 0x41fd
        // 0100664 => 0x81b4
        result = isDir ? 0x41fd : 0x81b4;
    }
    return (result & 0xFFFF) << 16;
};

/**
 * Generate the DOS part of the external file attributes.
 * @param {Object} dosPermissions the dos permissions or null.
 * @param {Boolean} isDir true if the entry is a directory, false otherwise.
 * @return {Number} a 32 bit integer.
 *
 * Bit 0     Read-Only
 * Bit 1     Hidden
 * Bit 2     System
 * Bit 3     Volume Label
 * Bit 4     Directory
 * Bit 5     Archive
 */
var generateDosExternalFileAttr = function (dosPermissions, isDir) {

    // the dir flag is already set for compatibility
    return (dosPermissions || 0)  & 0x3F;
};

/**
 * Generate the various parts used in the construction of the final zip file.
 * @param {Object} streamInfo the hash with information about the compressed file.
 * @param {Boolean} streamedContent is the content streamed ?
 * @param {Boolean} streamingEnded is the stream finished ?
 * @param {number} offset the current offset from the start of the zip file.
 * @param {String} platform let's pretend we are this platform (change platform dependents fields)
 * @param {Function} encodeFileName the function to encode the file name / comment.
 * @return {Object} the zip parts.
 */
var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
    var file = streamInfo['file'],
    compression = streamInfo['compression'],
    useCustomEncoding = encodeFileName !== utf8.utf8encode,
    encodedFileName = utils.transformTo("string", encodeFileName(file.name)),
    utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)),
    comment = file.comment,
    encodedComment = utils.transformTo("string", encodeFileName(comment)),
    utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)),
    useUTF8ForFileName = utfEncodedFileName.length !== file.name.length,
    useUTF8ForComment = utfEncodedComment.length !== comment.length,
    dosTime,
    dosDate,
    extraFields = "",
    unicodePathExtraField = "",
    unicodeCommentExtraField = "",
    dir = file.dir,
    date = file.date;


    var dataInfo = {
        crc32 : 0,
        compressedSize : 0,
        uncompressedSize : 0
    };

    // if the content is streamed, the sizes/crc32 are only available AFTER
    // the end of the stream.
    if (!streamedContent || streamingEnded) {
        dataInfo.crc32 = streamInfo['crc32'];
        dataInfo.compressedSize = streamInfo['compressedSize'];
        dataInfo.uncompressedSize = streamInfo['uncompressedSize'];
    }

    var bitflag = 0;
    if (streamedContent) {
        // Bit 3: the sizes/crc32 are set to zero in the local header.
        // The correct values are put in the data descriptor immediately
        // following the compressed data.
        bitflag |= 0x0008;
    }
    if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
        // Bit 11: Language encoding flag (EFS).
        bitflag |= 0x0800;
    }


    var extFileAttr = 0;
    var versionMadeBy = 0;
    if (dir) {
        // dos or unix, we set the dos dir flag
        extFileAttr |= 0x00010;
    }
    if(platform === "UNIX") {
        versionMadeBy = 0x031E; // UNIX, version 3.0
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
    } else { // DOS or other, fallback to DOS
        versionMadeBy = 0x0014; // DOS, version 2.0
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
    }

    // date
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/52/13.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/65/16.html
    // @see http://www.delorie.com/djgpp/doc/rbinter/it/66/16.html

    dosTime = date.getUTCHours();
    dosTime = dosTime << 6;
    dosTime = dosTime | date.getUTCMinutes();
    dosTime = dosTime << 5;
    dosTime = dosTime | date.getUTCSeconds() / 2;

    dosDate = date.getUTCFullYear() - 1980;
    dosDate = dosDate << 4;
    dosDate = dosDate | (date.getUTCMonth() + 1);
    dosDate = dosDate << 5;
    dosDate = dosDate | date.getUTCDate();

    if (useUTF8ForFileName) {
        // set the unicode path extra field. unzip needs at least one extra
        // field to correctly handle unicode path, so using the path is as good
        // as any other information. This could improve the situation with
        // other archive managers too.
        // This field is usually used without the utf8 flag, with a non
        // unicode path in the header (winrar, winzip). This helps (a bit)
        // with the messy Windows' default compressed folders feature but
        // breaks on p7zip which doesn't seek the unicode path extra field.
        // So for now, UTF-8 everywhere !
        unicodePathExtraField =
            // Version
            decToHex(1, 1) +
            // NameCRC32
            decToHex(crc32(encodedFileName), 4) +
            // UnicodeName
            utfEncodedFileName;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x70" +
            // size
            decToHex(unicodePathExtraField.length, 2) +
            // content
            unicodePathExtraField;
    }

    if(useUTF8ForComment) {

        unicodeCommentExtraField =
            // Version
            decToHex(1, 1) +
            // CommentCRC32
            decToHex(crc32(encodedComment), 4) +
            // UnicodeName
            utfEncodedComment;

        extraFields +=
            // Info-ZIP Unicode Path Extra Field
            "\x75\x63" +
            // size
            decToHex(unicodeCommentExtraField.length, 2) +
            // content
            unicodeCommentExtraField;
    }

    var header = "";

    // version needed to extract
    header += "\x0A\x00";
    // general purpose bit flag
    header += decToHex(bitflag, 2);
    // compression method
    header += compression.magic;
    // last mod file time
    header += decToHex(dosTime, 2);
    // last mod file date
    header += decToHex(dosDate, 2);
    // crc-32
    header += decToHex(dataInfo.crc32, 4);
    // compressed size
    header += decToHex(dataInfo.compressedSize, 4);
    // uncompressed size
    header += decToHex(dataInfo.uncompressedSize, 4);
    // file name length
    header += decToHex(encodedFileName.length, 2);
    // extra field length
    header += decToHex(extraFields.length, 2);


    var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;

    var dirRecord = signature.CENTRAL_FILE_HEADER +
        // version made by (00: DOS)
        decToHex(versionMadeBy, 2) +
        // file header (common to file and central directory)
        header +
        // file comment length
        decToHex(encodedComment.length, 2) +
        // disk number start
        "\x00\x00" +
        // internal file attributes TODO
        "\x00\x00" +
        // external file attributes
        decToHex(extFileAttr, 4) +
        // relative offset of local header
        decToHex(offset, 4) +
        // file name
        encodedFileName +
        // extra field
        extraFields +
        // file comment
        encodedComment;

    return {
        fileRecord: fileRecord,
        dirRecord: dirRecord
    };
};

/**
 * Generate the EOCD record.
 * @param {Number} entriesCount the number of entries in the zip file.
 * @param {Number} centralDirLength the length (in bytes) of the central dir.
 * @param {Number} localDirLength the length (in bytes) of the local dir.
 * @param {String} comment the zip file comment as a binary string.
 * @param {Function} encodeFileName the function to encode the comment.
 * @return {String} the EOCD record.
 */
var generateCentralDirectoryEnd = function (entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
    var dirEnd = "";
    var encodedComment = utils.transformTo("string", encodeFileName(comment));

    // end of central dir signature
    dirEnd = signature.CENTRAL_DIRECTORY_END +
        // number of this disk
        "\x00\x00" +
        // number of the disk with the start of the central directory
        "\x00\x00" +
        // total number of entries in the central directory on this disk
        decToHex(entriesCount, 2) +
        // total number of entries in the central directory
        decToHex(entriesCount, 2) +
        // size of the central directory   4 bytes
        decToHex(centralDirLength, 4) +
        // offset of start of central directory with respect to the starting disk number
        decToHex(localDirLength, 4) +
        // .ZIP file comment length
        decToHex(encodedComment.length, 2) +
        // .ZIP file comment
        encodedComment;

    return dirEnd;
};

/**
 * Generate data descriptors for a file entry.
 * @param {Object} streamInfo the hash generated by a worker, containing information
 * on the file entry.
 * @return {String} the data descriptors.
 */
var generateDataDescriptors = function (streamInfo) {
    var descriptor = "";
    descriptor = signature.DATA_DESCRIPTOR +
        // crc-32                          4 bytes
        decToHex(streamInfo['crc32'], 4) +
        // compressed size                 4 bytes
        decToHex(streamInfo['compressedSize'], 4) +
        // uncompressed size               4 bytes
        decToHex(streamInfo['uncompressedSize'], 4);

    return descriptor;
};


/**
 * A worker to concatenate other workers to create a zip file.
 * @param {Boolean} streamFiles `true` to stream the content of the files,
 * `false` to accumulate it.
 * @param {String} comment the comment to use.
 * @param {String} platform the platform to use, "UNIX" or "DOS".
 * @param {Function} encodeFileName the function to encode file names and comments.
 */
function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
    GenericWorker.call(this, "ZipFileWorker");
    // The number of bytes written so far. This doesn't count accumulated chunks.
    this.bytesWritten = 0;
    // The comment of the zip file
    this.zipComment = comment;
    // The platform "generating" the zip file.
    this.zipPlatform = platform;
    // the function to encode file names and comments.
    this.encodeFileName = encodeFileName;
    // Should we stream the content of the files ?
    this.streamFiles = streamFiles;
    // If `streamFiles` is false, we will need to accumulate the content of the
    // files to calculate sizes / crc32 (and write them *before* the content).
    // This boolean indicates if we are accumulating chunks (it will change a lot
    // during the lifetime of this worker).
    this.accumulate = false;
    // The buffer receiving chunks when accumulating content.
    this.contentBuffer = [];
    // The list of generated directory records.
    this.dirRecords = [];
    // The offset (in bytes) from the beginning of the zip file for the current source.
    this.currentSourceOffset = 0;
    // The total number of entries in this zip file.
    this.entriesCount = 0;
    // the name of the file currently being added, null when handling the end of the zip file.
    // Used for the emitted metadata.
    this.currentFile = null;



    this._sources = [];
}
utils.inherits(ZipFileWorker, GenericWorker);

/**
 * @see GenericWorker.push
 */
ZipFileWorker.prototype.push = function (chunk) {

    var currentFilePercent = chunk.meta.percent || 0;
    var entriesCount = this.entriesCount;
    var remainingFiles = this._sources.length;

    if(this.accumulate) {
        this.contentBuffer.push(chunk);
    } else {
        this.bytesWritten += chunk.data.length;

        GenericWorker.prototype.push.call(this, {
            data : chunk.data,
            meta : {
                currentFile : this.currentFile,
                percent : entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
            }
        });
    }
};

/**
 * The worker started a new source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the new source.
 */
ZipFileWorker.prototype.openedSource = function (streamInfo) {
    this.currentSourceOffset = this.bytesWritten;
    this.currentFile = streamInfo['file'].name;

    var streamedContent = this.streamFiles && !streamInfo['file'].dir;

    // don't stream folders (because they don't have any content)
    if(streamedContent) {
        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
    } else {
        // we need to wait for the whole file before pushing anything
        this.accumulate = true;
    }
};

/**
 * The worker finished a source (an other worker).
 * @param {Object} streamInfo the streamInfo object from the finished source.
 */
ZipFileWorker.prototype.closedSource = function (streamInfo) {
    this.accumulate = false;
    var streamedContent = this.streamFiles && !streamInfo['file'].dir;
    var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);

    this.dirRecords.push(record.dirRecord);
    if(streamedContent) {
        // after the streamed file, we put data descriptors
        this.push({
            data : generateDataDescriptors(streamInfo),
            meta : {percent:100}
        });
    } else {
        // the content wasn't streamed, we need to push everything now
        // first the file record, then the content
        this.push({
            data : record.fileRecord,
            meta : {percent:0}
        });
        while(this.contentBuffer.length) {
            this.push(this.contentBuffer.shift());
        }
    }
    this.currentFile = null;
};

/**
 * @see GenericWorker.flush
 */
ZipFileWorker.prototype.flush = function () {

    var localDirLength = this.bytesWritten;
    for(var i = 0; i < this.dirRecords.length; i++) {
        this.push({
            data : this.dirRecords[i],
            meta : {percent:100}
        });
    }
    var centralDirLength = this.bytesWritten - localDirLength;

    var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);

    this.push({
        data : dirEnd,
        meta : {percent:100}
    });
};

/**
 * Prepare the next source to be read.
 */
ZipFileWorker.prototype.prepareNextSource = function () {
    this.previous = this._sources.shift();
    this.openedSource(this.previous.streamInfo);
    if (this.isPaused) {
        this.previous.pause();
    } else {
        this.previous.resume();
    }
};

/**
 * @see GenericWorker.registerPrevious
 */
ZipFileWorker.prototype.registerPrevious = function (previous) {
    this._sources.push(previous);
    var self = this;

    previous.on('data', function (chunk) {
        self.processChunk(chunk);
    });
    previous.on('end', function () {
        self.closedSource(self.previous.streamInfo);
        if(self._sources.length) {
            self.prepareNextSource();
        } else {
            self.end();
        }
    });
    previous.on('error', function (e) {
        self.error(e);
    });
    return this;
};

/**
 * @see GenericWorker.resume
 */
ZipFileWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this.previous && this._sources.length) {
        this.prepareNextSource();
        return true;
    }
    if (!this.previous && !this._sources.length && !this.generatedError) {
        this.end();
        return true;
    }
};

/**
 * @see GenericWorker.error
 */
ZipFileWorker.prototype.error = function (e) {
    var sources = this._sources;
    if(!GenericWorker.prototype.error.call(this, e)) {
        return false;
    }
    for(var i = 0; i < sources.length; i++) {
        try {
            sources[i].error(e);
        } catch(e) {
            // the `error` exploded, nothing to do
        }
    }
    return true;
};

/**
 * @see GenericWorker.lock
 */
ZipFileWorker.prototype.lock = function () {
    GenericWorker.prototype.lock.call(this);
    var sources = this._sources;
    for(var i = 0; i < sources.length; i++) {
        sources[i].lock();
    }
};

module.exports = ZipFileWorker;

},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(require,module,exports){
'use strict';

var compressions = require('../compressions');
var ZipFileWorker = require('./ZipFileWorker');

/**
 * Find the compression to use.
 * @param {String} fileCompression the compression defined at the file level, if any.
 * @param {String} zipCompression the compression defined at the load() level.
 * @return {Object} the compression object to use.
 */
var getCompression = function (fileCompression, zipCompression) {

    var compressionName = fileCompression || zipCompression;
    var compression = compressions[compressionName];
    if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
    }
    return compression;
};

/**
 * Create a worker to generate a zip file.
 * @param {JSZip} zip the JSZip instance at the right root level.
 * @param {Object} options to generate the zip file.
 * @param {String} comment the comment to use.
 */
exports.generateWorker = function (zip, options, comment) {

    var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
    var entriesCount = 0;
    try {

        zip.forEach(function (relativePath, file) {
            entriesCount++;
            var compression = getCompression(file.options.compression, options.compression);
            var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
            var dir = file.dir, date = file.date;

            file._compressWorker(compression, compressionOptions)
            .withStreamInfo("file", {
                name : relativePath,
                dir : dir,
                date : date,
                comment : file.comment || "",
                unixPermissions : file.unixPermissions,
                dosPermissions : file.dosPermissions
            })
            .pipe(zipFileWorker);
        });
        zipFileWorker.entriesCount = entriesCount;
    } catch (e) {
        zipFileWorker.error(e);
    }

    return zipFileWorker;
};

},{"../compressions":3,"./ZipFileWorker":8}],10:[function(require,module,exports){
'use strict';

/**
 * Representation a of zip file in js
 * @constructor
 */
function JSZip() {
    // if this constructor is used without `new`, it adds `new` before itself:
    if(!(this instanceof JSZip)) {
        return new JSZip();
    }

    if(arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
    }

    // object containing the files :
    // {
    //   "folder/" : {...},
    //   "folder/data.txt" : {...}
    // }
    this.files = {};

    this.comment = null;

    // Where we are in the hierarchy
    this.root = "";
    this.clone = function() {
        var newObj = new JSZip();
        for (var i in this) {
            if (typeof this[i] !== "function") {
                newObj[i] = this[i];
            }
        }
        return newObj;
    };
}
JSZip.prototype = require('./object');
JSZip.prototype.loadAsync = require('./load');
JSZip.support = require('./support');
JSZip.defaults = require('./defaults');

// TODO find a better way to handle this version,
// a require('package.json').version doesn't work with webpack, see #327
JSZip.version = "3.5.0";

JSZip.loadAsync = function (content, options) {
    return new JSZip().loadAsync(content, options);
};

JSZip.external = require("./external");
module.exports = JSZip;

},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(require,module,exports){
'use strict';
var utils = require('./utils');
var external = require("./external");
var utf8 = require('./utf8');
var utils = require('./utils');
var ZipEntries = require('./zipEntries');
var Crc32Probe = require('./stream/Crc32Probe');
var nodejsUtils = require("./nodejsUtils");

/**
 * Check the CRC32 of an entry.
 * @param {ZipEntry} zipEntry the zip entry to check.
 * @return {Promise} the result.
 */
function checkEntryCRC32(zipEntry) {
    return new external.Promise(function (resolve, reject) {
        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
        worker.on("error", function (e) {
            reject(e);
        })
        .on("end", function () {
            if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                reject(new Error("Corrupted zip : CRC32 mismatch"));
            } else {
                resolve();
            }
        })
        .resume();
    });
}

module.exports = function(data, options) {
    var zip = this;
    options = utils.extend(options || {}, {
        base64: false,
        checkCRC32: false,
        optimizedBinaryString: false,
        createFolders: false,
        decodeFileName: utf8.utf8decode
    });

    if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
    }

    return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64)
    .then(function(data) {
        var zipEntries = new ZipEntries(options);
        zipEntries.load(data);
        return zipEntries;
    }).then(function checkCRC32(zipEntries) {
        var promises = [external.Promise.resolve(zipEntries)];
        var files = zipEntries.files;
        if (options.checkCRC32) {
            for (var i = 0; i < files.length; i++) {
                promises.push(checkEntryCRC32(files[i]));
            }
        }
        return external.Promise.all(promises);
    }).then(function addFiles(results) {
        var zipEntries = results.shift();
        var files = zipEntries.files;
        for (var i = 0; i < files.length; i++) {
            var input = files[i];
            zip.file(input.fileNameStr, input.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: input.date,
                dir: input.dir,
                comment : input.fileCommentStr.length ? input.fileCommentStr : null,
                unixPermissions : input.unixPermissions,
                dosPermissions : input.dosPermissions,
                createFolders: options.createFolders
            });
        }
        if (zipEntries.zipComment.length) {
            zip.comment = zipEntries.zipComment;
        }

        return zip;
    });
};

},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(require,module,exports){
"use strict";

var utils = require('../utils');
var GenericWorker = require('../stream/GenericWorker');

/**
 * A worker that use a nodejs stream as source.
 * @constructor
 * @param {String} filename the name of the file entry for this stream.
 * @param {Readable} stream the nodejs stream.
 */
function NodejsStreamInputAdapter(filename, stream) {
    GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
    this._upstreamEnded = false;
    this._bindStream(stream);
}

utils.inherits(NodejsStreamInputAdapter, GenericWorker);

/**
 * Prepare the stream and bind the callbacks on it.
 * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
 * @param {Stream} stream the nodejs stream to use.
 */
NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
    var self = this;
    this._stream = stream;
    stream.pause();
    stream
    .on("data", function (chunk) {
        self.push({
            data: chunk,
            meta : {
                percent : 0
            }
        });
    })
    .on("error", function (e) {
        if(self.isPaused) {
            this.generatedError = e;
        } else {
            self.error(e);
        }
    })
    .on("end", function () {
        if(self.isPaused) {
            self._upstreamEnded = true;
        } else {
            self.end();
        }
    });
};
NodejsStreamInputAdapter.prototype.pause = function () {
    if(!GenericWorker.prototype.pause.call(this)) {
        return false;
    }
    this._stream.pause();
    return true;
};
NodejsStreamInputAdapter.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if(this._upstreamEnded) {
        this.end();
    } else {
        this._stream.resume();
    }

    return true;
};

module.exports = NodejsStreamInputAdapter;

},{"../stream/GenericWorker":28,"../utils":32}],13:[function(require,module,exports){
'use strict';

var Readable = require('readable-stream').Readable;

var utils = require('../utils');
utils.inherits(NodejsStreamOutputAdapter, Readable);

/**
* A nodejs stream using a worker as source.
* @see the SourceWrapper in http://nodejs.org/api/stream.html
* @constructor
* @param {StreamHelper} helper the helper wrapping the worker
* @param {Object} options the nodejs stream options
* @param {Function} updateCb the update callback.
*/
function NodejsStreamOutputAdapter(helper, options, updateCb) {
    Readable.call(this, options);
    this._helper = helper;

    var self = this;
    helper.on("data", function (data, meta) {
        if (!self.push(data)) {
            self._helper.pause();
        }
        if(updateCb) {
            updateCb(meta);
        }
    })
    .on("error", function(e) {
        self.emit('error', e);
    })
    .on("end", function () {
        self.push(null);
    });
}


NodejsStreamOutputAdapter.prototype._read = function() {
    this._helper.resume();
};

module.exports = NodejsStreamOutputAdapter;

},{"../utils":32,"readable-stream":16}],14:[function(require,module,exports){
'use strict';

module.exports = {
    /**
     * True if this is running in Nodejs, will be undefined in a browser.
     * In a browser, browserify won't include this file and the whole module
     * will be resolved an empty object.
     */
    isNode : typeof Buffer !== "undefined",
    /**
     * Create a new nodejs Buffer from an existing content.
     * @param {Object} data the data to pass to the constructor.
     * @param {String} encoding the encoding to use.
     * @return {Buffer} a new Buffer.
     */
    newBufferFrom: function(data, encoding) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(data, encoding);
        } else {
            if (typeof data === "number") {
                // Safeguard for old Node.js versions. On newer versions,
                // Buffer.from(number) / Buffer(number, encoding) already throw.
                throw new Error("The \"data\" argument must not be a number");
            }
            return new Buffer(data, encoding);
        }
    },
    /**
     * Create a new nodejs Buffer with the specified size.
     * @param {Integer} size the size of the buffer.
     * @return {Buffer} a new Buffer.
     */
    allocBuffer: function (size) {
        if (Buffer.alloc) {
            return Buffer.alloc(size);
        } else {
            var buf = new Buffer(size);
            buf.fill(0);
            return buf;
        }
    },
    /**
     * Find out if an object is a Buffer.
     * @param {Object} b the object to test.
     * @return {Boolean} true if the object is a Buffer, false otherwise.
     */
    isBuffer : function(b){
        return Buffer.isBuffer(b);
    },

    isStream : function (obj) {
        return obj &&
            typeof obj.on === "function" &&
            typeof obj.pause === "function" &&
            typeof obj.resume === "function";
    }
};

},{}],15:[function(require,module,exports){
'use strict';
var utf8 = require('./utf8');
var utils = require('./utils');
var GenericWorker = require('./stream/GenericWorker');
var StreamHelper = require('./stream/StreamHelper');
var defaults = require('./defaults');
var CompressedObject = require('./compressedObject');
var ZipObject = require('./zipObject');
var generate = require("./generate");
var nodejsUtils = require("./nodejsUtils");
var NodejsStreamInputAdapter = require("./nodejs/NodejsStreamInputAdapter");


/**
 * Add a file in the current folder.
 * @private
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data of the file
 * @param {Object} originalOptions the options of the file
 * @return {Object} the new file.
 */
var fileAdd = function(name, data, originalOptions) {
    // be sure sub folders exist
    var dataType = utils.getTypeOf(data),
        parent;


    /*
     * Correct options.
     */

    var o = utils.extend(originalOptions || {}, defaults);
    o.date = o.date || new Date();
    if (o.compression !== null) {
        o.compression = o.compression.toUpperCase();
    }

    if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
    }

    // UNX_IFDIR  0040000 see zipinfo.c
    if (o.unixPermissions && (o.unixPermissions & 0x4000)) {
        o.dir = true;
    }
    // Bit 4    Directory
    if (o.dosPermissions && (o.dosPermissions & 0x0010)) {
        o.dir = true;
    }

    if (o.dir) {
        name = forceTrailingSlash(name);
    }
    if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
    }

    var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
    if (!originalOptions || typeof originalOptions.binary === "undefined") {
        o.binary = !isUnicodeString;
    }


    var isCompressedEmpty = (data instanceof CompressedObject) && data.uncompressedSize === 0;

    if (isCompressedEmpty || o.dir || !data || data.length === 0) {
        o.base64 = false;
        o.binary = true;
        data = "";
        o.compression = "STORE";
        dataType = "string";
    }

    /*
     * Convert content to fit.
     */

    var zipObjectContent = null;
    if (data instanceof CompressedObject || data instanceof GenericWorker) {
        zipObjectContent = data;
    } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        zipObjectContent = new NodejsStreamInputAdapter(name, data);
    } else {
        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
    }

    var object = new ZipObject(name, zipObjectContent, o);
    this.files[name] = object;
    /*
    TODO: we can't throw an exception because we have async promises
    (we can have a promise of a Date() for example) but returning a
    promise is useless because file(name, data) returns the JSZip
    object for chaining. Should we break that to allow the user
    to catch the error ?

    return external.Promise.resolve(zipObjectContent)
    .then(function () {
        return object;
    });
    */
};

/**
 * Find the parent folder of the path.
 * @private
 * @param {string} path the path to use
 * @return {string} the parent folder, or ""
 */
var parentFolder = function (path) {
    if (path.slice(-1) === '/') {
        path = path.substring(0, path.length - 1);
    }
    var lastSlash = path.lastIndexOf('/');
    return (lastSlash > 0) ? path.substring(0, lastSlash) : "";
};

/**
 * Returns the path with a slash at the end.
 * @private
 * @param {String} path the path to check.
 * @return {String} the path with a trailing slash.
 */
var forceTrailingSlash = function(path) {
    // Check the name ends with a /
    if (path.slice(-1) !== "/") {
        path += "/"; // IE doesn't like substr(-1)
    }
    return path;
};

/**
 * Add a (sub) folder in the current folder.
 * @private
 * @param {string} name the folder's name
 * @param {boolean=} [createFolders] If true, automatically create sub
 *  folders. Defaults to false.
 * @return {Object} the new folder.
 */
var folderAdd = function(name, createFolders) {
    createFolders = (typeof createFolders !== 'undefined') ? createFolders : defaults.createFolders;

    name = forceTrailingSlash(name);

    // Does this folder already exist?
    if (!this.files[name]) {
        fileAdd.call(this, name, null, {
            dir: true,
            createFolders: createFolders
        });
    }
    return this.files[name];
};

/**
* Cross-window, cross-Node-context regular expression detection
* @param  {Object}  object Anything
* @return {Boolean}        true if the object is a regular expression,
* false otherwise
*/
function isRegExp(object) {
    return Object.prototype.toString.call(object) === "[object RegExp]";
}

// return the actual prototype of JSZip
var out = {
    /**
     * @see loadAsync
     */
    load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },


    /**
     * Call a callback function for each entry at this folder level.
     * @param {Function} cb the callback function:
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     */
    forEach: function(cb) {
        var filename, relativePath, file;
        for (filename in this.files) {
            if (!this.files.hasOwnProperty(filename)) {
                continue;
            }
            file = this.files[filename];
            relativePath = filename.slice(this.root.length, filename.length);
            if (relativePath && filename.slice(0, this.root.length) === this.root) { // the file is in the current root
                cb(relativePath, file); // TODO reverse the parameters ? need to be clean AND consistent with the filter search fn...
            }
        }
    },

    /**
     * Filter nested files/folders with the specified function.
     * @param {Function} search the predicate to use :
     * function (relativePath, file) {...}
     * It takes 2 arguments : the relative path and the file.
     * @return {Array} An array of matching elements.
     */
    filter: function(search) {
        var result = [];
        this.forEach(function (relativePath, entry) {
            if (search(relativePath, entry)) { // the file matches the function
                result.push(entry);
            }

        });
        return result;
    },

    /**
     * Add a file to the zip file, or search a file.
     * @param   {string|RegExp} name The name of the file to add (if data is defined),
     * the name of the file to find (if no data) or a regex to match files.
     * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
     * @param   {Object} o     File options
     * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
     * a file (when searching by string) or an array of files (when searching by regex).
     */
    file: function(name, data, o) {
        if (arguments.length === 1) {
            if (isRegExp(name)) {
                var regexp = name;
                return this.filter(function(relativePath, file) {
                    return !file.dir && regexp.test(relativePath);
                });
            }
            else { // text
                var obj = this.files[this.root + name];
                if (obj && !obj.dir) {
                    return obj;
                } else {
                    return null;
                }
            }
        }
        else { // more than one argument : we have data !
            name = this.root + name;
            fileAdd.call(this, name, data, o);
        }
        return this;
    },

    /**
     * Add a directory to the zip file, or search.
     * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
     * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
     */
    folder: function(arg) {
        if (!arg) {
            return this;
        }

        if (isRegExp(arg)) {
            return this.filter(function(relativePath, file) {
                return file.dir && arg.test(relativePath);
            });
        }

        // else, name is a new folder
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);

        // Allow chaining by returning a new object with this folder as the root
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
    },

    /**
     * Delete a file, or a directory and all sub-files, from the zip
     * @param {string} name the name of the file to delete
     * @return {JSZip} this JSZip object
     */
    remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
            // Look for any folders
            if (name.slice(-1) !== "/") {
                name += "/";
            }
            file = this.files[name];
        }

        if (file && !file.dir) {
            // file
            delete this.files[name];
        } else {
            // maybe a folder, delete recursively
            var kids = this.filter(function(relativePath, file) {
                return file.name.slice(0, name.length) === name;
            });
            for (var i = 0; i < kids.length; i++) {
                delete this.files[kids[i].name];
            }
        }

        return this;
    },

    /**
     * Generate the complete zip file
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the zip file
     */
    generate: function(options) {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    },

    /**
     * Generate the complete zip file as an internal stream.
     * @param {Object} options the options to generate the zip file :
     * - compression, "STORE" by default.
     * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
     * @return {StreamHelper} the streamed zip file.
     */
    generateInternalStream: function(options) {
      var worker, opts = {};
      try {
          opts = utils.extend(options || {}, {
              streamFiles: false,
              compression: "STORE",
              compressionOptions : null,
              type: "",
              platform: "DOS",
              comment: null,
              mimeType: 'application/zip',
              encodeFileName: utf8.utf8encode
          });

          opts.type = opts.type.toLowerCase();
          opts.compression = opts.compression.toUpperCase();

          // "binarystring" is preferred but the internals use "string".
          if(opts.type === "binarystring") {
            opts.type = "string";
          }

          if (!opts.type) {
            throw new Error("No output type specified.");
          }

          utils.checkSupport(opts.type);

          // accept nodejs `process.platform`
          if(
              opts.platform === 'darwin' ||
              opts.platform === 'freebsd' ||
              opts.platform === 'linux' ||
              opts.platform === 'sunos'
          ) {
              opts.platform = "UNIX";
          }
          if (opts.platform === 'win32') {
              opts.platform = "DOS";
          }

          var comment = opts.comment || this.comment || "";
          worker = generate.generateWorker(this, opts, comment);
      } catch (e) {
        worker = new GenericWorker("error");
        worker.error(e);
      }
      return new StreamHelper(worker, opts.type || "string", opts.mimeType);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateAsync: function(options, onUpdate) {
        return this.generateInternalStream(options).accumulate(onUpdate);
    },
    /**
     * Generate the complete zip file asynchronously.
     * @see generateInternalStream
     */
    generateNodeStream: function(options, onUpdate) {
        options = options || {};
        if (!options.type) {
            options.type = "nodebuffer";
        }
        return this.generateInternalStream(options).toNodejsStream(onUpdate);
    }
};
module.exports = out;

},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(require,module,exports){
/*
 * This file is used by module bundlers (browserify/webpack/etc) when
 * including a stream implementation. We use "readable-stream" to get a
 * consistent behavior between nodejs versions but bundlers often have a shim
 * for "stream". Using this shim greatly improve the compatibility and greatly
 * reduce the final size of the bundle (only one stream implementation, not
 * two).
 */
module.exports = require("stream");

},{"stream":undefined}],17:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function ArrayReader(data) {
    DataReader.call(this, data);
	for(var i = 0; i < this.data.length; i++) {
		data[i] = data[i] & 0xFF;
	}
}
utils.inherits(ArrayReader, DataReader);
/**
 * @see DataReader.byteAt
 */
ArrayReader.prototype.byteAt = function(i) {
    return this.data[this.zero + i];
};
/**
 * @see DataReader.lastIndexOfSignature
 */
ArrayReader.prototype.lastIndexOfSignature = function(sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3);
    for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
            return i - this.zero;
        }
    }

    return -1;
};
/**
 * @see DataReader.readAndCheckSignature
 */
ArrayReader.prototype.readAndCheckSignature = function (sig) {
    var sig0 = sig.charCodeAt(0),
        sig1 = sig.charCodeAt(1),
        sig2 = sig.charCodeAt(2),
        sig3 = sig.charCodeAt(3),
        data = this.readData(4);
    return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
};
/**
 * @see DataReader.readData
 */
ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        return [];
    }
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = ArrayReader;

},{"../utils":32,"./DataReader":18}],18:[function(require,module,exports){
'use strict';
var utils = require('../utils');

function DataReader(data) {
    this.data = data; // type : see implementation
    this.length = data.length;
    this.index = 0;
    this.zero = 0;
}
DataReader.prototype = {
    /**
     * Check that the offset will not go too far.
     * @param {string} offset the additional offset to check.
     * @throws {Error} an Error if the offset is out of bounds.
     */
    checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
    },
    /**
     * Check that the specified index will not be too far.
     * @param {string} newIndex the index to check.
     * @throws {Error} an Error if the index is out of bounds.
     */
    checkIndex: function(newIndex) {
        if (this.length < this.zero + newIndex || newIndex < 0) {
            throw new Error("End of data reached (data length = " + this.length + ", asked index = " + (newIndex) + "). Corrupted zip ?");
        }
    },
    /**
     * Change the index.
     * @param {number} newIndex The new index.
     * @throws {Error} if the new index is out of the data.
     */
    setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
    },
    /**
     * Skip the next n bytes.
     * @param {number} n the number of bytes to skip.
     * @throws {Error} if the new index is out of the data.
     */
    skip: function(n) {
        this.setIndex(this.index + n);
    },
    /**
     * Get the byte at the specified index.
     * @param {number} i the index to use.
     * @return {number} a byte.
     */
    byteAt: function(i) {
        // see implementations
    },
    /**
     * Get the next number with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {number} the corresponding number.
     */
    readInt: function(size) {
        var result = 0,
            i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
            result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
    },
    /**
     * Get the next string with a given byte size.
     * @param {number} size the number of bytes to read.
     * @return {string} the corresponding string.
     */
    readString: function(size) {
        return utils.transformTo("string", this.readData(size));
    },
    /**
     * Get raw data without conversion, <size> bytes.
     * @param {number} size the number of bytes to read.
     * @return {Object} the raw data, implementation specific.
     */
    readData: function(size) {
        // see implementations
    },
    /**
     * Find the last occurrence of a zip signature (4 bytes).
     * @param {string} sig the signature to find.
     * @return {number} the index of the last occurrence, -1 if not found.
     */
    lastIndexOfSignature: function(sig) {
        // see implementations
    },
    /**
     * Read the signature (4 bytes) at the current position and compare it with sig.
     * @param {string} sig the expected signature
     * @return {boolean} true if the signature matches, false otherwise.
     */
    readAndCheckSignature: function(sig) {
        // see implementations
    },
    /**
     * Get the next date.
     * @return {Date} the date.
     */
    readDate: function() {
        var dostime = this.readInt(4);
        return new Date(Date.UTC(
        ((dostime >> 25) & 0x7f) + 1980, // year
        ((dostime >> 21) & 0x0f) - 1, // month
        (dostime >> 16) & 0x1f, // day
        (dostime >> 11) & 0x1f, // hour
        (dostime >> 5) & 0x3f, // minute
        (dostime & 0x1f) << 1)); // second
    }
};
module.exports = DataReader;

},{"../utils":32}],19:[function(require,module,exports){
'use strict';
var Uint8ArrayReader = require('./Uint8ArrayReader');
var utils = require('../utils');

function NodeBufferReader(data) {
    Uint8ArrayReader.call(this, data);
}
utils.inherits(NodeBufferReader, Uint8ArrayReader);

/**
 * @see DataReader.readData
 */
NodeBufferReader.prototype.readData = function(size) {
    this.checkOffset(size);
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = NodeBufferReader;

},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(require,module,exports){
'use strict';
var DataReader = require('./DataReader');
var utils = require('../utils');

function StringReader(data) {
    DataReader.call(this, data);
}
utils.inherits(StringReader, DataReader);
/**
 * @see DataReader.byteAt
 */
StringReader.prototype.byteAt = function(i) {
    return this.data.charCodeAt(this.zero + i);
};
/**
 * @see DataReader.lastIndexOfSignature
 */
StringReader.prototype.lastIndexOfSignature = function(sig) {
    return this.data.lastIndexOf(sig) - this.zero;
};
/**
 * @see DataReader.readAndCheckSignature
 */
StringReader.prototype.readAndCheckSignature = function (sig) {
    var data = this.readData(4);
    return sig === data;
};
/**
 * @see DataReader.readData
 */
StringReader.prototype.readData = function(size) {
    this.checkOffset(size);
    // this will work because the constructor applied the "& 0xff" mask.
    var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = StringReader;

},{"../utils":32,"./DataReader":18}],21:[function(require,module,exports){
'use strict';
var ArrayReader = require('./ArrayReader');
var utils = require('../utils');

function Uint8ArrayReader(data) {
    ArrayReader.call(this, data);
}
utils.inherits(Uint8ArrayReader, ArrayReader);
/**
 * @see DataReader.readData
 */
Uint8ArrayReader.prototype.readData = function(size) {
    this.checkOffset(size);
    if(size === 0) {
        // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
        return new Uint8Array(0);
    }
    var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
    this.index += size;
    return result;
};
module.exports = Uint8ArrayReader;

},{"../utils":32,"./ArrayReader":17}],22:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var support = require('../support');
var ArrayReader = require('./ArrayReader');
var StringReader = require('./StringReader');
var NodeBufferReader = require('./NodeBufferReader');
var Uint8ArrayReader = require('./Uint8ArrayReader');

/**
 * Create a reader adapted to the data.
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
 * @return {DataReader} the data reader.
 */
module.exports = function (data) {
    var type = utils.getTypeOf(data);
    utils.checkSupport(type);
    if (type === "string" && !support.uint8array) {
        return new StringReader(data);
    }
    if (type === "nodebuffer") {
        return new NodeBufferReader(data);
    }
    if (support.uint8array) {
        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
    }
    return new ArrayReader(utils.transformTo("array", data));
};

},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(require,module,exports){
'use strict';
exports.LOCAL_FILE_HEADER = "PK\x03\x04";
exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
exports.DATA_DESCRIPTOR = "PK\x07\x08";

},{}],24:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var utils = require('../utils');

/**
 * A worker which convert chunks to a specified type.
 * @constructor
 * @param {String} destType the destination type.
 */
function ConvertWorker(destType) {
    GenericWorker.call(this, "ConvertWorker to " + destType);
    this.destType = destType;
}
utils.inherits(ConvertWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
ConvertWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : utils.transformTo(this.destType, chunk.data),
        meta : chunk.meta
    });
};
module.exports = ConvertWorker;

},{"../utils":32,"./GenericWorker":28}],25:[function(require,module,exports){
'use strict';

var GenericWorker = require('./GenericWorker');
var crc32 = require('../crc32');
var utils = require('../utils');

/**
 * A worker which calculate the crc32 of the data flowing through.
 * @constructor
 */
function Crc32Probe() {
    GenericWorker.call(this, "Crc32Probe");
    this.withStreamInfo("crc32", 0);
}
utils.inherits(Crc32Probe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Crc32Probe.prototype.processChunk = function (chunk) {
    this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
    this.push(chunk);
};
module.exports = Crc32Probe;

},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

/**
 * A worker which calculate the total length of the data flowing through.
 * @constructor
 * @param {String} propName the name used to expose the length
 */
function DataLengthProbe(propName) {
    GenericWorker.call(this, "DataLengthProbe for " + propName);
    this.propName = propName;
    this.withStreamInfo(propName, 0);
}
utils.inherits(DataLengthProbe, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
DataLengthProbe.prototype.processChunk = function (chunk) {
    if(chunk) {
        var length = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = length + chunk.data.length;
    }
    GenericWorker.prototype.processChunk.call(this, chunk);
};
module.exports = DataLengthProbe;


},{"../utils":32,"./GenericWorker":28}],27:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var GenericWorker = require('./GenericWorker');

// the size of the generated chunks
// TODO expose this as a public variable
var DEFAULT_BLOCK_SIZE = 16 * 1024;

/**
 * A worker that reads a content and emits chunks.
 * @constructor
 * @param {Promise} dataP the promise of the data to split
 */
function DataWorker(dataP) {
    GenericWorker.call(this, "DataWorker");
    var self = this;
    this.dataIsReady = false;
    this.index = 0;
    this.max = 0;
    this.data = null;
    this.type = "";

    this._tickScheduled = false;

    dataP.then(function (data) {
        self.dataIsReady = true;
        self.data = data;
        self.max = data && data.length || 0;
        self.type = utils.getTypeOf(data);
        if(!self.isPaused) {
            self._tickAndRepeat();
        }
    }, function (e) {
        self.error(e);
    });
}

utils.inherits(DataWorker, GenericWorker);

/**
 * @see GenericWorker.cleanUp
 */
DataWorker.prototype.cleanUp = function () {
    GenericWorker.prototype.cleanUp.call(this);
    this.data = null;
};

/**
 * @see GenericWorker.resume
 */
DataWorker.prototype.resume = function () {
    if(!GenericWorker.prototype.resume.call(this)) {
        return false;
    }

    if (!this._tickScheduled && this.dataIsReady) {
        this._tickScheduled = true;
        utils.delay(this._tickAndRepeat, [], this);
    }
    return true;
};

/**
 * Trigger a tick a schedule an other call to this function.
 */
DataWorker.prototype._tickAndRepeat = function() {
    this._tickScheduled = false;
    if(this.isPaused || this.isFinished) {
        return;
    }
    this._tick();
    if(!this.isFinished) {
        utils.delay(this._tickAndRepeat, [], this);
        this._tickScheduled = true;
    }
};

/**
 * Read and push a chunk.
 */
DataWorker.prototype._tick = function() {

    if(this.isPaused || this.isFinished) {
        return false;
    }

    var size = DEFAULT_BLOCK_SIZE;
    var data = null, nextIndex = Math.min(this.max, this.index + size);
    if (this.index >= this.max) {
        // EOF
        return this.end();
    } else {
        switch(this.type) {
            case "string":
                data = this.data.substring(this.index, nextIndex);
            break;
            case "uint8array":
                data = this.data.subarray(this.index, nextIndex);
            break;
            case "array":
            case "nodebuffer":
                data = this.data.slice(this.index, nextIndex);
            break;
        }
        this.index = nextIndex;
        return this.push({
            data : data,
            meta : {
                percent : this.max ? this.index / this.max * 100 : 0
            }
        });
    }
};

module.exports = DataWorker;

},{"../utils":32,"./GenericWorker":28}],28:[function(require,module,exports){
'use strict';

/**
 * A worker that does nothing but passing chunks to the next one. This is like
 * a nodejs stream but with some differences. On the good side :
 * - it works on IE 6-9 without any issue / polyfill
 * - it weights less than the full dependencies bundled with browserify
 * - it forwards errors (no need to declare an error handler EVERYWHERE)
 *
 * A chunk is an object with 2 attributes : `meta` and `data`. The former is an
 * object containing anything (`percent` for example), see each worker for more
 * details. The latter is the real data (String, Uint8Array, etc).
 *
 * @constructor
 * @param {String} name the name of the stream (mainly used for debugging purposes)
 */
function GenericWorker(name) {
    // the name of the worker
    this.name = name || "default";
    // an object containing metadata about the workers chain
    this.streamInfo = {};
    // an error which happened when the worker was paused
    this.generatedError = null;
    // an object containing metadata to be merged by this worker into the general metadata
    this.extraStreamInfo = {};
    // true if the stream is paused (and should not do anything), false otherwise
    this.isPaused = true;
    // true if the stream is finished (and should not do anything), false otherwise
    this.isFinished = false;
    // true if the stream is locked to prevent further structure updates (pipe), false otherwise
    this.isLocked = false;
    // the event listeners
    this._listeners = {
        'data':[],
        'end':[],
        'error':[]
    };
    // the previous worker, if any
    this.previous = null;
}

GenericWorker.prototype = {
    /**
     * Push a chunk to the next workers.
     * @param {Object} chunk the chunk to push
     */
    push : function (chunk) {
        this.emit("data", chunk);
    },
    /**
     * End the stream.
     * @return {Boolean} true if this call ended the worker, false otherwise.
     */
    end : function () {
        if (this.isFinished) {
            return false;
        }

        this.flush();
        try {
            this.emit("end");
            this.cleanUp();
            this.isFinished = true;
        } catch (e) {
            this.emit("error", e);
        }
        return true;
    },
    /**
     * End the stream with an error.
     * @param {Error} e the error which caused the premature end.
     * @return {Boolean} true if this call ended the worker with an error, false otherwise.
     */
    error : function (e) {
        if (this.isFinished) {
            return false;
        }

        if(this.isPaused) {
            this.generatedError = e;
        } else {
            this.isFinished = true;

            this.emit("error", e);

            // in the workers chain exploded in the middle of the chain,
            // the error event will go downward but we also need to notify
            // workers upward that there has been an error.
            if(this.previous) {
                this.previous.error(e);
            }

            this.cleanUp();
        }
        return true;
    },
    /**
     * Add a callback on an event.
     * @param {String} name the name of the event (data, end, error)
     * @param {Function} listener the function to call when the event is triggered
     * @return {GenericWorker} the current object for chainability
     */
    on : function (name, listener) {
        this._listeners[name].push(listener);
        return this;
    },
    /**
     * Clean any references when a worker is ending.
     */
    cleanUp : function () {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
        this._listeners = [];
    },
    /**
     * Trigger an event. This will call registered callback with the provided arg.
     * @param {String} name the name of the event (data, end, error)
     * @param {Object} arg the argument to call the callback with.
     */
    emit : function (name, arg) {
        if (this._listeners[name]) {
            for(var i = 0; i < this._listeners[name].length; i++) {
                this._listeners[name][i].call(this, arg);
            }
        }
    },
    /**
     * Chain a worker with an other.
     * @param {Worker} next the worker receiving events from the current one.
     * @return {worker} the next worker for chainability
     */
    pipe : function (next) {
        return next.registerPrevious(this);
    },
    /**
     * Same as `pipe` in the other direction.
     * Using an API with `pipe(next)` is very easy.
     * Implementing the API with the point of view of the next one registering
     * a source is easier, see the ZipFileWorker.
     * @param {Worker} previous the previous worker, sending events to this one
     * @return {Worker} the current worker for chainability
     */
    registerPrevious : function (previous) {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }

        // sharing the streamInfo...
        this.streamInfo = previous.streamInfo;
        // ... and adding our own bits
        this.mergeStreamInfo();
        this.previous =  previous;
        var self = this;
        previous.on('data', function (chunk) {
            self.processChunk(chunk);
        });
        previous.on('end', function () {
            self.end();
        });
        previous.on('error', function (e) {
            self.error(e);
        });
        return this;
    },
    /**
     * Pause the stream so it doesn't send events anymore.
     * @return {Boolean} true if this call paused the worker, false otherwise.
     */
    pause : function () {
        if(this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = true;

        if(this.previous) {
            this.previous.pause();
        }
        return true;
    },
    /**
     * Resume a paused stream.
     * @return {Boolean} true if this call resumed the worker, false otherwise.
     */
    resume : function () {
        if(!this.isPaused || this.isFinished) {
            return false;
        }
        this.isPaused = false;

        // if true, the worker tried to resume but failed
        var withError = false;
        if(this.generatedError) {
            this.error(this.generatedError);
            withError = true;
        }
        if(this.previous) {
            this.previous.resume();
        }

        return !withError;
    },
    /**
     * Flush any remaining bytes as the stream is ending.
     */
    flush : function () {},
    /**
     * Process a chunk. This is usually the method overridden.
     * @param {Object} chunk the chunk to process.
     */
    processChunk : function(chunk) {
        this.push(chunk);
    },
    /**
     * Add a key/value to be added in the workers chain streamInfo once activated.
     * @param {String} key the key to use
     * @param {Object} value the associated value
     * @return {Worker} the current worker for chainability
     */
    withStreamInfo : function (key, value) {
        this.extraStreamInfo[key] = value;
        this.mergeStreamInfo();
        return this;
    },
    /**
     * Merge this worker's streamInfo into the chain's streamInfo.
     */
    mergeStreamInfo : function () {
        for(var key in this.extraStreamInfo) {
            if (!this.extraStreamInfo.hasOwnProperty(key)) {
                continue;
            }
            this.streamInfo[key] = this.extraStreamInfo[key];
        }
    },

    /**
     * Lock the stream to prevent further updates on the workers chain.
     * After calling this method, all calls to pipe will fail.
     */
    lock: function () {
        if (this.isLocked) {
            throw new Error("The stream '" + this + "' has already been used.");
        }
        this.isLocked = true;
        if (this.previous) {
            this.previous.lock();
        }
    },

    /**
     *
     * Pretty print the workers chain.
     */
    toString : function () {
        var me = "Worker " + this.name;
        if (this.previous) {
            return this.previous + " -> " + me;
        } else {
            return me;
        }
    }
};

module.exports = GenericWorker;

},{}],29:[function(require,module,exports){
'use strict';

var utils = require('../utils');
var ConvertWorker = require('./ConvertWorker');
var GenericWorker = require('./GenericWorker');
var base64 = require('../base64');
var support = require("../support");
var external = require("../external");

var NodejsStreamOutputAdapter = null;
if (support.nodestream) {
    try {
        NodejsStreamOutputAdapter = require('../nodejs/NodejsStreamOutputAdapter');
    } catch(e) {}
}

/**
 * Apply the final transformation of the data. If the user wants a Blob for
 * example, it's easier to work with an U8intArray and finally do the
 * ArrayBuffer/Blob conversion.
 * @param {String} type the name of the final type
 * @param {String|Uint8Array|Buffer} content the content to transform
 * @param {String} mimeType the mime type of the content, if applicable.
 * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
 */
function transformZipOutput(type, content, mimeType) {
    switch(type) {
        case "blob" :
            return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
        case "base64" :
            return base64.encode(content);
        default :
            return utils.transformTo(type, content);
    }
}

/**
 * Concatenate an array of data of the given type.
 * @param {String} type the type of the data in the given array.
 * @param {Array} dataArray the array containing the data chunks to concatenate
 * @return {String|Uint8Array|Buffer} the concatenated data
 * @throws Error if the asked type is unsupported
 */
function concat (type, dataArray) {
    var i, index = 0, res = null, totalLength = 0;
    for(i = 0; i < dataArray.length; i++) {
        totalLength += dataArray[i].length;
    }
    switch(type) {
        case "string":
            return dataArray.join("");
          case "array":
            return Array.prototype.concat.apply([], dataArray);
        case "uint8array":
            res = new Uint8Array(totalLength);
            for(i = 0; i < dataArray.length; i++) {
                res.set(dataArray[i], index);
                index += dataArray[i].length;
            }
            return res;
        case "nodebuffer":
            return Buffer.concat(dataArray);
        default:
            throw new Error("concat : unsupported type '"  + type + "'");
    }
}

/**
 * Listen a StreamHelper, accumulate its content and concatenate it into a
 * complete block.
 * @param {StreamHelper} helper the helper to use.
 * @param {Function} updateCallback a callback called on each update. Called
 * with one arg :
 * - the metadata linked to the update received.
 * @return Promise the promise for the accumulation.
 */
function accumulate(helper, updateCallback) {
    return new external.Promise(function (resolve, reject){
        var dataArray = [];
        var chunkType = helper._internalType,
            resultType = helper._outputType,
            mimeType = helper._mimeType;
        helper
        .on('data', function (data, meta) {
            dataArray.push(data);
            if(updateCallback) {
                updateCallback(meta);
            }
        })
        .on('error', function(err) {
            dataArray = [];
            reject(err);
        })
        .on('end', function (){
            try {
                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                resolve(result);
            } catch (e) {
                reject(e);
            }
            dataArray = [];
        })
        .resume();
    });
}

/**
 * An helper to easily use workers outside of JSZip.
 * @constructor
 * @param {Worker} worker the worker to wrap
 * @param {String} outputType the type of data expected by the use
 * @param {String} mimeType the mime type of the content, if applicable.
 */
function StreamHelper(worker, outputType, mimeType) {
    var internalType = outputType;
    switch(outputType) {
        case "blob":
        case "arraybuffer":
            internalType = "uint8array";
        break;
        case "base64":
            internalType = "string";
        break;
    }

    try {
        // the type used internally
        this._internalType = internalType;
        // the type used to output results
        this._outputType = outputType;
        // the mime type
        this._mimeType = mimeType;
        utils.checkSupport(internalType);
        this._worker = worker.pipe(new ConvertWorker(internalType));
        // the last workers can be rewired without issues but we need to
        // prevent any updates on previous workers.
        worker.lock();
    } catch(e) {
        this._worker = new GenericWorker("error");
        this._worker.error(e);
    }
}

StreamHelper.prototype = {
    /**
     * Listen a StreamHelper, accumulate its content and concatenate it into a
     * complete block.
     * @param {Function} updateCb the update callback.
     * @return Promise the promise for the accumulation.
     */
    accumulate : function (updateCb) {
        return accumulate(this, updateCb);
    },
    /**
     * Add a listener on an event triggered on a stream.
     * @param {String} evt the name of the event
     * @param {Function} fn the listener
     * @return {StreamHelper} the current helper.
     */
    on : function (evt, fn) {
        var self = this;

        if(evt === "data") {
            this._worker.on(evt, function (chunk) {
                fn.call(self, chunk.data, chunk.meta);
            });
        } else {
            this._worker.on(evt, function () {
                utils.delay(fn, arguments, self);
            });
        }
        return this;
    },
    /**
     * Resume the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    resume : function () {
        utils.delay(this._worker.resume, [], this._worker);
        return this;
    },
    /**
     * Pause the flow of chunks.
     * @return {StreamHelper} the current helper.
     */
    pause : function () {
        this._worker.pause();
        return this;
    },
    /**
     * Return a nodejs stream for this helper.
     * @param {Function} updateCb the update callback.
     * @return {NodejsStreamOutputAdapter} the nodejs stream.
     */
    toNodejsStream : function (updateCb) {
        utils.checkSupport("nodestream");
        if (this._outputType !== "nodebuffer") {
            // an object stream containing blob/arraybuffer/uint8array/string
            // is strange and I don't know if it would be useful.
            // I you find this comment and have a good usecase, please open a
            // bug report !
            throw new Error(this._outputType + " is not supported by this method");
        }

        return new NodejsStreamOutputAdapter(this, {
            objectMode : this._outputType !== "nodebuffer"
        }, updateCb);
    }
};


module.exports = StreamHelper;

},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(require,module,exports){
'use strict';

exports.base64 = true;
exports.array = true;
exports.string = true;
exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
exports.nodebuffer = typeof Buffer !== "undefined";
// contains true if JSZip can read/generate Uint8Array, false otherwise.
exports.uint8array = typeof Uint8Array !== "undefined";

if (typeof ArrayBuffer === "undefined") {
    exports.blob = false;
}
else {
    var buffer = new ArrayBuffer(0);
    try {
        exports.blob = new Blob([buffer], {
            type: "application/zip"
        }).size === 0;
    }
    catch (e) {
        try {
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(buffer);
            exports.blob = builder.getBlob('application/zip').size === 0;
        }
        catch (e) {
            exports.blob = false;
        }
    }
}

try {
    exports.nodestream = !!require('readable-stream').Readable;
} catch(e) {
    exports.nodestream = false;
}

},{"readable-stream":16}],31:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var support = require('./support');
var nodejsUtils = require('./nodejsUtils');
var GenericWorker = require('./stream/GenericWorker');

/**
 * The following functions come from pako, from pako/lib/utils/strings
 * released under the MIT license, see pako https://github.com/nodeca/pako/
 */

// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new Array(256);
for (var i=0; i<256; i++) {
  _utf8len[i] = (i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1);
}
_utf8len[254]=_utf8len[254]=1; // Invalid sequence start

// convert string to array (typed, when possible)
var string2buf = function (str) {
    var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

    // count binary size
    for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
    }

    // allocate buffer
    if (support.uint8array) {
        buf = new Uint8Array(buf_len);
    } else {
        buf = new Array(buf_len);
    }

    // convert
    for (i=0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 0xfc00) === 0xd800 && (m_pos+1 < str_len)) {
            c2 = str.charCodeAt(m_pos+1);
            if ((c2 & 0xfc00) === 0xdc00) {
                c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
                m_pos++;
            }
        }
        if (c < 0x80) {
            /* one byte */
            buf[i++] = c;
        } else if (c < 0x800) {
            /* two bytes */
            buf[i++] = 0xC0 | (c >>> 6);
            buf[i++] = 0x80 | (c & 0x3f);
        } else if (c < 0x10000) {
            /* three bytes */
            buf[i++] = 0xE0 | (c >>> 12);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        } else {
            /* four bytes */
            buf[i++] = 0xf0 | (c >>> 18);
            buf[i++] = 0x80 | (c >>> 12 & 0x3f);
            buf[i++] = 0x80 | (c >>> 6 & 0x3f);
            buf[i++] = 0x80 | (c & 0x3f);
        }
    }

    return buf;
};

// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
var utf8border = function(buf, max) {
    var pos;

    max = max || buf.length;
    if (max > buf.length) { max = buf.length; }

    // go back from last position, until start of sequence found
    pos = max-1;
    while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

    // Fuckup - very small and broken sequence,
    // return max, because we should return something anyway.
    if (pos < 0) { return max; }

    // If we came to start of buffer - that means vuffer is too small,
    // return max too.
    if (pos === 0) { return max; }

    return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

// convert array to string
var buf2string = function (buf) {
    var str, i, out, c, c_len;
    var len = buf.length;

    // Reserve max possible length (2 words per char)
    // NB: by unknown reasons, Array is significantly faster for
    //     String.fromCharCode.apply than Uint16Array.
    var utf16buf = new Array(len*2);

    for (out=0, i=0; i<len;) {
        c = buf[i++];
        // quick process ascii
        if (c < 0x80) { utf16buf[out++] = c; continue; }

        c_len = _utf8len[c];
        // skip 5 & 6 byte codes
        if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len-1; continue; }

        // apply mask on first byte
        c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
        // join the rest
        while (c_len > 1 && i < len) {
            c = (c << 6) | (buf[i++] & 0x3f);
            c_len--;
        }

        // terminated by end of string?
        if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

        if (c < 0x10000) {
            utf16buf[out++] = c;
        } else {
            c -= 0x10000;
            utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
            utf16buf[out++] = 0xdc00 | (c & 0x3ff);
        }
    }

    // shrinkBuf(utf16buf, out)
    if (utf16buf.length !== out) {
        if(utf16buf.subarray) {
            utf16buf = utf16buf.subarray(0, out);
        } else {
            utf16buf.length = out;
        }
    }

    // return String.fromCharCode.apply(null, utf16buf);
    return utils.applyFromCharCode(utf16buf);
};


// That's all for the pako functions.


/**
 * Transform a javascript string into an array (typed if possible) of bytes,
 * UTF-8 encoded.
 * @param {String} str the string to encode
 * @return {Array|Uint8Array|Buffer} the UTF-8 encoded string.
 */
exports.utf8encode = function utf8encode(str) {
    if (support.nodebuffer) {
        return nodejsUtils.newBufferFrom(str, "utf-8");
    }

    return string2buf(str);
};


/**
 * Transform a bytes array (or a representation) representing an UTF-8 encoded
 * string into a javascript string.
 * @param {Array|Uint8Array|Buffer} buf the data de decode
 * @return {String} the decoded string.
 */
exports.utf8decode = function utf8decode(buf) {
    if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
    }

    buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);

    return buf2string(buf);
};

/**
 * A worker to decode utf8 encoded binary chunks into string chunks.
 * @constructor
 */
function Utf8DecodeWorker() {
    GenericWorker.call(this, "utf-8 decode");
    // the last bytes if a chunk didn't end with a complete codepoint.
    this.leftOver = null;
}
utils.inherits(Utf8DecodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8DecodeWorker.prototype.processChunk = function (chunk) {

    var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);

    // 1st step, re-use what's left of the previous chunk
    if (this.leftOver && this.leftOver.length) {
        if(support.uint8array) {
            var previousData = data;
            data = new Uint8Array(previousData.length + this.leftOver.length);
            data.set(this.leftOver, 0);
            data.set(previousData, this.leftOver.length);
        } else {
            data = this.leftOver.concat(data);
        }
        this.leftOver = null;
    }

    var nextBoundary = utf8border(data);
    var usableData = data;
    if (nextBoundary !== data.length) {
        if (support.uint8array) {
            usableData = data.subarray(0, nextBoundary);
            this.leftOver = data.subarray(nextBoundary, data.length);
        } else {
            usableData = data.slice(0, nextBoundary);
            this.leftOver = data.slice(nextBoundary, data.length);
        }
    }

    this.push({
        data : exports.utf8decode(usableData),
        meta : chunk.meta
    });
};

/**
 * @see GenericWorker.flush
 */
Utf8DecodeWorker.prototype.flush = function () {
    if(this.leftOver && this.leftOver.length) {
        this.push({
            data : exports.utf8decode(this.leftOver),
            meta : {}
        });
        this.leftOver = null;
    }
};
exports.Utf8DecodeWorker = Utf8DecodeWorker;

/**
 * A worker to endcode string chunks into utf8 encoded binary chunks.
 * @constructor
 */
function Utf8EncodeWorker() {
    GenericWorker.call(this, "utf-8 encode");
}
utils.inherits(Utf8EncodeWorker, GenericWorker);

/**
 * @see GenericWorker.processChunk
 */
Utf8EncodeWorker.prototype.processChunk = function (chunk) {
    this.push({
        data : exports.utf8encode(chunk.data),
        meta : chunk.meta
    });
};
exports.Utf8EncodeWorker = Utf8EncodeWorker;

},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(require,module,exports){
'use strict';

var support = require('./support');
var base64 = require('./base64');
var nodejsUtils = require('./nodejsUtils');
var setImmediate = require('set-immediate-shim');
var external = require("./external");


/**
 * Convert a string that pass as a "binary string": it should represent a byte
 * array but may have > 255 char codes. Be sure to take only the first byte
 * and returns the byte array.
 * @param {String} str the string to transform.
 * @return {Array|Uint8Array} the string in a binary format.
 */
function string2binary(str) {
    var result = null;
    if (support.uint8array) {
      result = new Uint8Array(str.length);
    } else {
      result = new Array(str.length);
    }
    return stringToArrayLike(str, result);
}

/**
 * Create a new blob with the given content and the given type.
 * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
 * an Uint8Array because the stock browser of android 4 won't accept it (it
 * will be silently converted to a string, "[object Uint8Array]").
 *
 * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
 * when a large amount of Array is used to create the Blob, the amount of
 * memory consumed is nearly 100 times the original data amount.
 *
 * @param {String} type the mime type of the blob.
 * @return {Blob} the created blob.
 */
exports.newBlob = function(part, type) {
    exports.checkSupport("blob");

    try {
        // Blob constructor
        return new Blob([part], {
            type: type
        });
    }
    catch (e) {

        try {
            // deprecated, browser only, old way
            var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
            var builder = new Builder();
            builder.append(part);
            return builder.getBlob(type);
        }
        catch (e) {

            // well, fuck ?!
            throw new Error("Bug : can't construct the Blob.");
        }
    }


};
/**
 * The identity function.
 * @param {Object} input the input.
 * @return {Object} the same input.
 */
function identity(input) {
    return input;
}

/**
 * Fill in an array with a string.
 * @param {String} str the string to use.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
 */
function stringToArrayLike(str, array) {
    for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 0xFF;
    }
    return array;
}

/**
 * An helper for the function arrayLikeToString.
 * This contains static information and functions that
 * can be optimized by the browser JIT compiler.
 */
var arrayToStringHelper = {
    /**
     * Transform an array of int into a string, chunk by chunk.
     * See the performances notes on arrayLikeToString.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @param {String} type the type of the array.
     * @param {Integer} chunk the chunk size.
     * @return {String} the resulting string.
     * @throws Error if the chunk is too big for the stack.
     */
    stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        // shortcut
        if (len <= chunk) {
            return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
            if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
            }
            else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
            }
            k += chunk;
        }
        return result.join("");
    },
    /**
     * Call String.fromCharCode on every item in the array.
     * This is the naive implementation, which generate A LOT of intermediate string.
     * This should be used when everything else fail.
     * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
     * @return {String} the result.
     */
    stringifyByChar: function(array){
        var resultStr = "";
        for(var i = 0; i < array.length; i++) {
            resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
    },
    applyCanBeUsed : {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array : (function () {
            try {
                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
            } catch (e) {
                return false;
            }
        })(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer : (function () {
            try {
                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
            } catch (e) {
                return false;
            }
        })()
    }
};

/**
 * Transform an array-like object to a string.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
 * @return {String} the result.
 */
function arrayLikeToString(array) {
    // Performances notes :
    // --------------------
    // String.fromCharCode.apply(null, array) is the fastest, see
    // see http://jsperf.com/converting-a-uint8array-to-a-string/2
    // but the stack is limited (and we can get huge arrays !).
    //
    // result += String.fromCharCode(array[i]); generate too many strings !
    //
    // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
    // TODO : we now have workers that split the work. Do we still need that ?
    var chunk = 65536,
        type = exports.getTypeOf(array),
        canUseApply = true;
    if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
    } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
    }

    if (canUseApply) {
        while (chunk > 1) {
            try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
            } catch (e) {
                chunk = Math.floor(chunk / 2);
            }
        }
    }

    // no apply or chunk error : slow and painful algorithm
    // default browser on android 4.*
    return arrayToStringHelper.stringifyByChar(array);
}

exports.applyFromCharCode = arrayLikeToString;


/**
 * Copy the data from an array-like to an other array-like.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
 * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
 * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
 */
function arrayLikeToArrayLike(arrayFrom, arrayTo) {
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
    }
    return arrayTo;
}

// a matrix containing functions to transform everything into everything.
var transform = {};

// string to ?
transform["string"] = {
    "string": identity,
    "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
    }
};

// array to ?
transform["array"] = {
    "string": arrayLikeToString,
    "array": identity,
    "arraybuffer": function(input) {
        return (new Uint8Array(input)).buffer;
    },
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// arraybuffer to ?
transform["arraybuffer"] = {
    "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
    },
    "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
    },
    "arraybuffer": identity,
    "uint8array": function(input) {
        return new Uint8Array(input);
    },
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(new Uint8Array(input));
    }
};

// uint8array to ?
transform["uint8array"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return input.buffer;
    },
    "uint8array": identity,
    "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
    }
};

// nodebuffer to ?
transform["nodebuffer"] = {
    "string": arrayLikeToString,
    "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
    },
    "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
    },
    "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
    },
    "nodebuffer": identity
};

/**
 * Transform an input into any type.
 * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
 * If no output type is specified, the unmodified input will be returned.
 * @param {String} outputType the output type.
 * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
 * @throws {Error} an Error if the browser doesn't support the requested output type.
 */
exports.transformTo = function(outputType, input) {
    if (!input) {
        // undefined, null, etc
        // an empty string won't harm.
        input = "";
    }
    if (!outputType) {
        return input;
    }
    exports.checkSupport(outputType);
    var inputType = exports.getTypeOf(input);
    var result = transform[inputType][outputType](input);
    return result;
};

/**
 * Return the type of the input.
 * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
 * @param {Object} input the input to identify.
 * @return {String} the (lowercase) type of the input.
 */
exports.getTypeOf = function(input) {
    if (typeof input === "string") {
        return "string";
    }
    if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
    }
    if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
        return "nodebuffer";
    }
    if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
    }
    if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
    }
};

/**
 * Throw an exception if the type is not supported.
 * @param {String} type the type to check.
 * @throws {Error} an Error if the browser doesn't support the requested type.
 */
exports.checkSupport = function(type) {
    var supported = support[type.toLowerCase()];
    if (!supported) {
        throw new Error(type + " is not supported by this platform");
    }
};

exports.MAX_VALUE_16BITS = 65535;
exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

/**
 * Prettify a string read as binary.
 * @param {string} str the string to prettify.
 * @return {string} a pretty string.
 */
exports.pretty = function(str) {
    var res = '',
        code, i;
    for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += '\\x' + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
    }
    return res;
};

/**
 * Defer the call of a function.
 * @param {Function} callback the function to call asynchronously.
 * @param {Array} args the arguments to give to the callback.
 */
exports.delay = function(callback, args, self) {
    setImmediate(function () {
        callback.apply(self || null, args || []);
    });
};

/**
 * Extends a prototype with an other, without calling a constructor with
 * side effects. Inspired by nodejs' `utils.inherits`
 * @param {Function} ctor the constructor to augment
 * @param {Function} superCtor the parent constructor to use
 */
exports.inherits = function (ctor, superCtor) {
    var Obj = function() {};
    Obj.prototype = superCtor.prototype;
    ctor.prototype = new Obj();
};

/**
 * Merge the objects passed as parameters into a new one.
 * @private
 * @param {...Object} var_args All objects to merge.
 * @return {Object} a new object with the data of the others.
 */
exports.extend = function() {
    var result = {}, i, attr;
    for (i = 0; i < arguments.length; i++) { // arguments is not enumerable in some browsers
        for (attr in arguments[i]) {
            if (arguments[i].hasOwnProperty(attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
            }
        }
    }
    return result;
};

/**
 * Transform arbitrary content into a Promise.
 * @param {String} name a name for the content being processed.
 * @param {Object} inputData the content to process.
 * @param {Boolean} isBinary true if the content is not an unicode string
 * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
 * @param {Boolean} isBase64 true if the string content is encoded with base64.
 * @return {Promise} a promise in a format usable by JSZip.
 */
exports.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {

    // if inputData is already a promise, this flatten it.
    var promise = external.Promise.resolve(inputData).then(function(data) {
        
        
        var isBlob = support.blob && (data instanceof Blob || ['[object File]', '[object Blob]'].indexOf(Object.prototype.toString.call(data)) !== -1);

        if (isBlob && typeof FileReader !== "undefined") {
            return new external.Promise(function (resolve, reject) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    resolve(e.target.result);
                };
                reader.onerror = function(e) {
                    reject(e.target.error);
                };
                reader.readAsArrayBuffer(data);
            });
        } else {
            return data;
        }
    });

    return promise.then(function(data) {
        var dataType = exports.getTypeOf(data);

        if (!dataType) {
            return external.Promise.reject(
                new Error("Can't read the data of '" + name + "'. Is it " +
                          "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
            );
        }
        // special case : it's way easier to work with Uint8Array than with ArrayBuffer
        if (dataType === "arraybuffer") {
            data = exports.transformTo("uint8array", data);
        } else if (dataType === "string") {
            if (isBase64) {
                data = base64.decode(data);
            }
            else if (isBinary) {
                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                if (isOptimizedBinaryString !== true) {
                    // this is a string, not in a base64 format.
                    // Be sure that this is a correct "binary string"
                    data = string2binary(data);
                }
            }
        }
        return data;
    });
};

},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var sig = require('./signature');
var ZipEntry = require('./zipEntry');
var utf8 = require('./utf8');
var support = require('./support');
//  class ZipEntries {{{
/**
 * All the entries in the zip file.
 * @constructor
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntries(loadOptions) {
    this.files = [];
    this.loadOptions = loadOptions;
}
ZipEntries.prototype = {
    /**
     * Check that the reader is on the specified signature.
     * @param {string} expectedSignature the expected signature.
     * @throws {Error} if it is an other signature.
     */
    checkSignature: function(expectedSignature) {
        if (!this.reader.readAndCheckSignature(expectedSignature)) {
            this.reader.index -= 4;
            var signature = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature " + "(" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
    },
    /**
     * Check if the given signature is at the given index.
     * @param {number} askedIndex the index to check.
     * @param {string} expectedSignature the signature to expect.
     * @return {boolean} true if the signature is here, false otherwise.
     */
    isSignature: function(askedIndex, expectedSignature) {
        var currentIndex = this.reader.index;
        this.reader.setIndex(askedIndex);
        var signature = this.reader.readString(4);
        var result = signature === expectedSignature;
        this.reader.setIndex(currentIndex);
        return result;
    },
    /**
     * Read the end of the central directory.
     */
    readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);

        this.zipCommentLength = this.reader.readInt(2);
        // warning : the encoding depends of the system locale
        // On a linux machine with LANG=en_US.utf8, this field is utf8 encoded.
        // On a windows machine, this field is encoded with the localized windows code page.
        var zipComment = this.reader.readData(this.zipCommentLength);
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        // To get consistent behavior with the generation part, we will assume that
        // this is utf8 encoded unless specified otherwise.
        var decodeContent = utils.transformTo(decodeParamType, zipComment);
        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
    },
    /**
     * Read the end of the Zip 64 central directory.
     * Not merged with the method readEndOfCentral :
     * The end of central can coexist with its Zip64 brother,
     * I don't want to read the wrong number of bytes !
     */
    readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.reader.skip(4);
        // this.versionMadeBy = this.reader.readString(2);
        // this.versionNeeded = this.reader.readInt(2);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);

        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44,
            index = 0,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;
        while (index < extraDataSize) {
            extraFieldId = this.reader.readInt(2);
            extraFieldLength = this.reader.readInt(4);
            extraFieldValue = this.reader.readData(extraFieldLength);
            this.zip64ExtensibleData[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }
    },
    /**
     * Read the end of the Zip 64 central directory locator.
     */
    readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
            throw new Error("Multi-volumes zip are not supported");
        }
    },
    /**
     * Read the local files, based on the offset read in the central part.
     */
    readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
            file = this.files[i];
            this.reader.setIndex(file.localHeaderOffset);
            this.checkSignature(sig.LOCAL_FILE_HEADER);
            file.readLocalPart(this.reader);
            file.handleUTF8();
            file.processAttributes();
        }
    },
    /**
     * Read the central directory.
     */
    readCentralDir: function() {
        var file;

        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
            file = new ZipEntry({
                zip64: this.zip64
            }, this.loadOptions);
            file.readCentralPart(this.reader);
            this.files.push(file);
        }

        if (this.centralDirRecords !== this.files.length) {
            if (this.centralDirRecords !== 0 && this.files.length === 0) {
                // We expected some records but couldn't find ANY.
                // This is really suspicious, as if something went wrong.
                throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
            } else {
                // We found some records but not all.
                // Something is wrong but we got something for the user: no error here.
                // console.warn("expected", this.centralDirRecords, "records in central dir, got", this.files.length);
            }
        }
    },
    /**
     * Read the end of central directory.
     */
    readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset < 0) {
            // Check if the content is a truncated zip or complete garbage.
            // A "LOCAL_FILE_HEADER" is not required at the beginning (auto
            // extractible zip for example) but it can give a good hint.
            // If an ajax request was used without responseType, we will also
            // get unreadable data.
            var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);

            if (isGarbage) {
                throw new Error("Can't find end of central directory : is this a zip file ? " +
                                "If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
            } else {
                throw new Error("Corrupted zip: can't find end of central directory");
            }

        }
        this.reader.setIndex(offset);
        var endOfCentralDirOffset = offset;
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();


        /* extract from the zip spec :
            4)  If one of the fields in the end of central directory
                record is too small to hold required data, the field
                should be set to -1 (0xFFFF or 0xFFFFFFFF) and the
                ZIP64 format record should be created.
            5)  The end of central directory record and the
                Zip64 end of central directory locator record must
                reside on the same disk when splitting or spanning
                an archive.
         */
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
            this.zip64 = true;

            /*
            Warning : the zip64 extension is supported, but ONLY if the 64bits integer read from
            the zip file can fit into a 32bits integer. This cannot be solved : JavaScript represents
            all numbers as 64-bit double precision IEEE 754 floating point numbers.
            So, we have 53bits for integers and bitwise operations treat everything as 32bits.
            see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Bitwise_Operators
            and http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-262.pdf section 8.5
            */

            // should look for a zip64 EOCD locator
            offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            if (offset < 0) {
                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            }
            this.reader.setIndex(offset);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
            this.readBlockZip64EndOfCentralLocator();

            // now the zip64 EOCD record
            if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
                // console.warn("ZIP64 end of central directory not where expected.");
                this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
                if (this.relativeOffsetEndOfZip64CentralDir < 0) {
                    throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                }
            }
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
            this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            this.readBlockZip64EndOfCentral();
        }

        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
        if (this.zip64) {
            expectedEndOfCentralDirOffset += 20; // end of central dir 64 locator
            expectedEndOfCentralDirOffset += 12 /* should not include the leading 12 bytes */ + this.zip64EndOfCentralSize;
        }

        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;

        if (extraBytes > 0) {
            // console.warn(extraBytes, "extra bytes at beginning or within zipfile");
            if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
                // The offsets seem wrong, but we have something at the specified offset.
                // So… we keep it.
            } else {
                // the offset is wrong, update the "zero" of the reader
                // this happens if data has been prepended (crx files for example)
                this.reader.zero = extraBytes;
            }
        } else if (extraBytes < 0) {
            throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
        }
    },
    prepareReader: function(data) {
        this.reader = readerFor(data);
    },
    /**
     * Read a zip file and create ZipEntries.
     * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
     */
    load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
    }
};
// }}} end of ZipEntries
module.exports = ZipEntries;

},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(require,module,exports){
'use strict';
var readerFor = require('./reader/readerFor');
var utils = require('./utils');
var CompressedObject = require('./compressedObject');
var crc32fn = require('./crc32');
var utf8 = require('./utf8');
var compressions = require('./compressions');
var support = require('./support');

var MADE_BY_DOS = 0x00;
var MADE_BY_UNIX = 0x03;

/**
 * Find a compression registered in JSZip.
 * @param {string} compressionMethod the method magic to find.
 * @return {Object|null} the JSZip compression object, null if none found.
 */
var findCompression = function(compressionMethod) {
    for (var method in compressions) {
        if (!compressions.hasOwnProperty(method)) {
            continue;
        }
        if (compressions[method].magic === compressionMethod) {
            return compressions[method];
        }
    }
    return null;
};

// class ZipEntry {{{
/**
 * An entry in the zip file.
 * @constructor
 * @param {Object} options Options of the current file.
 * @param {Object} loadOptions Options for loading the stream.
 */
function ZipEntry(options, loadOptions) {
    this.options = options;
    this.loadOptions = loadOptions;
}
ZipEntry.prototype = {
    /**
     * say if the file is encrypted.
     * @return {boolean} true if the file is encrypted, false otherwise.
     */
    isEncrypted: function() {
        // bit 1 is set
        return (this.bitFlag & 0x0001) === 0x0001;
    },
    /**
     * say if the file has utf-8 filename/comment.
     * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
     */
    useUTF8: function() {
        // bit 11 is set
        return (this.bitFlag & 0x0800) === 0x0800;
    },
    /**
     * Read the local part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;

        // we already know everything from the central dir !
        // If the central dir data are false, we are doomed.
        // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
        // The less data we get here, the more reliable this should be.
        // Let's skip the whole header and dash to the data !
        reader.skip(22);
        // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
        // Strangely, the filename here is OK.
        // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
        // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
        // Search "unzip mismatching "local" filename continuing with "central" filename version" on
        // the internet.
        //
        // I think I see the logic here : the central directory is used to display
        // content and the local directory is used to extract the files. Mixing / and \
        // may be used to display \ to windows users and use / when extracting the files.
        // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
        // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.
        this.fileName = reader.readData(this.fileNameLength);
        reader.skip(localExtraFieldsLength);

        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
        }

        compression = findCompression(this.compressionMethod);
        if (compression === null) { // no compression found
            throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
        }
        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
    },

    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        reader.skip(2);
        // this.versionNeeded = reader.readInt(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        var fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);

        if (this.isEncrypted()) {
            throw new Error("Encrypted zip are not supported");
        }

        // will be read in the local part, see the comments there
        reader.skip(fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readData(this.fileCommentLength);
    },

    /**
     * Parse the external file attributes and get the unix/dos permissions.
     */
    processAttributes: function () {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;

        // Check if we have the DOS directory flag set.
        // We look for it in the DOS and UNIX permissions
        // but some unknown platform could set it as a compatibility flag.
        this.dir = this.externalFileAttributes & 0x0010 ? true : false;

        if(madeBy === MADE_BY_DOS) {
            // first 6 bits (0 to 5)
            this.dosPermissions = this.externalFileAttributes & 0x3F;
        }

        if(madeBy === MADE_BY_UNIX) {
            this.unixPermissions = (this.externalFileAttributes >> 16) & 0xFFFF;
            // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
        }

        // fail safe : if the name ends with a / it probably means a folder
        if (!this.dir && this.fileNameStr.slice(-1) === '/') {
            this.dir = true;
        }
    },

    /**
     * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
     * @param {DataReader} reader the reader to use.
     */
    parseZIP64ExtraField: function(reader) {

        if (!this.extraFields[0x0001]) {
            return;
        }

        // should be something, preparing the extra reader
        var extraReader = readerFor(this.extraFields[0x0001].value);

        // I really hope that these 64bits integer can fit in 32 bits integer, because js
        // won't let us have more.
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
            this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
            this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
            this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
            this.diskNumberStart = extraReader.readInt(4);
        }
    },
    /**
     * Read the central part of a zip file and add the info in this object.
     * @param {DataReader} reader the reader to use.
     */
    readExtraFields: function(reader) {
        var end = reader.index + this.extraFieldsLength,
            extraFieldId,
            extraFieldLength,
            extraFieldValue;

        if (!this.extraFields) {
            this.extraFields = {};
        }

        while (reader.index + 4 < end) {
            extraFieldId = reader.readInt(2);
            extraFieldLength = reader.readInt(2);
            extraFieldValue = reader.readData(extraFieldLength);

            this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
            };
        }

        reader.setIndex(end);
    },
    /**
     * Apply an UTF8 transformation if needed.
     */
    handleUTF8: function() {
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) {
            this.fileNameStr = utf8.utf8decode(this.fileName);
            this.fileCommentStr = utf8.utf8decode(this.fileComment);
        } else {
            var upath = this.findExtraFieldUnicodePath();
            if (upath !== null) {
                this.fileNameStr = upath;
            } else {
                // ASCII text or unsupported code page
                var fileNameByteArray =  utils.transformTo(decodeParamType, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
            }

            var ucomment = this.findExtraFieldUnicodeComment();
            if (ucomment !== null) {
                this.fileCommentStr = ucomment;
            } else {
                // ASCII text or unsupported code page
                var commentByteArray =  utils.transformTo(decodeParamType, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
            }
        }
    },

    /**
     * Find the unicode path declared in the extra field, if any.
     * @return {String} the unicode path, null otherwise.
     */
    findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[0x7075];
        if (upathField) {
            var extraReader = readerFor(upathField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the filename changed, this field is out of date.
            if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(upathField.length - 5));
        }
        return null;
    },

    /**
     * Find the unicode comment declared in the extra field, if any.
     * @return {String} the unicode comment, null otherwise.
     */
    findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[0x6375];
        if (ucommentField) {
            var extraReader = readerFor(ucommentField.value);

            // wrong version
            if (extraReader.readInt(1) !== 1) {
                return null;
            }

            // the crc of the comment changed, this field is out of date.
            if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                return null;
            }

            return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
        }
        return null;
    }
};
module.exports = ZipEntry;

},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(require,module,exports){
'use strict';

var StreamHelper = require('./stream/StreamHelper');
var DataWorker = require('./stream/DataWorker');
var utf8 = require('./utf8');
var CompressedObject = require('./compressedObject');
var GenericWorker = require('./stream/GenericWorker');

/**
 * A simple object representing a file in the zip file.
 * @constructor
 * @param {string} name the name of the file
 * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
 * @param {Object} options the options of the file
 */
var ZipObject = function(name, data, options) {
    this.name = name;
    this.dir = options.dir;
    this.date = options.date;
    this.comment = options.comment;
    this.unixPermissions = options.unixPermissions;
    this.dosPermissions = options.dosPermissions;

    this._data = data;
    this._dataBinary = options.binary;
    // keep only the compression
    this.options = {
        compression : options.compression,
        compressionOptions : options.compressionOptions
    };
};

ZipObject.prototype = {
    /**
     * Create an internal stream for the content of this object.
     * @param {String} type the type of each chunk.
     * @return StreamHelper the stream.
     */
    internalStream: function (type) {
        var result = null, outputType = "string";
        try {
            if (!type) {
                throw new Error("No output type specified.");
            }
            outputType = type.toLowerCase();
            var askUnicodeString = outputType === "string" || outputType === "text";
            if (outputType === "binarystring" || outputType === "text") {
                outputType = "string";
            }
            result = this._decompressWorker();

            var isUnicodeString = !this._dataBinary;

            if (isUnicodeString && !askUnicodeString) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            if (!isUnicodeString && askUnicodeString) {
                result = result.pipe(new utf8.Utf8DecodeWorker());
            }
        } catch (e) {
            result = new GenericWorker("error");
            result.error(e);
        }

        return new StreamHelper(result, outputType, "");
    },

    /**
     * Prepare the content in the asked type.
     * @param {String} type the type of the result.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Promise the promise of the result.
     */
    async: function (type, onUpdate) {
        return this.internalStream(type).accumulate(onUpdate);
    },

    /**
     * Prepare the content as a nodejs stream.
     * @param {String} type the type of each chunk.
     * @param {Function} onUpdate a function to call on each internal update.
     * @return Stream the stream.
     */
    nodeStream: function (type, onUpdate) {
        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
    },

    /**
     * Return a worker for the compressed content.
     * @private
     * @param {Object} compression the compression object to use.
     * @param {Object} compressionOptions the options to use when compressing.
     * @return Worker the worker.
     */
    _compressWorker: function (compression, compressionOptions) {
        if (
            this._data instanceof CompressedObject &&
            this._data.compression.magic === compression.magic
        ) {
            return this._data.getCompressedWorker();
        } else {
            var result = this._decompressWorker();
            if(!this._dataBinary) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
            }
            return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
        }
    },
    /**
     * Return a worker for the decompressed content.
     * @private
     * @return Worker the worker.
     */
    _decompressWorker : function () {
        if (this._data instanceof CompressedObject) {
            return this._data.getContentWorker();
        } else if (this._data instanceof GenericWorker) {
            return this._data;
        } else {
            return new DataWorker(this._data);
        }
    }
};

var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
var removedFn = function () {
    throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
};

for(var i = 0; i < removedMethods.length; i++) {
    ZipObject.prototype[removedMethods[i]] = removedFn;
}
module.exports = ZipObject;

},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(require,module,exports){
(function (global){
'use strict';
var Mutation = global.MutationObserver || global.WebKitMutationObserver;

var scheduleDrain;

{
  if (Mutation) {
    var called = 0;
    var observer = new Mutation(nextTick);
    var element = global.document.createTextNode('');
    observer.observe(element, {
      characterData: true
    });
    scheduleDrain = function () {
      element.data = (called = ++called % 2);
    };
  } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
    var channel = new global.MessageChannel();
    channel.port1.onmessage = nextTick;
    scheduleDrain = function () {
      channel.port2.postMessage(0);
    };
  } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
    scheduleDrain = function () {

      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var scriptEl = global.document.createElement('script');
      scriptEl.onreadystatechange = function () {
        nextTick();

        scriptEl.onreadystatechange = null;
        scriptEl.parentNode.removeChild(scriptEl);
        scriptEl = null;
      };
      global.document.documentElement.appendChild(scriptEl);
    };
  } else {
    scheduleDrain = function () {
      setTimeout(nextTick, 0);
    };
  }
}

var draining;
var queue = [];
//named nextTick for less confusing stack traces
function nextTick() {
  draining = true;
  var i, oldQueue;
  var len = queue.length;
  while (len) {
    oldQueue = queue;
    queue = [];
    i = -1;
    while (++i < len) {
      oldQueue[i]();
    }
    len = queue.length;
  }
  draining = false;
}

module.exports = immediate;
function immediate(task) {
  if (queue.push(task) === 1 && !draining) {
    scheduleDrain();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],37:[function(require,module,exports){
'use strict';
var immediate = require('immediate');

/* istanbul ignore next */
function INTERNAL() {}

var handlers = {};

var REJECTED = ['REJECTED'];
var FULFILLED = ['FULFILLED'];
var PENDING = ['PENDING'];

module.exports = Promise;

function Promise(resolver) {
  if (typeof resolver !== 'function') {
    throw new TypeError('resolver must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  this.outcome = void 0;
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}

Promise.prototype["finally"] = function (callback) {
  if (typeof callback !== 'function') {
    return this;
  }
  var p = this.constructor;
  return this.then(resolve, reject);

  function resolve(value) {
    function yes () {
      return value;
    }
    return p.resolve(callback()).then(yes);
  }
  function reject(reason) {
    function no () {
      throw reason;
    }
    return p.resolve(callback()).then(no);
  }
};
Promise.prototype["catch"] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function' && this.state === FULFILLED ||
    typeof onRejected !== 'function' && this.state === REJECTED) {
    return this;
  }
  var promise = new this.constructor(INTERNAL);
  if (this.state !== PENDING) {
    var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.outcome);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }

  return promise;
};
function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  if (typeof onFulfilled === 'function') {
    this.onFulfilled = onFulfilled;
    this.callFulfilled = this.otherCallFulfilled;
  }
  if (typeof onRejected === 'function') {
    this.onRejected = onRejected;
    this.callRejected = this.otherCallRejected;
  }
}
QueueItem.prototype.callFulfilled = function (value) {
  handlers.resolve(this.promise, value);
};
QueueItem.prototype.otherCallFulfilled = function (value) {
  unwrap(this.promise, this.onFulfilled, value);
};
QueueItem.prototype.callRejected = function (value) {
  handlers.reject(this.promise, value);
};
QueueItem.prototype.otherCallRejected = function (value) {
  unwrap(this.promise, this.onRejected, value);
};

function unwrap(promise, func, value) {
  immediate(function () {
    var returnValue;
    try {
      returnValue = func(value);
    } catch (e) {
      return handlers.reject(promise, e);
    }
    if (returnValue === promise) {
      handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      handlers.resolve(promise, returnValue);
    }
  });
}

handlers.resolve = function (self, value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return handlers.reject(self, result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(self, thenable);
  } else {
    self.state = FULFILLED;
    self.outcome = value;
    var i = -1;
    var len = self.queue.length;
    while (++i < len) {
      self.queue[i].callFulfilled(value);
    }
  }
  return self;
};
handlers.reject = function (self, error) {
  self.state = REJECTED;
  self.outcome = error;
  var i = -1;
  var len = self.queue.length;
  while (++i < len) {
    self.queue[i].callRejected(error);
  }
  return self;
};

function getThen(obj) {
  // Make sure we only access the accessor once as required by the spec
  var then = obj && obj.then;
  if (obj && (typeof obj === 'object' || typeof obj === 'function') && typeof then === 'function') {
    return function appyThen() {
      then.apply(obj, arguments);
    };
  }
}

function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var called = false;
  function onError(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.reject(self, value);
  }

  function onSuccess(value) {
    if (called) {
      return;
    }
    called = true;
    handlers.resolve(self, value);
  }

  function tryToUnwrap() {
    thenable(onSuccess, onError);
  }

  var result = tryCatch(tryToUnwrap);
  if (result.status === 'error') {
    onError(result.value);
  }
}

function tryCatch(func, value) {
  var out = {};
  try {
    out.value = func(value);
    out.status = 'success';
  } catch (e) {
    out.status = 'error';
    out.value = e;
  }
  return out;
}

Promise.resolve = resolve;
function resolve(value) {
  if (value instanceof this) {
    return value;
  }
  return handlers.resolve(new this(INTERNAL), value);
}

Promise.reject = reject;
function reject(reason) {
  var promise = new this(INTERNAL);
  return handlers.reject(promise, reason);
}

Promise.all = all;
function all(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var values = new Array(len);
  var resolved = 0;
  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
    function resolveFromAll(outValue) {
      values[i] = outValue;
      if (++resolved === len && !called) {
        called = true;
        handlers.resolve(promise, values);
      }
    }
  }
}

Promise.race = race;
function race(iterable) {
  var self = this;
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return this.reject(new TypeError('must be an array'));
  }

  var len = iterable.length;
  var called = false;
  if (!len) {
    return this.resolve([]);
  }

  var i = -1;
  var promise = new this(INTERNAL);

  while (++i < len) {
    resolver(iterable[i]);
  }
  return promise;
  function resolver(value) {
    self.resolve(value).then(function (response) {
      if (!called) {
        called = true;
        handlers.resolve(promise, response);
      }
    }, function (error) {
      if (!called) {
        called = true;
        handlers.reject(promise, error);
      }
    });
  }
}

},{"immediate":36}],38:[function(require,module,exports){
// Top level file is just a mixin of submodules & constants
'use strict';

var assign    = require('./lib/utils/common').assign;

var deflate   = require('./lib/deflate');
var inflate   = require('./lib/inflate');
var constants = require('./lib/zlib/constants');

var pako = {};

assign(pako, deflate, inflate, constants);

module.exports = pako;

},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(require,module,exports){
'use strict';


var zlib_deflate = require('./zlib/deflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');

var toString = Object.prototype.toString;

/* Public constants ==========================================================*/
/* ===========================================================================*/

var Z_NO_FLUSH      = 0;
var Z_FINISH        = 4;

var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_SYNC_FLUSH    = 2;

var Z_DEFAULT_COMPRESSION = -1;

var Z_DEFAULT_STRATEGY    = 0;

var Z_DEFLATED  = 8;

/* ===========================================================================*/


/**
 * class Deflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[deflate]],
 * [[deflateRaw]] and [[gzip]].
 **/

/* internal
 * Deflate.chunks -> Array
 *
 * Chunks of output data, if [[Deflate#onData]] not overriden.
 **/

/**
 * Deflate.result -> Uint8Array|Array
 *
 * Compressed result, generated by default [[Deflate#onData]]
 * and [[Deflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Deflate#push]] with `Z_FINISH` / `true` param)  or if you
 * push a chunk with explicit flush (call [[Deflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Deflate.err -> Number
 *
 * Error code after deflate finished. 0 (Z_OK) on success.
 * You will not need it in real life, because deflate errors
 * are possible only on wrong options or bad `onData` / `onEnd`
 * custom handlers.
 **/

/**
 * Deflate.msg -> String
 *
 * Error message, if [[Deflate.err]] != 0
 **/


/**
 * new Deflate(options)
 * - options (Object): zlib deflate options.
 *
 * Creates new deflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `level`
 * - `windowBits`
 * - `memLevel`
 * - `strategy`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw deflate
 * - `gzip` (Boolean) - create gzip wrapper
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 * - `header` (Object) - custom header for gzip
 *   - `text` (Boolean) - true if compressed data believed to be text
 *   - `time` (Number) - modification time, unix timestamp
 *   - `os` (Number) - operation system code
 *   - `extra` (Array) - array of bytes with extra data (max 65536)
 *   - `name` (String) - file name (binary string)
 *   - `comment` (String) - comment (binary string)
 *   - `hcrc` (Boolean) - true if header crc should be added
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var deflate = new pako.Deflate({ level: 3});
 *
 * deflate.push(chunk1, false);
 * deflate.push(chunk2, true);  // true -> last chunk
 *
 * if (deflate.err) { throw new Error(deflate.err); }
 *
 * console.log(deflate.result);
 * ```
 **/
function Deflate(options) {
  if (!(this instanceof Deflate)) return new Deflate(options);

  this.options = utils.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY,
    to: ''
  }, options || {});

  var opt = this.options;

  if (opt.raw && (opt.windowBits > 0)) {
    opt.windowBits = -opt.windowBits;
  }

  else if (opt.gzip && (opt.windowBits > 0) && (opt.windowBits < 16)) {
    opt.windowBits += 16;
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm = new ZStream();
  this.strm.avail_out = 0;

  var status = zlib_deflate.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );

  if (status !== Z_OK) {
    throw new Error(msg[status]);
  }

  if (opt.header) {
    zlib_deflate.deflateSetHeader(this.strm, opt.header);
  }

  if (opt.dictionary) {
    var dict;
    // Convert data if needed
    if (typeof opt.dictionary === 'string') {
      // If we need to compress text, change encoding to utf8.
      dict = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === '[object ArrayBuffer]') {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }

    status = zlib_deflate.deflateSetDictionary(this.strm, dict);

    if (status !== Z_OK) {
      throw new Error(msg[status]);
    }

    this._dict_set = true;
  }
}

/**
 * Deflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data. Strings will be
 *   converted to utf8 byte sequence.
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to deflate pipe, generating [[Deflate#onData]] calls with
 * new compressed chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Deflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the compression context.
 *
 * On fail call [[Deflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * array format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Deflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var status, _mode;

  if (this.ended) { return false; }

  _mode = (mode === ~~mode) ? mode : ((mode === true) ? Z_FINISH : Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // If we need to compress text, change encoding to utf8.
    strm.input = strings.string2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = zlib_deflate.deflate(strm, _mode);    /* no bad return value */

    if (status !== Z_STREAM_END && status !== Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }
    if (strm.avail_out === 0 || (strm.avail_in === 0 && (_mode === Z_FINISH || _mode === Z_SYNC_FLUSH))) {
      if (this.options.to === 'string') {
        this.onData(strings.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
      } else {
        this.onData(utils.shrinkBuf(strm.output, strm.next_out));
      }
    }
  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END);

  // Finalize on the last chunk.
  if (_mode === Z_FINISH) {
    status = zlib_deflate.deflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === Z_SYNC_FLUSH) {
    this.onEnd(Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Deflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Deflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Deflate#onEnd(status) -> Void
 * - status (Number): deflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called once after you tell deflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Deflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === Z_OK) {
    if (this.options.to === 'string') {
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * deflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * Compress `data` with deflate algorithm and `options`.
 *
 * Supported options are:
 *
 * - level
 * - windowBits
 * - memLevel
 * - strategy
 * - dictionary
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be "binary string"
 *    (each char code [0..255])
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , data = Uint8Array([1,2,3,4,5,6,7,8,9]);
 *
 * console.log(pako.deflate(data));
 * ```
 **/
function deflate(input, options) {
  var deflator = new Deflate(options);

  deflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (deflator.err) { throw deflator.msg || msg[deflator.err]; }

  return deflator.result;
}


/**
 * deflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function deflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return deflate(input, options);
}


/**
 * gzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to compress.
 * - options (Object): zlib deflate options.
 *
 * The same as [[deflate]], but create gzip wrapper instead of
 * deflate one.
 **/
function gzip(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate(input, options);
}


exports.Deflate = Deflate;
exports.deflate = deflate;
exports.deflateRaw = deflateRaw;
exports.gzip = gzip;

},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(require,module,exports){
'use strict';


var zlib_inflate = require('./zlib/inflate');
var utils        = require('./utils/common');
var strings      = require('./utils/strings');
var c            = require('./zlib/constants');
var msg          = require('./zlib/messages');
var ZStream      = require('./zlib/zstream');
var GZheader     = require('./zlib/gzheader');

var toString = Object.prototype.toString;

/**
 * class Inflate
 *
 * Generic JS-style wrapper for zlib calls. If you don't need
 * streaming behaviour - use more simple functions: [[inflate]]
 * and [[inflateRaw]].
 **/

/* internal
 * inflate.chunks -> Array
 *
 * Chunks of output data, if [[Inflate#onData]] not overriden.
 **/

/**
 * Inflate.result -> Uint8Array|Array|String
 *
 * Uncompressed result, generated by default [[Inflate#onData]]
 * and [[Inflate#onEnd]] handlers. Filled after you push last chunk
 * (call [[Inflate#push]] with `Z_FINISH` / `true` param) or if you
 * push a chunk with explicit flush (call [[Inflate#push]] with
 * `Z_SYNC_FLUSH` param).
 **/

/**
 * Inflate.err -> Number
 *
 * Error code after inflate finished. 0 (Z_OK) on success.
 * Should be checked if broken data possible.
 **/

/**
 * Inflate.msg -> String
 *
 * Error message, if [[Inflate.err]] != 0
 **/


/**
 * new Inflate(options)
 * - options (Object): zlib inflate options.
 *
 * Creates new inflator instance with specified params. Throws exception
 * on bad params. Supported options:
 *
 * - `windowBits`
 * - `dictionary`
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information on these.
 *
 * Additional options, for internal needs:
 *
 * - `chunkSize` - size of generated data chunks (16K by default)
 * - `raw` (Boolean) - do raw inflate
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 * By default, when no options set, autodetect deflate/gzip data format via
 * wrapper header.
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , chunk1 = Uint8Array([1,2,3,4,5,6,7,8,9])
 *   , chunk2 = Uint8Array([10,11,12,13,14,15,16,17,18,19]);
 *
 * var inflate = new pako.Inflate({ level: 3});
 *
 * inflate.push(chunk1, false);
 * inflate.push(chunk2, true);  // true -> last chunk
 *
 * if (inflate.err) { throw new Error(inflate.err); }
 *
 * console.log(inflate.result);
 * ```
 **/
function Inflate(options) {
  if (!(this instanceof Inflate)) return new Inflate(options);

  this.options = utils.assign({
    chunkSize: 16384,
    windowBits: 0,
    to: ''
  }, options || {});

  var opt = this.options;

  // Force window size for `raw` data, if not set directly,
  // because we have no header for autodetect.
  if (opt.raw && (opt.windowBits >= 0) && (opt.windowBits < 16)) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) { opt.windowBits = -15; }
  }

  // If `windowBits` not defined (and mode not raw) - set autodetect flag for gzip/deflate
  if ((opt.windowBits >= 0) && (opt.windowBits < 16) &&
      !(options && options.windowBits)) {
    opt.windowBits += 32;
  }

  // Gzip header has no info about windows size, we can do autodetect only
  // for deflate. So, if window size not set, force it to max when gzip possible
  if ((opt.windowBits > 15) && (opt.windowBits < 48)) {
    // bit 3 (16) -> gzipped data
    // bit 4 (32) -> autodetect gzip/deflate
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }

  this.err    = 0;      // error code, if happens (0 = Z_OK)
  this.msg    = '';     // error message
  this.ended  = false;  // used to avoid multiple onEnd() calls
  this.chunks = [];     // chunks of compressed data

  this.strm   = new ZStream();
  this.strm.avail_out = 0;

  var status  = zlib_inflate.inflateInit2(
    this.strm,
    opt.windowBits
  );

  if (status !== c.Z_OK) {
    throw new Error(msg[status]);
  }

  this.header = new GZheader();

  zlib_inflate.inflateGetHeader(this.strm, this.header);
}

/**
 * Inflate#push(data[, mode]) -> Boolean
 * - data (Uint8Array|Array|ArrayBuffer|String): input data
 * - mode (Number|Boolean): 0..6 for corresponding Z_NO_FLUSH..Z_TREE modes.
 *   See constants. Skipped or `false` means Z_NO_FLUSH, `true` meansh Z_FINISH.
 *
 * Sends input data to inflate pipe, generating [[Inflate#onData]] calls with
 * new output chunks. Returns `true` on success. The last data block must have
 * mode Z_FINISH (or `true`). That will flush internal pending buffers and call
 * [[Inflate#onEnd]]. For interim explicit flushes (without ending the stream) you
 * can use mode Z_SYNC_FLUSH, keeping the decompression context.
 *
 * On fail call [[Inflate#onEnd]] with error code and return false.
 *
 * We strongly recommend to use `Uint8Array` on input for best speed (output
 * format is detected automatically). Also, don't skip last param and always
 * use the same type in your code (boolean or number). That will improve JS speed.
 *
 * For regular `Array`-s make sure all elements are [0..255].
 *
 * ##### Example
 *
 * ```javascript
 * push(chunk, false); // push one of data chunks
 * ...
 * push(chunk, true);  // push last chunk
 * ```
 **/
Inflate.prototype.push = function (data, mode) {
  var strm = this.strm;
  var chunkSize = this.options.chunkSize;
  var dictionary = this.options.dictionary;
  var status, _mode;
  var next_out_utf8, tail, utf8str;
  var dict;

  // Flag to properly process Z_BUF_ERROR on testing inflate call
  // when we check that all output data was flushed.
  var allowBufError = false;

  if (this.ended) { return false; }
  _mode = (mode === ~~mode) ? mode : ((mode === true) ? c.Z_FINISH : c.Z_NO_FLUSH);

  // Convert data if needed
  if (typeof data === 'string') {
    // Only binary strings can be decompressed on practice
    strm.input = strings.binstring2buf(data);
  } else if (toString.call(data) === '[object ArrayBuffer]') {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }

  strm.next_in = 0;
  strm.avail_in = strm.input.length;

  do {
    if (strm.avail_out === 0) {
      strm.output = new utils.Buf8(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }

    status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);    /* no bad return value */

    if (status === c.Z_NEED_DICT && dictionary) {
      // Convert data if needed
      if (typeof dictionary === 'string') {
        dict = strings.string2buf(dictionary);
      } else if (toString.call(dictionary) === '[object ArrayBuffer]') {
        dict = new Uint8Array(dictionary);
      } else {
        dict = dictionary;
      }

      status = zlib_inflate.inflateSetDictionary(this.strm, dict);

    }

    if (status === c.Z_BUF_ERROR && allowBufError === true) {
      status = c.Z_OK;
      allowBufError = false;
    }

    if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
      this.onEnd(status);
      this.ended = true;
      return false;
    }

    if (strm.next_out) {
      if (strm.avail_out === 0 || status === c.Z_STREAM_END || (strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH))) {

        if (this.options.to === 'string') {

          next_out_utf8 = strings.utf8border(strm.output, strm.next_out);

          tail = strm.next_out - next_out_utf8;
          utf8str = strings.buf2string(strm.output, next_out_utf8);

          // move tail
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) { utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0); }

          this.onData(utf8str);

        } else {
          this.onData(utils.shrinkBuf(strm.output, strm.next_out));
        }
      }
    }

    // When no more input data, we should check that internal inflate buffers
    // are flushed. The only way to do it when avail_out = 0 - run one more
    // inflate pass. But if output data not exists, inflate return Z_BUF_ERROR.
    // Here we set flag to process this error properly.
    //
    // NOTE. Deflate does not return error in this case and does not needs such
    // logic.
    if (strm.avail_in === 0 && strm.avail_out === 0) {
      allowBufError = true;
    }

  } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);

  if (status === c.Z_STREAM_END) {
    _mode = c.Z_FINISH;
  }

  // Finalize on the last chunk.
  if (_mode === c.Z_FINISH) {
    status = zlib_inflate.inflateEnd(this.strm);
    this.onEnd(status);
    this.ended = true;
    return status === c.Z_OK;
  }

  // callback interim results if Z_SYNC_FLUSH.
  if (_mode === c.Z_SYNC_FLUSH) {
    this.onEnd(c.Z_OK);
    strm.avail_out = 0;
    return true;
  }

  return true;
};


/**
 * Inflate#onData(chunk) -> Void
 * - chunk (Uint8Array|Array|String): ouput data. Type of array depends
 *   on js engine support. When string output requested, each chunk
 *   will be string.
 *
 * By default, stores data blocks in `chunks[]` property and glue
 * those in `onEnd`. Override this handler, if you need another behaviour.
 **/
Inflate.prototype.onData = function (chunk) {
  this.chunks.push(chunk);
};


/**
 * Inflate#onEnd(status) -> Void
 * - status (Number): inflate status. 0 (Z_OK) on success,
 *   other if not.
 *
 * Called either after you tell inflate that the input stream is
 * complete (Z_FINISH) or should be flushed (Z_SYNC_FLUSH)
 * or if an error happened. By default - join collected chunks,
 * free memory and fill `results` / `err` properties.
 **/
Inflate.prototype.onEnd = function (status) {
  // On success - join
  if (status === c.Z_OK) {
    if (this.options.to === 'string') {
      // Glue & convert here, until we teach pako to send
      // utf8 alligned strings to onData
      this.result = this.chunks.join('');
    } else {
      this.result = utils.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};


/**
 * inflate(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Decompress `data` with inflate/ungzip and `options`. Autodetect
 * format via wrapper header by default. That's why we don't provide
 * separate `ungzip` method.
 *
 * Supported options are:
 *
 * - windowBits
 *
 * [http://zlib.net/manual.html#Advanced](http://zlib.net/manual.html#Advanced)
 * for more information.
 *
 * Sugar (options):
 *
 * - `raw` (Boolean) - say that we work with raw stream, if you don't wish to specify
 *   negative windowBits implicitly.
 * - `to` (String) - if equal to 'string', then result will be converted
 *   from utf8 to utf16 (javascript) string. When string output requested,
 *   chunk length can differ from `chunkSize`, depending on content.
 *
 *
 * ##### Example:
 *
 * ```javascript
 * var pako = require('pako')
 *   , input = pako.deflate([1,2,3,4,5,6,7,8,9])
 *   , output;
 *
 * try {
 *   output = pako.inflate(input);
 * } catch (err)
 *   console.log(err);
 * }
 * ```
 **/
function inflate(input, options) {
  var inflator = new Inflate(options);

  inflator.push(input, true);

  // That will never happens, if you don't cheat with options :)
  if (inflator.err) { throw inflator.msg || msg[inflator.err]; }

  return inflator.result;
}


/**
 * inflateRaw(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * The same as [[inflate]], but creates raw data, without wrapper
 * (header and adler32 crc).
 **/
function inflateRaw(input, options) {
  options = options || {};
  options.raw = true;
  return inflate(input, options);
}


/**
 * ungzip(data[, options]) -> Uint8Array|Array|String
 * - data (Uint8Array|Array|String): input data to decompress.
 * - options (Object): zlib inflate options.
 *
 * Just shortcut to [[inflate]], because it autodetects format
 * by header.content. Done for convenience.
 **/


exports.Inflate = Inflate;
exports.inflate = inflate;
exports.inflateRaw = inflateRaw;
exports.ungzip  = inflate;

},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(require,module,exports){
'use strict';


var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
                (typeof Uint16Array !== 'undefined') &&
                (typeof Int32Array !== 'undefined');


exports.assign = function (obj /*from1, from2, from3, ...*/) {
  var sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    var source = sources.shift();
    if (!source) { continue; }

    if (typeof source !== 'object') {
      throw new TypeError(source + 'must be non-object');
    }

    for (var p in source) {
      if (source.hasOwnProperty(p)) {
        obj[p] = source[p];
      }
    }
  }

  return obj;
};


// reduce buffer size, avoiding mem copy
exports.shrinkBuf = function (buf, size) {
  if (buf.length === size) { return buf; }
  if (buf.subarray) { return buf.subarray(0, size); }
  buf.length = size;
  return buf;
};


var fnTyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    if (src.subarray && dest.subarray) {
      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
      return;
    }
    // Fallback to ordinary array
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    var i, l, len, pos, chunk, result;

    // calculate data length
    len = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      len += chunks[i].length;
    }

    // join chunks
    result = new Uint8Array(len);
    pos = 0;
    for (i = 0, l = chunks.length; i < l; i++) {
      chunk = chunks[i];
      result.set(chunk, pos);
      pos += chunk.length;
    }

    return result;
  }
};

var fnUntyped = {
  arraySet: function (dest, src, src_offs, len, dest_offs) {
    for (var i = 0; i < len; i++) {
      dest[dest_offs + i] = src[src_offs + i];
    }
  },
  // Join array of chunks to single array.
  flattenChunks: function (chunks) {
    return [].concat.apply([], chunks);
  }
};


// Enable/Disable typed arrays use, for testing
//
exports.setTyped = function (on) {
  if (on) {
    exports.Buf8  = Uint8Array;
    exports.Buf16 = Uint16Array;
    exports.Buf32 = Int32Array;
    exports.assign(exports, fnTyped);
  } else {
    exports.Buf8  = Array;
    exports.Buf16 = Array;
    exports.Buf32 = Array;
    exports.assign(exports, fnUntyped);
  }
};

exports.setTyped(TYPED_OK);

},{}],42:[function(require,module,exports){
// String encode/decode helpers
'use strict';


var utils = require('./common');


// Quick check if we can use fast array to bin string conversion
//
// - apply(Array) can fail on Android 2.2
// - apply(Uint8Array) can fail on iOS 5.1 Safary
//
var STR_APPLY_OK = true;
var STR_APPLY_UIA_OK = true;

try { String.fromCharCode.apply(null, [ 0 ]); } catch (__) { STR_APPLY_OK = false; }
try { String.fromCharCode.apply(null, new Uint8Array(1)); } catch (__) { STR_APPLY_UIA_OK = false; }


// Table with utf8 lengths (calculated by first byte of sequence)
// Note, that 5 & 6-byte values and some 4-byte values can not be represented in JS,
// because max possible codepoint is 0x10ffff
var _utf8len = new utils.Buf8(256);
for (var q = 0; q < 256; q++) {
  _utf8len[q] = (q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1);
}
_utf8len[254] = _utf8len[254] = 1; // Invalid sequence start


// convert string to array (typed, when possible)
exports.string2buf = function (str) {
  var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;

  // count binary size
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    buf_len += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }

  // allocate buffer
  buf = new utils.Buf8(buf_len);

  // convert
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 0xfc00) === 0xd800 && (m_pos + 1 < str_len)) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 0xfc00) === 0xdc00) {
        c = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        m_pos++;
      }
    }
    if (c < 0x80) {
      /* one byte */
      buf[i++] = c;
    } else if (c < 0x800) {
      /* two bytes */
      buf[i++] = 0xC0 | (c >>> 6);
      buf[i++] = 0x80 | (c & 0x3f);
    } else if (c < 0x10000) {
      /* three bytes */
      buf[i++] = 0xE0 | (c >>> 12);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    } else {
      /* four bytes */
      buf[i++] = 0xf0 | (c >>> 18);
      buf[i++] = 0x80 | (c >>> 12 & 0x3f);
      buf[i++] = 0x80 | (c >>> 6 & 0x3f);
      buf[i++] = 0x80 | (c & 0x3f);
    }
  }

  return buf;
};

// Helper (used in 2 places)
function buf2binstring(buf, len) {
  // use fallback for big arrays to avoid stack overflow
  if (len < 65537) {
    if ((buf.subarray && STR_APPLY_UIA_OK) || (!buf.subarray && STR_APPLY_OK)) {
      return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
    }
  }

  var result = '';
  for (var i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
}


// Convert byte array to binary string
exports.buf2binstring = function (buf) {
  return buf2binstring(buf, buf.length);
};


// Convert binary string (typed, when possible)
exports.binstring2buf = function (str) {
  var buf = new utils.Buf8(str.length);
  for (var i = 0, len = buf.length; i < len; i++) {
    buf[i] = str.charCodeAt(i);
  }
  return buf;
};


// convert array to string
exports.buf2string = function (buf, max) {
  var i, out, c, c_len;
  var len = max || buf.length;

  // Reserve max possible length (2 words per char)
  // NB: by unknown reasons, Array is significantly faster for
  //     String.fromCharCode.apply than Uint16Array.
  var utf16buf = new Array(len * 2);

  for (out = 0, i = 0; i < len;) {
    c = buf[i++];
    // quick process ascii
    if (c < 0x80) { utf16buf[out++] = c; continue; }

    c_len = _utf8len[c];
    // skip 5 & 6 byte codes
    if (c_len > 4) { utf16buf[out++] = 0xfffd; i += c_len - 1; continue; }

    // apply mask on first byte
    c &= c_len === 2 ? 0x1f : c_len === 3 ? 0x0f : 0x07;
    // join the rest
    while (c_len > 1 && i < len) {
      c = (c << 6) | (buf[i++] & 0x3f);
      c_len--;
    }

    // terminated by end of string?
    if (c_len > 1) { utf16buf[out++] = 0xfffd; continue; }

    if (c < 0x10000) {
      utf16buf[out++] = c;
    } else {
      c -= 0x10000;
      utf16buf[out++] = 0xd800 | ((c >> 10) & 0x3ff);
      utf16buf[out++] = 0xdc00 | (c & 0x3ff);
    }
  }

  return buf2binstring(utf16buf, out);
};


// Calculate max possible position in utf8 buffer,
// that will not break sequence. If that's not possible
// - (very small limits) return max size as is.
//
// buf[] - utf8 bytes array
// max   - length limit (mandatory);
exports.utf8border = function (buf, max) {
  var pos;

  max = max || buf.length;
  if (max > buf.length) { max = buf.length; }

  // go back from last position, until start of sequence found
  pos = max - 1;
  while (pos >= 0 && (buf[pos] & 0xC0) === 0x80) { pos--; }

  // Fuckup - very small and broken sequence,
  // return max, because we should return something anyway.
  if (pos < 0) { return max; }

  // If we came to start of buffer - that means vuffer is too small,
  // return max too.
  if (pos === 0) { return max; }

  return (pos + _utf8len[buf[pos]] > max) ? pos : max;
};

},{"./common":41}],43:[function(require,module,exports){
'use strict';

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}


module.exports = adler32;

},{}],44:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {

  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH:         0,
  Z_PARTIAL_FLUSH:    1,
  Z_SYNC_FLUSH:       2,
  Z_FULL_FLUSH:       3,
  Z_FINISH:           4,
  Z_BLOCK:            5,
  Z_TREES:            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK:               0,
  Z_STREAM_END:       1,
  Z_NEED_DICT:        2,
  Z_ERRNO:           -1,
  Z_STREAM_ERROR:    -2,
  Z_DATA_ERROR:      -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR:       -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION:         0,
  Z_BEST_SPEED:             1,
  Z_BEST_COMPRESSION:       9,
  Z_DEFAULT_COMPRESSION:   -1,


  Z_FILTERED:               1,
  Z_HUFFMAN_ONLY:           2,
  Z_RLE:                    3,
  Z_FIXED:                  4,
  Z_DEFAULT_STRATEGY:       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY:                 0,
  Z_TEXT:                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN:                2,

  /* The deflate compression method */
  Z_DEFLATED:               8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};

},{}],45:[function(require,module,exports){
'use strict';

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}


module.exports = crc32;

},{}],46:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils   = require('../utils/common');
var trees   = require('./trees');
var adler32 = require('./adler32');
var crc32   = require('./crc32');
var msg     = require('./messages');

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH      = 0;
var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION = -1;


var Z_FILTERED            = 1;
var Z_HUFFMAN_ONLY        = 2;
var Z_RLE                 = 3;
var Z_FIXED               = 4;
var Z_DEFAULT_STRATEGY    = 0;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;


/* The deflate compression method */
var Z_DEFLATED  = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;
/* Maximum value for memLevel in deflateInit2 */
var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_MEM_LEVEL = 8;


var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS      = 256;
/* number of literal bytes 0..255 */
var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES       = 30;
/* number of distance codes */
var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS  = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE     = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) { return; }

  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
//  put_byte(s, (Byte)(b >> 8));
//  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) { len = size; }
  if (len === 0) { return 0; }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  utils.arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  }

  else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length;      /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match;                       /* matched string */
  var len;                           /* length of current match */
  var best_len = s.prev_length;              /* best match length so far */
  var nice_match = s.nice_match;             /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev  = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1  = _win[scan + best_len - 1];
  var scan_end   = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len]     !== scan_end  ||
        _win[match + best_len - 1] !== scan_end1 ||
        _win[match]                !== _win[scan] ||
        _win[++match]              !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
             scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1  = _win[scan + best_len - 1];
      scan_end   = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
//#if MIN_MATCH != 3
//        Call update_hash() MIN_MATCH-3 more times
//#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
//  if (s.high_water < s.window_size) {
//    var curr = s.strstart + s.lookahead;
//    var init = 0;
//
//    if (s.high_water < curr) {
//      /* Previous high water mark below current data -- zero WIN_INIT
//       * bytes or up to end of window, whichever is less.
//       */
//      init = s.window_size - curr;
//      if (init > WIN_INIT)
//        init = WIN_INIT;
//      zmemzero(s->window + curr, (unsigned)init);
//      s->high_water = curr + init;
//    }
//    else if (s->high_water < (ulg)curr + WIN_INIT) {
//      /* High water mark at or above current data, but below current data
//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
//       * to end of window, whichever is less.
//       */
//      init = (ulg)curr + WIN_INIT - s->high_water;
//      if (init > s->window_size - s->high_water)
//        init = s->window_size - s->high_water;
//      zmemzero(s->window + s->high_water, (unsigned)init);
//      s->high_water += init;
//    }
//  }
//
//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
//    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
//        s.block_start >= s.w_size)) {
//        throw  new Error("slide too late");
//      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
//    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head;        /* head of the hash chain */
  var bflush;           /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else
      {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

//#if MIN_MATCH != 3
//                Call UPDATE_HASH() MIN_MATCH-3 more times
//#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head;          /* head of hash chain */
  var bflush;              /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0/*NIL*/;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush;            /* set if current block must be flushed */
  var prev;              /* byte at distance one to match */
  var scan, strend;      /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) { break; } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 prev === _win[++scan] && prev === _win[++scan] &&
                 scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush;             /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH) {
          return BS_NEED_MORE;
        }
        break;      /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null;            /* pointer back to this zlib stream */
  this.status = 0;            /* as the name implies */
  this.pending_buf = null;      /* output still pending */
  this.pending_buf_size = 0;  /* size of pending_buf */
  this.pending_out = 0;       /* next pending byte to output to the stream */
  this.pending = 0;           /* nb of bytes in the pending buffer */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null;         /* gzip header information to write */
  this.gzindex = 0;           /* where in extra, name, or comment */
  this.method = Z_DEFLATED; /* can only be DEFLATED */
  this.last_flush = -1;   /* value of flush param for previous deflate call */

  this.w_size = 0;  /* LZ77 window size (32K by default) */
  this.w_bits = 0;  /* log2(w_size)  (8..16) */
  this.w_mask = 0;  /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null;   /* Heads of the hash chains or NIL. */

  this.ins_h = 0;       /* hash index of string to be inserted */
  this.hash_size = 0;   /* number of elements in hash table */
  this.hash_bits = 0;   /* log2(hash_size) */
  this.hash_mask = 0;   /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0;      /* length of best match */
  this.prev_match = 0;        /* previous match */
  this.match_available = 0;   /* set if previous match exists */
  this.strstart = 0;          /* start of string to insert */
  this.match_start = 0;       /* start of matching string */
  this.lookahead = 0;         /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0;     /* compression level (1..9) */
  this.strategy = 0;  /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

              /* used by trees.c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc   = null;         /* desc. for literal tree */
  this.d_desc   = null;         /* desc. for distance tree */
  this.bl_desc  = null;         /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new utils.Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0;               /* number of elements in the heap */
  this.heap_max = 0;               /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all trees.
   */

  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0;          /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0;      /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0;       /* bit length of current block with optimal trees */
  this.static_len = 0;    /* bit length of current block with static trees */
  this.matches = 0;       /* number of string matches in current block */
  this.insert = 0;        /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0  // crc32(0, Z_NULL, 0)
  :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH;
  trees._tr_init(s);
  return Z_OK;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateSetHeader(strm, head) {
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
  strm.state.gzhead = head;
  return Z_OK;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  }

  else if (windowBits > 15) {
    wrap = 2;           /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED) {
    return err(strm, Z_STREAM_ERROR);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new utils.Buf8(s.w_size * 2);
  s.head = new utils.Buf16(s.hash_size);
  s.prev = new utils.Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new utils.Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}

function deflateInit(strm, level) {
  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
  }

  s = strm.state;

  if (!strm.output ||
      (!strm.input && strm.avail_in !== 0) ||
      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {

    if (s.wrap === 2) { // GZIP header
      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      }
      else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
                    (s.gzhead.hcrc ? 2 : 0) +
                    (!s.gzhead.extra ? 0 : 4) +
                    (!s.gzhead.name ? 0 : 8) +
                    (!s.gzhead.comment ? 0 : 16)
                );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
                     4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    }
    else // DEFLATE header
    {
      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) { header |= PRESET_DICT; }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

//#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    }
    else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    }
    else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment/* != Z_NULL*/) {
      beg = s.pending;  /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    }
    else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    }
    else {
      s.status = BUSY_STATE;
    }
  }
//#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH) {
    return err(strm, Z_BUF_ERROR);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        trees._tr_align(s);
      }
      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

        trees._tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH) {
          /*** CLEAR_HASH(s); ***/             /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH) { return Z_OK; }
  if (s.wrap <= 0) { return Z_STREAM_END; }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  }
  else
  {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) { s.wrap = -s.wrap; }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
}

function deflateEnd(strm) {
  var status;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err(strm, Z_STREAM_ERROR);
  }

  strm.state = null;

  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
}


/* =========================================================================
 * Initializes the compression dictionary from the given byte
 * sequence without producing any compressed output.
 */
function deflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var s;
  var str, n;
  var wrap;
  var avail;
  var next;
  var input;
  var tmpDict;

  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
    return Z_STREAM_ERROR;
  }

  s = strm.state;
  wrap = s.wrap;

  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
    return Z_STREAM_ERROR;
  }

  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
  if (wrap === 1) {
    /* adler32(strm->adler, dictionary, dictLength); */
    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
  }

  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

  /* if dictionary would fill window, just replace the history */
  if (dictLength >= s.w_size) {
    if (wrap === 0) {            /* already empty otherwise */
      /*** CLEAR_HASH(s); ***/
      zero(s.head); // Fill with NIL (= 0);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    /* use the tail */
    // dictionary = dictionary.slice(dictLength - s.w_size);
    tmpDict = new utils.Buf8(s.w_size);
    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  /* insert dictionary into window and hash */
  avail = strm.avail_in;
  next = strm.next_in;
  input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    str = s.strstart;
    n = s.lookahead - (MIN_MATCH - 1);
    do {
      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

      s.prev[str & s.w_mask] = s.head[s.ins_h];

      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK;
}


exports.deflateInit = deflateInit;
exports.deflateInit2 = deflateInit2;
exports.deflateReset = deflateReset;
exports.deflateResetKeep = deflateResetKeep;
exports.deflateSetHeader = deflateSetHeader;
exports.deflate = deflate;
exports.deflateEnd = deflateEnd;
exports.deflateSetDictionary = deflateSetDictionary;
exports.deflateInfo = 'pako deflate (from Nodeca project)';

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function GZheader() {
  /* true if compressed data believed to be text */
  this.text       = 0;
  /* modification time */
  this.time       = 0;
  /* extra flags (not used when writing a gzip file) */
  this.xflags     = 0;
  /* operating system */
  this.os         = 0;
  /* pointer to extra field or Z_NULL if none */
  this.extra      = null;
  /* extra field length (valid if extra != Z_NULL) */
  this.extra_len  = 0; // Actually, we don't need it in JS,
                       // but leave for few code modifications

  //
  // Setup limits is not necessary because in js we should not preallocate memory
  // for inflate use constant limit in 65536 bytes
  //

  /* space at extra (only when reading header) */
  // this.extra_max  = 0;
  /* pointer to zero-terminated file name or Z_NULL */
  this.name       = '';
  /* space at name (only when reading header) */
  // this.name_max   = 0;
  /* pointer to zero-terminated comment or Z_NULL */
  this.comment    = '';
  /* space at comment (only when reading header) */
  // this.comm_max   = 0;
  /* true if there was or will be a header crc */
  this.hcrc       = 0;
  /* true when done reading gzip header (not used when writing a gzip file) */
  this.done       = false;
}

module.exports = GZheader;

},{}],48:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

// See state defs from inflate.js
var BAD = 30;       /* got a data error -- remain here until reset */
var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
module.exports = function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
};

},{}],49:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils         = require('../utils/common');
var adler32       = require('./adler32');
var crc32         = require('./crc32');
var inflate_fast  = require('./inffast');
var inflate_table = require('./inftrees');

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH        = 4;
var Z_BLOCK         = 5;
var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK            = 0;
var Z_STREAM_END    = 1;
var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR  = -2;
var Z_DATA_ERROR    = -3;
var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR     = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED  = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var    HEAD = 1;       /* i: waiting for magic header */
var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
var    TIME = 3;       /* i: waiting for modification time (gzip) */
var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
var    NAME = 7;       /* i: waiting for end of file name (gzip) */
var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
var    HCRC = 9;       /* i: waiting for header crc (gzip) */
var    DICTID = 10;    /* i: waiting for dictionary check value */
var    DICT = 11;      /* waiting for inflateSetDictionary() call */
var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
var        STORED = 14;    /* i: waiting for stored size (length and complement) */
var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
var        LENLENS = 18;   /* i: waiting for code length code lengths */
var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
var            LEN = 21;       /* i: waiting for length/lit/eob code */
var            LENEXT = 22;    /* i: waiting for length extra bits */
var            DIST = 23;      /* i: waiting for distance code */
var            DISTEXT = 24;   /* i: waiting for distance extra bits */
var            MATCH = 25;     /* o: waiting for output space to copy string */
var            LIT = 26;       /* o: waiting for output space to write literal */
var    CHECK = 27;     /* i: waiting for 32-bit check value */
var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
var    DONE = 29;      /* finished check, done -- remain here until reset */
var    BAD = 30;       /* got a data error -- remain here until reset */
var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

var MAX_WBITS = 15;
/* 32K LZ77 window */
var DEF_WBITS = MAX_WBITS;


function zswap32(q) {
  return  (((q >>> 24) & 0xff) +
          ((q >>> 8) & 0xff00) +
          ((q & 0xff00) << 8) +
          ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0;             /* current inflate mode */
  this.last = false;          /* true if processing last block */
  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false;      /* true if dictionary provided */
  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0;             /* protected copy of check value */
  this.total = 0;             /* protected copy of output count */
  // TODO: may be {}
  this.head = null;           /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0;             /* log base 2 of requested window size */
  this.wsize = 0;             /* window size or zero if not using window */
  this.whave = 0;             /* valid bytes in the window */
  this.wnext = 0;             /* window write index */
  this.window = null;         /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0;              /* input bit accumulator */
  this.bits = 0;              /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0;            /* literal or length of data to copy */
  this.offset = 0;            /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0;             /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null;          /* starting table for length/literal codes */
  this.distcode = null;         /* starting table for distance codes */
  this.lenbits = 0;           /* index bits for lencode */
  this.distbits = 0;          /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0;             /* number of code length code lengths */
  this.nlen = 0;              /* number of length code lengths */
  this.ndist = 0;             /* number of distance code lengths */
  this.have = 0;              /* number of code lengths in lens[] */
  this.next = null;              /* next available space in codes[] */

  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
  this.work = new utils.Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
  this.sane = 0;                   /* if false, allow invalid distance too far */
  this.back = 0;                   /* bits back of last unprocessed length/lit */
  this.was = 0;                    /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) {       /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null/*Z_NULL*/;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  }
  else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) { return Z_STREAM_ERROR; }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null/*Z_NULL*/;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK) {
    strm.state = null/*Z_NULL*/;
  }
  return ret;
}

function inflateInit(strm) {
  return inflateInit2(strm, DEF_WBITS);
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new utils.Buf32(512);
    distfix = new utils.Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) { state.lens[sym++] = 8; }
    while (sym < 256) { state.lens[sym++] = 9; }
    while (sym < 280) { state.lens[sym++] = 7; }
    while (sym < 288) { state.lens[sym++] = 8; }

    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

    /* distance table */
    sym = 0;
    while (sym < 32) { state.lens[sym++] = 5; }

    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new utils.Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  }
  else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      utils.arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    }
    else {
      state.wnext += dist;
      if (state.wnext === state.wsize) { state.wnext = 0; }
      if (state.whave < state.wsize) { state.whave += dist; }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output;          // input/output buffers
  var next;                   /* next input INDEX */
  var put;                    /* next output INDEX */
  var have, left;             /* available input and output */
  var hold;                   /* bit buffer */
  var bits;                   /* bits in bit buffer */
  var _in, _out;              /* save starting available input and output */
  var copy;                   /* number of stored or match bytes to copy */
  var from;                   /* where to copy match bytes from */
  var from_source;
  var here = 0;               /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len;                    /* length to copy for repeats, bits to drop */
  var ret;                    /* return code */
  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */
    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


  if (!strm || !strm.state || !strm.output ||
      (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR;
  }

  state = strm.state;
  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK;

  inf_leave: // goto emulation
  for (;;) {
    switch (state.mode) {
    case HEAD:
      if (state.wrap === 0) {
        state.mode = TYPEDO;
        break;
      }
      //=== NEEDBITS(16);
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
        state.check = 0/*crc32(0L, Z_NULL, 0)*/;
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//

        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = FLAGS;
        break;
      }
      state.flags = 0;           /* expect zlib header */
      if (state.head) {
        state.head.done = false;
      }
      if (!(state.wrap & 1) ||   /* check if zlib header allowed */
        (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
        strm.msg = 'incorrect header check';
        state.mode = BAD;
        break;
      }
      if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
      len = (hold & 0x0f)/*BITS(4)*/ + 8;
      if (state.wbits === 0) {
        state.wbits = len;
      }
      else if (len > state.wbits) {
        strm.msg = 'invalid window size';
        state.mode = BAD;
        break;
      }
      state.dmax = 1 << len;
      //Tracev((stderr, "inflate:   zlib header ok\n"));
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = hold & 0x200 ? DICTID : TYPE;
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      break;
    case FLAGS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.flags = hold;
      if ((state.flags & 0xff) !== Z_DEFLATED) {
        strm.msg = 'unknown compression method';
        state.mode = BAD;
        break;
      }
      if (state.flags & 0xe000) {
        strm.msg = 'unknown header flags set';
        state.mode = BAD;
        break;
      }
      if (state.head) {
        state.head.text = ((hold >> 8) & 1);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = TIME;
      /* falls through */
    case TIME:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.time = hold;
      }
      if (state.flags & 0x0200) {
        //=== CRC4(state.check, hold)
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        hbuf[2] = (hold >>> 16) & 0xff;
        hbuf[3] = (hold >>> 24) & 0xff;
        state.check = crc32(state.check, hbuf, 4, 0);
        //===
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = OS;
      /* falls through */
    case OS:
      //=== NEEDBITS(16); */
      while (bits < 16) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if (state.head) {
        state.head.xflags = (hold & 0xff);
        state.head.os = (hold >> 8);
      }
      if (state.flags & 0x0200) {
        //=== CRC2(state.check, hold);
        hbuf[0] = hold & 0xff;
        hbuf[1] = (hold >>> 8) & 0xff;
        state.check = crc32(state.check, hbuf, 2, 0);
        //===//
      }
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = EXLEN;
      /* falls through */
    case EXLEN:
      if (state.flags & 0x0400) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length = hold;
        if (state.head) {
          state.head.extra_len = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      else if (state.head) {
        state.head.extra = null/*Z_NULL*/;
      }
      state.mode = EXTRA;
      /* falls through */
    case EXTRA:
      if (state.flags & 0x0400) {
        copy = state.length;
        if (copy > have) { copy = have; }
        if (copy) {
          if (state.head) {
            len = state.head.extra_len - state.length;
            if (!state.head.extra) {
              // Use untyped array for more conveniend processing later
              state.head.extra = new Array(state.head.extra_len);
            }
            utils.arraySet(
              state.head.extra,
              input,
              next,
              // extra field is limited to 65536 bytes
              // - no need for additional size check
              copy,
              /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
              len
            );
            //zmemcpy(state.head.extra + len, next,
            //        len + copy > state.head.extra_max ?
            //        state.head.extra_max - len : copy);
          }
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          state.length -= copy;
        }
        if (state.length) { break inf_leave; }
      }
      state.length = 0;
      state.mode = NAME;
      /* falls through */
    case NAME:
      if (state.flags & 0x0800) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          // TODO: 2 or 1 bytes?
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/)) {
            state.head.name += String.fromCharCode(len);
          }
        } while (len && copy < have);

        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.name = null;
      }
      state.length = 0;
      state.mode = COMMENT;
      /* falls through */
    case COMMENT:
      if (state.flags & 0x1000) {
        if (have === 0) { break inf_leave; }
        copy = 0;
        do {
          len = input[next + copy++];
          /* use constant limit because in js we should not preallocate memory */
          if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/)) {
            state.head.comment += String.fromCharCode(len);
          }
        } while (len && copy < have);
        if (state.flags & 0x0200) {
          state.check = crc32(state.check, input, copy, next);
        }
        have -= copy;
        next += copy;
        if (len) { break inf_leave; }
      }
      else if (state.head) {
        state.head.comment = null;
      }
      state.mode = HCRC;
      /* falls through */
    case HCRC:
      if (state.flags & 0x0200) {
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.check & 0xffff)) {
          strm.msg = 'header crc mismatch';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
      }
      if (state.head) {
        state.head.hcrc = ((state.flags >> 9) & 1);
        state.head.done = true;
      }
      strm.adler = state.check = 0;
      state.mode = TYPE;
      break;
    case DICTID:
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      strm.adler = state.check = zswap32(hold);
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = DICT;
      /* falls through */
    case DICT:
      if (state.havedict === 0) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        return Z_NEED_DICT;
      }
      strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
      state.mode = TYPE;
      /* falls through */
    case TYPE:
      if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case TYPEDO:
      if (state.last) {
        //--- BYTEBITS() ---//
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        state.mode = CHECK;
        break;
      }
      //=== NEEDBITS(3); */
      while (bits < 3) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.last = (hold & 0x01)/*BITS(1)*/;
      //--- DROPBITS(1) ---//
      hold >>>= 1;
      bits -= 1;
      //---//

      switch ((hold & 0x03)/*BITS(2)*/) {
      case 0:                             /* stored block */
        //Tracev((stderr, "inflate:     stored block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = STORED;
        break;
      case 1:                             /* fixed block */
        fixedtables(state);
        //Tracev((stderr, "inflate:     fixed codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = LEN_;             /* decode codes */
        if (flush === Z_TREES) {
          //--- DROPBITS(2) ---//
          hold >>>= 2;
          bits -= 2;
          //---//
          break inf_leave;
        }
        break;
      case 2:                             /* dynamic block */
        //Tracev((stderr, "inflate:     dynamic codes block%s\n",
        //        state.last ? " (last)" : ""));
        state.mode = TABLE;
        break;
      case 3:
        strm.msg = 'invalid block type';
        state.mode = BAD;
      }
      //--- DROPBITS(2) ---//
      hold >>>= 2;
      bits -= 2;
      //---//
      break;
    case STORED:
      //--- BYTEBITS() ---// /* go to byte boundary */
      hold >>>= bits & 7;
      bits -= bits & 7;
      //---//
      //=== NEEDBITS(32); */
      while (bits < 32) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
        strm.msg = 'invalid stored block lengths';
        state.mode = BAD;
        break;
      }
      state.length = hold & 0xffff;
      //Tracev((stderr, "inflate:       stored length %u\n",
      //        state.length));
      //=== INITBITS();
      hold = 0;
      bits = 0;
      //===//
      state.mode = COPY_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case COPY_:
      state.mode = COPY;
      /* falls through */
    case COPY:
      copy = state.length;
      if (copy) {
        if (copy > have) { copy = have; }
        if (copy > left) { copy = left; }
        if (copy === 0) { break inf_leave; }
        //--- zmemcpy(put, next, copy); ---
        utils.arraySet(output, input, next, copy, put);
        //---//
        have -= copy;
        next += copy;
        left -= copy;
        put += copy;
        state.length -= copy;
        break;
      }
      //Tracev((stderr, "inflate:       stored end\n"));
      state.mode = TYPE;
      break;
    case TABLE:
      //=== NEEDBITS(14); */
      while (bits < 14) {
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
      }
      //===//
      state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
      //--- DROPBITS(5) ---//
      hold >>>= 5;
      bits -= 5;
      //---//
      state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
      //--- DROPBITS(4) ---//
      hold >>>= 4;
      bits -= 4;
      //---//
//#ifndef PKZIP_BUG_WORKAROUND
      if (state.nlen > 286 || state.ndist > 30) {
        strm.msg = 'too many length or distance symbols';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracev((stderr, "inflate:       table sizes ok\n"));
      state.have = 0;
      state.mode = LENLENS;
      /* falls through */
    case LENLENS:
      while (state.have < state.ncode) {
        //=== NEEDBITS(3);
        while (bits < 3) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
        //--- DROPBITS(3) ---//
        hold >>>= 3;
        bits -= 3;
        //---//
      }
      while (state.have < 19) {
        state.lens[order[state.have++]] = 0;
      }
      // We have separate tables & no pointers. 2 commented lines below not needed.
      //state.next = state.codes;
      //state.lencode = state.next;
      // Switch to use dynamic table
      state.lencode = state.lendyn;
      state.lenbits = 7;

      opts = { bits: state.lenbits };
      ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
      state.lenbits = opts.bits;

      if (ret) {
        strm.msg = 'invalid code lengths set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, "inflate:       code lengths ok\n"));
      state.have = 0;
      state.mode = CODELENS;
      /* falls through */
    case CODELENS:
      while (state.have < state.nlen + state.ndist) {
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_val < 16) {
          //--- DROPBITS(here.bits) ---//
          hold >>>= here_bits;
          bits -= here_bits;
          //---//
          state.lens[state.have++] = here_val;
        }
        else {
          if (here_val === 16) {
            //=== NEEDBITS(here.bits + 2);
            n = here_bits + 2;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            if (state.have === 0) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            len = state.lens[state.have - 1];
            copy = 3 + (hold & 0x03);//BITS(2);
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
          }
          else if (here_val === 17) {
            //=== NEEDBITS(here.bits + 3);
            n = here_bits + 3;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 3 + (hold & 0x07);//BITS(3);
            //--- DROPBITS(3) ---//
            hold >>>= 3;
            bits -= 3;
            //---//
          }
          else {
            //=== NEEDBITS(here.bits + 7);
            n = here_bits + 7;
            while (bits < n) {
              if (have === 0) { break inf_leave; }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            //===//
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            len = 0;
            copy = 11 + (hold & 0x7f);//BITS(7);
            //--- DROPBITS(7) ---//
            hold >>>= 7;
            bits -= 7;
            //---//
          }
          if (state.have + copy > state.nlen + state.ndist) {
            strm.msg = 'invalid bit length repeat';
            state.mode = BAD;
            break;
          }
          while (copy--) {
            state.lens[state.have++] = len;
          }
        }
      }

      /* handle error breaks in while */
      if (state.mode === BAD) { break; }

      /* check for end-of-block code (better have one) */
      if (state.lens[256] === 0) {
        strm.msg = 'invalid code -- missing end-of-block';
        state.mode = BAD;
        break;
      }

      /* build code tables -- note: do not change the lenbits or distbits
         values here (9 and 6) without reading the comments in inftrees.h
         concerning the ENOUGH constants, which depend on those values */
      state.lenbits = 9;

      opts = { bits: state.lenbits };
      ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.lenbits = opts.bits;
      // state.lencode = state.next;

      if (ret) {
        strm.msg = 'invalid literal/lengths set';
        state.mode = BAD;
        break;
      }

      state.distbits = 6;
      //state.distcode.copy(state.codes);
      // Switch to use dynamic table
      state.distcode = state.distdyn;
      opts = { bits: state.distbits };
      ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
      // We have separate tables & no pointers. 2 commented lines below not needed.
      // state.next_index = opts.table_index;
      state.distbits = opts.bits;
      // state.distcode = state.next;

      if (ret) {
        strm.msg = 'invalid distances set';
        state.mode = BAD;
        break;
      }
      //Tracev((stderr, 'inflate:       codes ok\n'));
      state.mode = LEN_;
      if (flush === Z_TREES) { break inf_leave; }
      /* falls through */
    case LEN_:
      state.mode = LEN;
      /* falls through */
    case LEN:
      if (have >= 6 && left >= 258) {
        //--- RESTORE() ---
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        //---
        inflate_fast(strm, _out);
        //--- LOAD() ---
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        //---

        if (state.mode === TYPE) {
          state.back = -1;
        }
        break;
      }
      state.back = 0;
      for (;;) {
        here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if (here_bits <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if (here_op && (here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.lencode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      state.length = here_val;
      if (here_op === 0) {
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        state.mode = LIT;
        break;
      }
      if (here_op & 32) {
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.back = -1;
        state.mode = TYPE;
        break;
      }
      if (here_op & 64) {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD;
        break;
      }
      state.extra = here_op & 15;
      state.mode = LENEXT;
      /* falls through */
    case LENEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
      //Tracevv((stderr, "inflate:         length %u\n", state.length));
      state.was = state.length;
      state.mode = DIST;
      /* falls through */
    case DIST:
      for (;;) {
        here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
        here_bits = here >>> 24;
        here_op = (here >>> 16) & 0xff;
        here_val = here & 0xffff;

        if ((here_bits) <= bits) { break; }
        //--- PULLBYTE() ---//
        if (have === 0) { break inf_leave; }
        have--;
        hold += input[next++] << bits;
        bits += 8;
        //---//
      }
      if ((here_op & 0xf0) === 0) {
        last_bits = here_bits;
        last_op = here_op;
        last_val = here_val;
        for (;;) {
          here = state.distcode[last_val +
                  ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((last_bits + here_bits) <= bits) { break; }
          //--- PULLBYTE() ---//
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        //--- DROPBITS(last.bits) ---//
        hold >>>= last_bits;
        bits -= last_bits;
        //---//
        state.back += last_bits;
      }
      //--- DROPBITS(here.bits) ---//
      hold >>>= here_bits;
      bits -= here_bits;
      //---//
      state.back += here_bits;
      if (here_op & 64) {
        strm.msg = 'invalid distance code';
        state.mode = BAD;
        break;
      }
      state.offset = here_val;
      state.extra = (here_op) & 15;
      state.mode = DISTEXT;
      /* falls through */
    case DISTEXT:
      if (state.extra) {
        //=== NEEDBITS(state.extra);
        n = state.extra;
        while (bits < n) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
        //--- DROPBITS(state.extra) ---//
        hold >>>= state.extra;
        bits -= state.extra;
        //---//
        state.back += state.extra;
      }
//#ifdef INFLATE_STRICT
      if (state.offset > state.dmax) {
        strm.msg = 'invalid distance too far back';
        state.mode = BAD;
        break;
      }
//#endif
      //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
      state.mode = MATCH;
      /* falls through */
    case MATCH:
      if (left === 0) { break inf_leave; }
      copy = _out - left;
      if (state.offset > copy) {         /* copy from window */
        copy = state.offset - copy;
        if (copy > state.whave) {
          if (state.sane) {
            strm.msg = 'invalid distance too far back';
            state.mode = BAD;
            break;
          }
// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//          Trace((stderr, "inflate.c too far\n"));
//          copy -= state.whave;
//          if (copy > state.length) { copy = state.length; }
//          if (copy > left) { copy = left; }
//          left -= copy;
//          state.length -= copy;
//          do {
//            output[put++] = 0;
//          } while (--copy);
//          if (state.length === 0) { state.mode = LEN; }
//          break;
//#endif
        }
        if (copy > state.wnext) {
          copy -= state.wnext;
          from = state.wsize - copy;
        }
        else {
          from = state.wnext - copy;
        }
        if (copy > state.length) { copy = state.length; }
        from_source = state.window;
      }
      else {                              /* copy from output */
        from_source = output;
        from = put - state.offset;
        copy = state.length;
      }
      if (copy > left) { copy = left; }
      left -= copy;
      state.length -= copy;
      do {
        output[put++] = from_source[from++];
      } while (--copy);
      if (state.length === 0) { state.mode = LEN; }
      break;
    case LIT:
      if (left === 0) { break inf_leave; }
      output[put++] = state.length;
      left--;
      state.mode = LEN;
      break;
    case CHECK:
      if (state.wrap) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          // Use '|' insdead of '+' to make sure that result is signed
          hold |= input[next++] << bits;
          bits += 8;
        }
        //===//
        _out -= left;
        strm.total_out += _out;
        state.total += _out;
        if (_out) {
          strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

        }
        _out = left;
        // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
        if ((state.flags ? hold : zswap32(hold)) !== state.check) {
          strm.msg = 'incorrect data check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   check matches trailer\n"));
      }
      state.mode = LENGTH;
      /* falls through */
    case LENGTH:
      if (state.wrap && state.flags) {
        //=== NEEDBITS(32);
        while (bits < 32) {
          if (have === 0) { break inf_leave; }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (hold !== (state.total & 0xffffffff)) {
          strm.msg = 'incorrect length check';
          state.mode = BAD;
          break;
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        //Tracev((stderr, "inflate:   length matches trailer\n"));
      }
      state.mode = DONE;
      /* falls through */
    case DONE:
      ret = Z_STREAM_END;
      break inf_leave;
    case BAD:
      ret = Z_DATA_ERROR;
      break inf_leave;
    case MEM:
      return Z_MEM_ERROR;
    case SYNC:
      /* falls through */
    default:
      return Z_STREAM_ERROR;
    }
  }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
                      (state.mode < CHECK || flush !== Z_FINISH))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
      state.mode = MEM;
      return Z_MEM_ERROR;
    }
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
                    (state.mode === TYPE ? 128 : 0) +
                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
    ret = Z_BUF_ERROR;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
    return Z_STREAM_ERROR;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK;
}

function inflateGetHeader(strm, head) {
  var state;

  /* check state */
  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
  state = strm.state;
  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

  /* save header structure */
  state.head = head;
  head.done = false;
  return Z_OK;
}

function inflateSetDictionary(strm, dictionary) {
  var dictLength = dictionary.length;

  var state;
  var dictid;
  var ret;

  /* check state */
  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
  state = strm.state;

  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR;
  }

  /* check for correct dictionary identifier */
  if (state.mode === DICT) {
    dictid = 1; /* adler32(0, null, 0)*/
    /* dictid = adler32(dictid, dictionary, dictLength); */
    dictid = adler32(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR;
    }
  }
  /* copy dictionary to window using updatewindow(), which will amend the
   existing dictionary if appropriate */
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR;
  }
  state.havedict = 1;
  // Tracev((stderr, "inflate:   dictionary set\n"));
  return Z_OK;
}

exports.inflateReset = inflateReset;
exports.inflateReset2 = inflateReset2;
exports.inflateResetKeep = inflateResetKeep;
exports.inflateInit = inflateInit;
exports.inflateInit2 = inflateInit2;
exports.inflate = inflate;
exports.inflateEnd = inflateEnd;
exports.inflateGetHeader = inflateGetHeader;
exports.inflateSetDictionary = inflateSetDictionary;
exports.inflateInfo = 'pako inflate (from Nodeca project)';

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

var MAXBITS = 15;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES = 0;
var LENS = 1;
var DISTS = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
{
  var bits = opts.bits;
      //here = opts.here; /* table entry for duplication */

  var len = 0;               /* a code's length in bits */
  var sym = 0;               /* index of code symbols */
  var min = 0, max = 0;          /* minimum and maximum code lengths */
  var root = 0;              /* number of index bits for root table */
  var curr = 0;              /* number of index bits for current table */
  var drop = 0;              /* code bits to drop for sub-table */
  var left = 0;                   /* number of prefix codes available */
  var used = 0;              /* code entries in table used */
  var huff = 0;              /* Huffman code */
  var incr;              /* for incrementing code, index */
  var fill;              /* index for replicating entries */
  var low;               /* low bits for current root entry */
  var mask;              /* mask for low root bits */
  var next;             /* next available space in table */
  var base = null;     /* base value table to use */
  var base_index = 0;
//  var shoextra;    /* extra bits table to use */
  var end;                    /* use base and extra for symbol > end */
  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) { break; }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {                     /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0;     /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) { break; }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }        /* over-subscribed */
  }
  if (left > 0 && (type === CODES || max !== 1)) {
    return -1;                      /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES) {
    base = extra = work;    /* dummy value--not used */
    end = 19;

  } else if (type === LENS) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else {                    /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0;                   /* starting code */
  sym = 0;                    /* starting code symbol */
  len = min;                  /* starting code length */
  next = table_index;              /* current table to fill in */
  curr = root;                /* current table index bits */
  drop = 0;                   /* current bits to drop from code for index */
  low = -1;                   /* trigger new sub-table when len > root */
  used = 1 << root;          /* use root table entries */
  mask = used - 1;            /* mask for comparing low */

  /* check available table space */
  if ((type === LENS && used > ENOUGH_LENS) ||
    (type === DISTS && used > ENOUGH_DISTS)) {
    return 1;
  }

  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    }
    else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    }
    else {
      here_op = 32 + 64;         /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill;                 /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) { break; }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min;            /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) { break; }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS && used > ENOUGH_LENS) ||
        (type === DISTS && used > ENOUGH_DISTS)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
};

},{"../utils/common":41}],51:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

module.exports = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

},{}],52:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

var utils = require('../utils/common');

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED               = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY              = 0;
var Z_TEXT                = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN             = 2;

/*============================================================================*/


function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES    = 2;
/* The three kinds of block type */

var MIN_MATCH    = 3;
var MAX_MATCH    = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES  = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS      = 256;
/* number of literal bytes 0..255 */

var L_CODES       = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES       = 30;
/* number of distance codes */

var BL_CODES      = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE     = 2 * L_CODES + 1;
/* maximum heap size */

var MAX_BITS      = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size      = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK   = 256;
/* end of block literal code */

var REP_3_6     = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10   = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits =   /* extra bits for each length code */
  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

var extra_dbits =   /* extra bits for each distance code */
  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

var extra_blbits =  /* extra bits for each bit length code */
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

var bl_order =
  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree  = new Array((L_CODES + 2) * 2);
zero(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree  = new Array(D_CODES * 2);
zero(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code    = new Array(DIST_CODE_LEN);
zero(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
zero(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length   = new Array(LENGTH_CODES);
zero(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist     = new Array(D_CODES);
zero(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree  = static_tree;  /* static tree or NULL */
  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
  this.extra_base   = extra_base;   /* base index for extra_bits */
  this.elems        = elems;        /* max number of elements in the tree */
  this.max_length   = max_length;   /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree    = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;     /* the dynamic tree */
  this.max_code = 0;            /* largest code with non zero frequency */
  this.stat_desc = stat_desc;   /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
//    put_byte(s, (uch)((w) & 0xff));
//    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc)
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
{
  var tree            = desc.dyn_tree;
  var max_code        = desc.max_code;
  var stree           = desc.stat_desc.static_tree;
  var has_stree       = desc.stat_desc.has_stree;
  var extra           = desc.stat_desc.extra_bits;
  var base            = desc.stat_desc.extra_base;
  var max_length      = desc.stat_desc.max_length;
  var h;              /* heap index */
  var n, m;           /* iterate over the tree elements */
  var bits;           /* bit length */
  var xbits;          /* extra bits */
  var f;              /* frequency */
  var overflow = 0;   /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1]/*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) { continue; } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2]/*.Freq*/;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
    }
  }
  if (overflow === 0) { return; }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) { bits--; }
    s.bl_count[bits]--;      /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) { continue; }
      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
        tree[m * 2 + 1]/*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count)
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */
{
  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
  var code = 0;              /* running code value */
  var bits;                  /* bit index */
  var n;                     /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0;  n <= max_code; n++) {
    var len = tree[n * 2 + 1]/*.Len*/;
    if (len === 0) { continue; }
    /* Now reverse the bits */
    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n;        /* iterates over tree elements */
  var bits;     /* bit counter */
  var length;   /* length value */
  var code;     /* code value */
  var dist;     /* distance index */
  var bl_count = new Array(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
/*#ifdef NO_INIT_GLOBAL_POINTERS
  static_l_desc.static_tree = static_ltree;
  static_l_desc.extra_bits = extra_lbits;
  static_d_desc.static_tree = static_dtree;
  static_d_desc.extra_bits = extra_dbits;
  static_bl_desc.extra_bits = extra_blbits;
#endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1]/*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1]/*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1]/*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES; n++) {
    static_dtree[n * 2 + 1]/*.Len*/ = 5;
    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s)
{
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header)
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */
{
  bi_windup(s);        /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
//  while (len--) {
//    put_byte(s, *buf++);
//  }
  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1;  /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist;           /* distance of matched string */
  var lc;             /* match length or unmatched char (if dist == 0) */
  var lx = 0;         /* running index in l_buf */
  var code;           /* the code to send */
  var extra;          /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);       /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree);       /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);   /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree     = desc.dyn_tree;
  var stree    = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems    = desc.stat_desc.elems;
  var n, m;          /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node;          /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2]/*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1]/*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2]/*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1]/*.Len*/;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems;              /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1/*SMALLEST*/];
    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1/*SMALLEST*/);
    /***/

    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1/*SMALLEST*/] = node++;
    pqdownheap(s, tree, 1/*SMALLEST*/);

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2]/*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

    } else {
      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n;                     /* iterates over all tree elements */
  var prevlen = -1;          /* last emitted length */
  var curlen;                /* length of current code */

  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

  var count = 0;             /* repeat count of the current code */
  var max_count = 7;         /* max repeat count */
  var min_count = 4;         /* min repeat count */

  /* tree[max_code+1].Len = -1; */  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex;  /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank;                    /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1,   5);
  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
      return Z_BINARY;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS; n++) {
    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
      return Z_TEXT;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s)
{

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
  var max_blindex = 0;        /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2]/*.Freq*/++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--;             /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
  }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility

//#ifdef TRUNCATE_BLOCK
//  /* Try to guess if it is profitable to stop the current block here */
//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
//    /* Compute an upper bound for the compressed length */
//    out_length = s.last_lit*8;
//    in_length = s.strstart - s.block_start;
//
//    for (dcode = 0; dcode < D_CODES; dcode++) {
//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
//    }
//    out_length >>>= 3;
//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
//    //       s->last_lit, in_length, out_length,
//    //       100L - out_length*100L/in_length));
//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
//      return true;
//    }
//  }
//#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

exports._tr_init  = _tr_init;
exports._tr_stored_block = _tr_stored_block;
exports._tr_flush_block  = _tr_flush_block;
exports._tr_tally = _tr_tally;
exports._tr_align = _tr_align;

},{"../utils/common":41}],53:[function(require,module,exports){
'use strict';

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

module.exports = ZStream;

},{}],54:[function(require,module,exports){
'use strict';
module.exports = typeof setImmediate === 'function' ? setImmediate :
	function setImmediate() {
		var args = [].slice.apply(arguments);
		args.splice(1, 0, 0);
		setTimeout.apply(null, args);
	};

},{}]},{},[10])(10)
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/base.js":
/*!*********************!*\
  !*** ./src/base.js ***!
  \*********************/
/*! exports provided: loadKeyboardFromPath, getKBPathFromIdx, loadNextKeyboard, loadPrevKeyboard */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadKeyboardFromPath", function() { return loadKeyboardFromPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKBPathFromIdx", function() { return getKBPathFromIdx; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadNextKeyboard", function() { return loadNextKeyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadPrevKeyboard", function() { return loadPrevKeyboard; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _tuning_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tuning.js */ "./src/tuning.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");
/* harmony import */ var _boardOps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boardOps.js */ "./src/boardOps.js");
/* harmony import */ var _gfx_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gfx.js */ "./src/gfx.js");
/* harmony import */ var _dxf_export_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dxf_export.js */ "./src/dxf_export.js");
/* harmony import */ var _ijprest_kle_serial__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ijprest/kle-serial */ "./node_modules/@ijprest/kle-serial/dist/index.js");
/* harmony import */ var _ijprest_kle_serial__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ijprest_kle_serial__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _inspectorstub_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./inspectorstub.js */ "./src/inspectorstub.js");
/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./interactions.js */ "./src/interactions.js");










const hdris = [
    "assets/carpentry_shop.env",
    "assets/studio_small.env",
    "assets/photo_studio.env",
    "assets/sculpture_exhibition.env",
    "assets/environment.dds"
];

let hdriIdx = 2;
let kbdIdx = 0;

function loadKeyboardFromPath(path) {
    fetch(path)
    .then(response => response.json())
    .then(data => {
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* loadKeyboard */ "h"](data);
    });
}

function loadKeyboardFromKLE1(txt) {
    let old_kle = JSON.parse(txt);

    var new_kle = _ijprest_kle_serial__WEBPACK_IMPORTED_MODULE_6__["Serial"].deserialize(old_kle);
    _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* loadKeyboard */ "h"](new_kle);
}

function loadKeyboardFromKBD(txt) {
    _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* loadKeyboard */ "h"](JSON.parse(txt));
}

const keyboardPaths = [
    'testkbs/hy_nova.kbd',
    'testkbs/ansi104.kle',
    'testkbs/fc660m.kbd',
    'testkbs/fake_alice.kle',
    'testkbs/fake_alice_split.kle',
    'testkbs/atreus.kbd',  //5
    'testkbs/basis-mono-og.kle',
    'testkbs/basis-stagger-3.kle',
    'testkbs/kle-ergodox.kle',
    'testkbs/foggy_sp_knobs.kle',
    'testkbs/reddit-9d-ortho.kle', //10
    'testkbs/boston-noISO.kle',
    'testkbs/atreus_solo.kle',
    'testkbs/blank.kle', 
    'testkbs/onekey.kle',
    'testkbs/twokey.kle', //15
    'testkbs/threekey.kle',
    'testkbs/threekey_split.kle',
    'testkbs/threekeyoffset.kle',
    'testkbs/one_bigass.kle',
    'testkbs/twoonone.kle', //20
    'testkbs/three_key_vtest.kle',
    'testkbs/fourkeygap.kle',
    'testkbs/atreus_row.kle',
    'testkbs/keysize_test.kle',
    'testkbs/staggertest.kbd', //25
    'testkbs/busted_corner.kbd'
];

function getKBPathFromIdx(idx) {
    return keyboardPaths[idx];
}

function loadNextKeyboard() {
    kbdIdx = (kbdIdx+1)%keyboardPaths.length;
    loadKeyboardFromPath(getKBPathFromIdx(kbdIdx));
}

function loadPrevKeyboard() {
    kbdIdx = (kbdIdx+keyboardPaths.length-1)%keyboardPaths.length;
    loadKeyboardFromPath(getKBPathFromIdx(kbdIdx));
}

function initKBGB() {
    _gfx_js__WEBPACK_IMPORTED_MODULE_4__[/* init */ "h"](_boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshKeyboard */ "j"]);

    _gfx_js__WEBPACK_IMPORTED_MODULE_4__[/* setEnvironmentLight */ "j"](hdris[hdriIdx]);

    _ui_js__WEBPACK_IMPORTED_MODULE_2__[/* kbgbGUI */ "a"].addModeGUI();

    const urlParams = new URLSearchParams(location.search);
    let paramIdx = urlParams.get("kbIdx");

    if(paramIdx!==null && getKBPathFromIdx(paramIdx)) {
        kbdIdx = paramIdx;
    }

    // load a keyboard
    loadKeyboardFromPath(getKBPathFromIdx(kbdIdx));

    // the canvas/window resize event handler
    window.addEventListener('resize', function () {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].engine.resize();
    });

    document.getElementById("loadKLE").onchange = e => { 
        // getting a hold of the file reference
        var file = e.target.files[0]; 
    
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
    
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            // console.log(content);
            loadKeyboardFromKLE1(content);
        }
    }
    //input.click();
    document.getElementById("loadKBD").onchange = e => { 
        // getting a hold of the file reference
        var file = e.target.files[0]; 
    
        // setting up the reader
        var reader = new FileReader();
        reader.readAsText(file,'UTF-8');
    
        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            var content = readerEvent.target.result; // this is the content!
            // console.log(content);
            loadKeyboardFromKBD(content);
        }
    }

    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* init */ "d"](_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'i', e => _inspectorstub_js__WEBPACK_IMPORTED_MODULE_7__[/* showInspector */ "a"]());
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'k', e => {
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyShape = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyShape?null:"square";
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshLayout */ "k"]();
    });
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'c', e => {
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawCase = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawCase?false:true;
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshCase */ "i"]();
    });
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'p', e => {
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawPlate = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawPlate?false:true;
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshCase */ "i"]();
    });
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'o', e => {
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawPCB = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawPCB?false:true;
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshCase */ "i"]();
    });
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'f', e => {
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawPlateFoam = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawPlateFoam?false:true;
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawCaseFoam = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawCaseFoam?false:true;
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshCase */ "i"]();
    });
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'b', e => {
        _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawBezel = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].drawBezel?false:true;
        _boardOps_js__WEBPACK_IMPORTED_MODULE_3__[/* refreshCase */ "i"]();
    });
    _interactions_js__WEBPACK_IMPORTED_MODULE_8__[/* addBinding */ "a"]('keydown', 'r', e => {
        loadNextKeyboard();
    });
    // interactions.addBinding('keydown', 'l', e => {
    //     hdriIdx = (hdriIdx+1)%hdris.length;
    //     gfx.setEnvironmentLight(hdris[hdriIdx]);
    // });
}

window.addEventListener('DOMContentLoaded', function () {
    initKBGB();
});

/***/ }),

/***/ "./src/boardData.js":
/*!**************************!*\
  !*** ./src/boardData.js ***!
  \**************************/
/*! exports provided: getData, genKeycapDefaults, getKeycapDefaults, setData, layerDefs, layerGetValue, layerSetValue, loadData, exportData */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "genKeycapDefaults", function() { return genKeycapDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getKeycapDefaults", function() { return getKeycapDefaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layerDefs", function() { return layerDefs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layerGetValue", function() { return layerGetValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "layerSetValue", function() { return layerSetValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadData", function() { return loadData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportData", function() { return exportData; });
/* harmony import */ var _boardOps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boardOps.js */ "./src/boardOps.js");
/* harmony import */ var _tuning_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tuning.js */ "./src/tuning.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _keytypes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keytypes.js */ "./src/keytypes.js");





let data = {};

function getData() { return data; }

function genKeycapDefaults() { data.keycapDefaults = {profile:"KAM"}; }
function getKeycapDefaults() { return data.keycapDefaults; }

function setData(newData) { data = newData; };

const layerDefs = {
    "pcbMesh":{height:1.6,offset:-5.1,stackOrder:null,visFilter:"drawPCB",shape:"pcbOutline",holes:[],material:"fr4",physicalMat:"FR4",tuneable:null},
    "plateFoam":{height:3.5,offset:-1.5,stackOrder:null,visFilter:"drawPlateFoam",shape:"pcbOutline",holes:["plate_cuts"],material:"foam_white",physicalMat:"FOAM",tuneable:null},
    "caseFoam":{height:3.5,offset:-7.5,stackOrder:null,visFilter:"drawCaseFoam",shape:"cavityInner",holes:[],material:"foam_white",physicalMat:"FOAM",tuneable:null},
    "bezel":{height:3,offset:6,stackOrder:2,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel_keygroup_cuts","screwHoles"],mat:"case",physicalMat:"acrylic"},
    "bezel1":{height:3,offset:3,stackOrder:1,visFilter:"drawBezel",shape:"caseFrame",holes:["bezel_keygroup_cuts","screwHoles"],mat:"case",physicalMat:"acrylic"},
    "plate":{height:1.5,offset:0,stackOrder:0,visFilter:"drawPlate",shape:"caseFrame",holes:["screwHoles","plate_cuts"],mat:"plate",physicalMat:"alu"},
    "edge":{height:3,offset:-1.5,stackOrder:-1,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "edge2":{height:3,offset:-4.5,stackOrder:-2,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "edge3":{height:3,offset:-7.5,stackOrder:-3,visFilter:"drawCase",shape:"caseFrame",portCut:true,holes:["screwHoles", "cavityInnerEdge"],mat:"case",physicalMat:"acrylic"},
    "bottom":{height:3,offset:-10.5,stackOrder:-4,visFilter:"drawCase",shape:"caseFrame",holes:["screwHoles"],mat:"case",physicalMat:"acrylic"},
    "feet4":{height:3,offset:-13.5,stackOrder:-5,visFilter:"drawCase",mat:"case",customShape:_boardOps_js__WEBPACK_IMPORTED_MODULE_0__[/* getFootShape */ "g"],chin:4.0,physicalMat:"acrylic",tuneable:null},
    "feet3":{height:3,offset:-16.5,stackOrder:-6,visFilter:"drawCase",mat:"case",customShape:_boardOps_js__WEBPACK_IMPORTED_MODULE_0__[/* getFootShape */ "g"],chin:3.0,physicalMat:"acrylic",tuneable:null},
    "feet2":{height:3,offset:-19.5,stackOrder:-7,visFilter:"drawCase",mat:"case",customShape:_boardOps_js__WEBPACK_IMPORTED_MODULE_0__[/* getFootShape */ "g"],chin:2.0,physicalMat:"acrylic",tuneable:null},
    "feet1":{height:3,offset:-22.5,stackOrder:-8,visFilter:"drawCase",mat:"case",customShape:_boardOps_js__WEBPACK_IMPORTED_MODULE_0__[/* getFootShape */ "g"],chin:1.0,physicalMat:"acrylic",tuneable:null},
    "feet":{height:3,offset:-25.5,stackOrder:-9,visFilter:"drawCase",mat:"case",customShape:_boardOps_js__WEBPACK_IMPORTED_MODULE_0__[/* getFootShape */ "g"],chin:0.0,physicalMat:"acrylic",tuneable:null}
};

function layerGetValue(cBD, l, k) {
    if(cBD.layers && cBD.layers[l] && cBD.layers[l][k]!==undefined) {
        return cBD.layers[l][k];
    }
    else if(layerDefs[l] && layerDefs[l][k]!==undefined) {
        return layerDefs[l][k];
    }
    else {
        return cBD[k];
    }
}

function layerSetValue(cBD, l, k, v) {
    if(!cBD.layers) {
        cBD.layers = {};
    }
    if(!cBD.layers[l]) {
        cBD.layers[l] = {};
    }
    cBD.layers[l][k] = v;
}




function loadData(data) {
    if(!data.kbdVersion) {
        let bd = {};
        bd.meta = data.meta;
        bd.cases = data.cases?data.cases:{};
        bd.hasFeet = true;
        bd.layout = {keys: {}};
        let kIdx = 0
        for (let k of data.keys) {
            let keyInfo = {id: "key" + kIdx++,
                            special: "standard",
                            x: k.x,
                            y: k.y,
                            caseIdx: k.caseIdx||0,
                            width: k.width,
                            height: k.height,
                            rotation_angle: k.rotation_angle,
                            nub:k.nub,
                            stepped:k.stepped,
                            type:k.type,
                            encoder_knob_size:k.encoder_knob_size
                            };

            let rowGuess = 3;

            if(k.labels) {
                for(const label of k.labels) {
                    if(label) {
                        // console.log(`checking label ${label}`)
                        let info = _keytypes_js__WEBPACK_IMPORTED_MODULE_3__[/* labelsInfo */ "a"][label.toLowerCase()];
                        if(info) {
                            // console.log(`row guess ${info.row}`)
                            rowGuess = info.row;
                            keyInfo.txt = label;
                            break;
                        }
                    }
                }
            }

            keyInfo.row = rowGuess;


            const getCenterOffset = (t) => {
                switch(t) {
                    case "oled": {
                        // hacky dims
                        let oledDim = [(38.1+_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap) / 2, (14.1+_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap) / 2];
                        return( [k.x * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] + oledDim[0],
                                  -(k.y * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] + oledDim[1])] );
                    }
                    case "ec11": {
                        return ([(k.x+0.5) * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0],
                                  -((k.y+0.5) * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1])]);
                    }
                    default: {
                        const center = [(_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] * (k.width - 1)) / 2,
                                (_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] * (k.height - 1)) / 2];
                        return ([k.x * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] + center[0],
                                  -(k.y * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] + center[1])]);
                    }
                }
            }
                            
            let centerOffset = getCenterOffset(k.type);
            let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_2__["Matrix"].Translation(centerOffset[0], 0, centerOffset[1]);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_2__["Matrix"].Translation(-k.rotation_x * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0], 0, k.rotation_y * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1]));
                kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_2__["Matrix"].RotationY(k.rotation_angle * Math.PI / 180.0))
                kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_2__["Matrix"].Translation(k.rotation_x * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0], 0, -k.rotation_y * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1]));
            }

            let newPos = babylonjs__WEBPACK_IMPORTED_MODULE_2__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0,0,0), kXform);

            keyInfo.x = newPos.x;
            keyInfo.y = -newPos.z;

            if(!bd.cases[keyInfo.caseIdx]) {
                bd.cases[keyInfo.caseIdx]  = Object.assign({}, _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].defaultCase);
            }

            keyInfo.matName = k.color;
    
            if( k.width === 1 && k.height > 1) {
                keyInfo.vertical = true;
            }
            
            if(!(k.width2 === k.width && k.height2 === k.height && k.x2 === 0 && k.y2 === 0)) {
                if(k.width2 === 1.5 && k.height2 === 1 && k.width === 1.25 && k.height === 2 && k.x2 === -0.25 ) {
                    keyInfo.row = "special";
                    keyInfo.special = "ISO";
                }
                else if(k.width2 === 1.75 && k.height2 === 1 && k.width === 1.25 && k.x2 === 0) {
                    // stepped is..uhhh...weird.            
                    // keyInfo.width = 1.75;
                }
                keyInfo.width2 = k.width2;
                keyInfo.height2 = k.height2;
                keyInfo.x2 = k.x2;
                keyInfo.y2 = k.y2;
            }
            
            //todo: handle decals better
            if(k.decal === false && k.ghost === false) {
                bd.layout.keys[keyInfo.id] = keyInfo;
            }
        }
        bd.kbdVersion = "0.0.2";
        setData(bd);
    }
    else if(data.kbdVersion === "0.0.2") {
        for(const [k,c] of Object.entries(data.cases)) {
            // c.bezelThickness /= tuning.bezelThickness.max;
            // c.caseCornerFillet /= tuning.caseCornerFillet.max;

            c.material = "pom_white";
        }
        setData(data);
    }
    else if(data.kbdVersion === "0.0.3") {
        const oldBezelThickness = {min:5.5,max:50};
        const oldCaseCornerFillet = {min:0.5,max:30};
        for(const [k,c] of Object.entries(data.cases)) {
            c.bezelThickness = babylonjs__WEBPACK_IMPORTED_MODULE_2__["Scalar"].Lerp(oldBezelThickness.min, oldBezelThickness.max, c.bezelThickness);
            c.caseCornerFillet = babylonjs__WEBPACK_IMPORTED_MODULE_2__["Scalar"].Lerp(oldCaseCornerFillet.min, oldCaseCornerFillet.max, c.caseCornerFillet);

            for(const [lK, layer] of Object.entries(c.layers)) {
                if(layer.bezelThickness !== undefined) {
                    layer.bezelThickness = babylonjs__WEBPACK_IMPORTED_MODULE_2__["Scalar"].Lerp(oldBezelThickness.min, oldBezelThickness.max, layer.bezelThickness);
                }
                if(layer.caseCornerFillet !== undefined) {
                    layer.caseCornerFillet = babylonjs__WEBPACK_IMPORTED_MODULE_2__["Scalar"].Lerp(oldCaseCornerFillet.min, oldCaseCornerFillet.max, layer.caseCornerFillet);
                }
            }
        }
        setData(data);
    }
    else if(data.kbdVersion) {
        setData(data);
    }
}


function exportData() {
    const bd = getData();
    bd.kbdVersion = "0.0.4";
    return JSON.stringify(bd);
}

/***/ }),

/***/ "./src/boardOps.js":
/*!*************************!*\
  !*** ./src/boardOps.js ***!
  \*************************/
/*! exports provided: updateKeycapMorphTargets, refreshLayout, addScrewHoles, getFootShape, refreshPCBs, removeCaseData, refreshCase, refreshKeyboard, updateRotation, setFlatRotation, setFlatRotations, setNaturalRotation, setNaturalRotations, fadeCase, unfadeCase, expandLayers, collapseLayers, addKey, removeKeyRD, removeKey, loadKeyboard, finalizeLoadKeyboard, addCase, saveKeyboard */
/*! exports used: addCase, addKey, collapseLayers, expandLayers, fadeCase, finalizeLoadKeyboard, getFootShape, loadKeyboard, refreshCase, refreshKeyboard, refreshLayout, refreshPCBs, removeKey, removeKeyRD, saveKeyboard, setFlatRotations, setNaturalRotations, unfadeCase, updateKeycapMorphTargets */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return updateKeycapMorphTargets; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return refreshLayout; });
/* unused harmony export addScrewHoles */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return getFootShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return refreshPCBs; });
/* unused harmony export removeCaseData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return refreshCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return refreshKeyboard; });
/* unused harmony export updateRotation */
/* unused harmony export setFlatRotation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return setFlatRotations; });
/* unused harmony export setNaturalRotation */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return setNaturalRotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return fadeCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return unfadeCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return expandLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return collapseLayers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return removeKeyRD; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return removeKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return loadKeyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return finalizeLoadKeyboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return saveKeyboard; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _tuning_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tuning.js */ "./src/tuning.js");
/* harmony import */ var _coremath_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coremath.js */ "./src/coremath.js");
/* harmony import */ var _gfx_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gfx.js */ "./src/gfx.js");
/* harmony import */ var _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pcbOps.js */ "./src/pcbOps.js");
/* harmony import */ var _keyPicking_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./keyPicking.js */ "./src/keyPicking.js");
/* harmony import */ var _boardData_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./boardData.js */ "./src/boardData.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _bootstrap_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./bootstrap.js */ "./src/bootstrap.js");











function getPlateCutsWithStabs(id,width,height,kXform,flipStab,plateCuts,caseIdx) {
    let switchCutDims = [_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].switchCutout[0]*0.5, _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].switchCutout[1]*0.5];
    let sXform = kXform;

    // wack ass cherry 6u spacebar
    if(width === 6) {
        getPlateCutsWithStabs(id,666,height,babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(9.525, 0, 0).multiply(sXform),flipStab,plateCuts,caseIdx);
    }
    
    if(width !== 666) {
        plateCuts.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](switchCutDims[0], switchCutDims[1], sXform));

        _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* addDevice */ "a"](id, "mx_hotswap", sXform, caseIdx);
    }

    let span = width;
    if(height >= 1.75) {
        span = height;
        sXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(Math.PI / 2.0).multiply(sXform);
    }

    if(flipStab) {
        sXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(Math.PI).multiply(sXform);
    }

    let stabCutDims = [7*0.5,15*0.5];
    if( span >= 2 && span != 666 ) {
        let stabOffsetXL = 0.0;
        let stabOffsetXR = 0.0;
        if(span <= 2.75) {
            stabOffsetXL = stabOffsetXR = 11.938;
        }
        else if(span <= 3.0) {
            stabOffsetXL = stabOffsetXR = 19.05;
        }
        else if(span <= 4) {
            stabOffsetXL = stabOffsetXR = 28.575;
        }
        else if(span <= 4.5) {
            stabOffsetXL = stabOffsetXR = 34.671;
        }
        else if(span <= 5.5) {
            stabOffsetXL = stabOffsetXR = 42.8625;
        }
        else if(span === 666) {
            // cherry 6u again
            stabOffsetXL = 57.15;
            stabOffsetXR = 38.1
        }
        else if(span <= 6) {
            stabOffsetXL = stabOffsetXR = 47.5;
        }
        else if(span <= 6.25) {
            stabOffsetXL = stabOffsetXR = 50;
        }
        else if(span <= 6.5) {
            stabOffsetXL = stabOffsetXR = 52.38;
        }
        else if(span <= 7) {
            stabOffsetXL = stabOffsetXR = 57.15;
        }
        else {
            stabOffsetXL = stabOffsetXR = 66.675;
        }

        let stabXforms = [babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(-stabOffsetXL, 0, 2).multiply(sXform),
                          babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation( stabOffsetXR, 0, 2).multiply(sXform)];
        let stabPCBXforms = [babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(-stabOffsetXL, 0, 0).multiply(sXform),
                             babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation( stabOffsetXR, 0, 0).multiply(sXform)];


        for(let j = 0; j < stabXforms.length; j++) {
            plateCuts.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](stabCutDims[0], stabCutDims[1], stabXforms[j]));
            _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* addDevice */ "a"](id, "stab", stabPCBXforms[j], caseIdx);
        }
    }
}

function updateKeycapMorphTargets(newProfileName) {
    _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getKeycapDefaults"]().profile = newProfileName;
    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    for(const [id,rd] of Object.entries(kRD)) {
        if(rd.keycap) {
            for (const child of rd.keycap.getChildMeshes()) {
                for(let targIdx = 0; targIdx < child.morphTargetManager.numTargets; targIdx++) {
    
                    let mt = child.morphTargetManager.getTarget(targIdx);	
                    if(mt.name == newProfileName) {
                        mt.influence = 1;
                    } else {
                        mt.influence = 0;
                    }
                }
            }
        }
    }
}

let nextkId = 1;
const kIdMap = {};
function refreshLayout() {
    const scene = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene;
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    while(!_bootstrap_js__WEBPACK_IMPORTED_MODULE_8__[/* wasmImport */ "a"] || !_bootstrap_js__WEBPACK_IMPORTED_MODULE_8__[/* wasmImport */ "a"].BoardGeometry) {
        console.log(`skipping update until wasm loads`);
        return false;
    }
    const rBD = _bootstrap_js__WEBPACK_IMPORTED_MODULE_8__[/* wasmImport */ "a"].BoardGeometry.new();
    bd.wasmBD = rBD;
    bd.wasmCases = {};

    _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* clearPCBs */ "b"]();

    if(!bd.layout) { return false; }

    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    // kRD = globals.renderData.keys = [];
    
    for (const [id, k] of Object.entries(bd.layout.keys)) {
        // console.log(k);

        if (!kRD[id]) {
            kRD[id] = { id:id,
                        mins:[100000.0, 100000.0], maxs:[-100000.0, -100000.0],
                        switchCut:[],
                        bezelHoles:[],
                        caseIdx:k.caseIdx||0
                    };
        }
        let rd = kRD[id];

        if(!bd.wasmCases[rd.caseIdx]) {
            bd.wasmCases[rd.caseIdx] = _bootstrap_js__WEBPACK_IMPORTED_MODULE_8__[/* wasmImport */ "a"].CaseGeometry.new();
        }
        const wasmCase = bd.wasmCases[rd.caseIdx]

        if(!kIdMap[id]) {
            kIdMap[id] = nextkId++;
        }
        wasmCase.add_key(kIdMap[id], k.type||"key", k.x, k.y, k.width, k.height, k.rotation_angle * Math.PI / 180.0);

        rd.mins = [100000.0, 100000.0];
        rd.maxs = [-100000.0, -100000.0];
        rd.switchCut.length = 0;
        rd.bezelHoles.length = 0;
        const root = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[rd.caseIdx].rootXform;

        let combinedOutline = [];

        if(k.type === "oled") {
            //oled sizing: greater than 38 x 12    20.1*2 x 14.1 ?
            let oledDim = [(38.1+_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap) / 2, (14.1+_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap) / 2];
                      
            let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(k.x, 0, -k.y);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(k.rotation_angle * Math.PI / 180.0))
            }
            let keyOutlines = [_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](oledDim[0], oledDim[1], kXform)];
    
            rd.bezelHoles.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](oledDim[0] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, oledDim[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, kXform));
            
            rd.switchCut.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](oledDim[0] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, oledDim[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, kXform));

            _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* addDevice */ "a"](k.id, k.type, kXform, rd.caseIdx);

            combinedOutline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.keycap);
            }
            if(rd.switch) {
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.switch);
            }
    
            if (_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyShape) {
                const faceUV = [];
                faceUV[0] = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector4"](0, 0, 1, 1);
                faceUV[1] = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector4"](0, 0, 0, 0);
                faceUV[2] = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector4"](0, 0, 0, 0);
                rd.keycap = babylonjs__WEBPACK_IMPORTED_MODULE_7__["MeshBuilder"].CreatePolygon(id, { shape: _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayFromOutline */ "g"](combinedOutline,0,0.25), faceUV: faceUV, depth: 2, smoothingThreshold: 0.1, updatable: false }, scene);
                if(_keyPicking_js__WEBPACK_IMPORTED_MODULE_5__[/* pickedKeys */ "c"].indexOf(id)>=0) {
                    rd.keycap.renderOverlay = true;
                }
                rd.keycap.parent = root;
                rd.keycap.heightOffset = 4.5,
                rd.keycap.position.y = rd.keycap.heightOffset;
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](rd.keycap);
        
                if(k.matName && _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName]) {

                    let mat = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName].clone()
                                       
                    let myDynamicTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["DynamicTexture"](k.id, {width:128, height:32}, scene, true);
                    var font = "bold 24px monospace";
                    myDynamicTexture.drawText("kbgb", 32, 24, font, "white", "black", true, true);
                    mat.baseTexture = myDynamicTexture;
                    mat.roughness = 0.1;
                    mat.baseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Color3"](1, 1, 1);

                    rd.keycap.material = mat;//globals.renderData.mats[k.matName];
                }
            }
        }
        else if(k.type === "ec11") {
            let rad = k.encoder_knob_size / 2;

            let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(k.x, 0, -k.y);
            if (k.rotation_angle != 0) {
                kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(k.rotation_angle * Math.PI / 180.0))
            }

            let circCenter = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](0, 0, 0), kXform)
            let keyOutlines = [new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Poly */ "b"](_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayForCircle */ "f"](new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Circle */ "a"](circCenter, rad), 0, 19))];
    
            const bezelHole = new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Poly */ "b"](_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayForCircle */ "f"](new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Circle */ "a"](circCenter, rad), _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, 50));
            rd.bezelHoles.push(bezelHole);
            
            let switchCutDims = [15*0.5, 15.5*0.5];
            
            rd.switchCut.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](switchCutDims[0], switchCutDims[1], kXform));
            
            _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* addDevice */ "a"](k.id, k.type, kXform, rd.caseIdx);
            
            combinedOutline = getCombinedOutlineFromPolyGroup(keyOutlines);
            if (rd.keycap) {
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.keycap);
            }
            if(rd.switch) {
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.switch);
            }
    
            if (_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyShape) {
                rd.keycap = babylonjs__WEBPACK_IMPORTED_MODULE_7__["MeshBuilder"].CreatePolygon(id, { shape: _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayFromOutline */ "g"](combinedOutline,0,0), depth: 15, bevel:0.5, smoothingThreshold: -2, updatable: false }, scene);
                if(_keyPicking_js__WEBPACK_IMPORTED_MODULE_5__[/* pickedKeys */ "c"].indexOf(id)>=0) {
                    rd.keycap.renderOverlay = true;
                }
                rd.keycap.parent = root;
                rd.keycap.heightOffset = 18.5;
                rd.keycap.position.y = rd.keycap.heightOffset;
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](rd.keycap);
        
                if(k.matName && _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName]) {
                    rd.keycap.material = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName];
                }
            }
        }
        else { //normal keycap
            let keycapDim = [(_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyDims[0] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] * (k.width  - 1)) / 2,
                             (_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyDims[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] * (k.height - 1)) / 2];

            let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(k.x, 0, -k.y);
            if (k.rotation_angle != 0) {
                kXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(k.rotation_angle * Math.PI / 180.0).multiply(kXform)
            }

            let keyOutlines = [_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](keycapDim[0], keycapDim[1], kXform)];

            rd.bezelHoles.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](keycapDim[0] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, keycapDim[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, kXform));
    
            if(k.width2 > 0 && k.height2 > 0 && !(k.width === k.width2 && k.height === k.height2 && k.x2 === 0 && k.y2 === 0)) {  
                let k2Dim = [(_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyDims[0] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] * (k.width2 - 1)) / 2,
                            (_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyDims[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] * (k.height2 - 1)) / 2];
                let k2Pos = [k.x2 * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0] - keycapDim[0] + k2Dim[0],
                            -(k.y2 * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[1] - keycapDim[1] + k2Dim[1])];
    
                let k2Xform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(k2Pos[0], 0, k2Pos[1]).multiply(kXform);
                keyOutlines.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](k2Dim[0], k2Dim[1], k2Xform));
                keyOutlines[0].overlappingPolys[keyOutlines[1].id] = keyOutlines[1];
                keyOutlines[1].overlappingPolys[keyOutlines[0].id] = keyOutlines[0];
    
                const bezelHole2 = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createRectPoly */ "d"](k2Dim[0]+ _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, k2Dim[1] + _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelGap, k2Xform);
                rd.bezelHoles.push(bezelHole2);
            }
            
            getPlateCutsWithStabs(k.id,k.width,k.height,kXform,k.flipStab,rd.switchCut,rd.caseIdx);
            
            combinedOutline = getCombinedOutlineFromPolyGroup(keyOutlines);

            if(!rd.switch) {
                const switchGLTF = _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* switchAsset */ "m"].container;
                if( switchGLTF ) {
                    rd.switch = switchGLTF.instantiateModelsToScene(name => id, false).rootNodes[0];
                    rd.switch.parent = root;
                    rd.switch.setPreTransformMatrix(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(Math.PI).multiply(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Scaling(-1,1,1)));
                    for (const child of rd.switch.getChildMeshes()){
                        child.setPreTransformMatrix(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].RotationY(Math.PI).multiply(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Scaling(-1,1,1)));	
                    }
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](rd.switch);
                }
            }

            if(rd.switch) {
                const kcXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Scaling(-1,1,1));
                rd.switch.setPreTransformMatrix(kcXform);
            }

            // if (rd.keycap) {
            //     gfx.removeMesh(rd.keycap);
            // }
    
            if (_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].keyShape && (!rd.keycap || rd.keycap.isProceduralCap || rd.keycap.text != k.txt || rd.keycap.width != k.width || rd.keycap.row != k.row)) {
                if (rd.keycap) {
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.keycap);
                }

                let primeSearch = k.width;
                if(k.row === "special") {
                    primeSearch = k.special;
                }
                let searchOpts = {vertical:k.vertical, stepped: k.stepped, nub: k.nub, r:k.row};
                const keyModel = "KRK"; // wish it was KRK
                const keyCapGLTF = _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* getKeycap */ "f"](keyModel, primeSearch, k.height, searchOpts);
                if( keyCapGLTF ) {
                    rd.keycap = keyCapGLTF.container.instantiateModelsToScene(name => id, false).rootNodes[0];

                    // if we ever switch to KRK keycaps
                    if(keyModel === "KRK") {
                        for (const child of rd.keycap.getChildMeshes()) {
                            for(let targIdx = 0; targIdx < child.morphTargetManager.numTargets; targIdx++) {
    
                                let mt = child.morphTargetManager.getTarget(targIdx);	
                                if(mt.name == _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getKeycapDefaults"]().profile) {
                                    mt.influence = 1;
                                } else {
                                    mt.influence = 0;
                                }
                            }
                        }
                        //KRK height offset
                        rd.keycap.heightOffset = 5.9;
                    }
                    else {
                        rd.keycap.heightOffset = 3.5;
                    }
                    rd.keycap.parent = root;
                    rd.keycap.preXform = keyCapGLTF.preXform;
                    rd.keycap.postXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Scaling(-1,1,1);
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](rd.keycap);
                }
                else {
                    rd.keycap = babylonjs__WEBPACK_IMPORTED_MODULE_7__["MeshBuilder"].CreatePolygon(id, { shape: _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayFromOutline */ "g"](combinedOutline,0,0.25), depth: 7, smoothingThreshold: 0.1, updatable: false }, scene);
                    rd.keycap.isProceduralCap = true;
                    rd.keycap.parent = root;
                    rd.keycap.preXform = null;
                    rd.keycap.heightOffset = 10.5;
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](rd.keycap);
                }

                rd.keycap.width = k.width;
                rd.keycap.row = k.row;

        
                if(k.matName && _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName]) {
                    let mat = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName];
                                       
                    // var effect = mat.getEffect();
                    // //Attempting to set custom uniform data
                    // effect.setMatrix('albedoMatrix',Matrix.Scale(0.75,1,1))//pickInfo.pickedPoint);
                    if(k.txt && keyModel === "KRK") {
                        let text = k.txt.split(" ").join("\n");
                        mat = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats[k.matName].clone()
                        let textureDim = 256;
                        rd.keycap.text = k.txt;
                        let myDynamicTexture = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["DynamicTexture"](k.id, {width:textureDim*k.width, height:textureDim*k.height}, scene, true);
                        let fontSize = textureDim/4;
                        let font = `bold ${fontSize}px Helvetica`;
                        myDynamicTexture.getContext().font = font;
                        let textWidth = myDynamicTexture.getContext().measureText(text).width;
                        if(textWidth >= 128) {
                            fontSize /= 2;
                            font = `bold ${fontSize}px Helvetica`;
                        }
                        myDynamicTexture.drawText(text, textureDim*0.25, textureDim*0.4, font, "black", "white", true, true);
                        // myDynamicTexture.drawText(""+k.row, 64, 128, font, "white", "green", true, true);
                        mat.baseTexture = myDynamicTexture;
                    }
                    for (const child of rd.keycap.getChildMeshes()){			
                        child.material = mat; 
                    }
                    rd.keycap.material = mat;
                }
                if(_keyPicking_js__WEBPACK_IMPORTED_MODULE_5__[/* pickedKeys */ "c"].indexOf(id)>=0) {
                    rd.keycap.renderOverlay = true;
                    for (const child of rd.keycap.getChildMeshes()){			
                        child.renderOverlay = true; 
                    }
                }
            }
            if(rd.keycap) {
                if(rd.keycap.preXform) {
                    const kcXform = rd.keycap.preXform.multiply(kXform).multiply(rd.keycap.postXform);
                    rd.keycap.setPreTransformMatrix(kcXform);
                }
                rd.keycap.position.y = rd.keycap.heightOffset;
            }
        }

        for (let p of combinedOutline) {
            rd.mins[0] = Math.min(rd.mins[0], p.x);
            rd.maxs[0] = Math.max(rd.maxs[0], p.x);
            rd.mins[1] = Math.min(rd.mins[1], p.z);
            rd.maxs[1] = Math.max(rd.maxs[1], p.z);
        }

        // console.log(`kid ${id}`);
        // console.log(rBD.get_bezel_hole(kIdMap[id]));
        // console.log(rd.bezelHoles);
    }
    
    finalizeLayout();
    return true;
}

function getCombinedOutlineFromPolyGroup(group, ignoreOverlapping) {
    for( const hole of group ) {
        hole.outlineLines = [];
        hole.parsedOutlineLines = {};
        let points = hole.points;
        for(let p = 0; p < points.length; p++) {
            let lStart = points[p];
            let lEnd = points[(p+1)%points.length]
            hole.outlineLines.push([lStart,lEnd]);
        }
    }

    let maxOverlapSq = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"];

    let overlapFunc = (primeL, primeLen, otherLen, line, norm, distBetween, lineArray) => {
        let primeToOtherNear = Math.max(distBetween - otherLen,0) / primeLen;
        let primeToOtherFar = distBetween / primeLen;
        if(primeToOtherNear < 1 - babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] && primeToOtherFar > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
            // kill O and replace it with any remaining line segments
            //parseArray[primeL] = true;
            if (primeToOtherNear > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                lineArray.push([line[0],line[0].add(norm.scale(distBetween - otherLen))]);
            }
            if (primeToOtherFar < 1 - babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                lineArray.push([line[0].add(norm.scale(distBetween)), line[1]]);
            }
            lineArray.splice(primeL,1);
        }
    }

    // clip any overlapping parallel lines against each other (cancel if they face each other)
    for( const hole of group ) {
        let polyList = ignoreOverlapping?group:hole.overlappingPolys;
        for( const [oId,otherHole] of Object.entries(polyList) ) {
            if(otherHole.id === hole.id) continue;
            for(let iL = hole.outlineLines.length-1; iL >= 0; iL--) {
                let lL = hole.outlineLines[iL];
                let lDir = lL[1].subtract(lL[0]);
                let lLen = lDir.length()
                let lineNorm = lDir.normalizeFromLength(lLen);

                for( let jL = otherHole.outlineLines.length-1; jL >= 0; jL-- ) {
                    let oL = otherHole.outlineLines[jL];
                    let oDir = oL[1].subtract(oL[0]);
                    let oLen = oDir.length();
                    let oLNorm = oDir.normalizeFromLength(oLen);
                    let lineDot = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].Dot(oLNorm,lineNorm)
                    if( Math.abs(lineDot) > 1-babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {  //parallel
                        let diff = lL[0].subtract(oL[0]);
                        if(diff.lengthSquared() < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] && lineDot > 0) { // same(ish) start point
                            if(oLen >= lLen-babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) { //same or further end point
                                hole.outlineLines.splice(iL,1);
                                break;
                            } else {
                                lL[0] = oL[1];
                                break;
                            }
                        }
                        let dd = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].Dot(diff, oLNorm);
                        let projPoint = oL[0].add(oLNorm.scale(dd))
                        if( projPoint.subtract(lL[0]).lengthSquared() < maxOverlapSq) {
                            // check to see if these two are facing away from each other
                            if(lineDot < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]-1) {
                                // at this point, dd is the distance between the two starting points (which are facing each other) 
                                // erase the overlapping portion of each line
                                // O ------------> olen
                                //      llen <--------- L
                                // O <----------------> dd
                                overlapFunc(jL,oLen,lLen,oL,oLNorm,dd,otherHole.outlineLines);
                                overlapFunc(iL,lLen,oLen,lL,lineNorm,dd,hole.outlineLines);
                            }
                            else if( lineDot > 1-babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] ) {
                                if( dd > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] ) {
                                    // O -------->
                                    //        L ---------->
                                    // O <---> dd
                                    // consume L
                                    let overlapDist = oLen - dd;
                                    if(overlapDist > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                                        // console.log(`trimming A ${hole.id} ${iL} vs ${oId} ${jL} len ${lLen} ov ${overlapDist}`)
                                        if((lLen - overlapDist) < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"])
                                        {
                                            // console.log(`SPLICE`);
                                            hole.outlineLines.splice(iL,1);
                                            break;
                                        }
                                        lL[0] = lL[0].add(lineNorm.scale(overlapDist));
                                    }
                                }
                                if( dd < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] ) {
                                    // L -------->
                                    //        O ---------->
                                    // L <---> -dd
                                    // consume L
                                    let d = -dd;
                                    if(d < lLen - babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                                        // console.log(`trimming B ${hole.id} ${iL} vs ${oId} ${jL} d ${d}`)
                                        if(d < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"])
                                        {
                                            // console.log(`SPLICE`);
                                            hole.outlineLines.splice(iL,1);
                                            break;
                                        }
                                        lL[1] = lL[0].add(lineNorm.scale(d));
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for( const hole of group ) {
        let polyList = ignoreOverlapping?group:hole.overlappingPolys;
        for( const [oId,oHole] of Object.entries(polyList) ) {
            if(hole.id === oHole.id) continue;
            for(let iL = hole.outlineLines.length - 1; iL >= 0; iL--) {
                let l = hole.outlineLines[iL];
                let lL = l[1].subtract(l[0]);
                let lNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](lL.z,0,-lL.x).normalize();

                let intersections = [];
                let colinear = false;
                let oPoints = oHole.points;
                for(let iOP = 0; iOP < oPoints.length; iOP++) {
                    let segRes = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* segmentToSegment */ "s"](l[0], l[1], lL, lNorm, oPoints[iOP], oPoints[(iOP+1)%oPoints.length]);
                    if(segRes.type === "in_segment" && segRes.intersection) {
                        // console.log(`intersecting ${rd.id} line ${iL} with ${otherRD.id} line ${iOP}` )
                        intersections.push(segRes.intersection);
                    }
                    else if(segRes.type === "colinear") {
                        // console.log(`bailing colinear ${rd.id} line ${iL} with ${otherRD.id} line ${iOP}`);
                        // we're colinear with an edge, so we don't have anything to clip with this box
                        colinear = true;
                        break;
                    }
                }
                if(colinear) continue;

                let isStartInPoly = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* isPointInPoly */ "l"](l[0],oPoints);
                let isEndInPoly = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* isPointInPoly */ "l"](l[1],oPoints);

                // console.log(`${rd.id} line ${iL} with ${otherRD.id} startIn ${isStartInPoly} end ${isEndInPoly} ${intersections.length}`);
                if(isStartInPoly && isEndInPoly && intersections.length <= 1) {
                    // both are inside the poly, just remove the line
                    // console.log(`removing line ${iL} from ${rd.id}`);
                    hole.outlineLines.splice(iL, 1);
                }
                else if(intersections.length === 1) {
                    // console.log(`splitting (one intersection) line ${iL} from ${rd.id}`);
                    // console.log(`start ${isStartInPoly} end ${isEndInPoly}`);
                    if(isStartInPoly) {
                        l[0] = intersections[0];
                    } else {
                        l[1] = intersections[0];
                    }
                    if(l[1].subtract(l[0]).lengthSquared() < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                        hole.outlineLines.splice(iL, 1);
                    }
                }
                else if(intersections.length > 1) {
                    // console.log(`multisplit line ${iL} from ${rd.id}`);
                    // console.log(`${rd.id} l is ${l[0]} ${l[1]}`);
                    intersections.sort((a,b) => (a.subtract(l[0]).lengthSquared() - b.subtract(l[0]).lengthSquared()))
                    let tmp = l[1];
                    l[1] = intersections[0];
                    if(l[1].subtract(l[0]).lengthSquared() < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                        // console.log("skipping start length due to shortness");
                        hole.outlineLines.splice(iL, 1);
                    }
                    // console.log(`${rd.id} start is ${l[0]} ${l[1]}`);
                    for(let i = 2; i < intersections.length; i+=2) {
                        if( intersections[i-1].subtract(intersections[i]).lengthSquared() > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                            hole.outlineLines.push([intersections[i-1],intersections[i]]);
                        } 
                        // console.log(`${rd.id} mid is ${intersections[i-1]} ${intersections[i]}`);
                    }
                    if(intersections.length % 2 === 0) {
                        if( intersections[intersections.length-1].subtract(tmp).lengthSquared() > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                            hole.outlineLines.push([intersections[intersections.length-1],tmp]);
                            // console.log(`${rd.id} end is ${intersections[intersections.length-1]} ${tmp}`);
                        }
                    }
                }
            }
        }
    }


    // pick a line at random.  this could actually pick something on an interior island so we should probably
    // run the loop gen algorithm until all the lines are used up and then pick the polygon with the largest area
    // TODO: we could start with a point on the hull and probably be gtg
    let bestOutline = null;
    let bestOutlineLength = 0;
    while(1) {
        let nextHole = null;
        let nextLineIndex = -1;
        let invertNextLine = false;
        for( const rd of group ) {
            for(let iL = 0; iL < rd.outlineLines.length; iL++) {
                if(!rd.parsedOutlineLines[iL]) {
                    nextHole = rd;
                    nextLineIndex = iL;
                    break;
                }
            }
            if(nextLineIndex >= 0) break;
        }

        if(nextLineIndex === -1)
            break;
        
        let outline = [];
        // finally, walk through the list of available outline lines and pick the closest end point for the next line
        while(nextHole != null && nextLineIndex >= 0) {
            nextHole.parsedOutlineLines[nextLineIndex] = true;
            let prevLine = nextHole.outlineLines[nextLineIndex];
            if(invertNextLine) {
                let tmp = prevLine[0];
                prevLine[0] = prevLine[1];
                prevLine[1] = tmp;
            }
            // console.log(`key rd ${nextKeyRd.id} line idx ${nextLineIndex} s ${prevLine[0]} e ${prevLine[1]}`)
            outline.push(prevLine[0]);

            nextLineIndex = -1;
            let nextDistSq = 20.0
    
            let checkNext = (n,nRd,i) => {
                let newDistSq = prevLine[1].subtract(n[0]).lengthSquared();
                if(newDistSq < nextDistSq) {
                    nextDistSq = newDistSq;
                    nextHole = nRd;
                    nextLineIndex = i;
                    invertNextLine = false;
                }
    
                newDistSq = prevLine[1].subtract(n[1]).lengthSquared();
                if(newDistSq < nextDistSq) {
                    nextDistSq = newDistSq;
                    nextHole = nRd;
                    nextLineIndex = i;
                    invertNextLine = true;
                }
            }
            
            for(let iL = 0; iL < nextHole.outlineLines.length; iL++) {
                if(!nextHole.parsedOutlineLines[iL]) {
                    checkNext(nextHole.outlineLines[iL],nextHole,iL);
                }
            }
    
            let polyList = ignoreOverlapping?group:nextHole.overlappingPolys;
            for( const [oId,oHole] of Object.entries(polyList) ) {
                if(nextHole.id === oHole.id) continue;
                for( let jL = 0; jL < oHole.outlineLines.length; jL++ ) {
                    if(!oHole.parsedOutlineLines[jL]) {
                        checkNext(oHole.outlineLines[jL],oHole,jL);
                    }
                }
            }
        }
        // yeah this isn't exactly correct. but it mostly works
        if(outline.length > bestOutlineLength) {
            bestOutline = outline;
            bestOutlineLength = outline.length;
        }
    }
    return bestOutline;
}

function findOverlappingGroups(kRD, groupName, caseIdx) {
    let gID = 0;
    let groups = {};

    for (const [id, rd] of Object.entries(kRD)) {
        if(rd.caseIdx != caseIdx)  {
            continue;
        }
        for(const [ip, poly] of Object.entries(rd[groupName])) {
            for (const [otherId, otherRD] of Object.entries(kRD)) {
                if(otherRD.caseIdx == rd.caseIdx) {
                    for(const [op, otherPoly] of Object.entries(otherRD[groupName])) {
                        if(otherId === id && ip === op) {
                            continue;
                        }
                        if(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* polyPolyOverlap */ "r"](poly,otherPoly)) {
                            poly.overlappingPolys[otherPoly.id] = otherPoly;
                            otherPoly.overlappingPolys[poly.id] = poly;
                            if(poly.overlapGroupId && otherPoly.overlapGroupId) {
                                // merge
                                // console.log(`merging kgIDs ${rd1.overlapGroupId} and ${rd2.overlapGroupId}`);
                                let pKG = poly.overlapGroupId;
                                let oKG = otherPoly.overlapGroupId;
                                for(const [otherId, oRD] of Object.entries(kRD)) {
                                    for(const poly of oRD[groupName]) {
                                        if(poly.overlapGroupId === oKG) {
                                            poly.overlapGroupId = pKG;
                                        }
                                    }
                                }
                            }
                            else if(poly.overlapGroupId) {
                                otherPoly.overlapGroupId = poly.overlapGroupId;
                            }
                            else if(otherPoly.overlapGroupId) {
                                poly.overlapGroupId = otherPoly.overlapGroupId;
                            }
                            else {
                                poly.overlapGroupId = otherPoly.overlapGroupId = gID++;
                            }
                        }
                    }
                }
            }
    
            if(!poly.overlapGroupId) {
                poly.overlapGroupId = gID++;
            }
        }
    }

    for (const [id, rd] of Object.entries(kRD)) {
        if(rd.caseIdx != caseIdx)  {
            continue;
        }
        for(const [ip, poly] of rd[groupName].entries()) {
            // console.log(`${otherId} is in kgid: ${oRD.keyGroupId}`);
            if(!groups[poly.overlapGroupId]) {
                groups[poly.overlapGroupId] = [];
            }
            groups[poly.overlapGroupId].push(poly);
        }
    }
    return groups;
}

function getScrewRadius(screw,layerName) {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    let screwTypeName = screw.screwType?screw.screwType:"m2_simple";
    let screwType = _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].screwTypes[screwTypeName];
    let radius = screwType.screwHoleRadius;
    
    if(layerName !== screw.topLayer && layerName !== screw.bottomLayer && screwType.standoffRadius) {
        radius = screwType.standoffRadius;
    }

    return radius;
}

function getScrewStandoff() {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    const screwType = bd.screwType?bd.screwType:"m2_simple";

    return _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].screwTypes[screwType].screwHoleRadius;
}

function getScrewBoss() {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    const screwType = bd.screwType?bd.screwType:"m2_simple";

    return _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].screwTypes[screwType].minBoss;
}

function screwAddLayer(screw, layerName) {
    const layerDefs = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"];
    if(!screw.topLayer || (layerDefs[layerName].stackOrder && layerDefs[layerName].stackOrder > layerDefs[screw.topLayer].stackOrder)) {
        screw.topLayer = layerName;
    }
    if(!screw.bottomLayer || (layerDefs[layerName].stackOrder && layerDefs[layerName].stackOrder < layerDefs[screw.bottomLayer].stackOrder)) {
        screw.bottomLayer = layerName;
    }
}

function addScrewHoles(cRD, cBD, bezelThickness, cornerFillet, outline, primaryLayerName, layerOutlines) {
    const defaultScrew = {};
    const screwBoss = getScrewBoss();
    const screwRadius = getScrewRadius(defaultScrew);
    const totalRad = screwRadius + screwBoss;
    const bezelOffset =  ((bezelThickness - totalRad * 2.0) * cBD.screwBezelBias + totalRad) - bezelThickness;
    // console.log(`screw offset: ${bezelOffset} thickness ${bezelThickness} boss ${totalRad} bias ${cBD.screwBezelBias}`)
    let screwLocs = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetOutlinePoints */ "p"](outline,bezelOffset);
    cBD.screws = [];

    // if(true) {
    //     return;
    // }

    let minDist = (totalRad) * 2;
    if(minDist > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
        let remSet = [];
        for(let i = screwLocs.length-1; i >= 0; i--) {
            let loc = screwLocs[i];
            let nexti = (i+screwLocs.length-1)%screwLocs.length;
            let nextLoc = screwLocs[nexti];
            if(loc.subtract(nextLoc).lengthSquared() < minDist*minDist) {
                if(!remSet.includes(i)) {
                    remSet.push(i);
                }
                if(!remSet.includes(nexti)) {
                    remSet.push(nexti);
                }
            } else {
                if(remSet.length) {
                    let distDiffs = {};
                    let startP = (remSet[0]+1)%screwLocs.length;
                    let startLoc = screwLocs[startP];
                    let endP = (remSet[remSet.length-1]+screwLocs.length-1)%screwLocs.length;
                    let endLoc = screwLocs[endP];
                    let minDiff = 100000000.0;
                    let bestPoint = 0;
                    for(const j of remSet) {
                        let midPoint = screwLocs[j]
                        let diff = Math.abs(startLoc.subtract(midPoint).lengthSquared()-endLoc.subtract(midPoint).lengthSquared());
                        if(diff < minDiff) {
                            minDiff = diff;
                            bestPoint = j;
                        }
                    }

                    for(const j of remSet) {
                        if(j != bestPoint) {
                            screwLocs.splice(j,1);
                        }
                    }

                    remSet.length = 0;
                }
            }
        }
    }

    const maxSpan = cBD.maxScrewSpan;
    for(let i = screwLocs.length-1; i >= 0; i--) {
        let loc = screwLocs[i];
        let nexti = (i+screwLocs.length-1)%screwLocs.length;
        let nextLoc = screwLocs[nexti];
        let nextDir = loc.subtract(nextLoc);
        let nextSpan = nextDir.length();
        if(nextSpan > maxSpan) {
            nextDir = nextDir.normalizeFromLength(nextSpan);
            const additionalScrews = Math.floor(nextSpan / maxSpan);
            const additionalSpan = nextSpan / (additionalScrews+1);
            for(let j = additionalScrews; j > 0; j--) {
                let newLoc = nextLoc.add(nextDir.scale(j*additionalSpan));
                // splice puts in front of i
                screwLocs.splice(i,0,newLoc);
            }
        }
    }

    // find all the layers that are a 'shape'
    let shapeLayers = {};
    for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
        if(layerDef.shape) {
            if(!shapeLayers[layerDef.shape]) {
                shapeLayers[layerDef.shape] = [];
            }
            shapeLayers[layerDef.shape].push(layerName);
        }
    }
    
    const externalPoint = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](20,0,-3500);
    const minEdgeDistSq = (screwRadius+screwBoss)*(screwRadius+screwBoss);
    for(let i = screwLocs.length-1; i >= 0; i--) {
        let loc = screwLocs[i];
        let layers = [];
        let screw = {location:loc, shapes:[], topLayer:null, bottomLayer:null}
        
        // const int = coremath.segmentToPoly(loc, externalPoint, layerOutlines[primaryLayerName]);
        // if(int.numIntersections === 0 || int.numIntersections % 2 === 0 || int.nearestDistSq < minEdgeDistSq) {
        //     // not in the primary layer
        //     screwLocs.splice(i,1);
        // } else {
        //     for(const [lId,lList] of Object.entries(shapeLayers)) {
        //         if(lId !== primaryLayerName) {
        //             const layerOutline = layerOutlines[lId];

        //             const int = coremath.segmentToPoly(loc, externalPoint, layerOutline);
        //             if(int.numIntersections === 0 || int.numIntersections % 2 === 0 || int.nearestDistSq < minEdgeDistSq) {
        //                 continue;
        //             }
        //         }
        //         screw.shapes.push(lId);

        //         for(const l of lList) {
        //             screwAddLayer(screw,l);
        //         }
        //     }

        //     cBD.screws.push(screw);
        // }
        {
            for(const [lId,lList] of Object.entries(shapeLayers)) {
                screw.shapes.push(lId);

                for(const l of lList) {
                    screwAddLayer(screw,l);
                }
            }

            cBD.screws.push(screw);
        }
    }
    // screwLocs.length = 0;
}

function getFootShape(layerName, layerDef, cRD, cBD, bd) {
    const scene = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene;
    const root = cRD.rootXform;
    const mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;
    let feet = cRD.feet;
    const bezelThickness = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "bezelThickness");
    const caseCornerFillet = Math.min(bezelThickness,_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "caseCornerFillet"));
                    
    cRD.layers[layerName] = {name:layerName,outlines:[],meshes:[],outlineBounds:{mins:(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](10000000.0,1000000.0,1000000.0)), maxs:(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](-10000000,-1000000,-1000000))}};
    for(const foot of feet) {
        const s0 = foot.screws[0];
        const s1 = foot.screws[1];
        const p0 = (s0.location.x>=s1.location.x)?s0.location:s1.location;
        const p1 = (s0.location.x>=s1.location.x)?s1.location:s0.location;

        const offset = bezelThickness/2;
        const z_line = Math.min(p0.z, p1.z)-offset*layerDef.chin;
        const points = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFilletOutline */ "n"]([new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](p0.x+offset,0,z_line-offset),
                                                        new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](p0.x+offset,0,p0.z+offset),
                                                        new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](p1.x-offset,0,p1.z+offset),
                                                        new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](p1.x-offset,0,z_line-offset)],
                                            0, Math.min(caseCornerFillet,bezelThickness/2), false);
        cRD.layers[layerName].outlines.push(points)
        let polyHoles = [];
        for(const screw of foot.screws) {
            let screwVec = new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Circle */ "a"](screw.location,getScrewRadius(screw, layerName));
            cRD.layers[layerName].outlines.push(screwVec);
            polyHoles.push(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayForCircle */ "f"](screwVec,0,19));
        }
        // let shape = coremath.genArrayForCircle(foot,0,44);
        let shape = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genPointsFromVectorPath */ "h"](points,8);
        const mesh = babylonjs__WEBPACK_IMPORTED_MODULE_7__["MeshBuilder"].CreatePolygon(layerName, { shape: shape, depth:layerDef.height, /*bevel:0.15,*/ smoothingThreshold: 0.1, holes:polyHoles }, scene);
        mesh.parent = root;
        mesh.position.y = lastLayerOffset[layerName]||layerDef.offset;
        mesh.material = mats[_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD,layerName,"material")];
        _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](mesh);
        const meshBounds = mesh.getBoundingInfo();
        cRD.layers[layerName].meshes.push(mesh);
        const outlineBounds = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getVectorPathBounds */ "k"](points);
        cRD.layers[layerName].outlineBounds.mins.minimizeInPlace(outlineBounds.mins);
        cRD.layers[layerName].outlineBounds.maxs.maximizeInPlace(outlineBounds.maxs);
    }
}

function addUSBPort(cRD, cBD, bezelThickness) {
    const boardBounds = cRD.bounds;
    let portDim = [15 / 2,
                   bezelThickness*2];

    let portPos = cBD.usbPortPos * _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].base1U[0];

    
    if(cBD.usbPortCentered) {
        portPos = boardBounds.mins[0] + (boardBounds.maxs[0] - boardBounds.mins[0])/2;
    }
    
    let kPos = [portPos,
                boardBounds.maxs[1]+bezelThickness/2]
    let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Matrix"].Translation(kPos[0], 0, kPos[1]);
    // if (k.rotation_angle != 0) {
    //     kXform = kXform.multiply(Matrix.Translation(-k.rotation_x * tuning.base1U[0], 0, k.rotation_y * tuning.base1U[1]));
    //     kXform = kXform.multiply(Matrix.RotationY(k.rotation_angle * Math.PI / 180.0))
    //     kXform = kXform.multiply(Matrix.Translation(k.rotation_x * tuning.base1U[0], 0, -k.rotation_y * tuning.base1U[1]));
    // }
    cRD.portCut = [new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Poly */ "b"]([
        babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](-portDim[0], 0, -portDim[1]), kXform),
        babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](portDim[0], 0, -portDim[1]), kXform),
        babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](portDim[0], 0, portDim[1]), kXform),
        babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](-portDim[0], 0, portDim[1]), kXform)
    ])];
}

function getFeet(bd, cRD, cBD) {
    let screwLocs = cBD.screws;
    let feet = [];

    if(!cBD.hasFeet || true) {
        cRD.feet = feet;
        return;
    }

    let bounds = cRD.bounds;
    let midZ = bounds.mins[1] + (bounds.maxs[1]-bounds.mins[1])/2;
    let maxLoc = -10000.0;
    for(const l of screwLocs) {
        maxLoc = Math.max(maxLoc, l.location.z);
    }

    let candidates = [];
    for(const l of screwLocs) {
        if(maxLoc - l.location.z < 20) {
            candidates.push(l);
        }
    }

    candidates.sort((a,b) => a.location.x - b.location.x);
    if(candidates.length % 2) {
        candidates.splice(Math.floor(candidates.length / 2),1)
    }
    
    for(let i = 0; i < candidates.length; i+=2) {
        const p0 = candidates[i];
        const p1 = candidates[i+1];

        const foot = { screws:[p0, p1]};
        feet.push(foot);


        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            if(layerDef.customShape === getFootShape) {
                screwAddLayer(p0,layerName);
                screwAddLayer(p1,layerName);
            }
        }
    }
    cRD.feet = feet;
}

function finalizeLayout() {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    const kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData = {};
    console.log(`finalize wasm`);
    console.log(bd.wasmBD);

    //bd.wasmBD.find_overlapping_groups("bezel_holes");
    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        console.log("LAYYYOUUUTT");
        let wasmLayout = bd.wasmCases[caseIdx].process_layout();
        
        if(false){}

        let keyGroups = findOverlappingGroups(kRD, "bezelHoles", caseIdx);

        let kgOutlines = {};

        if( Object.keys(keyGroups).length > 0 ) {
            for(const [kgId, KG] of Object.entries(keyGroups)) {
                let outline = getCombinedOutlineFromPolyGroup(KG);
                kgOutlines[kgId] = outline;
            }
        }
        else {
            continue;
        }


        let kPs = [];

        // for(let p of globals.pcbData[caseIdx].outline) {
        //     p.delaunayPoints = [];
        //     p.pointIdx = pid++;
        //     kPs.push(p);
        // }

        let pid = 0;
        let oid = 0;
        let outlineConnections = {};
        //assign outline index to each point (which outline that point belongs to)
        for(const [id,o] of Object.entries(kgOutlines)) {
            for(let i = 0; i < o.length; i++) {
                const p = o[i];
                p.delaunayPoints = [];
                p.pointIdx = pid+i;
                p.outlineIdx = oid;
                p.outlinePoints = [pid+((i-1+o.length)%o.length),pid+((i+1)%o.length)];
                kPs.push(p);
            }
            outlineConnections[oid] = [oid];
            oid += 1;
            pid += o.length;
        }

        const vRes = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* createVoronoi */ "e"](kPs);
        // console.log("old voronoi:");
        // console.log(vRes);

        let dbglines = [];
        let color1 = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Color4"](1,0,0,1);
        let color2 = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Color4"](0,1,0,1);
        let linecolors = [];

        for(const edge of vRes.edges) {
            if(edge.lSite && edge.rSite) {
                if(edge.lSite.pointIdx > kPs.length || edge.rSite.pointIdx > kPs.length ) {
                    console.log(`couldn't find points`);
                    continue;
                }

                let lP = edge.lSite;
                let rP = edge.rSite;
                let outlineEdge = false;
                // console.log(`lP: ${lP.x} ${lP.z} rP: ${rP.x} ${rP.z}`)
                const rToL = lP.subtract(rP);
                let dist = rToL.length();
                if(dist < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                    continue;
                }
                if(lP.outlinePoints.includes(rP.pointIdx)) {
                    // an actual edge!
                    outlineEdge = true;
                    // continue;
                    // dbglines.push([lP,rP]);
                    // linecolors.push([color1, color1]);
                }
                else {
                    let checkExterior = function(cP, pToL) {
                        const prevToC = cP.subtract(kPs[cP.outlinePoints[0]]);
                        const cToNext = kPs[cP.outlinePoints[1]].subtract(cP);
    
                        const prevNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](prevToC.z,0,-prevToC.x);
                        const nextNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](cToNext.z,0,-cToNext.x);
                        // todo: figure out epsilons
                        const isAcute = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].Dot(prevNorm,cToNext) > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"];
    
                        const pDot = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].Dot(pToL, prevNorm);
                        const nDot = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].Dot(pToL, nextNorm);
    
                        return (pDot > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] && (!isAcute || nDot > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"])) || (pDot < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] && !isAcute && nDot > babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]);
                    }
                    let isExterior = checkExterior(rP, rToL);
                    if(lP.outlineIdx !== rP.outlineIdx) {
                        const lToR = rP.subtract(lP);
                        isExterior = isExterior & checkExterior(lP, lToR);
                    }

                    if(!isExterior) {
                        // skip this edge
                        continue;
                    }
                    // dbglines.push([lP,rP]);
                    // linecolors.push([color2, color2]);
                }


                const centerP = lP.add(rP).scale(0.5);

                let circumscribedRadius = function(a,b,c) {
                    const v = (a+b+c)*(b+c-a)*(c+a-b)*(a+b-c);
                    const sqrt = Math.sqrt(v);
                    if(v < 0 || sqrt < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                        return 10000000.0;
                    }
                    return (a*b*c) / sqrt;
                }

                const lToR = rP.subtract(lP);
                const rNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](rToL.z, 0, -rToL.x).normalizeToNew();

                let minThetaL = dist/2;
                let maxThetaL = 1000000;
                let minThetaR = dist/2;
                let maxThetaR = 1000000;
                for(const p of kPs) {
                    if(p.pointIdx === lP.pointIdx || p.pointIdx === rP.pointIdx) {
                        continue;
                    }

                    const rToP = p.subtract(rP);
                    const lToP = p.subtract(lP);
                    let lPDist = lToP.length();
                    let rPDist = rToP.length();
                    if( lPDist < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] || rPDist < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                        continue;
                    }
                    const pToCDist = centerP.subtract(p).length();
                    let nDot = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].Dot(rNorm,rToP);

                    let circleRadius = circumscribedRadius(lPDist,rPDist,dist);

                    if(pToCDist*2 <= dist) {
                        // between the two!
                        // one side or the other is ALWAYS inside, the other is a minimal value (theta needs to be bigger
                        // and as the circle grows it approaches a line between the main points, which excludes a half space)
                        if(nDot >= 0) {
                            minThetaL = Math.max(minThetaL,circleRadius);
                            maxThetaR = 0;
                        }
                        else {
                            minThetaR = Math.max(minThetaR,circleRadius);
                            maxThetaL = 0;
                        }
                    }
                    else {
                        if(nDot >= 0) {
                            maxThetaR = Math.min(maxThetaR, circleRadius);
                        }
                        else {
                            maxThetaL = Math.min(maxThetaL, circleRadius);
                        }
                    }

                    // this means that there's a point between the endpoints that will always be covered by a circle that direction.
                    if((maxThetaR - minThetaR) < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"] && (maxThetaL - minThetaL) < babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"]) {
                        break;
                    }
                }

                let minTheta = minThetaL;
                let maxTheta = maxThetaL;
                // lets just always bias to the larger side
                if(maxThetaR >= maxThetaL) {
                    minTheta = minThetaR;
                    maxTheta = maxThetaR;
                }
                minTheta = Math.round(minTheta*100000)/100000;
                maxTheta = Math.round(maxTheta*100000)/100000;
                maxTheta = Math.min(maxTheta, 10000);


                if(outlineEdge) {
                    minTheta = 0;
                }
                lP.delaunayPoints.push({p:rP,dist:dist,minTheta:minTheta,maxTheta:maxTheta});
                rP.delaunayPoints.push({p:lP,dist:dist,minTheta:minTheta,maxTheta:maxTheta});
            }
        }
        const thetaValues = [];
        let outlineLinks = {};
        for(const p of kPs) {
            // console.log(`point ${p.pointIdx}`)
            // console.log(p);

            const pToPrev = p.subtract(kPs[p.outlinePoints[0]]).normalize();
            const pToNext = p.subtract(kPs[p.outlinePoints[1]]).normalize();
            const prevAngle = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](pToPrev);
            const compVal =  Math.PI * 2 - prevAngle + babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"];
            const nextAngle = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](pToNext);
            // console.log(`prevAngle ${prevAngle}`)

            for(const dP of p.delaunayPoints) {
                if(dP.maxTheta > 9000) {
                    p.isOnConvexHull = true;
                    break;
                }
            }

            p.delaunayPoints.sort((a,b) => {
                const pToA = (_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](p.subtract(a.p).normalize()) + compVal) % (Math.PI * 2);
                const pToB = (_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](p.subtract(b.p).normalize()) + compVal) % (Math.PI * 2);
                return pToA - pToB;
            });
            // ok we have a radially sorted list of lines, 0 is input and the end is output
            const joinTheta = 10;
            for(const dp of p.delaunayPoints) {
                if(p.outlineIdx !== dp.p.outlineIdx) {
                    const outlinePairName = `${Math.min(p.outlineIdx,dp.p.outlineIdx)}_${Math.max(p.outlineIdx,dp.p.outlineIdx)}`
                    if(!outlineLinks[outlinePairName]) {
                        outlineLinks[outlinePairName] = [];
                    }
                    outlineLinks[outlinePairName].push({p:p,dp:dp});
                    // dbglines.push([p,dp.p]);
                    // linecolors.push([color1, color2]);
                }

                if(!thetaValues.includes(dp.minTheta)) {
                    thetaValues.push(dp.minTheta);
                }
                if(!thetaValues.includes(dp.maxTheta)) {
                    thetaValues.push(dp.maxTheta);
                }
                // console.log(`thetas: ${dp.minTheta} ${dp.maxTheta} / dist: ${dp.dist} / rot: ${coremath.getRotFromNormal(p.subtract(dp.p).normalize())}`)
                // console.log(dp.p);
            }
            // console.log(`nextAngle ${nextAngle}`)
        }


        const outlineOutlinePairs = [];
        // this might not work, we might need an actual o -> o linkage
        for(const [ooId,ooEdges] of Object.entries(outlineLinks)) {
            // console.log(ooEdges);
            // sort the edges so the shortest ones are first
            ooEdges.sort((a,b) => {return a.dp.dist > b.dp.dist});
            let linkedPts = [];
            let minEdges = [];
            // console.log(ooEdges);
            const edgeDiffMax = 2;  // 2 mm
            const edgeMin = 19.05;

            // find all of the edges that are within some epsilon (the edgeDiffMax) of the shortest edge
            for(const e of ooEdges) {
                if(linkedPts.length >= 4 && e.dp.dist > (ooEdges[0].dp.dist + edgeDiffMax) && e.dp.dist > edgeMin) {
                    break;
                }
                if(!linkedPts.includes(e.p.pointIdx) && !linkedPts.includes(e.dp.p.pointIdx)) {
                    linkedPts.push(e.p.pointIdx);
                    linkedPts.push(e.dp.p.pointIdx);
                    minEdges.push(e);
                }
            }

            // out of the set of short edges, find the two that are the farthest apart (in the center, maybe do seg->seg in the future?)
            let maxDist = -1;
            let bestEdges = null;
            for(const e of minEdges) {
                for(const oE of minEdges) {
                    if(e.p.pointIdx !== oE.p.pointIdx) {
                        const e_center = (kPs[e.p.pointIdx].add(kPs[e.dp.p.pointIdx]).scale(0.5));
                        const oE_center = (kPs[oE.p.pointIdx].add(kPs[oE.dp.p.pointIdx]).scale(0.5))
                        let dist = e_center.subtract(oE_center).lengthSquared();
                        if( dist > maxDist ) {
                            maxDist = dist;
                            bestEdges = [e,oE];
                        }
                    }
                }
            }

            if(bestEdges)
            {
                console.log(`Best ${ooId} edges! ${minEdges.length} from ${ooEdges.length}`);
                outlineOutlinePairs.push({outline1:Math.min(bestEdges[0].p.outlineIdx,bestEdges[0].dp.p.outlineIdx), 
                                          outline2:Math.max(bestEdges[0].p.outlineIdx,bestEdges[0].dp.p.outlineIdx),
                                          maxDist:maxDist,
                                          edgeLength:bestEdges[0].dp.dist+bestEdges[1].dp.dist,
                                          bestEdges:bestEdges});
            }
        }

        outlineOutlinePairs.sort((a,b) => a.edgeLength - b.edgeLength);

        for(const ooPair of outlineOutlinePairs) {
            // set the linking edges in the points  (todo: this should be an array that we rotationally sort)

            let mergeArrays = function(a,b) {
                for(const c of a) {
                    if(!b.includes(c)) {
                        b.push(c);
                    }
                }
                for(const c of b) {
                    if(!a.includes(c)) {
                        a.push(c);
                    }
                }
            }
            if(ooPair.edgeLength < 20 || !outlineConnections[ooPair.outline1].includes(ooPair.outline2))
            {
                mergeArrays(outlineConnections[ooPair.outline1],outlineConnections[ooPair.outline2]);
                const bestEdges = ooPair.bestEdges;
                for(const e of bestEdges) {
                    if(!e.p.linkingEdges) {
                        e.p.linkingEdges = [];
                    }
                    e.p.linkingEdges.push(e.dp);
                    const revP = kPs[e.dp.p.pointIdx];
                    for(const dp of revP.delaunayPoints) {
                        if(dp.p.pointIdx === e.p.pointIdx) {
                            if(!revP.linkingEdges) {
                                revP.linkingEdges = [];
                            }
                            revP.linkingEdges.push(dp);
                            break;
                        }
                    }
                }
            }
        }

        
        let convexHull = [];
        for(const p of kPs) {
            if(p.linkingEdges && p.linkingEdges.length > 1) {
                // radially sort the linked edges counter clockwise from the outline start
                const pToPrev = p.subtract(kPs[p.outlinePoints[0]]).normalize();
                const pToNext = p.subtract(kPs[p.outlinePoints[1]]).normalize();
                const prevAngle = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](pToPrev);
                const compVal =  Math.PI * 2 - prevAngle + babylonjs__WEBPACK_IMPORTED_MODULE_7__["Epsilon"];
                p.linkingEdges.sort((a,b) => {
                    const pToA = (_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](p.subtract(a.p).normalize()) + compVal) % (Math.PI * 2);
                    const pToB = (_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getRotFromNormal */ "j"](p.subtract(b.p).normalize()) + compVal) % (Math.PI * 2);
                    return pToA - pToB;
                });
            }
        }

        // ok, find the minimal outline by starting at a known edge point and walking the outline (taking every linkingEdge)
        // until we get back to the start
        let firstP = null;
        for(const p of kPs) {
            if(p.isOnConvexHull && !p.linkingEdges) {
                firstP = p;
            }
        }
        let thisP = firstP;
        let lastP = thisP;

        let realOutline = [];
        let outlineIdx = [];
        do {
            if(thisP.isOnConvexHull) {
                convexHull.push(thisP);
            }
            realOutline.push(thisP);
            if(outlineIdx.includes(thisP.pointIdx)) {
                console.log(`oh boy loop detected`);
                // gfx.drawDbgOutline("badOutline", realOutline);
                break;
            }
            outlineIdx.push(thisP.pointIdx);
            let foundLast = lastP.pointIdx === thisP.outlinePoints[0];
            let linked = false;
            // since this is a sorted array, pick the LAST one and nuke the rest (little unsure of this)
            if(thisP.linkingEdges) {
                // console.log(`n linked edges: ${thisP.linkingEdges.length}`)
                for(const edge of thisP.linkingEdges) {
                    if(lastP.pointIdx === edge.p.pointIdx) {
                        foundLast = true;
                    }
                    else if(foundLast && !outlineIdx.includes(edge.p.pointIdx)) {
                        lastP = thisP;
                        thisP = edge.p;
                        linked = true;
                    }
                }
            }
            if(!linked) {
                lastP = thisP;
                thisP = kPs[thisP.outlinePoints[1]];
            }
        } while(thisP.pointIdx != firstP.pointIdx)

        thetaValues.sort((a,b) => a - b);

        const bounds = { mins:[100000.0, 100000.0],
                         maxs:[-100000.0, -100000.0] };
        for(let oP of convexHull) {
            bounds.mins[0] = Math.min(bounds.mins[0],oP.x);
            bounds.maxs[0] = Math.max(bounds.maxs[0],oP.x);
            bounds.mins[1] = Math.min(bounds.mins[1],oP.z);
            bounds.maxs[1] = Math.max(bounds.maxs[1],oP.z);
        }

        //todo:  map convexhull onto minoutline, start looking at edges between the convex points and repeat until we get to min
        // THIS ASSUMES realOutline [0] == convexHull[0]
        let minOutlineIdx = 0;
        let eps = [];
        let ecs = [];
        for(let i = 0; i < convexHull.length; i++) {
            const p = convexHull[i];
            const nP = convexHull[(i+1)%convexHull.length];

            p.concavityDepth = 0;
            // console.log(`hull point`);
            // console.log(p);

            let intermediates = [];
            let startIdx = minOutlineIdx;
            let splitSpan = (startOutlineIdx,endP) => {
                const endPointIdx = endP.pointIdx;
                const startP = realOutline[startOutlineIdx];
                let lastPConnIdx = null;
                let firstnPConnIdx = null;
                let intermediateIdx = startOutlineIdx+1;
                while(intermediateIdx < realOutline.length && realOutline[intermediateIdx].pointIdx != endPointIdx) {
                    // console.log(`intermediate point ${realOutline[intermediateIdx].pointIdx}`);
                    // console.log(realOutline[intermediateIdx]);
                    const iP = realOutline[intermediateIdx];
                    if(!iP.concavityDepth) {
                        iP.concavityDepth = 1;
                    } else {
                        iP.concavityDepth += 1;
                    }
                    for(const dP of iP.delaunayPoints) {
                        if(dP.p.pointIdx === startP.pointIdx) {
                            lastPConnIdx = intermediateIdx;
                        }
                        if(firstnPConnIdx === null && dP.p.pointIdx === endPointIdx) {
                            firstnPConnIdx = intermediateIdx;
                        }
                    }
                    intermediateIdx+=1;
                }

                const spanLine = endP.subtract(startP);
                if(lastPConnIdx !== null && firstnPConnIdx !== null && lastPConnIdx != firstnPConnIdx) {
                    // lerp to 1/3rd and 2/3rds of the way from end to start
                    realOutline[lastPConnIdx].lerpTarget = startP.add(spanLine.scale(1/3)).subtract(realOutline[lastPConnIdx]);
                    realOutline[firstnPConnIdx].lerpTarget = startP.add(spanLine.scale(2/3)).subtract(realOutline[firstnPConnIdx]);
                    // eps.push([realOutline[lastPConnIdx], realOutline[lastPConnIdx].lerpTarget]);
                    // ecs.push([color1,color2]);
                    // eps.push([realOutline[firstnPConnIdx], realOutline[firstnPConnIdx].lerpTarget]);
                    // ecs.push([color1,color2]);
                    if(lastPConnIdx-startOutlineIdx > 1) {
                        splitSpan(startOutlineIdx,realOutline[lastPConnIdx]);
                    }
                    if(firstnPConnIdx - lastPConnIdx > 1) {
                        splitSpan(lastPConnIdx, realOutline[firstnPConnIdx]);
                    }
                    if(intermediateIdx-firstnPConnIdx > 1) {
                        splitSpan(firstnPConnIdx,endP);
                    }
                } else if(lastPConnIdx !== null || firstnPConnIdx !== null) {
                    let splitPoint = (lastPConnIdx !== null)?lastPConnIdx:firstnPConnIdx;
                    //split halfway
                    realOutline[splitPoint].lerpTarget = startP.add(spanLine.scale(0.5)).subtract(realOutline[splitPoint]);
                    // eps.push([realOutline[splitPoint], realOutline[splitPoint].lerpTarget]);
                    // ecs.push([color1,color2]);
                    if(splitPoint-startOutlineIdx > 1) {
                        splitSpan(startOutlineIdx,realOutline[splitPoint]);
                    }
                    if(intermediateIdx-splitPoint > 1) {
                        splitSpan(splitPoint,endP);
                    }
                }

                return intermediateIdx;
            };

            minOutlineIdx = splitSpan(minOutlineIdx,nP,0);
        }
        _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* drawDbgLines */ "d"]("edgeVoronois",eps,ecs)
        console.log(`finished?`);
        // gfx.drawDbgOutline("realOutline", realOutline);
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData[caseIdx] = {bounds:bounds, keyGroups:keyGroups,convexHull:convexHull,kgOutlines:kgOutlines,minOutline:realOutline};
    }
}

function refreshPCBs() {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        const cRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[caseIdx];
        const layoutData = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData[caseIdx];

        if(layoutData) {
            _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* refreshPCBOutline */ "c"](layoutData.minOutline, caseIdx, cRD);
        }

        // cBD.pcbBounds = globals.pcbData[caseIdx].outlineBounds;
    }
}

function addScrewModels(cRD, cBD) {
    let screwIdx = 0;
    for(const screw of cBD.screws) {
        let cyl = babylonjs__WEBPACK_IMPORTED_MODULE_7__["MeshBuilder"].CreateCylinder(`screw${screwIdx}`, {height:100, diameter:2.2}, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        
        cyl.position = screw.location; //, getScrewRadius(screw, layerName)
        screwIdx += 1;
    }
}

const lastLayerOffset = {};

function removeCaseData() {
    const scene = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene;
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        if(!_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[caseIdx]) {
            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases.push({layers:{}});
        }
        const cRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[caseIdx];

        for(const [layerName, layer] of Object.entries(cRD.layers)) {
            if(layer.mesh) {
                lastLayerOffset[layerName] = mesh.position.y;
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](layer.mesh);
            }
            if(layer.meshes) {
                for(const m of layer.meshes) {
                    lastLayerOffset[layerName] = m.position.y;
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](m);
                }
                layer.meshes.length = 0;
            }
        }
        cRD.layers = {};
    }
}

function refreshCase() {
    const scene = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene;
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    const kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    const mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;

    removeCaseData();

    for(const [caseIdx,cBD] of Object.entries(bd.cases)) {
        if(!_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[caseIdx]) {
            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases.push({layers:{}});
        }
        const cRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[caseIdx];

        const root = cRD.rootXform;
        root.position.x = 50*caseIdx;
    
        // if(!bd.layout || Object.keys(bd.layout.keys).length < 1) {
        //     return;
        // }
    
        const layoutData = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData[caseIdx];
    
        if(!layoutData || Object.keys(layoutData.keyGroups).length <= 0 ) {
            continue;
        }

        let kgOutlines = layoutData.kgOutlines;
    
        let vectorGeo = {};
        let tesselatedGeo = {};
        
        cRD.bounds = layoutData.bounds;

        console.log('lolz');
        let wasmOutlines = bd.wasmCases[caseIdx].process_case();

        console.log('outline');
        console.log(wasmOutlines);
        // let wIdx = 0;

        // let dbgOutline = [];
        // for( let p of wasmOutlines.layers["edge"].boundary_shape.points ) {
        //     dbgOutline.push(new Vector3(p[0],p[1],p[2]));
        // }
        // console.log(`drawing outline ${wIdx}`)
        // gfx.drawDbgOutline("wasmOutline"+wIdx, dbgOutline, null, null, true);
        // wIdx+=1;

        // vectorGeo["bezel_keygroup_cuts"] = []
        // tesselatedGeo["bezel_keygroup_cuts"] = [];
        // for(const [id,outline] of Object.entries(kgOutlines)) {
        //     let bezelOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, tuning.bezelCornerFillet, false);
        //     vectorGeo["bezel_keygroup_cuts"].push(bezelOutlineVec);
        //     tesselatedGeo["bezel_keygroup_cuts"].push(coremath.genPointsFromVectorPath(bezelOutlineVec));
        // }
        
        // let plateGroups = findOverlappingGroups(kRD, "switchCut", caseIdx);
        // vectorGeo["plate_cuts"] = [];
        // tesselatedGeo["plate_cuts"] = [];
        // for(const [gId, G] of Object.entries(plateGroups)) {
        //     let outline = getCombinedOutlineFromPolyGroup(G);
        //     let switchOutlineVec = coremath.offsetAndFilletOutline(outline, 0.0, 0.5, false);
        //     vectorGeo["plate_cuts"].push(switchOutlineVec);
        //     const genPoints = coremath.genPointsFromVectorPath(switchOutlineVec);
        //     tesselatedGeo["plate_cuts"].push(genPoints);
        // }

        if(cBD.hasUSBPort) {
            let maxThickness = 0.0;
            for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
                if(layerDef.portCut) {
                    const bezelThickness = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "bezelThickness");
                    maxThickness = Math.max(maxThickness,bezelThickness);
                }
            }

            addUSBPort(cRD, cBD, maxThickness);
        }

        let pcbBounds = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData[caseIdx].outlineBounds;
        let bounds = cRD.bounds;
        const rectangularBounds = [
            new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
            new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.min(bounds.mins[1],pcbBounds.mins[1])),
            new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](Math.max(bounds.maxs[0],pcbBounds.maxs[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1])),
            new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](Math.min(bounds.mins[0],pcbBounds.mins[0]), 0, Math.max(bounds.maxs[1],pcbBounds.maxs[1]))
        ];

        let convexHull = layoutData.convexHull;

        let dists = [1000000,1000000,1000000,1000000];
        //find the 4 convex hull points closest to each rectangular corner, and then map the points between them on the lines between the corners
        let points = [-1, -1, -1, -1];

        for(let iP = 0; iP < convexHull.length; iP++) {
            const p = convexHull[iP];
            for(let iR = 0; iR < 4; iR++) {
                let dist = babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"].DistanceSquared(p,rectangularBounds[iR]);
                if(dist < dists[iR]) {
                    points[iR] = iP;
                    dists[iR] = dist;
                }
            }
        }
        let targets = {};//new Array(convexHull.length);

        let nPoints = 4;
        for(let i = 0; i < nPoints; i++) {
            let iThis = points[i];
            let iNext = points[(i+1)%nPoints];
            if(iNext < iThis) {
                iNext+=convexHull.length;
            }

            let pThis = rectangularBounds[i];
            let pNext = rectangularBounds[(i+1)%nPoints];
            // let pThis = convexHull[iThis];
            // let pNext = convexHull[iNext%convexHull.length];

            let line = pNext.subtract(pThis);
            let lineLen = line.length();
            line.normalizeFromLength(lineLen);
            let step = lineLen/(iNext-iThis);
            
            for(let j = iThis+1; j < iNext; j++) {
                targets[convexHull[j%convexHull.length].pointIdx] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* nearestPointOnLine */ "m"](pThis,line,convexHull[j%convexHull.length]);
                // targets[j%convexHull.length] = pThis.add(line.scale((j-iThis)*step));
            }
            targets[convexHull[iThis].pointIdx] = pThis;
        }

        cRD.convexHull = [...convexHull];

        cRD.outlineTargets = targets;

        let minBezelThickness = 100000.0;
        let maxCornerFillet = 0.0;
        let maxConcavity = -1.0;
        let maxConcaveLayer = null;
        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            const lRD = {name:layerName,outlines:[],meshes:[]};
            cRD.layers[layerName] = lRD;

            const concavity = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "bezelConcavity");
            const convexity = 1.0-concavity;

            let maxConcavityDepth = 0;
            for(const p of layoutData.minOutline) {
                maxConcavityDepth = Math.max(maxConcavityDepth,p.concavityDepth);
            }
            const specificConcavityDepth = (1+maxConcavityDepth)*concavity;
            const targetConcavityDepth = Math.floor(specificConcavityDepth);
            const concavityRem = specificConcavityDepth - targetConcavityDepth;

            lRD.outline = [];
            for(const p of layoutData.minOutline) {
                if(p.concavityDepth < targetConcavityDepth) {
                    lRD.outline.push(p);
                } else if(p.concavityDepth == targetConcavityDepth) {
                    // lerp here.
                    if(p.concavityDepth === 0) {
                        lRD.outline.push(p.scale(concavityRem).add(cRD.outlineTargets[p.pointIdx].scale(1.0-concavityRem)));
                        // lRD.outline.push(p);
                    }
                    else {
                        lRD.outline.push(p.add(p.lerpTarget.scale(1.0-concavityRem)));
                    }
                }
            }

            // lRD.outline = [...cRD.convexHull];
            // for(let iP = 0; iP < lRD.outline.length; iP++) {
            //     lRD.outline[iP] = lRD.outline[iP].scale(concavity).add(cRD.outlineTargets[iP].scale(convexity));
            // }

            if(layerDef.tuneable !== null && concavity > maxConcavity) {
                maxConcavity = concavity;
                maxConcaveLayer = lRD;
            }

            if(cBD.forceSymmetrical) {
                let midPoint = (bounds.maxs[0] - bounds.mins[0]) * 0.5 + bounds.mins[0];
                let cvPs = [];
                for(let oP of lRD.outline) {
                    cvPs.push(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](midPoint - (oP.x - midPoint), oP.y, oP.z));
                }
                cvPs.reverse();

                const caseCornerFillet = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "caseCornerFillet");
                let outlineFillets = (new Array(lRD.outline.length)).fill(caseCornerFillet);
                const combined = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* combineOutlines */ "c"](lRD.outline,outlineFillets,cvPs,outlineFillets,caseCornerFillet,false);
                if(false) {}
            
                lRD.outline = combined.outline;
            }
            
            const bezelThickness = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "bezelThickness");
            const caseCornerFillet = Math.min(bezelThickness,_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "caseCornerFillet"));
            if(layerDef.tuneable !== null) {
                maxCornerFillet = Math.max(maxCornerFillet,caseCornerFillet);
                minBezelThickness = Math.min(minBezelThickness,bezelThickness);
            }

            lRD.outline = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFixOutlinePoints */ "o"](lRD.outline, bezelThickness, null).outline;
        }

        addScrewHoles(cRD, cBD, minBezelThickness, maxCornerFillet, maxConcaveLayer.outline, "caseFrame", tesselatedGeo);
        getFeet(bd, cRD, cBD);

        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            const lRD = cRD.layers[layerName];
            const bezelThickness = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "bezelThickness");
            const caseCornerFillet = Math.min(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD, layerName, "caseCornerFillet"));
            vectorGeo["cavityInner"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFilletOutline */ "n"](layoutData.minOutline, 0, _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelCornerFillet, false);
            tesselatedGeo["cavityInner"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genPointsFromVectorPath */ "h"](vectorGeo["cavityInner"],8);

            vectorGeo["cavityInnerEdge"] = [vectorGeo["cavityInner"]];
            tesselatedGeo["cavityInnerEdge"] = [tesselatedGeo["cavityInner"]];
        
            const taperOffsetMax = -bezelThickness*.1;
    
            if(cBD.hasUSBPort && layerDef.portCut) {
                let portCut = cRD.portCut;
                let portOutline = getCombinedOutlineFromPolyGroup(portCut);
                let portFillets = (new Array(portOutline.length)).fill(0);
                let interiorShape = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetOutlinePoints */ "p"](lRD.outline,-bezelThickness);
                let interiorFillets = (new Array(interiorShape.length)).fill(_tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].bezelCornerFillet);
                let intersectionFillet = 1.0;
                let combined = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* combineOutlines */ "c"](interiorShape,interiorFillets, portOutline, portFillets, intersectionFillet);
                let combo = combined.outline;
                let comboFillets = combined.fillets;
                combo.reverse();
                comboFillets.reverse();
                let outlineFillets = (new Array(lRD.outline.length)).fill(caseCornerFillet);
                let exteriorShape = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetOutlinePoints */ "p"](lRD.outline,0.0);

                combined = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* combineOutlines */ "c"](exteriorShape,outlineFillets,combo,comboFillets, intersectionFillet, true);
                combo = combined.outline;
                let finFillets = combined.fillets;
        
                vectorGeo["caseFrame"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFilletOutline */ "n"](combo, 0, finFillets, false);
                tesselatedGeo["caseFrame"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genPointsFromVectorPath */ "h"](vectorGeo["caseFrame"],8);
                vectorGeo["cavityInnerEdge"].length = 0;
                tesselatedGeo["cavityInnerEdge"].length = 0;
            } else {
                vectorGeo["caseFrame"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFilletOutline */ "n"](lRD.outline, 0, caseCornerFillet, false);
                tesselatedGeo["caseFrame"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genPointsFromVectorPath */ "h"](vectorGeo["caseFrame"],8);
            }
    
            vectorGeo["pcbOutline"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFilletOutline */ "n"](_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData[caseIdx].outline, 0.0, 2.0, false);
            tesselatedGeo["pcbOutline"] = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genPointsFromVectorPath */ "h"](vectorGeo["pcbOutline"]);

            if(vectorGeo[layerDef.shape]) {
                lRD.outlines.push(vectorGeo[layerDef.shape]);
            }

            if( _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"][layerDef.visFilter] ) {
                if(layerDef.customShape) {
                    layerDef.customShape(layerName, layerDef, cRD, cBD, bd);
                }
                else {
                    if(layerDef.holes.includes("screwHoles")) {
                        let screwData = [];
                        for(const screw of cBD.screws) {
                            screwData.push(new _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* Circle */ "a"](screw.location,getScrewRadius(screw, layerName)));
                        }
            
                        vectorGeo["screwHoles"] = screwData;
                        tesselatedGeo["screwHoles"] = vectorGeo["screwHoles"].map((a) => _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* genArrayForCircle */ "f"](a,0,19));
                    }

                    let polyShape = tesselatedGeo[layerDef.shape];
                    if(wasmOutlines.layers[layerName]) {
                        let newShape = [];
                        for(let p of wasmOutlines.layers[layerName].boundary_shape.points) {
                            newShape.push(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](p[0], p[1], p[2]));
                        }
                        polyShape = newShape;
                    }
                    
                    let polyHoles = [];
                    for(const holeLayer of layerDef.holes) {
                        if(vectorGeo[holeLayer] != null) {
                            lRD.outlines = lRD.outlines.concat(vectorGeo[holeLayer]);
                        }

                        if(wasmOutlines[holeLayer]) {
                            for(let h of wasmOutlines[holeLayer].points) {
                                let newHole = [];
                                for(let p of h) {
                                    newHole.push(new babylonjs__WEBPACK_IMPORTED_MODULE_7__["Vector3"](p[0], p[1], p[2]));
                                }
                                polyHoles.push(newHole);
                            }
                        }
                        else if(tesselatedGeo[holeLayer] != null) {
                            //polyHoles = polyHoles.concat(tesselatedGeo[holeLayer]);
                        }
                    }
                    // console.log("adding layer "+layerName);
                    const mesh = babylonjs__WEBPACK_IMPORTED_MODULE_7__["MeshBuilder"].CreatePolygon(layerName, { shape: polyShape, depth:layerDef.height, /*bevel:0.15,*/ smoothingThreshold: 0.1, holes:polyHoles }, scene);
                    mesh.parent = root;
                    mesh.position.y = lastLayerOffset[layerName]||layerDef.offset;
                    mesh.material = mats[_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerGetValue"](cBD,layerName,"material")];
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* addShadows */ "a"](mesh);
                    lRD.meshes.push(mesh);
                    lRD.outlineBounds = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getVectorPathBounds */ "k"](vectorGeo[layerDef.shape]);
                }
            }

            lRD.outline = null;
        }
        
        if(cBD.hasFeet) {
            let footMinY = 1000000.0;
            let footMinZ = 1000000.0;
            let footDepth = 15;
            for(const footMesh of cRD.layers["feet"].meshes) {
                const meshBounds = footMesh.getBoundingInfo();
                footMinY = Math.min(footMinY,meshBounds.minimum.y);
                footMinZ = Math.min(footMinZ,meshBounds.minimum.z);
            }
            
            const baseBounds = cRD.layers["bottom"].meshes[0].getBoundingInfo();
            let baseMinY = baseBounds.minimum.y;
            let baseMinZ = baseBounds.minimum.z;
    
            // could use (footMinY - baseMinY) but the bounds aren't transformed. :/
            console.log(`foot: ${footMinZ} base: ${baseMinZ}`)
            cBD.typingAngle = Math.atan2(-footDepth,(footMinZ - baseMinZ));
        }
        else {
            cBD.typingAngle = 0;
        }
        // addScrewModels(cRD, cBD);
        updateRotation(cRD, cBD);
        console.log(`typing angle: ${cBD.typingAngle * 180 / Math.PI}`)
    }
}

function refreshKeyboard() {
    if(!_boardData_js__WEBPACK_IMPORTED_MODULE_6__) return;

    if(!refreshLayout()) {
        return;
    }
    refreshPCBs();

    // refreshOutlines();
    refreshCase();

    for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        _pcbOps_js__WEBPACK_IMPORTED_MODULE_4__[/* routePCB */ "d"](cID);
    }
}

function updateRotation(cRD, cBD) {
    let root = cRD.rootXform;
    let targetRot = cBD.typingAngle || 0;
    if(cRD.viewRotation === "flat") {
        targetRot = 0;
    }

    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["QuinticEase"]();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_7__["EasingFunction"].EASINGMODE_EASEINOUT);
    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", root, "rotation.x", 30, 20,
                        root.rotation.x, targetRot,
                        babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
}

function setFlatRotation(cRD, cBD) {
    cRD.viewRotation = "flat";
    updateRotation(cRD, cBD);
}

function setFlatRotations(cRD) {
    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        setFlatRotation(cRD, _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]().cases[k]);
    }
}

function setNaturalRotation(cRD, cBD) {
    cRD.viewRotation = "natural";
    updateRotation(cRD, cBD);
}

function setNaturalRotations() {
    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        setNaturalRotation(cRD, _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]().cases[k]);
    }
}

function fadeCase() {
    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["QuinticEase"]();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_7__["EasingFunction"].EASINGMODE_EASEINOUT);

    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        let cRDL = cRD.layers;
        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            if (cRDL[layerName]) {
                for(const mesh of cRDL[layerName].meshes) {
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", mesh, "visibility", 30, 20,
                    mesh.visibility, 0.0,
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
                }
            }
        }
    }
}

function unfadeCase() {
    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["QuinticEase"]();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_7__["EasingFunction"].EASINGMODE_EASEINOUT);

    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        let cRDL = cRD.layers;
        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            if (cRDL[layerName]) {
                for(const mesh of cRDL[layerName].meshes) {
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", mesh, "visibility", 30, 20,
                    mesh.visibility, 1.0,
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
                }
            }
        }
    }
}

function expandLayers() {
    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["QuinticEase"]();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_7__["EasingFunction"].EASINGMODE_EASEINOUT);

    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        let cRDL = cRD.layers;
        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            if (cRDL[layerName]) {
                for(const mesh of cRDL[layerName].meshes) {
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", mesh, "position.y", 30, 20,
                    mesh.position.y, (layerDef.offset + layerDef.stackOrder * 15),
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
                }
            }
        }
        setFlatRotation(cRD, _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]().cases[k]);
    }
    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    for(const [id, rd] of Object.entries(kRD)) {
        if (rd.keycap) {
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", rd.keycap, "position.y", 30, 20+Math.random()*10,
            rd.keycap.position.y, 203.5,
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {rd.keycap.setEnabled(false)}); 
        }

        if (rd.switch) {
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", rd.switch, "position.y", 30, 30+Math.random()*10,
            rd.switch.position.y, 200.0,
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {rd.switch.setEnabled(false)}); 
        }
    }
}

function collapseLayers() {
    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_7__["QuinticEase"]();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_7__["EasingFunction"].EASINGMODE_EASEINOUT);

    for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases) ) {
        let cRDL = cRD.layers;
        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["layerDefs"])) {
            if (cRDL[layerName]) {
                for(const mesh of cRDL[layerName].meshes) {
                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("collapse", mesh, "position.y", 30, 20,
                                                    mesh.position.y, layerDef.offset,
                                                    babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
                }
            }
        }
    }

    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    // clear the renderdata (cache this later?)
    for(const [id, rd] of Object.entries(kRD)) {
        if (rd.keycap) {
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", rd.keycap, "position.y", 30, 30+Math.random()*10,
            rd.keycap.position.y, rd.keycap.heightOffset,
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
            rd.keycap.setEnabled(true);
        }
        if (rd.switch) {
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].CreateMergeAndStartAnimation("expand", rd.switch, "position.y", 30, 20+Math.random()*10,
            rd.switch.position.y, 0.0,
            babylonjs__WEBPACK_IMPORTED_MODULE_7__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction); 
            rd.switch.setEnabled(true);
        }
    }
}

function addKey() {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    let kIdx = Object.keys(bd.layout.keys).length;
    while(bd.layout.keys[`key${kIdx}`]) {
        kIdx += 1;
    }
    const k = {
            "color": "#e8e7e3",
            "matName": "#cccccc",
            "labels": [],
            "textColor": [],
            "textSize": [],
            "default": {
              "textColor": "#5c5c5c",
              "textSize": 7
            },
            "x": 0,
            "y": -1,
            "row": 0,
            "width": 1,
            "height": 1,
            "rotation_x": 0,
            "rotation_y": 0,
            "rotation_angle": 0,
            "decal": false,
            "ghost": false,
            "stepped": false,
            "nub": false,
            "id":`key${kIdx}`
    }
    bd.layout.keys[k.id] = k;
}

function removeKeyRD(kId) {
    const rd = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys[kId];
    if(rd) {
        if (rd.keycap) {
            _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.keycap);
        }
        if(rd.switch) {
            _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.switch);
        }
        delete _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys[kId];
    }
}

function removeKey(kId) {
    removeKeyRD(kId);
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    delete bd.layout.keys[kId];
}

function clearOldBoard() {
    for(const [id, rd] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys)) {
        if (rd.keycap) {
            _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.keycap);
        }
        if(rd.switch) {
            _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](rd.switch);
        }
    }
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys = {};

    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        for(const [layerName, layer] of Object.entries(cRD.layers)) {
            if(layer.mesh) {
                _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](layer.mesh);
            }
            if(layer.meshes) {
                for(const m of layer.meshes) {
                    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* removeMesh */ "i"](m);
                }
                layer.meshes.length = 0;
            }
        }
    }
}

let pendingLoadData = null;
function loadKeyboard(data) {
    pendingLoadData = data;

    finalizeLoadKeyboard();
}

function finalizeLoadKeyboard() {
    if(!pendingLoadData) return;
    if(!_bootstrap_js__WEBPACK_IMPORTED_MODULE_8__[/* wasmImport */ "a"]) return;

    const data = pendingLoadData;
    pendingLoadData = null;

    // console.log(data);
    clearOldBoard();

    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;

    _boardData_js__WEBPACK_IMPORTED_MODULE_6__["loadData"](data);

    if(!_boardData_js__WEBPACK_IMPORTED_MODULE_6__["getKeycapDefaults"]()) {
        _boardData_js__WEBPACK_IMPORTED_MODULE_6__["genKeycapDefaults"]();
    }

    for(const k of Object.values(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]().layout.keys)) {
        if(!k.matName) {
            k.matName = k.color;
        }
        if(!mats[k.matName]) {
            _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* createKeyMaterial */ "c"](k.matName,babylonjs__WEBPACK_IMPORTED_MODULE_7__["Color3"].FromHexString(k.matName));
        }
    }

    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases = {};
    for(const [k,c] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]().cases)) {
        const cRD = {layers:{}, rootXform: new babylonjs__WEBPACK_IMPORTED_MODULE_7__["TransformNode"](`case${k}Root`)};
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[k] = cRD;
        setNaturalRotation(cRD, c);
    }
    
    refreshKeyboard();
    
    _gfx_js__WEBPACK_IMPORTED_MODULE_3__[/* snapCamera */ "l"]("angle");
}

function addCase(newId) {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_6__["getData"]();
    if(!bd.cases[newId]) {
        bd.cases[newId]  = Object.assign({}, _tuning_js__WEBPACK_IMPORTED_MODULE_1__[/* tuning */ "a"].defaultCase);
        const cRD = {layers:{}, rootXform: new babylonjs__WEBPACK_IMPORTED_MODULE_7__["TransformNode"](`case${newId}Root`)};
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases[newId] = cRD;
        setNaturalRotation(cRD, bd.cases[newId]);
    }
}

function saveKeyboard() {
    return _boardData_js__WEBPACK_IMPORTED_MODULE_6__["exportData"]();
}

/***/ }),

/***/ "./src/bootstrap.js":
/*!**************************!*\
  !*** ./src/bootstrap.js ***!
  \**************************/
/*! exports provided: wasmImport */
/*! exports used: wasmImport */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wasmImport; });
/* harmony import */ var _boardOps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boardOps.js */ "./src/boardOps.js");
// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.

let wasmImport = null;
__webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! kbgb-wasm */ "../kbgb-wasm/pkg/kbgb_wasm.js")).then( wasm => {
    console.log(wasm);
    wasmImport = wasm;
    wasmImport.init_wasm_env();
    _boardOps_js__WEBPACK_IMPORTED_MODULE_0__[/* finalizeLoadKeyboard */ "f"]();
});

// import("./base.js")
//   .catch(e => console.error("Error importing `base.js`:", e));


/***/ }),

/***/ "./src/coremath.js":
/*!*************************!*\
  !*** ./src/coremath.js ***!
  \*************************/
/*! exports provided: Poly, createRectPoly, Point, Arc, Circle, lineLineIntersection, nearestPointOnLine, segmentToSegment, segmentToPoly, polyIntersectionSlice, isPointInPoly, polyPolyOverlap, getRotFromNormal, getNormalFromRot, convexHull2d, createVoronoi, combineOutlines, fixupOutline, copyWithoutColinear, offsetOutlinePoints, filletOutline, offsetAndFixOutlinePoints, offsetAndFilletOutline, genPointsFromVectorPath, getVectorPathBounds, genArrayFromOutline, genArrayForCircle */
/*! exports used: Circle, Poly, combineOutlines, createRectPoly, createVoronoi, genArrayForCircle, genArrayFromOutline, genPointsFromVectorPath, getNormalFromRot, getRotFromNormal, getVectorPathBounds, isPointInPoly, nearestPointOnLine, offsetAndFilletOutline, offsetAndFixOutlinePoints, offsetOutlinePoints, polyIntersectionSlice, polyPolyOverlap, segmentToSegment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Poly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return createRectPoly; });
/* unused harmony export Point */
/* unused harmony export Arc */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
/* unused harmony export lineLineIntersection */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return nearestPointOnLine; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "s", function() { return segmentToSegment; });
/* unused harmony export segmentToPoly */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "q", function() { return polyIntersectionSlice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return isPointInPoly; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "r", function() { return polyPolyOverlap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return getRotFromNormal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return getNormalFromRot; });
/* unused harmony export convexHull2d */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return createVoronoi; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return combineOutlines; });
/* unused harmony export fixupOutline */
/* unused harmony export copyWithoutColinear */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "p", function() { return offsetOutlinePoints; });
/* unused harmony export filletOutline */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "o", function() { return offsetAndFixOutlinePoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "n", function() { return offsetAndFilletOutline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return genPointsFromVectorPath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return getVectorPathBounds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return genArrayFromOutline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return genArrayForCircle; });
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gfx_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gfx.js */ "./src/gfx.js");



let polyID = 0;

function Poly(points) {
    this.points = points;
    this.id = polyID++;
    this.overlappingPolys = {};
    this.type = "rect";
}

function createRectPoly(w, h, xform) {
   return (new Poly([
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-w, 0, -h), xform),
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](w, 0, -h), xform),
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](w, 0, h), xform),
        babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-w, 0, h), xform)
    ]));
}


function Point(point) {
    this.type = 0;
    this.point = point;
}


function Arc(center, radius, rotRadians, endRot) {
    this.type = 1;
    this.center = center;
    this.radius = radius;
    this.rotRadians = rotRadians;
    this.endRot = endRot;
}

function Circle(center, radius) {
    this.type = 2;
    this.center = center;
    this.radius = radius;
}

function lineLineIntersection(p0, d0, p1, d1) {
    let det = d0.x * d1.z - d1.x * d0.z;
    if (Math.abs(det) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) // no collision
    {
        return null;
    }

    let prevC = p0.x * d0.x + p0.z * d0.z;
    let nextC = p1.x * d1.x + p1.z * d1.z;
    let intersection = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"]((d1.z * prevC - d0.z * nextC) / det, 0,
        (d0.x * nextC - d1.x * prevC) / det);

    return intersection;
}

function nearestPointOnLine(x0, xLNormalized, y0) {
    let dir = y0.subtract(x0);
    let dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(dir,xLNormalized);
    
    return x0.add(xLNormalized.scale(dot));
}

function pointToLineDistSq(x0, xL, y0) {
    let nearestPoint = nearestPointOnLine(x0, xL.normalizeToNew(), y0);
    // return y0.subtract(nearestPoint).lengthSquared();
    //ugh
    y0.subtractToRef(nearestPoint,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[0]);
    return babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[0].lengthSquared();
}

function segmentToArcIntersection(x0, x1, xL, xNorm, a) {
    let nearestPoint = nearestPointOnLine(x0, xL, a.center);
    let dist = a.center.subtract(nearestPoint).length();
    let numIntersections = 0;
    if( Math.abs(dist-a.radius) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] ) {
        return [nearestPoint];
    }
    else if( dist > a.radius ) {
        return [];
    }

    return {numIntersections:numIntersections};
}

function segmentToSegment(x0, x1, xL, xNorm, y0, y1) {
    //let xL = x1.subtract(x0);
    const yL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[9];
    y1.subtractToRef(y0,yL)
    //let xNorm = (new Vector3(xL.z, 0, -xL.x)).normalize();
    let yNorm = (new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](yL.z, 0, -yL.x)).normalize();

    let result = {intersection: lineLineIntersection(x0,xNorm,y0,yNorm),
                  type:"unknown"};
    if(result.intersection) {
        const tmpV = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[0];
        result.intersection.subtractToRef(y0, tmpV)
        let y0Dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(tmpV,yL);
        result.intersection.subtractToRef(y1, tmpV)
        let y1Dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(tmpV,yL);
        result.intersection.subtractToRef(x0, tmpV)
        let x0Dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(tmpV,xL);
        result.intersection.subtractToRef(x1, tmpV)
        let x1Dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(tmpV,xL);
        // miss the END of the 2nd line
        if(x0Dot > -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]  && x1Dot < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] &&
           y0Dot > -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]  && y1Dot < -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) {
            result.type = "in_segment";
        } else {
            result.type = "off_segment";
        }
    } else {
        if(pointToLineDistSq(x0,xL,y0) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) {
            result.type = "colinear"
            // check overlap?
            y0.subtractToRef(x0,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[0]);
            y1.subtractToRef(x0,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[1])
            x0.subtractToRef(y0,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[2])
            x1.subtractToRef(y0,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[3])
            y0.subtractToRef(x1,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[4])
            y1.subtractToRef(x1,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[5])
            x0.subtractToRef(y1,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[6])
            x1.subtractToRef(y1,babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[7])
            let y0In = (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[0],xL) > -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[4],xL) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
            let y1In = (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[1],xL) > -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[5],xL) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
            let x0In = (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[2],yL) > -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[6],yL) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
            let x1In = (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[3],yL) > -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[7],yL) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
            if(y0In || x0In || y1In || x1In) {
                result.isOverlapping = true;
                result.x0In = x0In;
                result.y0In = y0In;
                result.x1In = x1In;
                result.y1In = y1In;
            }
        } else {
            result.type = "parallel"
        }
    }
    return result;
}


function segmentToPoly(s0, s1, poly) {
    let closest = 1000000000.0;
    let closestIntersection = null;
    let numIntersections = 0;

    const tL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[7];
    s1.subtractToRef(s0, tL);
    const tNorm = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[8];
    tNorm.x = tL.z;
    tNorm.y = 0;
    tNorm.z = -tL.x;
    tNorm.normalize();

    const intL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[3];

    for(let j = 0; j < poly.length; j++) {
        let segRes = segmentToSegment(s0, s1, tL, tNorm, poly[j], poly[(j+1)%poly.length]);
        if(segRes.type == "in_segment" && segRes.intersection) {
            segRes.intersection.subtractToRef(s0,intL);
            const dist = intL.lengthSquared();
            if( dist > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) {
                numIntersections += 1;
                if( dist < closest ) {
                    closest = dist;
                    closestIntersection = segRes.intersection;
                }
            }
        }
    }

    return {numIntersections:numIntersections,nearestIntersection:closestIntersection,nearestDistSq:closest};
}

// this can be improved
function polyIntersectionSlice(s0, s1, poly) {
    let intersections = [];

    const tL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[7];
    s1.subtractToRef(s0, tL);
    const tNorm = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[8];
    tNorm.x = tL.z;
    tNorm.y = 0;
    tNorm.z = -tL.x;
    tNorm.normalize();

    const intL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[3];

    for(let j = 0; j < poly.length; j++) {
        let segRes = segmentToSegment(s0, s1, tL, tNorm, poly[j], poly[(j+1)%poly.length]);
        if(segRes.type == "in_segment" && segRes.intersection) {
            intersections.push(segRes.intersection);
        }
        else if(segRes.type == "colinear") {
            // HACK TODO this needs to be improved for general usage
            intersections.push(poly[j]);
        }
    }

    return intersections;
}

// only works on convex polygons
function isPointInPoly(p, poly) {
    const nextDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[6];
    const nextNorm = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[7];
    const pV = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[8];
    nextNorm.y = 0;
    for(let i = 0; i < poly.length; i++) {
        let point = poly[i];
        let next = poly[(i + 1) % poly.length];
        next.subtractToRef(point,nextDir)
        nextDir.normalize();
        nextNorm.x = nextDir.z
        nextNorm.z = -nextDir.x;
        p.subtractToRef(point,pV);
        pV.normalize();
        let d = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(pV,nextNorm)
        if( d > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) {
            return false;
        }
    }
    return true;
}

// only works on convex polygons
function polyPolyOverlap(poly1, poly2) {
    // see if any of the lines bisect the other poly
    let checkIntersection = (polyA, polyB) => {
        const hole = polyA.points;
        const norm = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[8];
        for(let iP = 0; iP < hole.length; iP++) {
            const h0 = hole[iP];
            const h1 = hole[(iP+1)%hole.length];
            norm.x = h1.z-h0.z;
            norm.z = h0.x-h1.x;
            let allLess = true;
            let allMore = true;
            const holeO = polyB.points;
            const oL = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[1];

            for(let oP = 0; oP < holeO.length; oP++) {
                holeO[oP].subtractToRef(hole[iP], oL);
                let dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(norm,oL);
                allMore &= dot > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"];
                allLess &= dot < -babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"];
            }

            if( allMore ) {
                return false;
            }
        }
        return true;
    }

    let confirmedIntersection = checkIntersection(poly1,poly2);
    if(confirmedIntersection) {
        confirmedIntersection = checkIntersection(poly2,poly1);
    }
    return confirmedIntersection;
}

function getRotFromNormal(norm) {
    let t = Math.acos(norm.x);
    if (norm.z < 0) t = 2 * Math.PI - t;
    return t;
}

function getNormalFromRot(rot) {
    return new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](Math.cos(rot), 0, Math.sin(rot));
}

var EPSILON     = 1.1102230246251565e-16
var ERRBOUND3   = (3.0 + 16.0 * EPSILON) * EPSILON
function orient(a, b, c) {
    var l = (a.z - c.z) * (b.x - c.x)
    var r = (a.x - c.x) * (b.z - c.z)
    var det = l - r
    var s
    if(l > 0) {
      if(r <= 0) {
        return det
      } else {
        s = l + r
      }
    } else if(l < 0) {
      if(r >= 0) {
        return det
      } else {
        s = -(l + r)
      }
    } else {
      return det
    }
    var tol = ERRBOUND3 * s
    if(det >= tol || det <= -tol) {
      return det
    }
    return 0
  }

// convex hull of points on the x/z plane
function convexHull2d(points) {
    var n = points.length

    if (n < 3) {
        var result = new Array(n)
        for (var i = 0; i < n; ++i) {
            result[i] = i
        }

        if (n === 2 &&
            points[0].x === points[1].x &&
            points[0].z === points[1].z) {
            return [0]
        }

        return result
    }

    //Sort point indices along x-axis
    var sorted = new Array(n)
    for (var i = 0; i < n; ++i) {
        sorted[i] = i
    }
    sorted.sort(function (a, b) {
        var d = points[a].x - points[b].x
        if (d) {
            return d
        }
        return points[a].z - points[b].z
    })

    //Construct upper and lower hulls
    var lower = [sorted[0], sorted[1]]
    var upper = [sorted[0], sorted[1]]

    for (var i = 2; i < n; ++i) {
        var idx = sorted[i]
        var p = points[idx]

        //Insert into lower list
        var m = lower.length
        while (m > 1 && orient(
                                points[lower[m - 2]],
                                points[lower[m - 1]],
                                p) <= 0) {
            m -= 1
            lower.pop()
        }
        lower.push(idx)

        //Insert into upper list
        m = upper.length
        while (m > 1 && orient(
            points[upper[m - 2]],
            points[upper[m - 1]],
            p) >= 0) {
            m -= 1
            upper.pop()
        }
        upper.push(idx)
    }

    //Merge lists together
    var result = new Array(upper.length + lower.length - 2)
    var ptr = 0
    for (var i = 0, nl = lower.length; i < nl; ++i) {
        result[ptr++] = lower[i]
    }
    for (var j = upper.length - 2; j > 0; --j) {
        result[ptr++] = upper[j]
    }

    let pList = [];
    for( const i of result ) {
        if(pList.length < 1 || points[i].subtract(pList[0]).lengthSquared() > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] ) {
            pList.unshift(points[i])
        } else {
            console.log(`skipping point ${points[i]} too close to ${pList[0]}`)
        }
    }

    return pList
}


function createVoronoi(points) {
    var vSites = [];
    var bbox = {xl:1000000, xr:-1000000, zt:1000000, zb:-1000000};

    let addSite = function(site) {
        vSites.push(site);
        bbox.xl = Math.min(site.x,bbox.xl);
        bbox.xr = Math.max(site.x,bbox.xr);
        bbox.zt = Math.min(site.z,bbox.zt);
        bbox.zb = Math.max(site.z,bbox.zb);
    }

    for( const p of points ) {
        addSite(p);
    }

    const bbump = 10000;
    bbox.xl -= bbump;
    bbox.zt -= bbump;
    bbox.xr += bbump;
    bbox.zb += bbump;

    var voronoi = new Voronoi();
    const vRes = voronoi.compute(vSites, bbox);

    // console.log(`voronoi!`);
    // console.log(vRes);

    return vRes;
}

// combine two outlines.  'subtract' assumes one is being cut from the other, the other assumes they are being added
// they must intersect (todo: fix that assumption)
function combineOutlines(primary, primaryFillets, secondary, secondaryFillets, intersectionFillet, subtraction) {
    let output = [];
    let outputFillets = [];
    let walkingShape = primary;
    let walkingFillets = primaryFillets;
    let targetShape = secondary;
    let targetFillets = secondaryFillets;
    output.push(walkingShape[0]);
    outputFillets.push(primaryFillets[0])
    let curr = walkingShape[0];
    let currFillet = walkingFillets[0];
    let targ = walkingShape[1];
    let targFillet = walkingFillets[1];
    let nextWalkingIdx = 2;
    let hitSomething = false;
    do {
        let tL = targ.subtract(curr);
        const tNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](tL.z,0,-tL.x).normalize();
        let closestEntry = 1000000000.0;
        let entry = null;
        let entryNextIdx = 0;
        let closestExit = 1000000000.0;
        let exit = null;

        const maxLen = (tL.lengthSquared() - babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
        for(let j = 0; j < targetShape.length; j++) {
            const jNext = (j+1)%targetShape.length;
            const sLine = [targetShape[j], targetShape[jNext]];
            const sL = sLine[1].subtract(sLine[0]);
            const sNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](sL.z,0,-sL.x).normalize();
            
            let segRes = segmentToSegment(curr, targ, tL, tNorm, sLine[0], sLine[1]);
            if(segRes.type === "in_segment" && segRes.intersection) {
                let dist = segRes.intersection.subtract(curr).lengthSquared();
                if( dist > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && dist < maxLen) {
                    let isEntry = (babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(sNorm, tL) < 0) ^ subtraction;
                    if(isEntry) {
                        if( dist < closestEntry ) {
                            closestEntry = dist;
                            entry = segRes.intersection;
                            entryNextIdx = (j+1)%targetShape.length;
                        }
                    } else {
                        if( dist < closestExit ) {
                            closestExit = dist;
                            exit = segRes.intersection;
                        }
                    }
                }
            }
            else if(segRes.type === "colinear" && segRes.isOverlapping) {
                let hitPoint = sLine[1];
                let hitIdx = (jNext+1)%targetShape.length;
                if(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(sL, tL)) {  // same dir
                    if(!segRes.y1In) {
                        hitPoint = targ;
                        hitIdx = jNext;
                        // console.log(`${currIdx} to ${targIdx} ending at eol jump ${hitPoint} ${jNext}`)
                    }
                }

                // console.log(`hitting the colinear`)
                const currToHit = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[6];
                hitPoint.subtractToRef(curr,currToHit);
                let dist = currToHit.lengthSquared();
                if( dist > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && dist <= (closestEntry-babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) ) {
                    // console.log(`setting closest entry to d ${closestEntry} at ${hitPoint} ${hitIdx}`)
                    closestEntry = dist;
                    entry = hitPoint;
                    entryNextIdx = hitIdx;
                }
                else {
                    // console.log(`dist failed check: ${dist} (from ${hitPoint} to ${curr})`);
                }
            }
        }
        if( entry || exit ) {
            if(closestExit < closestEntry) {
                // console.log("started inside");
                // we're in it.  uhhhh.
                // target remains the same and push the entry point on the stack
                output.pop();
                outputFillets.pop();
                curr = exit;
                currFillet = intersectionFillet;
            } else {
                // console.log(`swapping at ${entry}`);
                curr = entry;
                currFillet = intersectionFillet;
                let tmp = targetShape;
                targetShape = walkingShape;
                walkingShape = tmp;
                tmp = targetFillets;
                targetFillets = walkingFillets;
                walkingFillets = tmp;
                nextWalkingIdx = entryNextIdx;
                targ = walkingShape[nextWalkingIdx];
                targFillet = walkingFillets[nextWalkingIdx];
                nextWalkingIdx = (nextWalkingIdx+1)%walkingShape.length;
            }
            if(!hitSomething) {
                output = [];
                outputFillets = [];
                hitSomething = true;
            }
        }
        else {
            // console.log(`walking to ${targ}`);
            curr = targ;
            currFillet = targFillet;
            targ = walkingShape[nextWalkingIdx];
            targFillet = walkingFillets[nextWalkingIdx];
            nextWalkingIdx = (nextWalkingIdx+1)%walkingShape.length;
        }
        output.push(curr);
        outputFillets.push(currFillet);
        // console.log(`len ${curr.subtract(output[0]).lengthSquared()}`)
        if(output.length > 10000) {
            console.log("boolean output overflow");
            output = [];
            outputFillets = [];
            break;
        }
    }  while(output.length <= 1 || curr.subtract(output[0]).lengthSquared() > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
    output.pop();
    outputFillets.pop();
    return {outline:output,fillets:outputFillets};
}

// fixup the outline to remove overlaps/etc
function fixupOutline(outline, originalOutline, fillets, intersectionFillet) {
    let output = [];
    let outputFillets = fillets?[]:null;

    let curr = null;
    let currIdx = 0;
    for(let i = 0; i < outline.length; i++) {
        const p = outline[i];
        // find a point guaranteed to be on the convex hull (so we can guess winding order below)
        if(!curr || p.x < curr.x || (Math.abs(p.x-curr.x) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && p.z <= curr.z)) {
            curr = p;
            currIdx = i;
        }
    }
    // console.log(`starting at ${currIdx}`)
    let targIdx = (currIdx+1)%outline.length;
    let targ = outline[targIdx];
    
    output.push(curr);

    let targFillet = null;
    let currFillet = null;
    if(fillets) {
        targFillet = fillets[targIdx];
        currFillet = fillets[currIdx];
        outputFillets.push(currFillet)
    }
    let red = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](1,0,0,1);
    let blue = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0,0,1,1);
    let green = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0,1,0,1);
    let yellow = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](1,1,0,1);
    if(false) {}

    do {
        if(currIdx >= 0) {
            for(let k = currIdx+1; k < outline.length; k++) {
                if(k !== currIdx) {
                    let dist = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].DistanceSquared(curr,outline[k])
                    if(dist < 1.0) {
                        outline.splice(currIdx,k-currIdx);
                        currIdx = currIdx % outline.length;
                        curr = outline[currIdx].add(curr).scale(0.5);
                        targIdx = (currIdx+1)%outline.length;
                        targ = outline[targIdx];
                        console.log(`jump to ${currIdx} ${targIdx} via nearest`)
                        break;
                    }
                }
            }
        }

        let tL = targ.subtract(curr);
        const tNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](tL.z,0,-tL.x).normalize();
        let closestEntry = 1000000000.0;
        let entry = null;
        let entryNextIdx = 0;

        const maxLen = (tL.lengthSquared() - babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
        for(let j = 0; j < outline.length; j++) {

            const jNext = (j+1)%outline.length;
            if(j===currIdx || j === targIdx || jNext === currIdx || jNext === targIdx) continue;
            const sLine = [outline[j], outline[jNext]];
            const sL = sLine[1].subtract(sLine[0]);
            const sNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](sL.z,0,-sL.x).normalize();
            const s0 = sLine[0];
            const s1 = sLine[1];
            
            let segRes = segmentToSegment(curr, targ, tL, tNorm, s0, s1);
            if(segRes.type === "in_segment" && segRes.intersection) {
                let dist = segRes.intersection.subtract(curr).lengthSquared();
                if( dist > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && dist < maxLen && dist < closestEntry && 
                    segRes.intersection.subtract(s1).lengthSquared() > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] * babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) {
                    closestEntry = dist;
                    entry = segRes.intersection;
                    entryNextIdx = jNext;
                    // if() {
                    //     console.log(`jump idx up`)
                    //     entryNextIdx = (jNext+1)%outline.length;
                    // }
                    // console.log(`hit seg ${entry} ${entryNextIdx} (line ${outline[j]}, dist ${dist} vs ${maxLen})`)
                }
            }
            else if(segRes.type === "colinear" && segRes.isOverlapping) {
                let hitPoint = s1;
                let hitIdx = (jNext+1)%outline.length;
                if(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(sL, tL)) {  // same dir
                    if(!segRes.y1In) {
                        hitPoint = targ;
                        hitIdx = jNext;
                        // console.log(`${currIdx} to ${targIdx} ending at eol jump ${hitPoint} ${jNext}`)
                    }
                }

                // console.log(`hitting the colinear`)
                const currToHit = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[6];
                hitPoint.subtractToRef(curr,currToHit);
                let dist = currToHit.lengthSquared();
                if( dist > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && dist <= (closestEntry-babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]) ) {
                    // console.log(`setting closest entry to d ${closestEntry} at ${hitPoint} ${hitIdx}`)
                    closestEntry = dist;
                    entry = hitPoint;
                    entryNextIdx = hitIdx;
                }
                else {
                    // console.log(`dist failed check: ${dist} (from ${hitPoint} to ${curr})`);
                }
            }
        }
        if( entry ) {
            // console.log(`trimming at ${curr} (${currIdx}) to ${targ} (${targIdx}) at ${entry} ${entryNextIdx}`);
            curr = entry;
            currFillet = intersectionFillet;
            currIdx = -1;
            targIdx = entryNextIdx;
        }
        else {
            // console.log(`walking to ${targ}`);
            curr = targ;
            if(fillets) {
                currFillet = targFillet;
            }
            currIdx = targIdx;
            targIdx = (targIdx+1)%outline.length;
        }

        targ = outline[targIdx];
        if(!targ) {
            console.log(`nulltarg!`)
        }
        
        output.push(curr);
        if(fillets) {
            targFillet = fillets[targIdx];
            outputFillets.push(currFillet);
        }

        // console.log(`len ${curr.subtract(output[0]).lengthSquared()}`)
        if(output.length > 1000) {
            console.log("boolean output overflow");
            _gfx_js__WEBPACK_IMPORTED_MODULE_1__[/* drawDbgOutline */ "e"]("outline_output",output,red,red,false);
            output = [];
            outputFillets = [];
            break;
        }
    }  while(curr.subtract(output[0]).lengthSquared() > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]*babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"]);
    output.pop();

    // console.log(`pre angle-check output length: ${output.length}`)

    if(false) {}
    if(output.length > 4) {
        const nextDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[2];
        const prevDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[3];
        for (let i = output.length-1; i >= 0; i--) {
            let point = output[i];
            let iNext = (i + 1) % output.length
            output[iNext].subtractToRef(point, nextDir);
            nextDir.normalize();
            let iPrev = (i - 1 + output.length) % output.length
            point.subtractToRef(output[iPrev],prevDir);
            prevDir.normalize();

            if(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(nextDir,prevDir) < -0.8) {
                console.log(`parsing at ${i}, points ${output[iPrev]} ${point} ${output[iNext]} vecs are ${nextDir}, ${prevDir}`)
                output.splice(i,1);
                i++;
            }
        }
    }

    // console.log(`output length: ${output.length}`)
    if(false) {}
    if(fillets) {
        outputFillets.pop();
    }
    return {outline:output, fillets:outputFillets};
    // return {outline:outline, originalOutline:originalOutline, fillets:fillets};
}


function copyWithoutColinear(outline,offset,fillets) {
    // let outline = [...oldOutline];
    let offsetPoints = {};
    let ogLength = outline.length;
    const minLineLength = 0.25;
    // console.log(`start with ${outline.length} points`)
    let red = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](1,0,0,1);
    let blue = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0,0,1,1);
    let green = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0,1,0,1);
    let yellow = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](1,1,0,1);
    //todo turn fillets into array if it's just a value
    const next = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[0];
    const prev = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[1];
    for (let i = outline.length-1; i >= 0; i--) {
        let point = outline[i];
        const nextPoint = outline[(i + 1) % outline.length];
        nextPoint.subtractToRef(point, next);
        const prevPoint = outline[(i - 1 + outline.length) % outline.length];
        point.subtractToRef(prevPoint,prev);
        let nextLen = next.length();
        let prevLen = prev.length();
        let nextDir = next.normalizeFromLength(nextLen);
        let prevDir = prev.normalizeFromLength(prevLen);

        let dot = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(prevDir,nextDir);
        if (dot > 0.9999 || dot < -0.9)
        {
            // console.log(`Skipping colinearish point ${dot} ${i}`);
            outline.splice(i,1);
            if(fillets) {
                fillets.splice(i,1);
            }
        } else if(nextLen < minLineLength || prevLen < minLineLength ) {
            // console.log(`Skipping colocatedish points  ${i}`);
            outline.splice(i,1);
            if(fillets) {
                fillets.splice(i,1);
            }
        }
        else if(offset) {
            let nextNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](nextDir.z, 0, -nextDir.x);
            let prevNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](prevDir.z, 0, -prevDir.x);
            let inPoint = prevPoint.add(prevNorm.scale(offset));
            let outPoint = nextPoint.add(nextNorm.scale(offset));
            let intersection = lineLineIntersection(inPoint, prevNorm,
                outPoint, nextNorm);
            if (intersection !== null) {
                offsetPoints[i] = intersection;
            }
            else {
                console.log(`no intersection (why?)`);
                outline.splice(i,1);
                if(fillets) {
                    fillets.splice(i,1);
                }
            }
        }
    }
    // console.log(`finish with ${outline.length} points`)
    // if(offset && outline.length > 4) {
    //     console.log(`offsetPoints len: ${offsetPoints.length} outline: ${outline.length}`)
    //     for (let i = outline.length-1; i >= 0; i--) {
    //         let point = outline[i];
    //         let iNext = (i + 1) % offsetPoints.length
    //         let iNextNext = (i + 2) % offsetPoints.length
    //         let nextDir = offsetPoints[iNext].subtract(offsetPoints[iNextNext]);
    //         let nextNorm = new Vector3(nextDir.z, 0, -nextDir.x);
    //         let iPrev = (i - 1 + offsetPoints.length) % offsetPoints.length
    //         let iPrevPrev = (i - 2 + offsetPoints.length) % offsetPoints.length
    //         // let prevDir = offsetPoints[iPrevPrev].subtract(offsetPoints[iPrev]);

    //         let segseg = segmentToSegment(offsetPoints[iNextNext],offsetPoints[iNext],nextDir,nextNorm,
    //                                       offsetPoints[iPrevPrev],offsetPoints[iPrev])
    //         if(segseg.type === "in_segment" || (segseg.type === "colinear" && segseg.isOverlapping)) {
    //             console.log("skipping offset xover");
    //             outline.splice(i,1);
    //             if(fillets) {
    //                 fillets.splice(i,1);
    //             }
    //             // skip out of the affected zone and come back later
    //             break;
    //             i -= 3;
    //         }
    //     }
    // }

    let outputOffset = [];
    for(let i = 0; i < ogLength; i++) {
        if(offsetPoints[i]) {
            outputOffset.push(offsetPoints[i]);
        }
    }
    let realOutput = [...outputOffset];

    // if(outputOffset.length > 0) {
    //     gfx.drawDbgOutline("wtfff",outputOffset,red,red,true);
    // }

    if(offset && outline.length > 4) {
        const nextDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[2];
        const prevDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[3];
        const pointToInt = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[6];
        const adjNextDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[4];
        const adjPrevDir = babylonjs__WEBPACK_IMPORTED_MODULE_0__["TmpVectors"].Vector3[5];
        for (let i = outline.length-1; i >= 0; i--) {
            let point = outline[i];
            let iNext = (i + 1) % outline.length
            outline[iNext].subtractToRef(point, nextDir);
            nextDir.normalize();
            let iPrev = (i - 1 + outline.length) % outline.length
            point.subtractToRef(outline[iPrev],prevDir);
            prevDir.normalize();

            let offsetPoint = outputOffset[i];
            outputOffset[iNext].subtractToRef(offsetPoint,adjNextDir);
            adjNextDir.normalize();
            offsetPoint.subtractToRef(outputOffset[iPrev],adjPrevDir);
            adjPrevDir.normalize();

            offsetPoint.subtractToRef(point,pointToInt);
            
    //         // if(Math.abs(Vector3.Dot(prevDir,nextDir) - Vector3.Dot(adjPrevDir,adjNextDir)) > 1.1) {
    //         // }
            // if(Vector3.Dot(prevDir,adjPrevDir) < Epsilon) {
            //     console.log(`skipping offset xover ${i} ${Vector3.Dot(prevDir,nextDir)} ${Vector3.Dot(adjPrevDir,adjNextDir)}`);
            //     let other = point;
            //     let offsetOther = offsetPoint;
            //     let spliceNext = false;
            //     let iMin = null;
            //     let iMax = iPrev;
            //     if(Vector3.Dot(nextDir,adjNextDir) < Epsilon) {
            //         other = outline[iNext];
            //         offsetOther = outputOffset[iNext];
            //         spliceNext = true;
            //         iMax = Math.max(iPrev,iNext);
            //         iMin = Math.min(iPrev,iNext);
            //     }
            //     outline[i] = other.add(outline[iPrev]).scaleInPlace(0.5);
            //     outputOffset[i] = offsetOther.add(outputOffset[iPrev]).scaleInPlace(0.5);

            //     outline.splice(iMax,1);
            //     outputOffset.splice(iMax,1);
            //     if(fillets) {
            //         // fillets.splice(Math.max(i,iPrev),1);
            //         fillets.splice(iMax,1);
            //     }
                
            //     if(iMin !== null) {
            //         outline.splice(iMin,1);
            //         outputOffset.splice(iMin,1);
            //         if(fillets) {
            //             // fillets.splice(Math.max(i,iPrev),1);
            //             fillets.splice(iMin,1);
            //         }
            //     }
            //     break;
            // }
    //         // if(Math.sign(Vector3.Cross(pointToInt,nextDir).y) != Math.sign(Vector3.Cross(pointToInt,adjNextDir).y) ||
    //         //     Math.sign(Vector3.Cross(pointToInt,prevDir).y) != Math.sign(Vector3.Cross(pointToInt,adjPrevDir).y)) {
            // if(Math.sign(Vector3.Cross(prevDir,nextDir).y) != Math.sign(Vector3.Cross(adjPrevDir,adjNextDir).y)) {
            if(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(adjNextDir,adjPrevDir) < -0.95 || pointToInt.lengthSquared() < 0.5) {
                realOutput.splice(i,1);
                // outline.splice(i,1);
                // outputOffset.splice(i,1);
                // if(fillets) {
                //     fillets.splice(i,1);
                // }
                // break;
            }
        }
    }
    // if(outputOffset.length > 0) {
    //     gfx.drawDbgOutline("outputOffset2",outputOffset,yellow,yellow,true);
    // }
    // if(outline.length > 0) {
    //     gfx.drawDbgOutline(`outline${iteration}`,outline,blue,blue,true);
    // }


    return {fixedOutline:outline,offsetOutline:realOutput};
}

// offset is + to the left, - to right
function offsetOutlinePoints(outline, offset, skippedPoints) {
    let newOutline = [];
    skippedPoints = skippedPoints || [];
    for (let i = 0; i < outline.length; i++) {
        let point = outline[i];
        let next = outline[(i + 1) % outline.length];
        let prev = outline[(i - 1 + outline.length) % outline.length];
        let nextDir = next.subtract(point).normalize();
        let prevDir = point.subtract(prev).normalize();
        let nextNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](nextDir.z, 0, -nextDir.x);
        let prevNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](prevDir.z, 0, -prevDir.x);
        let inPoint = point.add(prevNorm.scale(offset));
        let outPoint = point.add(nextNorm.scale(offset));

        let intersection = lineLineIntersection(inPoint, prevNorm,
            outPoint, nextNorm);
        if (intersection === null) {
            // console.log("Backup skipping colinear point");
            skippedPoints.push(i);
            continue;
        }
        // let pointToInt = intersection.subtract(point);
        // let adjNextDir = next.add(nextNorm.scale(offset)).subtract(point).normalize();

        // if(Math.sign(Vector3.Cross(pointToInt,nextDir).y) != Math.sign(Vector3.Cross(pointToInt,adjNextDir).y)) {
        //     console.log("skipping offset xover");
        //     skippedPoints.push(i);
        //     continue;
        // }

        newOutline.push(intersection);
    }
    return newOutline;
}

function getFilletPoints(fillet, prev, point, next, offsetPrevLine, offsetNextLine) {
    let offset0 = offsetPrevLine || 0;
    let offset1 = offsetNextLine || 0;
    const nextVec = next.subtract(point);
    const nextLen = nextVec.length();
    const nextDir = nextVec.normalizeFromLength(nextLen);
    const prevVec = point.subtract(prev);
    const prevLen = prevVec.length();
    const prevDir = prevVec.normalizeFromLength(prevLen);
    const nextNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](nextDir.z, 0, -nextDir.x);
    const prevNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](prevDir.z, 0, -prevDir.x);

    const nDotP = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(nextDir,prevDir);

    if ( Math.abs(nDotP) < 0.99) {
        let flip = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(prevNorm,nextDir) > 0;
        if( flip ) {
            fillet = -fillet;
            offset0 = -offset0;
            offset1 = -offset1;
        }
        let filletCenter = lineLineIntersection(point.add(prevNorm.scale(offset0-fillet)), prevNorm,
                                                point.add(nextNorm.scale(offset1-fillet)), nextNorm);

        if(filletCenter) {
            return {center: filletCenter,
                    entry: filletCenter.add(prevNorm.scale(fillet)),
                    exit: filletCenter.add(nextNorm.scale(fillet))}
                    // entry: prev.add(prevDir.scale(Vector3.Dot(filletCenter.subtract(prev),prevDir))),
                    // exit: point.add(nextDir.scale(Vector3.Dot(filletCenter.subtract(point),nextDir)))}
        }
    }
    return null;
}

function getFilletArc(entryNorm,exitNorm,flip) {
    let startRot = getRotFromNormal(entryNorm)+ Math.PI * 2;
    let endRot = getRotFromNormal(exitNorm)+ Math.PI * 2;
    if(flip) {
        startRot += Math.PI;
        endRot += Math.PI;
        while (startRot < endRot) {
            startRot += Math.PI * 2;
        }
    }
    else {
        while (endRot < startRot) {
            endRot += Math.PI * 2;
        }
    }
    let totRot = endRot - startRot;
    return {total:totRot, end:endRot};
}

function filletOutline(outline, fillets, close) {
    let vectorOutline = [];
    let filletInfos = [].fill(null,0,outline.length);
    let filletCenters = [].fill(null,0,outline.length);
    let entryPoints = [].fill(null,0,outline.length);
    let exitPoints = [].fill(null,0,outline.length);
    // turn fillets into array if it's just a value
    if(fillets && !Array.isArray(fillets)) {
        fillets = (new Array(outline.length)).fill(fillets)
    }

    for (let i = 0; i < outline.length; i++) {
        const point = outline[i];
        if (!fillets) {
            continue;
        }
        let fillet = fillets[i];
        const next = outline[(i + 1) % outline.length];
        const prev = outline[(i - 1 + outline.length) % outline.length];

        filletInfos[i] = getFilletPoints(fillet,prev,point,next);
    }

    let lastValidEntryIndex = null;
    let danglingExitIndex = null;
    for (let i = 0; i < outline.length; i++) {
        const point = outline[i];
        if(!filletInfos[i]) {
            vectorOutline.push(new Point(point));
            continue;
        }
        
        const filletInfo = filletInfos[i];
        const filletCenter = filletInfo.center;
        const entryPoint = filletInfo.entry;
        const exitPoint = filletInfo.exit;
        const prevIdx = (i - 1 + outline.length) % outline.length;
        const prev = outline[prevIdx];
        const prevExit = filletInfos[prevIdx]?filletInfos[prevIdx].exit:prev;
        const nextIdx = (i + 1) % outline.length;
        const next = outline[nextIdx];
        const nextEntry = filletInfos[nextIdx]?filletInfos[nextIdx].entry:next;
        const prevVec = point.subtract(prev);
        const prevLen = prevVec.length();
        const prevDir = prevVec.normalizeFromLength(prevLen);
        const nextVec = next.subtract(point);
        const nextLen = nextVec.length();
        const nextDir = nextVec.normalizeFromLength(nextLen);

        // console.log(`first check ${Vector3.Dot(prevExit.subtract(prev),prevDir)} <= ${Vector3.Dot(entryPoint.subtract(prev),prevDir)}`)
        if(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(prevExit.subtract(prev),prevDir) <= babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(entryPoint.subtract(prev),prevDir)) {
            if(lastValidEntryIndex !== null) {
                console.log(`CRAP OVERWRITING INDEX ${lastValidEntryIndex} with ${i}`);
            }
            lastValidEntryIndex = i;
        }

        // console.log(`second check ${Vector3.Dot(nextEntry.subtract(point),nextDir)} >= ${Vector3.Dot(exitPoint.subtract(point),nextDir)}`)
        if(babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(nextEntry.subtract(point),nextDir) < babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(exitPoint.subtract(point),nextDir)) {
            if(i == outline.length-1 && danglingExitIndex !== null) {
                console.log(`oh boy we're at the end and have a dangling index!`);
            }
            continue;
        }

        if(lastValidEntryIndex===i) {
            let fillet = fillets[i];
            const nextNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](nextDir.z, 0, -nextDir.x);
            const prevNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](prevDir.z, 0, -prevDir.x);
    
            let flip = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(prevNorm,nextDir) > 0;

            const arcRots = getFilletArc(prevNorm,nextNorm,flip);
            vectorOutline.push(new Point(entryPoint));
            vectorOutline.push(new Arc(filletCenter, fillet, arcRots.total, arcRots.end))
            lastValidEntryIndex = null;
        }
        else if(lastValidEntryIndex!==null) {
            const pPIdx = (lastValidEntryIndex - 1 + outline.length) % outline.length;
            const pP = outline[pPIdx];
            const p0 = outline[lastValidEntryIndex];
            const p1 = outline[i];
            const pN = outline[nextIdx];

            let fillet0 = fillets[lastValidEntryIndex];
            let fillet1 = fillets[i];
            const prevVec = p0.subtract(pP);
            const prevLen = prevVec.length();
            const prevDir = prevVec.normalizeFromLength(prevLen);
            const prevNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](prevDir.z, 0, -prevDir.x);
            const midVec = p1.subtract(p0);
            const midLen = midVec.length();
            const midDir = midVec.normalizeFromLength(midLen);
            const midNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](midDir.z, 0, -midDir.x);
            const nextVec = pN.subtract(p1);
            const nextLen = nextVec.length();
            const nextDir = nextVec.normalizeFromLength(nextLen);
            const nextNorm = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](nextDir.z, 0, -nextDir.x);

            const nDotP = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(nextDir,prevDir);

            let corners0 = getFilletPoints(fillet0,pP,p0,p1);
            let corners1 = getFilletPoints(fillet1,p0,p1,pN);
            
            if(!corners0 || !corners1) {
                vectorOutline.push(new Point(p0));
                vectorOutline.push(new Point(p1));
            }
            else {
                const c0L = corners0.exit.subtract(p0).length();
                const c1L = corners1.entry.subtract(p0).length();
                let flip0 = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(prevNorm,midDir) > 0;
                let flip1 = babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"].Dot(midNorm,nextDir) > 0;
                let midNorm0 = midNorm;
                let midNorm1 = midNorm;

                if( nDotP > babylonjs__WEBPACK_IMPORTED_MODULE_0__["Epsilon"] && c1L < c0L ) {
                    const adjMeetingPoint = corners0.exit.add(corners1.entry).scale(0.5);
                    const adjAmt = corners0.exit.subtract(adjMeetingPoint).length();
                    const moveLineBy = fillet0 - Math.sqrt(fillet0*fillet0 - adjAmt*adjAmt);
                    
                    // find fillet points AGAIN
                    corners0 = getFilletPoints(fillet0,pP,p0,p1,0,moveLineBy);
                    corners0.exit = adjMeetingPoint;
                    corners1 = getFilletPoints(fillet1,p0,p1,pN,moveLineBy,0);
                    corners1.entry = adjMeetingPoint;

                    if(flip0) {
                        midNorm0 = corners0.center.subtract(corners0.exit).normalize();
                    }
                    else {
                        midNorm0 = corners0.exit.subtract(corners0.center).normalize();
                    }

                    if(flip1) {
                        midNorm1 = corners1.center.subtract(corners1.entry).normalize();
                    } else {
                        midNorm1 = corners1.entry.subtract(corners1.center).normalize()
                    }
                }
                const arcRots = getFilletArc(prevNorm,midNorm0,flip0);
                vectorOutline.push(new Point(corners0.entry));
                // vectorOutline.push(new Point(corners0.exit));
                vectorOutline.push(new Arc(corners0.center, fillet0, arcRots.total, arcRots.end))
                
                const arcRots1 = getFilletArc(midNorm1,nextNorm,flip1);
                vectorOutline.push(new Point(corners1.entry));
                // vectorOutline.push(new Point(corners1.exit));
                vectorOutline.push(new Arc(corners1.center, fillet1, arcRots1.total, arcRots1.end))
            }
            lastValidEntryIndex = null;
        }
        else {
            console.log(`dangler!  gonna have to clean that up`);
            danglingExitIndex = i;
        }
    }

    if (close) {
        vectorOutline.push(vectorOutline[0]);
    }

    return vectorOutline;    
}


// export function filletOutline(outline, fillets, close) {
//     let vectorOutline = [];
//     // turn fillets into array if it's just a value
//     if(fillets && !Array.isArray(fillets)) {
//         fillets = (new Array(outline.length)).fill(fillets)
//     }
//     for (let i = 0; i < outline.length; i++) {
//         const point = outline[i];
//         const next = outline[(i + 1) % outline.length];
//         const prev = outline[(i - 1 + outline.length) % outline.length];
//         const nextVec = next.subtract(point);
//         const nextLen = nextVec.length();
//         const nextDir = nextVec.normalizeFromLength(nextLen);
//         const prevVec = point.subtract(prev);
//         const prevLen = prevVec.length();
//         const prevDir = prevVec.normalizeFromLength(prevLen);
//         const nextNorm = new Vector3(nextDir.z, 0, -nextDir.x);
//         const prevNorm = new Vector3(prevDir.z, 0, -prevDir.x);

//         const nDotP = Vector3.Dot(nextDir,prevDir);

//         if (!fillets || Math.abs(nDotP) > 0.99) {
//             vectorOutline.push(new Point(point));
//         }
//         else {
//             // todo:  should this be offset or some kind of scaled offset from inPoint/outPoint etc?
//             let fillet = Math.min(fillets[i],Math.min(prevLen,nextLen)*0.5);
//             let flip = Vector3.Dot(prevNorm,nextDir) > 0;
//             if( flip ) {
//                 fillet = -fillet;
//             }
//             let filletCenter = lineLineIntersection(point.add(prevNorm.scale(-fillet)), prevNorm,
//                                                     point.add(nextNorm.scale(-fillet)), nextNorm);

//             if(!filletCenter) {
//                 vectorOutline.push(new Point(point));
//                 continue;
//             }

//             vectorOutline.push(new Point(filletCenter.add(prevNorm.scale(fillet))));

//             let startRot = getRotFromNormal(prevNorm)+ Math.PI * 2;
//             let endRot = getRotFromNormal(nextNorm)+ Math.PI * 2;
//             if(flip) {
//                 startRot += Math.PI;
//                 endRot += Math.PI;
//                 fillet = -fillet;
//                 if (startRot < endRot) {
//                     startRot += Math.PI * 2;
//                 }
//             }
//             else if (endRot < startRot) {
//                 endRot += Math.PI * 2;
//             }
//             let totRot = endRot - startRot;
//             vectorOutline.push(new Arc(filletCenter, fillet, totRot, endRot))
//         }
//     }

//     if (close) {
//         vectorOutline.push(vectorOutline[0]);
//     }

//     return vectorOutline;    
// }

function offsetAndFixOutlinePoints(outline, offset, fillets, drawDebug) {
    const isFilletArray = fillets && Array.isArray(fillets);

    let red = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](1,0,0,1);
    let blue = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0,0,1,1);
    let green = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](0,1,0,1);
    let yellow = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Color4"](1,1,0,1);

    // let fixup = {fixedOutline:[...outline],offsetPoints:[]};
    let fixup = {fixedOutline:[...outline],fillets:fillets};
    let outlineLen;
    while(outlineLen != fixup.fixedOutline.length) {
        outlineLen = fixup.fixedOutline.length;
        fixup = copyWithoutColinear(fixup.fixedOutline,offset,isFilletArray?fixup.fillets:null);
        // console.log(`went from ${outlineLen} to ${fixup.fixedOutline.length}`);
    } 
    if(drawDebug && fixup.offsetOutline.length > 0) {
        _gfx_js__WEBPACK_IMPORTED_MODULE_1__[/* drawDbgOutline */ "e"]("outline_fixed_1",fixup.offsetOutline,blue,yellow,true);
    }

    let fixed = fixupOutline(fixup.offsetOutline,fixup.fixedOutline,fillets,fillets?fillets[0]:0.5)
    // const offsetPoints = fixup.offsetOutline;
    const offsetPoints = fixed.outline;//offsetOutlinePoints(fixedOutline,offset)
    if(!isFilletArray) {
        fillets = (new Array(offsetPoints.length)).fill(fillets)
    }

    if(drawDebug && offsetPoints.length > 0) {
        _gfx_js__WEBPACK_IMPORTED_MODULE_1__[/* drawDbgOutline */ "e"]("outline_orig",offsetPoints,red,green,false);
    }

    // return fixupOutline(offsetPoints,fixup.fixedOutline,fillets,fillets?fillets[0]:0.5);
    return {outline:offsetPoints,fillets:fillets};
}

// offset is + to the left, - to right
function offsetAndFilletOutline(outline, offset, fillets, close) {
    const offsetPoints = offsetOutlinePoints(outline,offset)

    // gotta fix this for defined fillets
    if(fillets && !Array.isArray(fillets)) {
        fillets = (new Array(offsetPoints.length)).fill(fillets)
    }

    if(fillets) {
        return filletOutline(offsetPoints,fillets,close);
    }
    else {
        let vectorPath = []
        for(const p of offsetPoints) {
            vectorPath.push(new Point(p))
        }
        return vectorPath;
    }
}

function genPointsFromVectorPath(vectorPath, segmentsPerFillet) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if (!segmentsPerFillet) {
        segmentsPerFillet = 4;
    }

    for (let i = 0; i < vectorPath.length; i++) {
        let nextItem = vectorPath[i];
        switch(nextItem.type) {
            case 0:
                outPoints.push(nextItem.point)
                break;
            case 1:
                let rotStep = nextItem.rotRadians / segmentsPerFillet;
                let endRot = nextItem.endRot;
                for (let i = segmentsPerFillet-1; i >= 0; i--) {
                    outPoints.push(nextItem.center.add(getNormalFromRot(endRot - rotStep * i).scale(nextItem.radius)));
                }
                break;
        }
    }

    return outPoints;
}

function getVectorPathBounds(vectorPath) {
    let mins = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](10000000.0,100000000.0,1000000000.0);
    let maxs = new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-10000000.0,-10000000.0,-10000000.0);

    for (let i = 0; i < vectorPath.length; i++) {
        let nextItem = vectorPath[i];
        switch(nextItem.type) {
            case 0:
                mins.minimizeInPlace(nextItem.point);
                maxs.maximizeInPlace(nextItem.point);
                break;
            case 1:
                //todo:  better analytic solution for this
                let minPoint = nextItem.center.add((new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](-1,0,-1)).scale(nextItem.radius));
                let maxPoint = nextItem.center.add((new babylonjs__WEBPACK_IMPORTED_MODULE_0__["Vector3"](1,0,1)).scale(nextItem.radius));
                mins.minimizeInPlace(minPoint);
                maxs.maximizeInPlace(maxPoint);
                break;
        }
    }
    return {mins:mins,maxs:maxs};
}

function genArrayFromOutline(outline, offset, fillets, close, segments) {
    let vectorPath = offsetAndFilletOutline(outline, offset, fillets, close);
    return genPointsFromVectorPath(vectorPath, segments);
}

function genArrayForCircle(circle, offset, segments) {
    let outPoints = [];
    //todo turn fillets into array if it's just a value
    if (!segments) {
        segments = 10;
    }

    let rotStep = Math.PI * 2 / segments;
    for (let i = 0; i < segments; i++) {
        outPoints.push(circle.center.add(getNormalFromRot(rotStep * i).scale(circle.radius+offset)));
    }

    return outPoints;
}

/***/ }),

/***/ "./src/dxf_export.js":
/*!***************************!*\
  !*** ./src/dxf_export.js ***!
  \***************************/
/*! exports provided: dxfString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dxfString */

const dxf = [];
const doc = {layerTable:[]}
function append(...values) {
    dxf.push.apply(dxf, values);
}

function header() {
    append("2", "HEADER");

    let key = "$INSUNITS";
    let value = 4;
    append("9", key, "70", value);
}

function table(tableFn) {
    append("0", "TABLE");
    tableFn();
    append("0", "ENDTAB");
}

function tables() {
    append("2", "TABLES");

    table(lineTypesOut);
    table(layersOut);
}

function lineTypeOut(lineType) {
    append("0", "LTYPE",
        "72", //72 Alignment code; value is always 65, the ASCII code for A
        "65",
        "70",
        "64",
        "2",
        lineType.name,
        "3",
        lineType.description,
        "73",
        "0",
        "40",
        lineType.patternLength
    );
}

function lineTypesOut() {
    append("2", "LTYPE");

    let lineType = {
        name: "CONTINUOUS",
        description: "______",
        patternLength: 0
    };
    lineTypeOut(lineType);
}


function layerOut(layer) {
    append("0", "LAYER",
        "2",
        layer.name,
        "70",
        "0",
        "62",
        layer.color,
        "6",
        "CONTINUOUS"
    );
}

function layersOut() {
    const layerTable = doc.layerTable;

    append("2", "LAYER");

    for (let layerId in layerTable.layers) {
        let layer = layerTable.layers[layerId];
        layerOut(layer);
    }
}


function entities() {
    append("ENTITIES");
}

function section(sectionFn) {
    append("0", "SECTION");

    sectionFn();

    append("0", "ENDSEC");
}

function dxfString(paths) { 


    section(header);
    section(tables);
    // section(() => entities(doc.entities));

    append("0", "EOF");

    return dxf.join('\n');
}
// export function toDXF(pathsToExport: IPath[], options?: IDXFRenderOptions): string;
// export function toDXF(pathToExport: IPath, options?: IDXFRenderOptions): string;

// /**
//  * Renders an item in AutoDesk DFX file format.
//  *
//  * @param itemToExport Item to render: may be a path, an array of paths, or a model object.
//  * @param options Rendering options object.
//  * @param options.units String of the unit system. May be omitted. See makerjs.unitType for possible values.
//  * @returns String of DXF content.
//  */
// export function toDXF(itemToExport: any, options: IDXFRenderOptions = {}): string {

//     //DXF format documentation:
//     //http://images.autodesk.com/adsk/files/acad_dxf0.pdf

//     var opts: IDXFRenderOptions = {
//         fontSize: 9
//     };
//     var layerIds: string[] = [];

//     const doc: DxfParser.DXFDocument = {
//         entities: [],
//         header: {},
//         tables: {}
//     };

//     extendObject(opts, options);

//     if (isModel(itemToExport)) {
//         var modelToExport = itemToExport as IModel;
//         if (modelToExport.exporterOptions) {
//             extendObject(opts, modelToExport.exporterOptions['toDXF']);
//         }
//     }

//     function colorLayerOptions(layer: string): IDXFLayerOptions {
//         if (opts.layerOptions && opts.layerOptions[layer]) return opts.layerOptions[layer];

//         if (layer in colors) {
//             return {
//                 color: colors[layer]
//             };
//         }
//     }

//     function defaultLayer(pathContext: IPath, parentLayer: string) {
//         var layerId = (pathContext && pathContext.layer) || parentLayer || '0';
//         if (layerIds.indexOf(layerId) < 0) {
//             layerIds.push(layerId);
//         }
//         return layerId;
//     }

//     var map: { [type: string]: (pathValue: IPath, offset: IPoint, layer: string) => DxfParser.Entity; } = {};

//     map[pathType.Line] = function (line: IPathLine, offset: IPoint, layer: string) {
//         const lineEntity: DxfParser.EntityLINE = {
//             type: "LINE",
//             layer: defaultLayer(line, layer),
//             vertices: [
//                 {
//                     x: round(line.origin[0] + offset[0], opts.accuracy),
//                     y: round(line.origin[1] + offset[1], opts.accuracy)
//                 },
//                 {
//                     x: round(line.end[0] + offset[0], opts.accuracy),
//                     y: round(line.end[1] + offset[1], opts.accuracy)
//                 }
//             ]
//         };
//         return lineEntity;
//     };

//     map[pathType.Circle] = function (circle: IPathCircle, offset: IPoint, layer: string) {
//         const circleEntity: DxfParser.EntityCIRCLE = {
//             type: "CIRCLE",
//             layer: defaultLayer(circle, layer),
//             center: {
//                 x: round(circle.origin[0] + offset[0], opts.accuracy),
//                 y: round(circle.origin[1] + offset[1], opts.accuracy),
//             },
//             radius: round(circle.radius, opts.accuracy)
//         };
//         return circleEntity;
//     };

//     map[pathType.Arc] = function (arc: IPathArc, offset: IPoint, layer: string) {
//         const arcEntity: DxfParser.EntityARC = {
//             type: "ARC",
//             layer: defaultLayer(arc, layer),
//             center: {
//                 x: round(arc.origin[0] + offset[0], opts.accuracy),
//                 y: round(arc.origin[1] + offset[1], opts.accuracy)
//             },
//             radius: round(arc.radius, opts.accuracy),
//             startAngle: round(arc.startAngle, opts.accuracy),
//             endAngle: round(arc.endAngle, opts.accuracy)
//         };
//         return arcEntity;
//     };

//     //TODO - handle scenario if any bezier seeds get passed
//     //map[pathType.BezierSeed]

//     function appendVertex(v: IPoint, layer: string, bulge?: number) {
//         const vertex: DxfParser.EntityVERTEX = {
//             type: "VERTEX",
//             layer: defaultLayer(null, layer),
//             x: round(v[0], opts.accuracy),
//             y: round(v[1], opts.accuracy),
//             bulge
//         };
//         return vertex;
//     }

//     function polyline(c: IChainOnLayer) {
//         const polylineEntity: DxfParser.EntityPOLYLINE = {
//             type: "POLYLINE",
//             layer: defaultLayer(null, c.layer),
//             shape: c.chain.endless,
//             vertices: []
//         };

//         c.chain.links.forEach((link, i) => {
//             let bulge: number;
//             if (link.walkedPath.pathContext.type === pathType.Arc) {
//                 const arc = link.walkedPath.pathContext as IPathArc;
//                 bulge = round(Math.tan(angle.toRadians(angle.ofArcSpan(arc)) / 4), opts.accuracy);
//                 if (link.reversed) {
//                     bulge *= -1;
//                 }
//             }
//             const vertex = link.endPoints[link.reversed ? 1 : 0];
//             polylineEntity.vertices.push(appendVertex(vertex, c.layer, bulge));
//         });

//         if (!c.chain.endless) {
//             const lastLink = c.chain.links[c.chain.links.length - 1];
//             const endPoint = lastLink.endPoints[lastLink.reversed ? 0 : 1];
//             polylineEntity.vertices.push(appendVertex(endPoint, c.layer));
//         }

//         return polylineEntity;
//     }

//     function text(caption: ICaption & { layer?: string }) {
//         const layerId = defaultLayer(null, caption.layer);
//         const layerOptions = colorLayerOptions(layerId);
//         const center = point.middle(caption.anchor);
//         const textEntity: DxfParser.EntityTEXT = {
//             type: "TEXT",
//             startPoint: appendVertex(center, null),
//             endPoint: appendVertex(center, null),
//             layer: layerId,
//             textHeight: (layerOptions && layerOptions.fontSize) || opts.fontSize,
//             text: caption.text,
//             halign: 4, // Middle
//             valign: 0, // Baseline
//             rotation: angle.ofPointInDegrees(caption.anchor.origin, caption.anchor.end)
//         };
//         return textEntity;
//     }

//     function layerOut(layerId: string, layerColor: number) {
//         const layerEntity: DxfParser.Layer = {
//             name: layerId,
//             color: layerColor
//         };
//         return layerEntity;
//     }

//     function lineTypesOut() {
//         const lineStyleTable: DxfParser.TableLTYPE =
//         {
//             lineTypes: {
//                 "CONTINUOUS": {
//                     name: "CONTINUOUS",
//                     description: "______",
//                     patternLength: 0
//                 }
//             }
//         };
//         const tableName: DxfParser.TableNames = 'lineType';
//         doc.tables[tableName] = lineStyleTable;
//     }

//     function layersOut() {
//         const layerTable: DxfParser.TableLAYER = {
//             layers: {}
//         }
//         layerIds.forEach(layerId => {
//             var layerOptions = colorLayerOptions(layerId);
//             if (layerOptions) {
//                 layerTable.layers[layerId] = layerOut(layerId, layerOptions.color);
//             }
//         });
//         const tableName: DxfParser.TableNames = 'layer';
//         doc.tables[tableName] = layerTable;
//     }

//     function header() {
//         if (opts.units) {
//             var units = dxfUnit[opts.units];
//             doc.header["$INSUNITS"] = units;
//         }
//     }

//     function entities(walkedPaths: IWalkPath[], chains: IChainOnLayer[], captions: (ICaption & { layer?: string })[]) {
//         const entityArray = doc.entities;

//         entityArray.push.apply(entityArray, chains.map(polyline));
//         walkedPaths.forEach((walkedPath: IWalkPath) => {
//             var fn = map[walkedPath.pathContext.type];
//             if (fn) {
//                 const entity = fn(walkedPath.pathContext, walkedPath.offset, walkedPath.layer);
//                 entityArray.push(entity);
//             }
//         });
//         entityArray.push.apply(entityArray, captions.map(text));
//     }

//     //fixup options

//     if (!opts.units) {
//         var units = tryGetModelUnits(itemToExport);
//         if (units) {
//             opts.units = units;
//         }
//     }

//     //also pass back to options parameter
//     extendObject(options, opts);

//     //begin dxf output

//     const chainsOnLayers: IChainOnLayer[] = [];
//     const walkedPaths: IWalkPath[] = [];
//     if (opts.usePOLYLINE) {
//         const cb: IChainCallback = function (chains: IChain[], loose: IWalkPath[], layer: string) {
//             chains.forEach(c => {
//                 if (c.endless && c.links.length === 1 && c.links[0].walkedPath.pathContext.type === pathType.Circle) {
//                     //don't treat circles as lwpolylines
//                     walkedPaths.push(c.links[0].walkedPath);
//                     return;
//                 }
//                 const chainOnLayer: IChainOnLayer = { chain: c, layer };
//                 chainsOnLayers.push(chainOnLayer);
//             });
//             walkedPaths.push.apply(walkedPaths, loose);
//         }
//         model.findChains(modelToExport, cb, { byLayers: true, pointMatchingDistance: opts.pointMatchingDistance });
//     } else {
//         var walkOptions: IWalkOptions = {
//             onPath: (walkedPath: IWalkPath) => {
//                 walkedPaths.push(walkedPath);
//             }
//         };
//         model.walk(modelToExport, walkOptions);
//     }
//     entities(walkedPaths, chainsOnLayers, model.getAllCaptionsOffset(modelToExport));

//     header();

//     lineTypesOut();
//     layersOut();

//     return outputDocument(doc);
// }

// /**
//  * @private
//  */
// function outputDocument(doc: DxfParser.DXFDocument) {

//     const dxf: (string | number)[] = [];
//     function append(...values: (string | number)[]) {
//         dxf.push.apply(dxf, values);
//     }

//     var map: { [entityType: string]: (entity: DxfParser.Entity) => void; } = {};

//     map["LINE"] = function (line: DxfParser.EntityLINE) {
//         append("0", "LINE",
//             "8",
//             line.layer,
//             "10",
//             line.vertices[0].x,
//             "20",
//             line.vertices[0].y,
//             "11",
//             line.vertices[1].x,
//             "21",
//             line.vertices[1].y
//         );
//     };

//     map["CIRCLE"] = function (circle: DxfParser.EntityCIRCLE) {
//         append("0", "CIRCLE",
//             "8",
//             circle.layer,
//             "10",
//             circle.center.x,
//             "20",
//             circle.center.y,
//             "40",
//             circle.radius
//         );
//     };

//     map["ARC"] = function (arc: DxfParser.EntityARC) {
//         append("0", "ARC",
//             "8",
//             arc.layer,
//             "10",
//             arc.center.x,
//             "20",
//             arc.center.y,
//             "40",
//             arc.radius,
//             "50",
//             arc.startAngle,
//             "51",
//             arc.endAngle
//         );
//     };

//     //TODO - handle scenario if any bezier seeds get passed
//     //map[pathType.BezierSeed]

//     map["VERTEX"] = function (vertex: DxfParser.EntityVERTEX) {
//         append("0", "VERTEX",
//             "8",
//             vertex.layer,
//             "10",
//             vertex.x,
//             "20",
//             vertex.y
//         );

//         if (vertex.bulge !== undefined) {
//             append("42", vertex.bulge);
//         }
//     }

//     map["POLYLINE"] = function (polyline: DxfParser.EntityPOLYLINE) {
//         append("0", "POLYLINE",
//             "8",
//             polyline.layer,
//             "66",
//             1,
//             "70",
//             polyline.shape ? 1 : 0
//         );

//         polyline.vertices.forEach(vertex => map["VERTEX"](vertex));

//         append("0", "SEQEND");
//     }

//     map["TEXT"] = function (text: DxfParser.EntityTEXT) {
//         append("0", "TEXT",
//             "10",
//             text.startPoint.x,
//             "20",
//             text.startPoint.y,
//             "11",
//             text.endPoint.x,
//             "21",
//             text.endPoint.y,
//             "40",
//             text.textHeight,
//             "1",
//             text.text,
//             "50",
//             text.rotation,
//             "8",
//             text.layer,
//             "72",
//             text.halign,
//             "73",
//             text.valign
//         );
//     }

//     function section(sectionFn: () => void) {
//         append("0", "SECTION");

//         sectionFn();

//         append("0", "ENDSEC");
//     }

//     function table(fn: Function) {
//         append("0", "TABLE");
//         fn();
//         append("0", "ENDTAB");
//     }

//     function tables() {
//         append("2", "TABLES");

//         table(lineTypesOut);
//         table(layersOut);
//     }

//     function layerOut(layer: DxfParser.Layer) {
//         append("0", "LAYER",
//             "2",
//             layer.name,
//             "70",
//             "0",
//             "62",
//             layer.color,
//             "6",
//             "CONTINUOUS"
//         );
//     }

//     function lineTypeOut(lineType: DxfParser.LineType) {
//         append("0", "LTYPE",
//             "72", //72 Alignment code; value is always 65, the ASCII code for A
//             "65",
//             "70",
//             "64",
//             "2",
//             lineType.name,
//             "3",
//             lineType.description,
//             "73",
//             "0",
//             "40",
//             lineType.patternLength
//         );
//     }

//     function lineTypesOut() {
//         const lineTypeTableName: DxfParser.TableNames = 'lineType';
//         const lineTypeTable = doc.tables[lineTypeTableName] as DxfParser.TableLTYPE;

//         append("2", "LTYPE");

//         for (let lineTypeId in lineTypeTable.lineTypes) {
//             let lineType = lineTypeTable.lineTypes[lineTypeId];
//             lineTypeOut(lineType);
//         }
//     }

//     function layersOut() {
//         const layerTableName: DxfParser.TableNames = 'layer';
//         const layerTable = doc.tables[layerTableName] as DxfParser.TableLAYER;

//         append("2", "LAYER");

//         for (let layerId in layerTable.layers) {
//             let layer = layerTable.layers[layerId];
//             layerOut(layer);
//         }
//     }

//     function header() {
//         append("2", "HEADER");

//         for (let key in doc.header) {
//             let value = doc.header[key];
//             append("9", key, "70", value);
//         }
//     }

//     function entities(entityArray: DxfParser.Entity[]) {
//         append("2", "ENTITIES");

//         entityArray.forEach(entity => {
//             const fn = map[entity.type];
//             if (fn) {
//                 fn(entity);
//             }
//         });
//     }

//     //begin dxf output

//     section(header);
//     section(tables);
//     section(() => entities(doc.entities));

//     append("0", "EOF");

//     return dxf.join('\n');
// }

// /**
//  * @private
//  */
// var dxfUnit: { [unitType: string]: number } = {};

// //DXF format documentation:
// //http://images.autodesk.com/adsk/files/acad_dxf0.pdf
// //Default drawing units for AutoCAD DesignCenter blocks:
// //0 = Unitless; 1 = Inches; 2 = Feet; 3 = Miles; 4 = Millimeters; 5 = Centimeters; 6 = Meters; 7 = Kilometers; 8 = Microinches;

// dxfUnit[''] = 0;
// dxfUnit[unitType.Inch] = 1;
// dxfUnit[unitType.Foot] = 2;
// dxfUnit[unitType.Millimeter] = 4;
// dxfUnit[unitType.Centimeter] = 5;
// dxfUnit[unitType.Meter] = 6;

// /**
//  * DXF layer options.
//  */
// export interface IDXFLayerOptions {

//     /**
//      * DXF layer color.
//      */
//     color: number

//     /**
//      * Text size for TEXT entities.
//      */
//     fontSize?: number;
// }

// /**
//  * DXF rendering options.
//  */
// export interface IDXFRenderOptions extends IExportOptions, IPointMatchOptions {

//     /**
//      * Text size for TEXT entities.
//      */
//     fontSize?: number;

//     /**
//      * DXF options per layer.
//      */
//     layerOptions?: { [layerId: string]: IDXFLayerOptions };

//     /**
//      * Flag to use POLYLINE
//      */
//     usePOLYLINE?: boolean;
// }

// /**
//  * @private
//  */
// interface IChainOnLayer {
//     chain: IChain;
//     layer: string;
// }

/***/ }),

/***/ "./src/gbr_export.js":
/*!***************************!*\
  !*** ./src/gbr_export.js ***!
  \***************************/
/*! exports provided: beginSetExport, exportLayer, exportEdgeCutsLayer, exportDrillFile */
/*! exports used: beginSetExport, exportDrillFile, exportEdgeCutsLayer, exportLayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return beginSetExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return exportLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return exportEdgeCutsLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return exportDrillFile; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _boardData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardData.js */ "./src/boardData.js");
/* harmony import */ var _coremath_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./coremath.js */ "./src/coremath.js");
/* harmony import */ var _pcbOps_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pcbOps.js */ "./src/pcbOps.js");





/*
G04 #@! TF.GenerationSoftware,KiCad,Pcbnew,(5.1.7-0-10_14)*
G04 #@! TF.CreationDate,2020-12-31T23:26:21-08:00*
G04 #@! TF.ProjectId,keyboard,6b657962-6f61-4726-942e-6b696361645f,rev?*
G04 #@! TF.SameCoordinates,Original*
G04 #@! TF.FileFunction,Copper,L2,Bot*  // or L1,Top (for 2 layer boards)
G04 #@! TF.FilePolarity,Positive*  // "positive" indicates presence of material  (note solder mask is negative)
*/ 

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,      
    maximumFractionDigits: 4,
 });

 function fmt_float(a) { return formatter.format(a)}


const formatter_gbr = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 6,      
    maximumFractionDigits: 6,
 });

 function fmt_float_gbr(a) { return formatter_gbr.format(a)}


function fmt_fixed(a) { return Number(a * 1000000).toFixed(0)}

function uuidv4() {
return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});
}

let setUuid = uuidv4();
function beginSetExport() {
    setUuid = uuidv4();
}

const linearDrawMode = "G01*"

const orgName = "TangentSpace";
const progName = "KBGB";
const versionString = "0.0.1";

function exportGBRHeader(gbr, opts) {
    function append(...values) {
        gbr.push.apply(gbr, values);
    }
    append(`G04 #@! TF.GenerationSoftware,${orgName},${progName},(${versionString})*`);
    append(`G04 #@! TF.CreationDate,${new Date().toISOString()}*`);
    append(`G04 #@! TF.ProjectId,${_boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().meta.name},${setUuid},rev?*`);
    append(`G04 #@! TF.SameCoordinates,${setUuid}*`);
    append(`G04 #@! TF.FileFunction,${opts.fileFunction}*`);  // file function: "Profile" <aka edge cuts> 
    if(opts.polarity) {
        append(`G04 #@! TF.FilePolarity,${opts.polarity}*`);
    }
    append(`%FSLAX46Y46*%`);  // leading zero omitted, version 4.6
    append(`G04 Gerber Fmt 4.6, Leading zero omitted, Abs format (unit mm)*`);
    append(`G04 Created by Tangent Space - KBGB (0.0.1)*`);
    append(`%MOMM*%`);
    append(`%LPD*%`); 
}

function exportLayer(pcb,layer,side) {
    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    let headerOpts = {
    }
    if(layer=="copper") {
        headerOpts.polarity = "Positive";
        if( side == "top") {
            headerOpts.fileFunction = `Copper,L1,Top`;
        }
        else {
            headerOpts.fileFunction = `Copper,L2,Bot`;
        }
    }
    else if(layer == "mask") {
        headerOpts.polarity = "Negative";
        if( side == "top") {
            headerOpts.fileFunction = `Soldermask,Top`;
        }
        else {
            headerOpts.fileFunction = `Soldermask,Bot`;
        }
    }

    exportGBRHeader(gbr, headerOpts);

    append(linearDrawMode);

    append(`G04 APERTURE LIST*`);
    let tools = {};
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for(const pth of f.pths) {
                let cuDiameter = (pth.radius+pth.ring) * 2;
                if(!tools[cuDiameter]) {
                    tools[cuDiameter] = {locs:[],usage:`ComponentPad`,diameter:cuDiameter};          
                }
                tools[cuDiameter].locs.push(pth.location);
            }
            if(side == "bot") {
                for(const pad of f.pads) {
                    if(!tools["pads"]) {
                        tools["pads"] = {locs:[],polys:[],usage:`ComponentPad`,diameter:0.1};
                    }
                    tools["pads"].polys.push(pad.poly);
                }
            }
        }
    }

    if(pcb.vias.length > 0 && layer=="copper") {
        tools["via"] = {locs:pcb.vias,usage:`ViaPad`,diameter:0.6};
    }
    
    let tIdx = 10;
    for( let [tRad, tool] of Object.entries(tools)) {
        tool.name = `D${tIdx}`;
        if(layer=="copper") {
            append(`G04 #@! TA.AperFunction,${tool.usage}*`);
        }
        append(`%AD${tool.name}C,${fmt_float_gbr(tool.diameter)}*%`)

        if(layer=="copper") {
            append(`G04 #@! TD*`);  // TD*: delete all attributes
        }   
        tIdx += 1;
    }

    let trackTool = `D${tIdx}`
    append(`G04 #@! TA.AperFunction,Conductor*`);
    append(`%AD${trackTool}C,${fmt_float_gbr(pcb.trackWidth)}*%`);
    append(`G04 #@! TD*`);


    append(`G04 APERTURE END LIST*`);

    for( let [tRad, t] of Object.entries(tools)) {
        if(t.locs.length > 0) {
            append(`${t.name}*`);
            for( const loc of t.locs ) {
                append(`X${fmt_fixed(loc.x)}Y${fmt_fixed(loc.z)}D03*`)
            }
        }
    }

    if(tools["pads"] && tools["pads"].polys.length > 0) {
        append(`${tools["pads"].name}*`);
        for(const poly of tools["pads"].polys) {
            append(`G36*`);
            const startPoint = poly[poly.length-1];
            append(`X${fmt_fixed(startPoint.x)}Y${fmt_fixed(startPoint.z)}D02*`)
            for(const p of poly) {
                append(`X${fmt_fixed(p.x)}Y${fmt_fixed(p.z)}D01*`)
            }
            append(`G37*`);
        }
    }

    append(`${trackTool}*`);
    if(layer=="copper" && side == "top") {
        for( let route of pcb.topRoutes) {
            append(`X${fmt_fixed(route[0].x)}Y${fmt_fixed(route[0].z)}D02*`)
            append(`X${fmt_fixed(route[1].x)}Y${fmt_fixed(route[1].z)}D01*`)
        }
    }
    if(layer=="copper" && side == "bot") {
        for( let route of pcb.bottomRoutes) {
            append(`X${fmt_fixed(route[0].x)}Y${fmt_fixed(route[0].z)}D02*`)
            append(`X${fmt_fixed(route[1].x)}Y${fmt_fixed(route[1].z)}D01*`)
        }
    }
    append(`M02*`);  // END FILE

    return gbr.join('\n');
}

function exportEdgeCutsLayer(pcb) {
    const outlines = [_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* offsetAndFilletOutline */ "n"](pcb.outline, 0.0, 2.0, false)];

    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    exportGBRHeader(gbr, {fileFunction:"Profile,NP"});

    append(`G04 APERTURE LIST*`);
    append(`G04 #@! TA.AperFunction,Profile*`);  //TA: define attribute "Profile"
    append(`%ADD10C,0.200000*%`); // AD (D10 apeture) (C = circle), (0.2 diameter)
    append(`G04 #@! TD*`);  // TD*: delete all attributes
    append(`G04 APERTURE END LIST*`);

    // begin D10 aperture
    append(`D10*`);

    for(let shape of outlines) {
        if(Array.isArray(shape)) {
            let isDrawingLine = false;
            if(shape.length > 1) {
                // // starting point
                // let p = shape[0];
                // switch(p.type) {
                //     case 0:
                //         append(`X${fmt_fixed(p.point.x)}Y${fmt_fixed(-p.point.z)}D02*`);
                //         break;
                //     case 1:
                //         // let startPoint = p.center.add(coremath.getNormalFromRot(p.endRot - p.rotDegrees).scale(p.radius));
                //         // pathStr += `M${fmt_fixed(startPoint.x)},${fmt_fixed(-startPoint.z)}`
                //         break;
                // }

                for(let i = 0; i <= shape.length; i++) {
                    let p = shape[i%shape.length];
                    switch(p.type) {
                        case 0:
                            let mode = i>0?`D01`:`D02`;
                            if(!isDrawingLine) {
                                append(linearDrawMode);
                                isDrawingLine = true;
                                // mode = `D02`;
                            }
                            append(`X${fmt_fixed(p.point.x)}Y${fmt_fixed(p.point.z)}${mode}*`);
                            break;
                        case 1: // arc
                            isDrawingLine = false;
                            append(`G75*`);
                            if(p.rotRadians < 0) {
                                append(`G02*`); //clockwise
                            } else {
                                append(`G03*`); //ccw
                            }
                            let endPoint = p.center.add(_coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getNormalFromRot */ "i"](p.endRot).scale(p.radius));
                            let startVec = _coremath_js__WEBPACK_IMPORTED_MODULE_2__[/* getNormalFromRot */ "i"](p.endRot-p.rotRadians).scale(p.radius);
                            append(`X${fmt_fixed(endPoint.x)}Y${fmt_fixed(endPoint.z)}I${fmt_fixed(-startVec.x)}J${fmt_fixed(-startVec.z)}D01*`)
                            break;
                    }
                }
            }
        } else {
            if(shape.type == 2) {
                console.log("SKIPPING CIRCLE");
            }
        }
    }
    append(`M02*`);  // END FILE

    return gbr.join('\n');
}

function exportDrillFile(pcb) {
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();

    const gbr = [];
    function append(...values) {
        gbr.push.apply(gbr, values);
    }

    append(`M48`);

    append(`; DRILL file {KBGB (0.0.1)} date Monday, January 04, 2021 at 10:50:19 PM`);
    append(`; FORMAT={-:-/ absolute / inch / decimal}`);
    append(`; #@! TF.CreationDate,${new Date().toISOString()}`);
    append(`; #@! TF.GenerationSoftware,${orgName},${progName},(${versionString})`);
    append(`FMAT,2`); // dec?
    append(`INCH`);   // inch

    let tools = {};
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for(const pth of f.pths) {
                if(!tools[pth.radius]) {
                    tools[pth.radius] = {locs:[],rad:pth.radius};
                }
                tools[pth.radius].locs.push(pth.location);
            }
        }
    }

    if(pcb.vias.length > 0) {
        tools["via"] = {locs:pcb.vias,rad:0.15};
    }

    let tIdx = 1;
    for( let [tRad, tool] of Object.entries(tools)) {
        tool.name = `T${tIdx}`
        append(`${tool.name}C${fmt_float(2 * 0.1 * tool.rad / 2.54)}`)
        tIdx += 1;
    }

    append(`%`);
    append(`G90`);
    append(`G05`);
    for( let [tRad, t] of Object.entries(tools)) {
        append(`${t.name}`);
        for( const loc of t.locs ) {
            append(`X${fmt_float(0.1 * loc.x / 2.54)}Y${fmt_float(0.1 * loc.z / 2.54)}`)
        }
    }
    append(`T0`);
    append(`M30`); // end file

    return gbr.join('\n');
}

/***/ }),

/***/ "./src/gfx.js":
/*!********************!*\
  !*** ./src/gfx.js ***!
  \********************/
/*! exports provided: createKeyMaterial, setMatFromTuning, createMaterials, snapCamera, drawDbgLines, drawDbgOutline, addShadows, removeMesh, showGrid, hideGrid, setEnvironmentLight, bgColors, primaryColor, secondaryColor, switchAsset, keyAssets, getKeycap, init */
/*! exports used: addShadows, bgColors, createKeyMaterial, drawDbgLines, drawDbgOutline, getKeycap, hideGrid, init, removeMesh, setEnvironmentLight, showGrid, snapCamera, switchAsset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createKeyMaterial; });
/* unused harmony export setMatFromTuning */
/* unused harmony export createMaterials */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return snapCamera; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return drawDbgLines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return drawDbgOutline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addShadows; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return removeMesh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return showGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return hideGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return setEnvironmentLight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return bgColors; });
/* unused harmony export primaryColor */
/* unused harmony export secondaryColor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "m", function() { return switchAsset; });
/* unused harmony export keyAssets */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return getKeycap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return init; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _boardData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardData.js */ "./src/boardData.js");
/* harmony import */ var _tuning_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tuning.js */ "./src/tuning.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_3__);






const gfxLocals = {};

function createKeyMaterial(name,color) {
    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;
    if(!mats[name])
    {
        mats[name] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMetallicRoughnessMaterial"](name, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[name].metallic = 0;
        mats[name].transparencyMode = babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"].PBRMATERIAL_OPAQUE;
        mats[name].roughness = 0.6;
        mats[name].baseColor = color;
    }
}

function setMatFromTuning(matType, pmName) {
    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;
    let pmData = _tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].caseMats[pmName];

    if(!mats[matType])
    {
        mats[matType] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"](matType, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
    }

    let mat = mats[matType];
    for(const [k,v] of Object.entries(pmData)) {
        if(Array.isArray(v)) {
            mat[k] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](v[0],v[1],v[2]);
        } else {
            mat[k] = v;
        }
    }

    if(mat.alpha <= 0.99) {
        // alpha mode combine
        mat.subSurface.isRefractionEnabled = true;
        mat.subSurface.refractionIntensity = 0.9;
        mat.subSurface.indexOfRefraction = 1.13;
        mat.subSurface.tintColor = mat.baseColor;
        mat.subSurface.linkRefractionWithTransparency = false;
        mat.subSurface.isTranslucencyEnabled = true;
        mat.subSurface.useAlbedoToTintRefraction = true;
        // link refraction with trans
        // translucency enable
    }
    else {
        mat.subSurface.isRefractionEnabled = false;
        mat.subSurface.isTranslucencyEnabled = false;
        mat.transparencyMode = babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"].PBRMATERIAL_OPAQUE;
    }
}

function createMaterials() {
    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;
    let name = "keySel";
    if(!mats[name])
    {
        mats[name] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["StandardMaterial"](name, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[name].diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0, 0, 0);
        mats[name].emissiveColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](1, 0, 0);
        mats[name].specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0, 0, 0);
    }

    name = "rotHandle";
    if(!mats[name])
    {
        mats[name] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["StandardMaterial"](name, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[name].diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0, 0, 0);
        mats[name].emissiveColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0.7, 0.9, 0.4);
        mats[name].alpha = 0.7;
        mats[name].specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0, 0, 0);
    }

    name = "layoutFrame";
    if(!mats[name])
    {
        mats[name] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["StandardMaterial"](name, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[name].diffuseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0, 0, 0);
        mats[name].emissiveColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0.8, 0.8, 0.8);
        mats[name].alpha = 0.0;
        mats[name].specularColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0, 0, 0);
    }

    name = "gridMaterial";
    if(!mats[name]) {
        const groundMaterial = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["GridMaterial"]("gridMaterial", _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        groundMaterial.majorUnitFrequency = 4;
        groundMaterial.minorUnitVisibility = 0.0;
        groundMaterial.gridRatio = 19.05/4;
        groundMaterial.backFaceCulling = false;
        groundMaterial.mainColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](1, 1, 1);
        groundMaterial.lineColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](1.0, 1.0, 1.0);
        groundMaterial.opacity = 0.6;
        mats[name] = groundMaterial;
    }

    for(const [k,v] of Object.entries(_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].caseMats)) {
        setMatFromTuning(k, k);
    }

    let switchMatName = "switch";
    if(!mats[switchMatName])
    {
        mats[switchMatName] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"](switchMatName, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[switchMatName].metallic = 0;
        mats[switchMatName].transparencyMode = babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"].PBRMATERIAL_OPAQUE;
        mats[switchMatName].roughness = 0.7;
        mats[switchMatName].baseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0.1, 0.1, 0.1);
    }

    let pcbMatName = "fr4";
    if(!mats[pcbMatName])
    {
        mats[pcbMatName] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMetallicRoughnessMaterial"](pcbMatName, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[pcbMatName].metallic = 0;
        mats[pcbMatName].transparencyMode = babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"].PBRMATERIAL_OPAQUE;
        mats[pcbMatName].roughness = 0.2;
        mats[pcbMatName].baseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](45/255, 90/255, 10/255);
    }

    let foamMatName = "foam";
    if(!mats[foamMatName])
    {
        mats[foamMatName] = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMetallicRoughnessMaterial"](foamMatName, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
        mats[foamMatName].metallic = 0;
        mats[foamMatName].transparencyMode = babylonjs__WEBPACK_IMPORTED_MODULE_3__["PBRMaterial"].PBRMATERIAL_OPAQUE;
        mats[foamMatName].roughness = 0.9;
        mats[foamMatName].baseColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](10/255, 10/255, 10/255);
    }

    createKeyMaterial("key", new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"](0.9, 0.9, 0.9));
}

function snapCamera(mode) {
    const mins = [100000,100000];
    const maxs = [-100000,-100000];
    for(const [k,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        if(cRD.bounds) {
            for(let i = 0; i < 2; i++) {
                mins[i] = Math.min(mins[i],cRD.bounds.mins[i]);
                maxs[i] = Math.max(maxs[i],cRD.bounds.maxs[i]);
            }
        }
    }

    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
    // TODO: fix this to work with multiple cases
    const bezelAdd = 30;
    const w = maxs[0] - mins[0] + bezelAdd * 2;
    const h = maxs[1] - mins[1] + bezelAdd * 2;
    const dim = Math.max(w,h);
    let cam = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].camera;
    cam.setTarget(new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Vector3"](mins[0] + (maxs[0] - mins[0]) / 2.0,
        0, mins[1] + (maxs[1] - mins[1]) / 2.0));
    
    let nextAlpha = -Math.PI / 3.5;
    let nextBeta = Math.PI / 3.5;

    cam.inputs.attached.keyboard.detachControl();
    cam.inputs.attached.pointers.detachControl();
    if(mode != "top") {
        cam.inputs.attachInput(cam.inputs.attached.pointers);
        cam.inputs.attachInput(cam.inputs.attached.keyboard);
    }
    
    cam.fov = 0.3;
    cam.lowerRadiusLimit = 75;
    cam.upperRadiusLimit = 1500;
    if(mode == "top") {
        nextAlpha = -Math.PI / 2;
        nextBeta = 0;
        cam.fov = 0.1;
        cam.upperRadiusLimit = 7500;
    } else if(mode == "front") {
        nextAlpha = -Math.PI / 2;
        nextBeta = Math.PI / 4;
    } else if(mode == "rear") {
        nextAlpha = -Math.PI / 3.5 + Math.PI;
        nextBeta = Math.PI / 2.3;
    } else if(mode == "split") {
        nextAlpha = -Math.PI / 3.5;
        nextBeta = Math.PI / 2.25;
    }
    cam.radius = 0.5 * dim / Math.tan(cam.fov * 0.5);

    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["QuinticEase"]();
    // For each easing function, you can choose between EASEIN (default), EASEOUT, EASEINOUT
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_3__["EasingFunction"].EASINGMODE_EASEOUT);
    
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("camAlpha", cam, "alpha", 30, 12, cam.alpha, nextAlpha, babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT,easingFunction);
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("camBeta", cam, "beta", 30, 12, cam.beta, nextBeta, babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT,easingFunction);

}

const debugLineSystems = {};
function drawDbgLines(groupName, dbgLines, lineColors) {
    if( debugLineSystems[groupName] ) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(debugLineSystems[groupName])
    }
    debugLineSystems[groupName] = babylonjs__WEBPACK_IMPORTED_MODULE_3__["MeshBuilder"].CreateLineSystem(groupName, {lines: dbgLines, colors:lineColors}, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
}

function drawDbgOutline(groupName, points, startColor, endColor, close) {
    let dbglines = [];
    let linecolors = [];
    startColor = startColor || new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color4"](1,0,0,1);
    endColor = endColor || new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color4"](0,0,1,1);
    let end = close?points.length:(points.length-1);
    for(let i = 0; i < end; i++) {
        dbglines.push([points[i],points[(i+1)%points.length]])
        linecolors.push([startColor,endColor]);
    }
    drawDbgLines(groupName, dbglines, linecolors);
}

function addShadows(mesh) {
    if(gfxLocals.shadowGenerator) {
        gfxLocals.shadowGenerator.addShadowCaster(mesh);
    
        mesh.receiveShadows = true;
        for(const m of mesh.getChildMeshes()) {
            m.receiveShadows = true;
        }
    }
}

function removeMesh(mesh) {
    mesh.parent = null;
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(mesh);
    if(gfxLocals.shadowGenerator) {
        gfxLocals.shadowGenerator.removeShadowCaster(mesh);
    }
    mesh.dispose();
}

function showGrid() {
    // gfxLocals.ground.isVisible = true;

    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["QuinticEase"]();
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_3__["EasingFunction"].EASINGMODE_EASEIN);
    const animationTime = 40;
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("showGrid", gfxLocals.ground, "material.opacity", 30, animationTime,
        gfxLocals.ground.material.opacity, 0.75,
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {}); 

    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("showMinorGrid", gfxLocals.ground, "material.minorUnitVisibility", 30, animationTime,
        gfxLocals.ground.material.minorUnitVisibility, 0.45,
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {});

    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("showFrame", gfxLocals.frameHolder, "material.alpha", 30, animationTime / 3,
        gfxLocals.frameHolder.material.alpha, 0.9,
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {}); 
}

function hideGrid() {
    let easingFunction = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["QuinticEase"]();
    easingFunction.setEasingMode(babylonjs__WEBPACK_IMPORTED_MODULE_3__["EasingFunction"].EASINGMODE_EASEINOUT);
    const animationTime = 15;
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("hideGrid", gfxLocals.ground, "material.opacity", 30, animationTime,
        gfxLocals.ground.material.opacity, 0.0,
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {}); 

    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("hideMinorGrid", gfxLocals.ground, "material.minorUnitVisibility", 30, animationTime,
        gfxLocals.ground.material.minorUnitVisibility, 0.0,
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {});

    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].CreateMergeAndStartAnimation("hideFrame", gfxLocals.frameHolder, "material.alpha", 30, animationTime,
        gfxLocals.frameHolder.material.alpha, 0.0,
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Animation"].ANIMATIONLOOPMODE_CONSTANT, easingFunction, () => {}); 
}

function setEnvironmentLight(path) {
    if(!_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].hdrTextures) _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].hdrTextures = {};
    if(!_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].hdrTextures[path]) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].hdrTextures[path] = babylonjs__WEBPACK_IMPORTED_MODULE_3__["CubeTexture"].CreateFromPrefilteredData(path, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
    }
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.environmentTexture = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].hdrTextures[path];

    // if(globals.currentSkybox) {
    //     globals.currentSkybox.material.reflectionTexture = globals.hdrTextures[path].clone();
    //     if (globals.currentSkybox.material.reflectionTexture) {
    //         globals.currentSkybox.material.reflectionTexture.coordinatesMode = Texture.SKYBOX_MODE;
    //     }
    // } else {
    //     globals.currentSkybox = globals.scene.createDefaultSkybox(globals.hdrTextures[path], true, (globals.scene.activeCamera.maxZ - globals.scene.activeCamera.minZ) / 2, 0.3);
    // }
}

const bgColors = [
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#bef4ff"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#ffdcbe"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#f6ef7c"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#879171"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#c98a68"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#d3a8b2"),

    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#73a8b2"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#e4d4cd"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#eabc68"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#739484"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#a08a8c"),
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].FromHexString("#a79070")
];

const primaryColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"]();
const secondaryColor = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"]();

function createScene() {
    const engine = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].engine;

    // create a basic BJS Scene object
    var scene = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Scene"](engine);

    var camera = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["ArcRotateCamera"]("Camera", -Math.PI / 2, 0, 100, new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Vector3"](0, 0, 0), scene);

    // target the camera to scene origin
    camera.setTarget(babylonjs__WEBPACK_IMPORTED_MODULE_3__["Vector3"].Zero());


    camera.alpha = -Math.PI / 3.5;
    camera.beta  = Math.PI / 3.5;
    camera.fov = 0.3;
    camera.lowerRadiusLimit = 75;
    camera.upperRadiusLimit = 1500;

    // attach the camera to the canvas
    camera.attachControl(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].canvas, false);

    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].camera = camera;

    // var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75, [camera]);
    // ssao.base = 0.6;
    // ssao.radius = 0.001;
    // ssao.area = 0.003;
    // ssao.falloff = 0.00001;

    scene.clearColor = bgColors[7];

    // var pipeline = new DefaultRenderingPipeline(
    //     "defaultPipeline", // The name of the pipeline
    //     true, // Do you want the pipeline to use HDR texture?
    //     scene, // The scene instance
    //     [camera] // The list of cameras to be attached to
    // );

    let colorTick = 0.0;
    let curColor = Math.floor(Math.random() * bgColors.length);
    let altColor = Math.floor(curColor + 0.5 * bgColors.length) % bgColors.length;
    scene.clearColor = primaryColor;
    scene.registerBeforeRender(function () {
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].LerpToRef(bgColors[curColor], bgColors[(curColor+1) % bgColors.length], colorTick, primaryColor);
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["Color3"].LerpToRef(bgColors[altColor], bgColors[(altColor+1)%bgColors.length], colorTick, secondaryColor);
        colorTick += 0.00025;
        // colorTick += 0.0025;
        if(colorTick >= 1.0) {
            colorTick = 0.0;
            curColor = (curColor+1) % bgColors.length;
            altColor = (altColor+1) % bgColors.length;
        }
    });

    // run the render loop
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].engine.runRenderLoop(function () {
        scene.render();
    });

    // return the created scene
    return scene;
}

const switchAsset = {container:null,details:null};

const keyAssets = {"KAT":{},"DSA":{},"KAM":{},"KRK":{}};
function getKeycap(profile, width, height, opts) {
    const prof = keyAssets[profile];
    if(!prof) return null;

    let xForm = babylonjs__WEBPACK_IMPORTED_MODULE_3__["Matrix"].Identity();
    if(profile == "KAM") {
        if(opts.vertical) {
            width = height;
            height = 1;

            xForm = babylonjs__WEBPACK_IMPORTED_MODULE_3__["Matrix"].RotationY(Math.PI / 2);
        } else {
            xForm = babylonjs__WEBPACK_IMPORTED_MODULE_3__["Matrix"].RotationY(Math.PI);
        }
        xForm = xForm.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_3__["Matrix"].Scaling(-1,1,1));
    }
    else if(profile == "KAT") {
        xForm = babylonjs__WEBPACK_IMPORTED_MODULE_3__["Matrix"].RotationY(Math.PI);
    }
    else if(profile == "KRK") {
        if(opts.vertical) {
            opts.h = height;
        }
    }

    const sized = prof[width];
    if(!sized) return null;

    let best = null;
    let bestScore = -100;
    let bestName = null;

    for(const [r,m] of Object.entries(sized)) {
        const container = m.container;
        const d = m.details;
        let score = 5;
        // find any matching options
        for(const [k,v] of Object.entries(opts)) {
            if( d[k] == v) {
                score += 1;
            }
        }
        // penalize unmatched key characteristics
        for(const [k,v] of Object.entries(d)) {
            if( !opts[k] ) {
                score -= 2;
            }
        }
        if(score > bestScore) {
            best = container;
            bestScore = score;
            bestName = d;
        }
    }
    // console.log(`returning ${bestName.r}`);
    return {container:best,preXform:xForm};
}

const krkList = {
    "0r_1u.glb": {r:0, w:1},
    "1r_1u.glb": {r:1, w:1},
    "1r_2u.glb": {r:1, w:2},
    "2r_1u.glb": {r:2, w:1},
    "2r_2u_VERTICAL.glb": {r:2, h:2, w:1, vertical:true},
    "2r_1_5u.glb": {r:2, w:1.5},
    "2r_1_75u.glb": {r:2, w:1.75},
    "3r_1u.glb": {r:3, w:1},
    "3r_1u_nub.glb": {r:3, w:1, nub:true},
    "3r_1u_scoop.glb": {r:3, w:1, scooped:true},
    "3r_1_25u.glb": {r:3, w:1.25},
    "3r_1_5u.glb": {r:3, w:1.5},
    "3r_1_75u.glb": {r:3, w:1.75},
    "3r_1_75u_STEPPED.glb": {r:3, w:1.5, stepped:true},
    "3r_2_25u.glb": {r:3, w:2.25},
    "4r_1u.glb": {r:4, w:1},
    "4r_1_75u.glb": {r:4, w:1.75},
    "4r_2u_VERTICAL.glb": {r:4, h:2, w:1, vertical:true},
    "4r_2_25u.glb": {r:4, w:2.25},
    "4r_2_75u.glb": {r:4, w:2.75},
    "5r_1u.glb": {r:5, w:1},
    "5r_1_5u.glb": {r:5, w:1.5},
    "5r_1_25u.glb": {r:5, w:1.25},
    "5r_1u_c.glb": {r:5, w:1, convex:true},
    "5r_1_25u_c.glb": {r:5, w:1.25, convex:true},
    "5r_1_5u_c.glb": {r:5, w:1.5, convex:true},
    "5r_1_75u_c.glb": {r:5, w:1.75, convex:true},
    "5r_2u_c.glb": {r:5, w:2, convex:true},
    "5r_2_25u_c.glb": {r:5, w:2.25, convex:true},
    "5r_2_75u_c.glb": {r:5, w:2.75, convex:true},
    "5r_3u_c.glb": {r:5, w:3, convex:true},
    "5r_6u_c.glb": {r:5, w:6, convex:true},
    "5r_6_25u_c.glb": {r:5, w:6.25, convex:true},
    "5r_7u_c.glb": {r:5, w:7, convex:true},
    "ISO_enter.glb": {r:"special", w:"ISO", type:"ISO ENTER", nub:false, stepped:false}
}

const katList = {
    "KAT_1_25u_r5.glb": {r:"5", w:"1.25"},
    "KAT_1_5u_r2.glb": {r:"2", w:"1.5"},
    "KAT_1_5u_r3_stepped.glb": {r:"3", w:"1.5", stepped:true},
    "KAT_1_5u_r5.glb": {r:"5", w:"1.5"},
    "KAT_1_75u_r3.glb": {r:"3", w:"1.75"},
    "KAT_1_75u_r5.glb": {r:"5", w:"1.75"},
    "KAT_1u_r0.glb": {r:"0", w:"1"},
    "KAT_1u_r1.glb": {r:"1", w:"1"},
    "KAT_1u_r2.glb": {r:"2", w:"1"},
    "KAT_1u_r3.glb": {r:"3", w:"1"},
    "KAT_1u_r3_nub.glb": {r:"3", w:"1", nub:true},
    "KAT_1u_r4.glb": {r:"4", w:"1"},
    "KAT_1u_r5.glb": {r:"5", w:"1"},
    "KAT_2_25u_r3.glb": {r:"3", w:"2.25"},
    "KAT_2_25u_r4.glb": {r:"4", w:"2.25"},
    "KAT_2_75u_r4.glb": {r:"4", w:"2.75"},
    "KAT_2_75u_r5_convex.glb": {r:"5", w:"2.75", convex:true},
    "KAT_2u_r1.glb": {r:"1", w:"2"},
    "KAT_2u_r2_vertical.glb": {r:"2", w:"2", vertical:true},
    "KAT_2u_r4_vertical.glb": {r:"4", w:"2", vertical:true},
    "KAT_2u_r5.glb": {r:"5", w:"2"},
    "KAT_2u_r5_convex.glb": {r:"5", w:"2", convex:true},
    "KAT_3u_r5.glb": {r:"5", w:"3", convex:true},
    "KAT_6_25u_r5.glb": {r:"5", w:"6.25", convex:true},
    "KAT_6u_r5.glb": {r:"5", w:"6", convex:true},
    "KAT_7u_r5.glb": {r:"5", w:"7", convex:true},
    "KAT_ISO_ENTER.glb": {r:"special", w:"ISO", type:"ISO ENTER"}
}
const dsaList = {
    "1u.glb": {r:"0", w:"1"},
    "1_25u.glb": {r:"0", w:"1.25"}
}
const kamList = {
    "1u.glb": {r:"0", w:"1", nub:false, stepped:false},
    "1u_nub.glb": {r:"0", w:"1", nub:true, stepped:false},
    "1_25u.glb": {r:"0", w:"1.25", nub:false, stepped:false},
    "1_5u.glb": {r:"0", w:"1.5", nub:false, stepped:false},
    "1_75u.glb": {r:"0", w:"1.75", nub:false, stepped:false},
    "1_75u_stepped.glb": {r:"0", w:"1.25", nub:false, stepped:true},
    "2u.glb": {r:"0", w:"2", nub:false, stepped:false},
    // "2u_convex.glb": {r:"0", w:"2", convex:true},
    "2_25u.glb": {r:"0", w:"2.25", nub:false, stepped:false},
    "2_75u.glb": {r:"0", w:"2.75", nub:false, stepped:false},
    "3u_convex.glb": {r:"0", w:"3", nub:false, stepped:false},
    "6u_convex.glb": {r:"0", w:"6", nub:false, stepped:false},
    "6_25u_convex.glb": {r:"0", w:"6.25", nub:false, stepped:false},
    "7u_convex.glb": {r:"0", w:"7", nub:false, stepped:false},
    "ISO_ENTER.glb": {r:"special", w:"ISO", type:"ISO ENTER", nub:false, stepped:false}
}


function init(loadCB) {
    // get the canvas DOM element
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].canvas = document.getElementById('renderCanvas');
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].debugCanvas = document.getElementById('debugCanvas');

    // load the 3D engine
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].engine = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Engine"](_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].canvas, true);

    // call the createScene function
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene = createScene();
    let loading = [];

    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.getOutlineRenderer().zOffset = 11;
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.environmentIntensity = 0.7;
    let light = new babylonjs__WEBPACK_IMPORTED_MODULE_3__["DirectionalLight"]("DirectionalLight", new babylonjs__WEBPACK_IMPORTED_MODULE_3__["Vector3"](-0.5, -0.3, 0.28), _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
    light.autoCalcShadowZBounds = true;
    light.intensity = 2;
    gfxLocals.dirLight = light;

    // const shadowGenerator = new ShadowGenerator(2048, light);
    // shadowGenerator.useContactHardeningShadow = true;
    // shadowGenerator.bias = 0.009;
    // shadowGenerator.contactHardeningLightSizeUVRatio = 0.075;
    // gfxLocals.shadowGenerator = shadowGenerator;


    const switchAssetName = "MX_SWITCH_box.glb";
    loading.push(switchAssetName)
    babylonjs__WEBPACK_IMPORTED_MODULE_3__["SceneLoader"].LoadAssetContainer("assets/", switchAssetName, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene, function (container) {
        switchAsset.container = container;

        let i = loading.indexOf(switchAssetName);
        if (i >= 0) {
            loading.splice(i, 1 );
        }

        if(loading.length === 0) {
            loadCB();
        }
    });

    // for(const [n,d] of Object.entries(kamList)) {
    //     loading.push(n);
    //     SceneLoader.LoadAssetContainer("assets/KAM/", n, globals.scene, function (container) {
    //         if(!keyAssets.KAM[d.w]) {
    //             keyAssets.KAM[d.w] = [];
    //         }
    //         keyAssets.KAM[d.w].push({container:container, details:d});
    //         let i = loading.indexOf(n);
    //         if (i >= 0) {
    //             loading.splice(i, 1 );
    //         }

    //         if(loading.length === 0) {
    //             loadCB();
    //         }
    //     });
    // }

    for(const [n,d] of Object.entries(krkList)) {
        loading.push(n);
        babylonjs__WEBPACK_IMPORTED_MODULE_3__["SceneLoader"].LoadAssetContainer("assets/KRK/", n, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene, function (container) {
            if(!keyAssets.KRK[d.w]) {
                keyAssets.KRK[d.w] = [];
            }
            keyAssets.KRK[d.w].push({container:container, details:d});
            let i = loading.indexOf(n);
            if (i >= 0) {
                loading.splice(i, 1 );
            }

            if(loading.length === 0) {
                loadCB();
            }
        });
    }

    // for(const [n,d] of Object.entries(katList)) {
    //     SceneLoader.LoadAssetContainer("assets/KAT/", n, globals.scene, function (container) {
    //         if(!keyAssets.KAT[d.w]) {
    //             keyAssets.KAT[d.w] = {};
    //         }
    //         keyAssets.KAT[d.w][d.r] = {container:container, details:d};
    //     });
    // }

    // for(const [n,d] of Object.entries(dsaList)) {
    //     SceneLoader.LoadAssetContainer("assets/DSA/", n, globals.scene, function (container) {
    //         if(!keyAssets.DSA[d.w]) {
    //             keyAssets.DSA[d.w] = {};
    //         }
    //         keyAssets.DSA[d.w][d.r] = {container:container, details:d};
    //     });
    // }

    createMaterials();

	
	gfxLocals.ground = babylonjs__WEBPACK_IMPORTED_MODULE_3__["MeshBuilder"].CreateGround("ground1", {width:10000, height:10000}, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
	gfxLocals.ground.material = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats["gridMaterial"];
    gfxLocals.ground.isVisible = false;

    gfxLocals.frameHolder = babylonjs__WEBPACK_IMPORTED_MODULE_3__["MeshBuilder"].CreateBox("frameHolder", {}, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
    gfxLocals.frameHolder.material = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats["layoutFrame"];
    gfxLocals.frameHolder.isVisible = false;
}



/***/ }),

/***/ "./src/globals.js":
/*!************************!*\
  !*** ./src/globals.js ***!
  \************************/
/*! exports provided: globals */
/*! exports used: globals */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return globals; });
const globals = {
    renderData: { keys: {}, cases: {}, mats: {}, uiOutlines: {} }, // derived
    pcbData: {}, // derived
    keyAssets: {}
}

/***/ }),

/***/ "./src/inspectorstub.js":
/*!******************************!*\
  !*** ./src/inspectorstub.js ***!
  \******************************/
/*! exports provided: showInspector */
/*! exports used: showInspector */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showInspector; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_1__);



function showInspector() {
    window.BABYLON = { ...babylonjs__WEBPACK_IMPORTED_MODULE_1__ };
    if(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.debugLayer.isVisible()) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.debugLayer.hide();
    } else {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.debugLayer.show();
    }
}

/***/ }),

/***/ "./src/interactions.js":
/*!*****************************!*\
  !*** ./src/interactions.js ***!
  \*****************************/
/*! exports provided: addBinding, removeBinding, blockKeyBindings, unblockKeyBindings, addPointerBinding, removePointerBinding, init */
/*! exports used: addBinding, addPointerBinding, blockKeyBindings, init, removePointerBinding, unblockKeyBindings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addBinding; });
/* unused harmony export removeBinding */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return blockKeyBindings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return unblockKeyBindings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addPointerBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return removePointerBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return init; });
const keyBindings = {"keydown": {}};
const pointerBindings = {};
let areKeyBindingsBlocked = false; 

function addBinding(eventName, keyName, action) {
    if(keyBindings[eventName][keyName]) {
        console.log(`rebinding event ${eventName} key ${keyName}`);
    }
    keyBindings[eventName][keyName] = action;
}

function removeBinding(eventName, keyName) {
    keyBindings[eventName][keyName] = null;
}

function blockKeyBindings() {
    areKeyBindingsBlocked = true;
}

function unblockKeyBindings() {
    areKeyBindingsBlocked = false;
}

function keydownEvent(event) {
    if(!areKeyBindingsBlocked && keyBindings["keydown"][event.key]) {
        keyBindings["keydown"][event.key](event);
    }
    else {
        console.log(`unbound key ${event.key}`)
    }
}

function addPointerBinding(evName, action) {
    if(pointerBindings[evName]) {
        console.log(`rebinding pointer event ${evName}`)
    }
    pointerBindings[evName] = action;
}

function removePointerBinding(evName) {
    pointerBindings[evName] = null;
}

function init(scene) {
    window.addEventListener('keydown', event => keydownEvent(event))

    scene.onPointerObservable.add((pointerInfo) => {
        if(pointerBindings[pointerInfo.type]) {
            // console.log(`bound pointer event ${pointerInfo.type}`)
            pointerBindings[pointerInfo.type](pointerInfo);
        }
        else {
            // console.log(`unbound pointer event ${pointerInfo.type}`)
        }
            // case PointerEventTypes.POINTERDOWN:
            // case PointerEventTypes.POINTERUP:
            // case PointerEventTypes.POINTERMOVE:
            // case PointerEventTypes.POINTERWHEEL:
            // case PointerEventTypes.POINTERPICK:
            // case PointerEventTypes.POINTERTAP:
            // case PointerEventTypes.POINTERDOUBLETAP:
    });
}

/***/ }),

/***/ "./src/keyPicking.js":
/*!***************************!*\
  !*** ./src/keyPicking.js ***!
  \***************************/
/*! exports provided: pickedKeys, refreshOutlines, clearPickedKeys, pickKey, togglePickedKey */
/*! exports used: clearPickedKeys, pickKey, pickedKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return pickedKeys; });
/* unused harmony export refreshOutlines */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return clearPickedKeys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return pickKey; });
/* unused harmony export togglePickedKey */
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _coremath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coremath.js */ "./src/coremath.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_2__);




const pickedKeys = []

function refreshOutlines() {
    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    let oRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.uiOutlines;
    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;

    for (const [k, o] of Object.entries(oRD)) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(o);
        o.dispose();
    }

    for (const id of pickedKeys) {
        if (!kRD[id]) {
            console.log("picked nonexistant key");
        }
        else {
            let rd = kRD[id];

            oRD[id] = babylonjs__WEBPACK_IMPORTED_MODULE_2__["MeshBuilder"].CreateRibbon(id + "outline",
                {
                    pathArray: [_coremath_js__WEBPACK_IMPORTED_MODULE_1__[/* genArrayFromOutline */ "g"](rd.outline, 0.1, 0.1, true),
                        _coremath_js__WEBPACK_IMPORTED_MODULE_1__[/* genArrayFromOutline */ "g"](rd.outline, 0.5, 0.5, true)]
                }, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
            oRD[id].material = mats["keySel"];
            oRD[id].translate(new babylonjs__WEBPACK_IMPORTED_MODULE_2__["Vector3"](0, 10.5, 0), 1, babylonjs__WEBPACK_IMPORTED_MODULE_2__["Space"].LOCAL);
        }
    }
}

function clearPickedKeys() {
    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
    for (const id of pickedKeys) {
        if (!kRD[id]) {
            console.log("picked nonexistant key");
        } else {
            let rd = kRD[id];
            rd.keycap.renderOverlay = false;
            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = false; 
            }
        }
    }
    pickedKeys.length = 0;
}

function pickKey(id) {
    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;

    if (!kRD[id]) {
        console.log("picked nonexistant key");
    } else {
        let rd = kRD[id];
        if (pickedKeys.indexOf(id) < 0) {
            rd.keycap.renderOverlay = true;

            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = true; 
            }
            pickedKeys.push(id);
        }
    }
}

function togglePickedKey(id) {
    let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;

    if (!kRD[id]) {
        console.log("picked nonexistant key");
    } else {
        let rd = kRD[id];
        if (pickedKeys.indexOf(id) >= 0) {
            rd.keycap.renderOverlay = false;
            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = false; 
            }
            pickedKeys.splice(pickedKeys.indexOf(id), 1)
        } else {
            rd.keycap.renderOverlay = true;

            for (const child of rd.keycap.getChildMeshes()){			
                child.renderOverlay = true; 
            }
            pickedKeys.push(id);
        }
    }
}

/***/ }),

/***/ "./src/keytypes.js":
/*!*************************!*\
  !*** ./src/keytypes.js ***!
  \*************************/
/*! exports provided: labelsInfo */
/*! exports used: labelsInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return labelsInfo; });
const labelsInfo = {
    "esc": {usage:"func", row:0},
    "escape": {usage:"func", row:0},

    "f1": {usage:"func", row:0},
    "f2": {usage:"func", row:0},
    "f3": {usage:"func", row:0},
    "f4": {usage:"func", row:0},
    "f5": {usage:"func", row:0},
    "f6": {usage:"func", row:0},
    "f7": {usage:"func", row:0},
    "f8": {usage:"func", row:0},
    "f9": {usage:"func", row:0},
    "f10": {usage:"func", row:0},
    "f11": {usage:"func", row:0},
    "f12": {usage:"func", row:0},

    "print": {usage:"func", row:0},
    "printscr": {usage:"func", row:0},
    "prtsc": {usage:"func", row:0},
    "scr": {usage:"func", row:0},
    "scroll lock": {usage:"func", row:0},
    "scroll": {usage:"func", row:0},
    "pause": {usage:"func", row:0},
    "break": {usage:"func", row:0},


    "ins": {usage:"func", row:1},
    "insert": {usage:"func", row:1},
    "hom": {usage:"func", row:1},
    "home": {usage:"func", row:1},
    "pgup": {usage:"func", row:1},
    "page up": {usage:"func", row:1},

    "del": {usage:"func", row:2},
    "delete": {usage:"func", row:2},
    "end": {usage:"func", row:2},
    "pgdn": {usage:"func", row:2},
    "page down": {usage:"func", row:2},

    "`": {usage:"punc", row:1},
    "~": {usage:"punc", row:1},
    "1": {usage:"num_row", row:1},
    "2": {usage:"num_row", row:1},
    "3": {usage:"num_row", row:1},
    "4": {usage:"num_row", row:1},
    "5": {usage:"num_row", row:1},
    "6": {usage:"num_row", row:1},
    "7": {usage:"num_row", row:1},
    "8": {usage:"num_row", row:1},
    "9": {usage:"num_row", row:1},
    "0": {usage:"num_row", row:1},
    "-": {usage:"punc", row:1},
    "+": {usage:"punc", row:1},

    "tab": {usage:"mod", row:2},
    "q": {usage:"alph", row:2},
    "w": {usage:"alph", row:2},
    "e": {usage:"alph", row:2},
    "r": {usage:"alph", row:2},
    "t": {usage:"alph", row:2},
    "y": {usage:"alph", row:2},
    "u": {usage:"alph", row:2},
    "i": {usage:"alph", row:2},
    "o": {usage:"alph", row:2},
    "p": {usage:"alph", row:2},
    "[": {usage:"punc", row:2},
    "]": {usage:"punc", row:2},
    "\\": {usage:"punc", row:2},

    "a": {usage:"alph", row:3},
    "s": {usage:"alph", row:3},
    "d": {usage:"alph", row:3},
    "f": {usage:"alph", row:3},
    "g": {usage:"alph", row:3},
    "h": {usage:"alph", row:3},
    "j": {usage:"alph", row:3},
    "k": {usage:"alph", row:3},
    "l": {usage:"alph", row:3},
    ";": {usage:"punc", row:3},
    "'": {usage:"punc", row:3},

    "z": {usage:"alph", row:4},
    "x": {usage:"alph", row:4},
    "c": {usage:"alph", row:4},
    "v": {usage:"alph", row:4},
    "b": {usage:"alph", row:4},
    "n": {usage:"alph", row:4},
    "m": {usage:"alph", row:4},
    ",": {usage:"punc", row:4},
    ".": {usage:"punc", row:4},
    "/": {usage:"punc", row:4}

}

/***/ }),

/***/ "./src/pcbOps.js":
/*!***********************!*\
  !*** ./src/pcbOps.js ***!
  \***********************/
/*! exports provided: clearPCBs, addDevice, createNets, refreshPCBOutline, routePCB */
/*! exports used: addDevice, clearPCBs, refreshPCBOutline, routePCB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return clearPCBs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addDevice; });
/* unused harmony export createNets */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return refreshPCBOutline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return routePCB; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _boardData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardData.js */ "./src/boardData.js");
/* harmony import */ var _tuning_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tuning.js */ "./src/tuning.js");
/* harmony import */ var _coremath_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./coremath.js */ "./src/coremath.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flatqueue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flatqueue */ "./node_modules/flatqueue/index.mjs");
/* harmony import */ var _bootstrap_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bootstrap.js */ "./src/bootstrap.js");








// import { PCBData } from "kbgb-wasm";
// import { memory } from "kbgb-wasm/kbgb_wasm_bg";


// DRL = drill  
// GKO = outline           +
// GTP = solder paste top   +
// GBP = solder paste bottom +
// GTS = solder mask top - 
// GBS = solder mask bottom - (negative)
// GTO = silkscreen top +
// GBO = silkscreen bottom +
// GTL = copper top +
// GBL = copper bottom +
// GL2 = inner 2 +
// GL3 = inner 3 +

const defaultTrackWidth = 0.2032; // 8 mil.  10 mil = .25, pins are 2.25, maybe go with that as a mult?


// FIX THIS TO GEN PIN IDS
function genPads(centerToPadStart, sideWidth, nPadsPerSide, padH, padW, padPitch) {
    let pads = [];

    const corners = [{x:0,y:1},{x:0,y:0},{x:1,y:0},{x:1,y:1},]

    let pin = 1;
    //assume 4 sides
    for(let t = -1; t <= 1; t+=2) {
        for(let s = 0; s <= 1; s++) {
            for(let p = 0; p < nPadsPerSide; p++) {
                let pos = -(sideWidth / 2) + p*padPitch;
                let poly = [];
                let loc = [0,0];
                for(const corner of corners) {
                    let pX = pos + corner.x*padW;
                    let pY = centerToPadStart + corner.y*padH;
                    let fX = s==0?pX*t:pY*t;
                    let fY = s==1?pX*t:pY*t;
                    poly.push([fX,fY]);
                    loc[0] += fX; loc[1] += fY;
                }
                loc[0] /= corners.length;
                loc[1] /= corners.length;
                pads.push({pin:pin,poly:poly,loc:loc});
                pin+=1;
            }
        }
    }

    return pads;
}

//bounds are half width / half height
const footprintDefs = {
    "mx":{
        pthDefs: {
            "switchPin":  {radius:1.470/2, ring: 0.78/2},
            "stemPin": {radius:3.988/2, ring:0.0},
            "sidePin": {radius:1.75/2, ring:0.0}
        },
        bounds: [9,6.75],
        pthList: [
            {pin: 1, loc: [-3.81, 2.54], defName:"switchPin"},
            {pin: 2, loc: [2.54, 5.080], defName:"switchPin"},
            {pin: 0, loc: [0, 0], defName:"stemPin"},
            {pin: 0, loc: [-5.08, 0], defName:"sidePin"},
            {pin: 0, loc: [5.08, 0], defName:"sidePin"}
        ],
        pins: ["1","2"]
    },
    "mx_hotswap": {
        pthDefs: {
            "switchPin":  {radius:3.0/2, ring: 0.1/2},
            "stemPin": {radius:3.988/2, ring:0.0},
            "sidePin": {radius:1.75/2, ring:0.0}
        },
        bounds: [9,6.75],
        pthList: [
            {pin: 1, loc: [-3.81, 2.54], defName:"switchPin"},
            {pin: 2, loc: [2.54, 5.08], defName:"switchPin"},
            {pin: 0, loc: [0, 0], defName:"stemPin"},
            {pin: 0, loc: [-5.08, 0], defName:"sidePin"},
            {pin: 0, loc: [5.08, 0], defName:"sidePin"}
        ],  //x: p loc + 2.275, to 2.275 + 2.55, z = ploc +/1.25
        padList: [{pin:1, 
                   poly:[[-3.81, 2.54], [-3.81-2.275, 2.54 + 1.25],[-3.81-2.275-2.55, 2.54 + 1.25],[-3.81-2.275-2.55, 2.54 - 1.25],[-3.81-2.275, 2.54 - 1.25]],
                   loc:[-3.81-2.275-(2.55/2),2.54]}, 
                  {pin:2,
                   poly:[[2.54, 5.08], [2.54+2.275, 5.08 + 1.25],[2.54+2.275+2.55, 5.08 + 1.25],[2.54+2.275+2.55, 5.08 - 1.25],[2.54+2.275, 5.08 - 1.25]],
                   loc:[2.54+2.275+(2.55/2),5.08]}],
        pins: ["1","2"]
    },
    "oled":{
        bounds:[15,6.75]
    },
    "ec11":{
        bounds:[15/2,12/2]
    },
    "stab":{
        pthDefs: {
            "smallPin":  {radius:3.048/2, ring: 0},
            "bigPin": {radius:3.9878/2, ring:0}
        },
        bounds:[3,9],
        pthList: [
            {pin: 0, loc: [0, -6.985], defName:"smallPin"},
            {pin: 0, loc: [0, 8.255], defName:"bigPin"}
        ]
    },
    "UFQFPN48":{
        bounds: [7.3/3,7.3/2],
        padList: genPads(3.1, 5.8, 12, 0.55, 0.3, 0.5),
        pins:[]
    }
};

function clearPCBs() {
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData = {};
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
    for(const [k,cBD] of Object.entries(bd.cases)) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData[k] = {outline:[], devices:{}, nets:{}, caseIdx:k};
    }
}

function addDevice(id, t, xForm, caseIdx) {
    const pcbData = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData;
    const caseData = pcbData[caseIdx];
    if(!caseData.devices[id]) {
        caseData.devices[id] = {footprints:[],type:t,id:id, caseIdx:caseIdx};
    }
    let d = caseData.devices[id];

    let newDef = footprintDefs[t];
    let newFootprint = {pths:[],pads:[]};

    if(newDef.bounds) {
        newFootprint.box = _coremath_js__WEBPACK_IMPORTED_MODULE_3__[/* createRectPoly */ "d"](newDef.bounds[0], newDef.bounds[1], xForm);
        newFootprint.bounds = {mins:[100000.0, 100000.0],
            maxs:[-100000.0, -100000.0]};

        for(let p of newFootprint.box.points) {
            newFootprint.bounds.mins[0] = Math.min(newFootprint.bounds.mins[0], p.x);
            newFootprint.bounds.maxs[0] = Math.max(newFootprint.bounds.maxs[0], p.x);
            newFootprint.bounds.mins[1] = Math.min(newFootprint.bounds.mins[1], p.z);
            newFootprint.bounds.maxs[1] = Math.max(newFootprint.bounds.maxs[1], p.z);
        }
    }

    if(newDef.pins) {
        newFootprint.pins = {};
        for(const pin of newDef.pins) {
            newFootprint.pins[pin] = {name:pin};
        }
    }

    if(newDef.pthList) {
        for(const hole of newDef.pthList) {
            const holeDef = newDef.pthDefs[hole.defName];
            const pth = {type:"pth", radius:holeDef.radius, ring:holeDef.ring};
            if(hole.pin) {
                pth.pin = newFootprint.pins[hole.pin];
            }
            pth.location = babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"](hole.loc[0], 0, hole.loc[1]), xForm);
            newFootprint.pths.push(pth);
        }
    }

    if(newDef.padList) {
        for(const pad of newDef.padList) {
            let xPad = [];
            for(const p of pad.poly) {
                const xformedP = babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"](p[0], 0, p[1]), xForm);
                xPad.push(xformedP);
            }
            const xformedLocation = babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"].TransformCoordinates(new babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"](pad.loc[0], 0, pad.loc[1]), xForm);
            const newPad = {type:"pad", poly:xPad,location:xformedLocation};
            if(pad.pin) {
                newPad.pin = newFootprint.pins[pad.pin];
            }
            newFootprint.pads.push(newPad);
        }
    }

    d.footprints.push(newFootprint)
}

function createMatrix(pcb) {
    let maxCols = 26;
    let maxRows = 26;
    let maxW = Math.min(maxCols,Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0])/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0]));
    let maxH = Math.min(maxRows,Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1])/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1]));
    let matrix = [];
    console.log(`Max matrix: ${maxW} cols ${maxH} rows`)
    for(let i = 0; i < maxH; i++) {
        matrix.push(new Array(maxW));
    }
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            // HAAACK if it has pins, needs to be in the matrix
            if(f.pins) {
                let colGuess = Math.floor((f.bounds.mins[0]-pcb.outlineBounds.mins[0])/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0]) % maxW;
                let rowGuess = Math.floor((f.bounds.mins[1]-pcb.outlineBounds.mins[1])/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1]) % maxH;

                let ogCol = colGuess;
                let ogRow = rowGuess;
                // console.log(`initial guess: row ${rowGuess} col ${colGuess}`)
                while( matrix[rowGuess][colGuess] ) {
                    colGuess += 1;
                    //TODO BETTER INSERTION HERE
                    console.log(`bumping to: row ${rowGuess} col ${colGuess}`)
                }
                matrix[rowGuess][colGuess] = f;
                f.matrixPos = {row:rowGuess, col:colGuess};
                // for( let p of f.pins) {
                //     kPs.push(p)
                // }
            }
        }
    }
    return matrix;
}

function genVoronoi(pcb) {
    var vSites = [];
    var bbox = {xl:1000000, xr:-1000000, yt:1000000, yb:-1000000};

    let addSite = function(x,y) {
        const site = {x:x,y:y};
        vSites.push(site);
        bbox.xl = Math.min(site.x,bbox.xl);
        bbox.xr = Math.max(site.x,bbox.xr);
        bbox.yt = Math.min(site.y,bbox.yt);
        bbox.yb = Math.max(site.y,bbox.yb);
    }

    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                addSite(pth.location.x,pth.location.z);
            }
        }
    }

    // // hrm: add outline points?
    // for(let p of pcb.outline) {
    //     addSite(p.x,p.z);
    // }

    bbox.xl -= 1000;
    bbox.yt -= 1000;
    bbox.xr += 1000;
    bbox.yb += 1000;
                
    // xl, xr means x left, x right
    // yt, yb means y top, y bottom
    let voronoi = new Voronoi();
    // pass an object which exhibits xl, xr, yt, yb properties. The bounding
    // box will be used to connect unbound edges, and to close open cells
    const vRes = voronoi.compute(vSites, bbox);
    // render, further analyze, etc.

    // console.log(`voronoi!`);
    // console.log(vRes);
}

function genSDF(pcb) {
    var startTime = window.performance.now();
    const cellSizeMM = pcb.trackWidth*10;
    const cellSizeMMInv = 1.0/cellSizeMM;
    const xStart = pcb.outlineBounds.mins[0];
    const yStart = pcb.outlineBounds.mins[1];
    let w = Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0]) * cellSizeMMInv);
    let h = Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv);

    console.log(`SDF: ${w} cols ${h} rows`)

    if( w <= 0 || h <= 0 ) {
        console.log(`No PCB SDF`)
        return;
    }
    let sdf = [];
    for(let i = 0; i < h; i++) {
        sdf.push(new Array(w).fill(100000.0));
    }

    // splat some 3x3 blocks circles into things
    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                const center = [(pth.location.x - xStart)*cellSizeMMInv,(pth.location.z-yStart)*cellSizeMMInv];
                const radius = pth.radius + pth.ring;
                const cX = Math.floor(center[0]);
                const cY = Math.floor(center[1]);

                for(let oy = -1; oy<=1; oy++) {
                    for(let ox = -1; ox<=1; ox++) {
                        const y = cY - oy;
                        const x = cX - ox;
                        if(x >= 0 && x < w && y >= 0 && y < h) {
                            const distSq = Math.pow(center[0]-x,2)+Math.pow(center[1]-y,2);
                            const dist = Math.sqrt(distSq)-radius;
                            sdf[y][x] = Math.min(sdf[y][x], dist);
                        }
                    }
                }
            }
        }
    }

    // console.log("preblur");
    //blur it
    const dirs = [{d:[1,0],pX:[w-1,-1,-1],pY:[0,h,1]},
                  {d:[-1,0],pX:[0,w,1],pY:[0,h,1]},
                  {d:[0,1],pX:[0,w,1],pY:[h-1,-1,-1]},
                  {d:[0,-1],pX:[0,w,1],pY:[0,h,1]}];

    for(const dir of dirs) {
        // for(let y = 0; y < h; y++) {
        //     console.log(sdf[y]);
        // }
        // console.log("blur");
        // console.log(dir);
        for(let y = dir.pY[0]; y != dir.pY[1]; y+=dir.pY[2]) {
            const oY = y + dir.d[1];
            for(let x = dir.pX[0]; x != dir.pX[1]; x+=dir.pX[2]) {
                const oX = x + dir.d[0];
                if(oX >= 0 && oX < w && oY >= 0 && oY < h) {
                    sdf[y][x] = Math.min(sdf[y][x], sdf[oY][oX]+1);
                } else {
                    sdf[y][x] = Math.min(sdf[y][x], 1);
                }
            }
        } 
    }

    let maxD = -10000;
    let coords = [0,0];
    // console.log("postblur");
    for(let y = 0; y < h; y++) {
        // console.log(sdf[y]);
        for(let x = 0; x < w; x++) {
            if(sdf[y][x] > maxD) {
                maxD = sdf[y][x];
                coords[0] = x;
                coords[1] = y;
            }
        }
    }

    console.log(`SDF locating took ${window.performance.now()-startTime}`);

    let maxPos = [coords[0]*cellSizeMM + xStart, coords[1]*cellSizeMM + yStart];

    console.log(`empty zone: ${maxPos[0]} ${maxPos[1]} clearance ${maxD * cellSizeMM}`)

    let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_4__["Matrix"].RotationY(45.0 * Math.PI / 180.0);
    kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_4__["Matrix"].Translation(maxPos[0], 0, maxPos[1]));

    addDevice("MCU", "UFQFPN48", kXform, pcb.caseIdx);
}

function createNets(pcb) {
    const startTime = window.performance.now();
    const matrix = createMatrix(pcb);

    console.log(_bootstrap_js__WEBPACK_IMPORTED_MODULE_6__[/* wasmImport */ "a"].PCBData);
    const pcbData = _bootstrap_js__WEBPACK_IMPORTED_MODULE_6__[/* wasmImport */ "a"].PCBData.new();
    console.log(pcbData);
    pcbData.set_bounds(pcb.outlineBounds.mins[0],pcb.outlineBounds.mins[1],pcb.outlineBounds.maxs[0],pcb.outlineBounds.maxs[1]);
    const pcbX = pcbData.route();
    console.log(`pcbX ${pcbX}`);

    return;

    const matrixCreatedTime = window.performance.now();
    const cellSizeMM = 0.8;// via size, was
    // const cellSizeMM = 1.5*pcb.trackWidth;
    const cellSizeMMInv = 1.0/cellSizeMM;
    const xStart = pcb.outlineBounds.mins[0];
    const yStart = pcb.outlineBounds.mins[1];
    let w = Math.ceil((pcb.outlineBounds.maxs[0] - pcb.outlineBounds.mins[0]) * cellSizeMMInv);
    let h = Math.ceil((pcb.outlineBounds.maxs[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv);
    let occupancy = [[],[]];
    let vias = [];
    const top = 0;
    const bottom = 1;
    console.log(`occupancy: ${w} cols ${h} rows`)
    const s0 = babylonjs__WEBPACK_IMPORTED_MODULE_4__["TmpVectors"].Vector3[11];
    s0.x = pcb.outlineBounds.mins[0] - 100.0;
    s0.y = 0;
    const s1 = babylonjs__WEBPACK_IMPORTED_MODULE_4__["TmpVectors"].Vector3[12];
    s1.x = pcb.outlineBounds.maxs[0] + 100.0;
    s1.y = 0;

    // mark areas outside the mesh as 'out'
    let out_marker = {type:"out"};
    for(let i = 0; i < h; i++) {
        occupancy[0].push(new Array(w));
        occupancy[1].push(new Array(w));
        vias.push({});
        //rasterize across each line of the occupancy
        const lineZ = pcb.outlineBounds.mins[1] + cellSizeMM*(i+0.5);
        s0.z = s1.z = lineZ
        const intersections = _coremath_js__WEBPACK_IMPORTED_MODULE_3__[/* polyIntersectionSlice */ "q"](s0, s1, pcb.outline);
        intersections.sort((a,b) => a.x - b.x);

        let is_out = true;
        let nextIntIdx = 0;
        for(let j = 0; j < w; j++) {
            if(intersections.length > nextIntIdx) {
                const pointX = is_out?pcb.outlineBounds.mins[0] + cellSizeMM*(j-1.5):pcb.outlineBounds.mins[0] + cellSizeMM*(j+1.5);
                let nextIntersection = intersections[nextIntIdx]
                while(intersections.length > nextIntIdx && nextIntersection.x < pointX ) {
                    is_out = !is_out;
                    nextIntIdx+=1;
                    nextIntersection = intersections[nextIntIdx]
                }
            }
            if(is_out) {
                occupancy[0][i][j] = out_marker;
                occupancy[1][i][j] = out_marker;
            }
        }
    }

    for( let [id,d] of Object.entries(pcb.devices) ) {
        for(let f of d.footprints) {
            for( const pth of f.pths ) {
                // i guess we could assign nets here
                let pin = pth.pin;
                if(pin && !pin.net) {
                    if(pin.name == 1) {
                        pin.net = `mRow${f.matrixPos.row}`;
                        pin.subnet = -1;
                    }
                    else if(pin.name == 2) {
                        pin.net = `mCol${f.matrixPos.col}`;
                        pin.subnet = -1;
                    }
                }

                if(pin && pin.net) {
                    if(!pcb.nets[pin.net]) {
                        pcb.nets[pin.net] = {members:[],connectivity:[]};
                    }
                    if(pin.subnet == -1) {
                        pin.subnet = pcb.nets[pin.net].connectivity.length;
                        pcb.nets[pin.net].connectivity.push([pin.subnet]);
                    }
                    pcb.nets[pin.net].members.push(pth);   // NOT pin
                }
                // rasterize this into the occupancy map
                // deal with if this was already set?
                const center = [(pth.location.x - xStart)*cellSizeMMInv,(pth.location.z-yStart)*cellSizeMMInv];
                const radius = pth.radius + pth.ring + cellSizeMM;
                const pixRad = Math.ceil(radius * cellSizeMMInv);
                for( let x = -pixRad; x <= pixRad; x++ ) {
                    const locX = center[0] + x;
                    if( locX < 0 || locX >= w) {
                        continue;
                    }
                    for( let y = -pixRad; y <= pixRad; y++ ) {
                        const locY = center[1] + y;
                        if( locY < 0 || locY >= h) {
                            continue;
                        }

                        if(x*x+y*y < pixRad*pixRad) {
                            occupancy[0][Math.floor(locY)][Math.floor(locX)] = pth;
                            occupancy[1][Math.floor(locY)][Math.floor(locX)] = pth;
                        }
                    }
                }
            }
            for( const padInfo of f.pads ) {
                // todo: currently we assume all pads are on the bottom

                // i guess we could assign nets here
                let pin = padInfo.pin;
                if(pin && !pin.net) {
                    if(pin.name == 1) {
                        pin.net = `mRow${f.matrixPos.row}`;
                        pin.subnet = -1;
                    }
                    else if(pin.name == 2) {
                        pin.net = `mCol${f.matrixPos.col}`;
                        pin.subnet = -1;
                    }
                }

                if(pin && pin.net) {
                    if(!pcb.nets[pin.net]) {
                        pcb.nets[pin.net] = {members:[],connectivity:[]};
                    }
                    if(pin.subnet == -1) {
                        pin.subnet = pcb.nets[pin.net].connectivity.length;
                        pcb.nets[pin.net].connectivity.push([pin.subnet]);
                    }
                    pcb.nets[pin.net].members.push(padInfo);   // NOT pin
                }

                const pad = padInfo.poly;
                let mins = [100000,100000]
                let maxs = [-100000,-100000]
                for(const p of pad) {
                    mins[0] = Math.min(mins[0],p.x);
                    mins[1] = Math.min(mins[1],p.z);
                    maxs[0] = Math.max(maxs[0],p.x);
                    maxs[1] = Math.max(maxs[1],p.z);
                }
                let minJ = Math.floor((mins[1] - pcb.outlineBounds.mins[1]) * cellSizeMMInv)-1;
                let jSpan = Math.ceil((maxs[1]-mins[1]) * cellSizeMMInv)+2;

                let padRasterLines = new Array(jSpan);
                for(let j = 0; j < jSpan; j++) {
                    padRasterLines[j] = [];
                }

                const lP = babylonjs__WEBPACK_IMPORTED_MODULE_4__["TmpVectors"].Vector3[10];

                for(let iP = 0; iP < pad.length; iP++) {
                    const p = pad[iP];
                    const nP = pad[(iP+1)%pad.length];
                    nP.subtractToRef(p,lP);
                    
                    let minH = Math.floor((Math.min(p.z, nP.z) - pcb.outlineBounds.mins[1]) * cellSizeMMInv)-1;
                    let hOffset = minH - minJ;
                    let maxH = Math.ceil((Math.max(p.z, nP.z) - pcb.outlineBounds.mins[1]) * cellSizeMMInv)+1;
                    let hSpan = maxH-minH;

                    let minX = Math.min(p.x, nP.x);
                    let maxX = Math.max(p.x, nP.x);

                    const ws = new Array(hSpan);
                    for(let h = 0; h < hSpan; h++) { 
                        const z = (h+minH) * cellSizeMM + pcb.outlineBounds.mins[1];
                        if(lP.z < babylonjs__WEBPACK_IMPORTED_MODULE_4__["Epsilon"]) {
                            if(h==0) {
                                ws[h] = minX;
                            } else {
                                ws[h] = maxX;
                            }
                        }
                        else {
                            ws[h] = Math.min(Math.max(minX,((z - p.z) / lP.z) * lP.x + p.x),maxX);
                        }
                    }
                    for(let h = 0; h < hSpan-1; h++) { 
                        const l = padRasterLines[h+hOffset];
                        const maxW = Math.max(ws[h],ws[h+1]);
                        const minW = Math.min(ws[h],ws[h+1]);
                        if(l.length > 1 ) {
                            l[0] = Math.min(l[0],minW);
                            l[1] = Math.max(l[1],maxW);
                        }
                        else {
                            l[0] = minW;
                            l[1] = maxW;
                        }

                        // whoops this was overkill.  actually did wireframe blitting
                        // //insert max/min range
                        // let iRL = 0;
                        // while(iRL != l.length && l[iRL] < minW) {
                        //     iRL++;
                        // }
                        // if(iRL%2 == 0) {
                        //     // new range
                        //     if(iRL == l.length || maxW < l[iRL]) {
                        //         l.splice(iRL,0,minW,maxW);
                        //     }
                        //     else {
                        //         let jRL = iRL;
                        //         while(jRL != l.length && l[jRL] < maxW) {
                        //             jRL++;
                        //         }
                        //         if(jRL%2==1) {
                        //             //ending in a range
                        //             l.splice(iRL,jRL-iRL,minW);
                        //         } else {
                        //             //consume range(s)
                        //             l.splice(iRL,jRL-iRL,minW,maxW);
                        //         }
                        //     }
                        // }
                        // else { //starting in a range
                        //     let jRL = iRL;
                        //     while(jRL != l.length && l[jRL] < maxW) {
                        //         jRL++;
                        //     }
                        //     if(jRL%2==1) {
                        //         //ending in a range
                        //         l.splice(iRL,jRL-iRL);
                        //     } else {
                        //         //merge ranges
                        //         l.splice(iRL,jRL-iRL,maxW);
                        //     }
                        // }
                    }
                }

                // HARDCODED TO BOTTOM HERE, FIX THIS SOMEDAY
                const side = 0;
                // write the lines into the map
                for(let j = 0; j < jSpan; j++) {
                    const l = padRasterLines[j];
                    const destH = j+minJ;
                    for(let i = 0; i < l.length; i+=2) {
                        const start = Math.floor((l[i] - xStart)*cellSizeMMInv)-1;
                        const end = Math.ceil((l[i+1] - xStart)*cellSizeMMInv)+1; // todo check offset by 1?
                        // console.log(`writing from ${start} to ${end}`)
                        for(let x = start; x <= end; x++) {
                            if(!occupancy[side][destH][x]) {
                                occupancy[side][destH][x] = padInfo;
                            }
                        }
                    }
                }
            }
        }
    }


    const occupancyCreatedTime = window.performance.now();

    pcb.topRoutes = [];
    pcb.bottomRoutes = [];
    pcb.vias = [];

    function connectGraphs(net,ia,ib) {
        let a = net.connectivity[ia];
        let b = net.connectivity[ib];
        for(const v of b) {
            if(!a.includes(v)) {
                a.push(v);
            }
            net.connectivity[v] = a;
        }
    }

    pathingLoop:
    for(const [netName,net] of Object.entries(pcb.nets)) {
        while(net.connectivity[0].length != net.connectivity.length) {
            // for(const pth of net.members) {
            {
                const pth = net.members[0];
                if(net.connectivity[0].length == net.connectivity.length) break;
                // pathfind from here to the net!
                // always start on the bottom
                let current = [Math.floor((pth.location.x - xStart)*cellSizeMMInv),Math.floor((pth.location.z-yStart)*cellSizeMMInv),0];//(pth.pin == 1)?0:1];
                let currentDist = 0;
                let startTok = current[2]*w*h+current[1]*w+current[0];
                const cameFrom = {};
                cameFrom[startTok] = `START`;
                const pending = new flatqueue__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]();
                let destination = false;
                while(!destination) {
                    let curTok = current[2]*w*h+current[1]*w+current[0];
                    for(let i = 0; i<5; i++) {
                        let xOffset = i==0?-1:(i==1?1:0);
                        let yOffset = i==2?-1:(i==3?1:0);
                        let side = i==4?(1^current[2]):current[2];
                        let next = [current[0]+xOffset,current[1]+yOffset, side];
                        if(next[0]>=0 && next[0] < w && next[1]>=0 && next[1] < h) {
                            let occupant = occupancy[next[2]][next[1]][next[0]];
                            const nameTok = next[2]*w*h+next[1]*w+next[0];
                            if(!cameFrom[nameTok]) {
                                let blocker = (occupant && occupant != pth && (!occupant.pin || occupant.pin.net != pth.pin.net || (side != current[2] && occupant.type == "pad")))
                                if( !blocker ) {
                                    cameFrom[nameTok] = curTok;

                                    let cost = (next[2]!=current[2])?80:10; //8x the cost for a via
                                    let findCostGuess = function() {
                                        let minGuess = 100000000;
                                        for(const oth of net.members) { 
                                            if(!net.connectivity[oth.pin.subnet].includes(pth.pin.subnet)) {
                                                let end = [Math.floor((oth.location.x - xStart)*cellSizeMMInv),Math.floor((oth.location.z-yStart)*cellSizeMMInv)];

                                                // let estCost = Math.abs(end[0]-next[0]) + Math.abs(end[1]-next[1]);
                                                let estCost = Math.sqrt(Math.pow(Math.abs(end[0]-next[0]),2) + Math.pow(Math.abs(end[1]-next[1]),2));
                                                // add cost of side switching for pads
                                                if(oth.type == "pad" && next[2] != 0) {
                                                    estCost += 8;
                                                }
                                                estCost *= 7; // this needs to be < 10.  lower gives better paths but takes longer
                                                
                                                minGuess = Math.min(minGuess,estCost);
                                            }
                                        }
                                        return minGuess;
                                    }

                                    if(occupant) {
                                        if(!net.connectivity[occupant.pin.subnet].includes(pth.pin.subnet)) {
                                            console.log(`found a route`);
                                            console.log(pth);
                                            console.log(occupant);
                                            if(occupant.location) {
                                                let end = [Math.floor((occupant.location.x - xStart)*cellSizeMMInv),Math.floor((occupant.location.z-yStart)*cellSizeMMInv)];
                                                let endTok = next[2]*w*h+end[1]*w+end[0];
                                                cameFrom[endTok] = curTok;
                                                destination = endTok;
                                            }
                                            else {
                                                destination = nameTok;
                                            }
                                            connectGraphs(net, occupant.pin.subnet, pth.pin.subnet);
                                            break;
                                        }
                                        else {
                                            cost = 0;
                                        }
                                    }
                                    pending.push({node:next,dist:currentDist+cost},currentDist+cost+findCostGuess());
                                }
                            }
                        }
                    }
                    if(pending.length == 0) {
                        console.log("could not reach destination!");
                        console.log(pth);
                        break pathingLoop;
                    }
                    const nextNode = pending.pop()
                    currentDist = nextNode.dist;
                    current = nextNode.node;
                }
                if(destination) {
                    // reconstruct path here
                    let nextTok = destination;
                    let lineSide = Math.floor(nextTok / (w*h));
                    let lineStartLoc = new babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"](((nextTok%(w*h)) % w + 0.5) * cellSizeMM + xStart, 0, Math.floor((nextTok%(w*h)) / w + 0.5) * cellSizeMM + yStart);
                    let prevLoc = lineStartLoc;
                    let steps = 0;
                    while(cameFrom[nextTok] && cameFrom[nextTok] != 'START') {
                        // console.log(`came from ${cameFrom[nextTok]}`);
                        nextTok = cameFrom[nextTok];
                        let nextSide = Math.floor(nextTok / (w*h));
                        let sideTok = nextTok%(w*h)
                        let nextLoc = new babylonjs__WEBPACK_IMPORTED_MODULE_4__["Vector3"]((sideTok % w + 0.5) * cellSizeMM + xStart, 0, Math.floor(sideTok / w + 0.5) * cellSizeMM + yStart);
                        if(!occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w]) {
                            occupancy[nextSide][Math.floor(sideTok / w)][sideTok % w] = {type:"route",pin:{net:pth.pin.net,subnet:pth.pin.subnet}};
                        }
    
                        if(nextSide != lineSide || (Math.abs(lineStartLoc.x - nextLoc.x) > babylonjs__WEBPACK_IMPORTED_MODULE_4__["Epsilon"] && Math.abs(lineStartLoc.z - nextLoc.z) > babylonjs__WEBPACK_IMPORTED_MODULE_4__["Epsilon"]) ) // new line!
                        {
                            let route = [lineStartLoc,prevLoc];
                            let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
                            routeSide.push(route);
                            if(nextSide != lineSide) {
                                console.log(`placing a via at step ${steps}`)
                                pcb.vias.push(nextLoc);
                                vias[Math.floor(sideTok / w)][sideTok % w] = {net:pth.pin.net,subnet:pth.pin.subnet};
                            }
                            lineStartLoc = prevLoc;
                            lineSide = nextSide;
                        }
                        steps +=1;
                        prevLoc = nextLoc;
                    }
                    console.log(`route took a total of ${steps} steps`)
                    let routeSide = (lineSide == 1)?pcb.topRoutes:pcb.bottomRoutes;
                    routeSide.push([lineStartLoc,prevLoc]);
                }
            }
        }
    }
    const pathingTime = window.performance.now();

    var ctx = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].debugCanvas.getContext('2d');
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].debugCanvas.width = w;
    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].debugCanvas.height = 2*h;
    var myImageData = ctx.createImageData(w, 2*h);
    function setColorAtCoord(x, y, s, r,g,b,a) {
        const width = myImageData.width;
        myImageData.data[(s*h+y)*(width*4)+x*4+0] = r;
        myImageData.data[(s*h+y)*(width*4)+x*4+1] = g;
        myImageData.data[(s*h+y)*(width*4)+x*4+2] = b;
        myImageData.data[(s*h+y)*(width*4)+x*4+3] = a;
      }
    for(let s = 0; s < 2; s++) {
        for(let y = 0; y < h; y++) {
            for(let x = 0; x < w; x++) {
                const occupant = occupancy[s][h-y-1][x];
    
                if(occupant) {
                    if(occupant.type == "out") {
                        setColorAtCoord(x,y,s,0,0,0,255);
                    }
                    else if(occupant.type == "pth" || occupant.type == "pad") {
                        if(occupant.pin) {
                            setColorAtCoord(x,y,s,0,0,255,255);
                        } else {
                            setColorAtCoord(x,y,s,76,0,0,255);
                        }
                    }
                    else {
                        setColorAtCoord(x,y,s,255,0,0,255);
                    }
                }
                else {
                    setColorAtCoord(x,y,s,0,64,0,255);
                }
            }
        }
    }
    ctx.putImageData(myImageData, 0, 0);

    console.log(`creating matrix took ${matrixCreatedTime-startTime} ms`);
    console.log(`creating occupancy took ${occupancyCreatedTime-matrixCreatedTime} ms`);
    console.log(`route pathing took ${pathingTime-occupancyCreatedTime} ms`);
    // let lastCols = new Array(matrix[0].length);
    // for( const row of matrix ) {
    //     let lastKey = null;
    //     let col = 0;
    //     for(const keySlot of row ) {
    //         if(keySlot) {
    //             if(lastKey) {
    //                 let route = [keySlot.pths[0].location, lastKey.pths[0].location];
    //                 pcb.topRoutes.push(route);
    //             }
    //             lastKey = keySlot;
    //             if(lastCols[col]) {
    //                 let route = [keySlot.pths[1].location, lastCols[col].pths[1].location];
    //                 pcb.bottomRoutes.push(route);
    //             }
    //             lastCols[col] = keySlot;
    //         }
    //         col++;
    //     }
    // }

    // for( let [id,d] of Object.entries(pcb.devices) ) {
    //     for(let f of d.footprints) {
    //         if(f.box) {
    //             for( let p of f.box.points) {
    //                 kPs.push(p)
    //             }
    //         }
    //     }
    // }
}

function refreshPCBOutline(minOutline, caseIdx, cRD) {
    const pD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData[caseIdx];

    // pD.outline = minOutline;
    pD.outline = _coremath_js__WEBPACK_IMPORTED_MODULE_3__[/* offsetOutlinePoints */ "p"](minOutline,-1.25)
    // if(bd.forcePCBSymmetrical) {
    //     let midPoint = (bd.layout.bounds.maxs[0] - bd.layout.bounds.mins[0]) * 0.5 + bd.layout.bounds.mins[0];
    //     for(let oP of pD.outline) {
    //         kPs.push(new Vector3(midPoint - (oP.x - midPoint), oP.y, oP.z));
    //     }
    //     pD.outline = coremath.convexHull2d(kPs);
    // }

    pD.outlineBounds = {mins:[100000.0, 100000.0],
        maxs:[-100000.0, -100000.0]};
    for(let p of pD.outline) {
        pD.outlineBounds.mins[0] = Math.min(pD.outlineBounds.mins[0], p.x);
        pD.outlineBounds.maxs[0] = Math.max(pD.outlineBounds.maxs[0], p.x);
        pD.outlineBounds.mins[1] = Math.min(pD.outlineBounds.mins[1], p.z);
        pD.outlineBounds.maxs[1] = Math.max(pD.outlineBounds.maxs[1], p.z);
    }
    pD.trackWidth = defaultTrackWidth;

}

function routePCB(caseIdx) {
    const pD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData[caseIdx];
    // const voronoi = genVoronoi(pD);
    const sdf = genSDF(pD);

    createNets(pD);
}



/***/ }),

/***/ "./src/svg_export.js":
/*!***************************!*\
  !*** ./src/svg_export.js ***!
  \***************************/
/*! exports provided: exportLayerString */
/*! exports used: exportLayerString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return exportLayerString; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _coremath_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./coremath.js */ "./src/coremath.js");




const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

 function f(a) { return formatter.format(a)}


function exportLayerString(layerData, boardName, caseId) {
    const svg = [];
    function append(...values) {
        svg.push.apply(svg, values);
    }
    
    append(`<?xml version="1.0" standalone="no"?>`)

    let padding = 5;
    let w = layerData.outlineBounds.maxs.x-layerData.outlineBounds.mins.x + padding * 2;
    let h = -layerData.outlineBounds.mins.z+layerData.outlineBounds.maxs.z + padding * 2;

    //begin svg
    append(`<svg width="${f(w)}mm" height="${f(h)}mm" viewBox="${f(layerData.outlineBounds.mins.x-padding)} ${f(-layerData.outlineBounds.maxs.z-padding)} ${f(w)} ${f(h)}" xmlns="http://www.w3.org/2000/svg" version="1.1">`);

    append(`<title>${boardName} ${layerData.name}  ${caseId} layer</title>`);
    
    append(`<desc>The ${boardName} ${layerData.name} ${caseId} layer</desc>`);

    if( layerData.outlines ) {
        let pathStr = `<path fill="red" fill-rule="evenodd" stroke="blue" stroke-width="1" d="`
        for(let shape of layerData.outlines) {
            if(Array.isArray(shape)) {
                let isL = false;
                if(shape.length > 1) {
                    // starting point
                    let p = shape[0];
                    switch(p.type) {
                        case 0:
                            pathStr += `M${f(p.point.x)},${f(-p.point.z)}`
                            break;
                        case 1:
                            let startPoint = p.center.add(_coremath_js__WEBPACK_IMPORTED_MODULE_1__[/* getNormalFromRot */ "i"](p.endRot - p.rotDegrees).scale(p.radius));
                            pathStr += `M${f(startPoint.x)},${f(-startPoint.z)}`
                            break;
                    }
    
                    for(let i = 0; i <= shape.length; i++) {
                        let p = shape[i%shape.length];
                        switch(p.type) {
                            case 0:
                                if(!isL) { pathStr+="L"; isL = true; }
                                pathStr += `${f(p.point.x)},${f(-p.point.z)} `
                                break;
                            case 1: // arc
                                isL = false;
                                let endPoint = p.center.add(_coremath_js__WEBPACK_IMPORTED_MODULE_1__[/* getNormalFromRot */ "i"](p.endRot).scale(p.radius));
                                let sweepFlag = (p.rotRadians > 0)?0:1;
                                //(rx ry x-axis-rotation large-arc-flag sweep-flag x y)
                                pathStr += `A${f(p.radius)},${f(p.radius)} 0 0,${sweepFlag} ${f(endPoint.x)},${f(-endPoint.z)} `
                                break;
                        }
                    }
                }
            } else {
                if(shape.type == 2) {
                    // could do this with relative movements but this is slightly more compact output.
                    pathStr += `M${f(shape.center.x+shape.radius)},${f(-shape.center.z)}`
                    pathStr += `A${f(shape.radius)},${f(shape.radius)} 0 1,0 ${f(shape.center.x-shape.radius)},${f(-shape.center.z)} `
                    pathStr += `A${f(shape.radius)},${f(shape.radius)} 0 1,0 ${f(shape.center.x+shape.radius)},${f(-shape.center.z)} `
                }
            }
        }
        pathStr += `z"/>`;
        append(pathStr);
    }
    //end svg
    append(`</svg>`);

    return svg.join('\n');
}

/***/ }),

/***/ "./src/tuning.js":
/*!***********************!*\
  !*** ./src/tuning.js ***!
  \***********************/
/*! exports provided: tuning */
/*! exports used: tuning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return tuning; });
const tuning = {
    keyDims: [18.0, 18.0],
    switchCutout: [14.0, 14.0],
    base1U: [19.05, 19.05],
    bezelGap: 1.05,
    bezelCornerFillet: 1.0,
    screwTypes:{"m2_simple":      {minBoss:1.5,screwHoleRadius:2.3/2.0,standoffRadius:3.2/2.0},
                "m2_5_hex_standoffs": {minBoss:1.5,screwHoleRadius:2.9/2.0,hexSize:4.5},
                "m3_tallnut":   {minBoss:1.5,screwHoleRadius:3.3/2.0,nutRadius:4.2/2.0}},
    screwSideBuffer: 0,
    keyShape:"square",
    drawCase:true,
    drawBezel:true,
    drawPlate:true,
    drawPCB:true,
    drawCaseFoam:true,
    drawPlateFoam:true,
    bezelThickness:{min:5.5,max:30},
    caseCornerFillet:{min:0.5,max:15},
    defaultCase: {
        bezelThickness: 10,
        bezelConcavity: 1.0,
        caseCornerFillet: 6,
        screwSideBuffer: 0,
        maxScrewSpan: 150,
        screwBezelBias:0.5,
        forceSymmetrical:false,
        hasUSBPort:false,
        usbPortPos:1.85,
        usbPortCentered:true,
        forcePCBSymmetrical:false,
        material:"pom_white"
    },
    caseMats: {
        "ac_clear": {
            metallic:0,
            roughness:0.2,
            baseColor:[190/255, 190/255, 190/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.6
        },
        "ac_blue": {
            metallic:0,
            roughness:0.2,
            baseColor:[12/255, 237/255, 239/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.75
        },
        "ac_smoke": {
            metallic:0,
            roughness:0.2,
            baseColor:[12/255, 12/255, 12/255],
            albedoColor:[0.5,0.5,0.5],
            alpha:0.75
        },
        "ac_purple": {
            metallic:0,
            roughness:0.2,
            baseColor:[98/255, 7/255, 147/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.82
        },
        "ac_yellow": {
            metallic:0,
            roughness:0.2,
            baseColor:[255/255, 247/255, 71/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.84
        },
        "pc_cl": {
            metallic:0,
            roughness:0.8,
            baseColor:[200/255, 200/255, 200/255],
            albedoColor:[1.0,1.0,1.0],
            alpha:0.85
        },
        "aluminium":{alpha:1, metallic:1, roughness:0.2, albedoColor:[0.5,0.5,0.5]},
        "brass":{alpha:1, metallic:1, roughness:0.2, albedoColor:[181/255,166/255,66/255]},
        "pom_white":{alpha:1, metallic:0, roughness:0.4, albedoColor:[0.9,0.9,0.9]},
        "pom_black":{alpha:1, metallic:0, roughness:0.4, albedoColor:[0.02,0.02,0.02]},
        "steel":{alpha:1, metallic:1, roughness:0.05, albedoColor:[0.3,0.3,0.3]},
        "fr4":{alpha:1, metallic:0, roughness:0.15, albedoColor:[45/255, 90/255, 10/255]},
        "foam_white":{alpha:1, metallic:0, roughness:0.8, albedoColor:[0.85,0.85,0.85]},
        "foam_black":{alpha:1, metallic:0, roughness:0.8, albedoColor:[0.1,0.1,0.1]},
    }
}

/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/*! exports provided: exportKeyboard, kbgbGUI */
/*! exports used: kbgbGUI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export exportKeyboard */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return kbgbGUI; });
/* harmony import */ var _globals_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.js */ "./src/globals.js");
/* harmony import */ var _boardData_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./boardData.js */ "./src/boardData.js");
/* harmony import */ var _tuning_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tuning.js */ "./src/tuning.js");
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base.js */ "./src/base.js");
/* harmony import */ var _gfx_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gfx.js */ "./src/gfx.js");
/* harmony import */ var _coremath_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./coremath.js */ "./src/coremath.js");
/* harmony import */ var _boardOps_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./boardOps.js */ "./src/boardOps.js");
/* harmony import */ var _svg_export_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./svg_export.js */ "./src/svg_export.js");
/* harmony import */ var _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gbr_export.js */ "./src/gbr_export.js");
/* harmony import */ var _pcbOps_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pcbOps.js */ "./src/pcbOps.js");
/* harmony import */ var _interactions_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./interactions.js */ "./src/interactions.js");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! babylonjs */ "babylonjs");
/* harmony import */ var babylonjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(babylonjs__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./keyPicking.js */ "./src/keyPicking.js");
/* harmony import */ var babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! babylonjsGUI */ "babylonjsGUI");
/* harmony import */ var babylonjsGUI__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var jszip_dist_jszip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! jszip/dist/jszip */ "./node_modules/jszip/dist/jszip.js");
/* harmony import */ var jszip_dist_jszip__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(jszip_dist_jszip__WEBPACK_IMPORTED_MODULE_14__);

















function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

const buttonHeight = "50px";
const ctrlBarHeight = "50px";

const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,      
    maximumFractionDigits: 4,
 });

function format_float(a) { return formatter.format(a)}

function downloadSVGs() {
    var zip = new jszip_dist_jszip__WEBPACK_IMPORTED_MODULE_14___default.a();
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
    let layerInfoCSV = `Layer Name,Material,Thickness(mm),Part Width(mm),PartHeight(mm)\n`
    for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerDefs"])) {
            let layerData = cRD.layers[layerName];
            zip.file(`${layerName}_${cID}.svg`, _svg_export_js__WEBPACK_IMPORTED_MODULE_7__[/* exportLayerString */ "a"](layerData, bd.meta.name, cID));
            layerInfoCSV += `${layerName}_${cID},${layerDef.physicalMat},${layerDef.height},`;
            layerInfoCSV += `${format_float(layerData.outlineBounds.maxs.x-layerData.outlineBounds.mins.x)},`
            layerInfoCSV += `${format_float(layerData.outlineBounds.maxs.z-layerData.outlineBounds.mins.z)}\n`;
        }
    }
    zip.file(`caseBOM.csv`, layerInfoCSV);
    zip.generateAsync({type:"blob"})
        .then(function(content) {
            download(content, `${bd.meta.name}_layers.zip`, 'text/plain');
        });
}

function downloadGBRs() {
    var zip = new jszip_dist_jszip__WEBPACK_IMPORTED_MODULE_14___default.a();
    const bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
    for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
        _pcbOps_js__WEBPACK_IMPORTED_MODULE_9__[/* routePCB */ "d"](cID);
        const pcb = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].pcbData[cID];

        _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* beginSetExport */ "a"]();
        const pcbName = `pcb${cID}`;
        zip.file(`${pcbName}.gml`, _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* exportEdgeCutsLayer */ "c"](pcb));
        zip.file(`${pcbName}.txt`, _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* exportDrillFile */ "b"](pcb));

        zip.file(`${pcbName}.gtl`, _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* exportLayer */ "d"](pcb, "copper", "top"));
        zip.file(`${pcbName}.gbl`, _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* exportLayer */ "d"](pcb, "copper", "bot"));

        zip.file(`${pcbName}.gts`, _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* exportLayer */ "d"](pcb, "mask", "top"));
        zip.file(`${pcbName}.gbs`, _gbr_export_js__WEBPACK_IMPORTED_MODULE_8__[/* exportLayer */ "d"](pcb, "mask", "bot"));
    }

    zip.generateAsync({type:"blob"})
        .then(function(content) {
            download(content, `${bd.meta.name}_gerbers.zip`, 'text/plain');
        });
}

function exportKeyboard() {
    let options = {
        shouldExportNode: function (node) {
            console.log(node);
            return true;
        },
    };
    
    babylonjs__WEBPACK_IMPORTED_MODULE_11__["GLTF2Export"].GLBAsync(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene, "fileName", options).then((glb) => {
        glb.downloadFiles();
    });
}

const buttonColor = "#000000";
const backgroundColor = _gfx_js__WEBPACK_IMPORTED_MODULE_4__[/* bgColors */ "b"][5].toHexString();
function addButton(txt, action, style) {
    style = style?style:{};
    var button = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Button"].CreateSimpleButton("button", txt);
    button.top = "0px";
    button.left = "0px";
    button.width = style.width?style.width:buttonHeight;
    button.height = style.height?style.height:buttonHeight;
    button.cornerRadius = 2;
    button.thickness = 2;
    button.children[0].color = "#FFFFFF";
    button.children[0].fontSize = 24;
    button.color = buttonColor;
    button.background = backgroundColor;
    //button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

    button.onPointerClickObservable.add( (a,b) => {
        if(action) {
            action(a,b);
         }
        b.skipNextObservers = true;
    });

    return button;
}

function addToggleButton(txt, action, style) {
    style = style?style:{};
    const button = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["ToggleButton"]();
    button.textBlock.text = txt;
    button.top = "0px";
    button.left = "0px";
    button.width = style.width?style.width:buttonHeight;
    button.height = style.height?style.height:buttonHeight;
    button.cornerRadius = 2;
    button.thickness = 2;
    button.children[0].color = "#FFFFFF";
    button.children[0].fontSize = 24;
    button.color = "#607060";
    button.background = "#739484";
    //button.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;

    button.onPointerClickObservable.add( (a,b) => {
        if(action) {
            action(a,b);
         }
        b.skipNextObservers = true;
    });

    return button;
}

function createScreenBlock() {
    let background = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Button"].CreateSimpleButton("screenBlock", "");
    background.background = "#000000";
    background.alpha = 0.8;
    background.cornerRadius = 0;
    background.thickness = 0;
    background.top = "0px";
    background.left = "0px";
    background.width = "1";
    background.height = "1";
    background.pointerEnterAnimation = null;
    background.pointerOutAnimation = null;
    background.pointerDownAnimation = null;
    background.pointerUpAnimation = null;
    return background;
}

function modalPop(container, txt, action, escape) {
    let background = createScreenBlock();
    let modalAction = (containedAction) => {
        return (a,b) => {
            if(containedAction) {
                containedAction(a,b);
            }
            background.dispose();
            button.dispose();
            b.skipNextObservers = true;
        }
    }

    const button = addButton(txt, modalAction(action));
    button.zIndex = background.zIndex + 1;
    background.onPointerClickObservable.add( modalAction(escape));
    container.addControl(background);
    container.addControl(button);
}


function modalSelection(container, options, selectionAction, escape, parentButton) {
    let modalAction = (containedAction) => {
        return (a,b) => {
            if(containedAction) {
                containedAction(a,b);
            }
            background.dispose();
            scroller.dispose();
            b.skipNextObservers = true;
        }
    }

    let background = createScreenBlock();
    background.onPointerClickObservable.add(modalAction(escape));

    let width = 150;
    let barSize = 15;
    let scroller = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["ScrollViewer"]("dropdown");
    scroller.zIndex = background.zIndex + 1;
    scroller.width = `${width+barSize}px`;
    const scrollerHeight = Math.min(400,options.length * 50); // 50 = BUTTON HEIGHT
    scroller.height = scrollerHeight+"px";
    scroller.barSize = barSize;
    scroller.thickness = 0;
    scroller.horizontalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].HORIZONTAL_ALIGNMENT_LEFT;
    scroller.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_TOP;
    scroller.leftInPixels = parentButton.centerX-parentButton.widthInPixels*0.5;
    scroller.topInPixels = Math.max(0,parentButton.centerY-parentButton.heightInPixels*0.5 - scrollerHeight);

    let panel = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();
    // panel.height = "400px";
    panel.isPointerBlocker = true;
    panel.isVertical = true;
    for(const o of options) {
        panel.addControl(addButton(o.txt, modalAction((a,b) => {
                if(selectionAction) {
                    selectionAction(o,a,b);
                }
                parentButton.textBlock.text = o.txt;
            }), {width:width}));
    }

    scroller.addControl(panel);

    container.addControl(background);
    container.addControl(scroller);
}

function createDropdown(container, initialOption, options, selectionAction) {
    let optionIdx = options.findIndex((o) => o.val===initialOption);

    if(optionIdx < 0) { optionIdx = 0; }

    return addButton(options[optionIdx].txt, (e,f) => {
        // modalPop(globals.screengui,"YOOO", () => {console.log("ACK");});
        modalSelection(container, options, selectionAction, () => {}, f.target)
    },
    {width:"150px"});
}
  
let createSlider = function(parent, txt, initialVal, min, max, onChangeFunc) {
    let label = kbgbGUI.addLabel(txt + initialVal)
    var slider = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Slider"]();
    slider.minimum = min;
    slider.maximum = max;
    slider.value = initialVal;
    slider.height = "15px";
    slider.width = "100px";
    slider.step = 0.1;
    slider.onValueChangedObservable.add(function(value) {
        label.text = txt + value;
        onChangeFunc(value, label);
    });
    parent.addControl(label);   
    parent.addControl(slider); 
}

let pointerController = {
    activeMode: null,
    enterModePosition: null,
    getLocFromInfo: function(pointerInfo) {
        const pickResult = pointerInfo.pickInfo;
        const ray = pickResult.ray;
        const t = -ray.origin.y / ray.direction.y;
        return ray.origin.add(ray.direction.scale(t));
    },
    setMode: function(mode, pointerInfo) {
        if(pointerController.activeMode && pointerController.modes[pointerController.activeMode].exit) {
            pointerController.modes[pointerController.activeMode].exit(pointerInfo);
        }
        pointerController.activeMode = mode;
        if(mode) {
            pointerController.enterModePosition = this.getLocFromInfo(pointerInfo);
            pointerController.modes[mode].enter(pointerInfo);
        }
    },
    processMove: function(pointerInfo) {
        let m = pointerController.modes[pointerController.activeMode];
        if(m && m.move) {
            m.move(pointerInfo);
        }
    },
    processUp: function(pointerInfo) {
        let m = pointerController.modes[pointerController.activeMode];
        if(m && m.up) {
            m.up(pointerInfo);
        }
    },
    modes: {   
        "keyMove": {
            keyInfo: {},
            enter: function(pointerInfo) {
                for (let kId of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
                    let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
                    let k = bd.layout.keys[kId];
                    pointerController.modes.keyMove.keyInfo[kId] = {x: k.x, y: k.y};
                }
                pointerController.alignHoverTimeoutId = null;

                updateRotationHandle(false);
            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                const e = pointerInfo.event;
                let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
                let overKey = null;
                for (const [id, rd] of Object.entries(kRD)) {
                    if(!_keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"].includes(id)) {
                        for(const [ip, keyPoly] of Object.entries(rd["bezelHoles"])) {
                            if(_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* isPointInPoly */ "l"](hitLoc,keyPoly.points)) {
                                overKey = id;
                                break;
                            }
                        }
                        if(overKey!==null) {
                            break;
                        }
                    } else {
                        console.log(`discarding hover check for ${id}`);
                    }
                }

                if(pointerController.alignHoverKeyId !== overKey) {
                    if(pointerController.alignHoverTimeoutId) {
                        clearTimeout(pointerController.alignHoverTimeoutId);
                        pointerController.alignHoverTimeoutId = null;
                    }
                    if(overKey!==null) {
                        pointerController.alignHoverKeyId = overKey;
    
                        const setGridAlignment = (id) => {
                            let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
                            let k = bd.layout.keys[id];
    
                            for (let kId of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
                                let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
                                let ok = bd.layout.keys[kId];
                                const savedKeyPos = pointerController.modes.keyMove.keyInfo[ok.id];
                                const xDiff = 4*(k.x-k.width*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0]*0.5 - savedKeyPos.x)/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0];
                                const yDiff = 4*(k.y-k.height*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1]*0.5 - savedKeyPos.y)/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0];
                                savedKeyPos.x = savedKeyPos.x - (xDiff-Math.trunc(xDiff))*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0]/4;
                                savedKeyPos.y = savedKeyPos.y + (yDiff-Math.trunc(yDiff))*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1]/4;
                            }
                        }
    
                        pointerController.alignHoverTimeoutId = setTimeout(() => setGridAlignment(overKey), 1000);
                    }
                }

                kbgbGUI.keyAction((k) => {
                    const savedKeyPos = pointerController.modes.keyMove.keyInfo[k.id];
                    if(savedKeyPos) {
                        if(e.shiftKey) {
                            // don't snap to grid
                            k.x = savedKeyPos.x + (hitLoc.x - pointerController.enterModePosition.x);
                            k.y = savedKeyPos.y - (hitLoc.z - pointerController.enterModePosition.z);
                        } else {
                            k.x = savedKeyPos.x + Math.floor(4*(hitLoc.x - pointerController.enterModePosition.x)/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0])*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0]/4;
                            k.y = savedKeyPos.y - Math.floor(4*(hitLoc.z - pointerController.enterModePosition.z)/_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1])*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1]/4;
                        }
                    }
                });
            },
            up: function(pointerInfo) {
                if(pointerController.alignHoverTimeoutId) {
                    clearTimeout(pointerController.alignHoverTimeoutId);
                    pointerController.alignHoverTimeoutId = null;
                }

                pointerController.setMode(null,pointerInfo);

                updateRotationHandle(true);
                
                console.log(`pointer up.... mode is ${pointerController.activeMode}`)
            }
        },
        "keyRotation": {
            keyInfo: {},
            enter: function(pointerInfo) {
                pointerController.modes.keyMove.rotBump = 0;
                for (let kId of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
                    let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
                    let k = bd.layout.keys[kId];
                    pointerController.modes.keyMove.keyInfo[kId] = {rotation_angle: k.rotation_angle, x: k.x, y: k.y};
                }
                pointerController.alignHoverTimeoutId = null;

                updateRotationHandle(true);
            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                const e = pointerInfo.event;
                let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
                let overKey = null;
                for (const [id, rd] of Object.entries(kRD)) {
                    if(!_keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"].includes(id)) {
                        for(const [ip, keyPoly] of Object.entries(rd["bezelHoles"])) {
                            if(_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* isPointInPoly */ "l"](hitLoc,keyPoly.points)) {
                                overKey = id;
                                break;
                            }
                        }
                        if(overKey!==null) {
                            break;
                        }
                    } else {
                        console.log(`discarding hover check for ${id}`);
                    }
                }

                // if(pointerController.alignHoverKeyId !== overKey) {
                //     if(pointerController.alignHoverTimeoutId) {
                //         clearTimeout(pointerController.alignHoverTimeoutId);
                //         pointerController.alignHoverTimeoutId = null;
                //     }
                //     if(overKey!==null) {
                //         pointerController.alignHoverKeyId = overKey;
    
                //         const setGridAlignment = (id) => {
                //             let bd = boardData.getData();
                //             let k = bd.layout.keys[id];
    
                //             for (let kId of keyPicking.pickedKeys) {
                //                 let bd = boardData.getData();
                //                 let ok = bd.layout.keys[kId];
                //                 const savedKeyPos = pointerController.modes.keyMove.keyInfo[ok.id];
                //                 const rDiff = (k.rotation_angle-savedKeyPos.rotation_angle)/tuning.base1U[0];
                //                 savedKeyPos.rotation_angle = savedKeyPos.x - (xDiff-Math.trunc(xDiff))*tuning.base1U[0]/4;
                //                 savedKeyPos.y = savedKeyPos.y + (yDiff-Math.trunc(yDiff))*tuning.base1U[1]/4;
                //             }
                //         }
    
                //         pointerController.alignHoverTimeoutId = setTimeout(() => setGridAlignment(overKey), 1000);
                //     }
                // }

                let rotBump = (_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* getRotFromNormal */ "j"](pointerController.enterModePosition.subtract(new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](rotHandleMiddle.x,0,rotHandleMiddle.z)).normalize())
                               -_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* getRotFromNormal */ "j"](hitLoc.subtract(new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](rotHandleMiddle.x,0,rotHandleMiddle.z)).normalize())) * 180.0 / Math.PI;
                
                if(!e.shiftKey) {
                    rotBump = rotBump - rotBump % 15;
                }
                if(Math.abs(pointerController.modes.keyMove.rotBump-rotBump) > babylonjs__WEBPACK_IMPORTED_MODULE_11__["Epsilon"]) {
                    pointerController.modes.keyMove.rotBump = rotBump
                    let newPos = new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"]();
                    kbgbGUI.keyAction((k) => {
                        const savedKeyPos = pointerController.modes.keyMove.keyInfo[k.id];
                        if(savedKeyPos) {
                            let kXform = babylonjs__WEBPACK_IMPORTED_MODULE_11__["Matrix"].Translation(savedKeyPos.x-rotHandleMiddle.x, 0, -savedKeyPos.y-rotHandleMiddle.z);
                            kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_11__["Matrix"].RotationY(rotBump * Math.PI / 180));
                            kXform = kXform.multiply(babylonjs__WEBPACK_IMPORTED_MODULE_11__["Matrix"].Translation(rotHandleMiddle.x,0,rotHandleMiddle.z));
    
                            babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"].TransformCoordinatesToRef(babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"].ZeroReadOnly, kXform, newPos);
                            k.x = newPos.x;
                            k.y = -newPos.z;
                            k.rotation_angle = savedKeyPos.rotation_angle + rotBump;
                        }
                    });
                }
            },
            up: function(pointerInfo) {
                if(pointerController.alignHoverTimeoutId) {
                    clearTimeout(pointerController.alignHoverTimeoutId);
                    pointerController.alignHoverTimeoutId = null;
                }

                pointerController.setMode(null,pointerInfo);

                updateRotationHandle(true);
                
                console.log(`pointer up.... mode is ${pointerController.activeMode}`)
            }
        },
        "selection": {
            enter: function(pointerInfo) {

            },
            move: function(pointerInfo) {
                let hitLoc = pointerController.getLocFromInfo(pointerInfo);
                updateSelectionBox(pointerController.enterModePosition,hitLoc);
            },
            up: function(pointerInfo) {
                const e = pointerInfo.event;
                if(!(e.metaKey || e.ctrlKey)) {
                    _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* clearPickedKeys */ "a"]();
                }
                const end = pointerController.getLocFromInfo(pointerInfo);
                const start = pointerController.enterModePosition;
                const mins = {x: Math.min(start.x,end.x),z:Math.min(start.z,end.z)};
                const maxs = {x: Math.max(start.x,end.x),z:Math.max(start.z,end.z)};
                const selectionPoly = new _coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* Poly */ "b"]([new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](mins.x, 0, mins.z),
                    new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](maxs.x, 0, mins.z),
                    new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](maxs.x, 0, maxs.z),
                    new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](mins.x, 0, maxs.z)
                ]);
                let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
                for (const [id, rd] of Object.entries(kRD)) {
                    for(const [ip, keyPoly] of Object.entries(rd["bezelHoles"])) {
                        if(_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* polyPolyOverlap */ "r"](selectionPoly,keyPoly)) {
                            _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickKey */ "b"](id);
                        }
                    }
                }

                updateSelectionBox();
                pointerController.setMode(null,pointerInfo);
                kbgbGUI.refresh();
            }
        }
    }
}

let selMesh = null;
function updateSelectionBox(start,end) {
    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;
    
    if(selMesh) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(selMesh);
        selMesh.dispose();
    }

    if(start && end) {
        const mins = {x: Math.min(start.x,end.x),z:Math.min(start.z,end.z)};
        const maxs = {x: Math.max(start.x,end.x),z:Math.max(start.z,end.z)};
        if(maxs.x - mins.x > babylonjs__WEBPACK_IMPORTED_MODULE_11__["Epsilon"] && maxs.z - mins.z > babylonjs__WEBPACK_IMPORTED_MODULE_11__["Epsilon"]) {
            let selOutline = [new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](mins.x, 0, mins.z),
                              new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](maxs.x, 0, mins.z),
                              new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](maxs.x, 0, maxs.z),
                              new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](mins.x, 0, maxs.z)
            ];
    
            selMesh = babylonjs__WEBPACK_IMPORTED_MODULE_11__["MeshBuilder"].CreateRibbon("selectionOutline",
            {
                pathArray: [_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* genArrayFromOutline */ "g"](selOutline, 0.1, 0.1, true),
                    _coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* genArrayFromOutline */ "g"](selOutline, 0.5, 0.5, true)]
            }, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
            selMesh.material = mats["keySel"];
            selMesh.translate(new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](0, 25.5, 0), 1, babylonjs__WEBPACK_IMPORTED_MODULE_11__["Space"].LOCAL);
        }
    }
}

let frameMeshes = [];
let matCoverMeshes = [];
function updateFrameBox(cID,start,end) {
    let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;

    for(const frameMesh of frameMeshes) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(frameMesh);
        frameMesh.dispose();
    }
    for(const matCoverMesh of matCoverMeshes) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(matCoverMesh);
        matCoverMesh.dispose();
    }

    if(start && end) {
        const mins = {x: Math.min(start[0],end[0]),z:Math.min(start[1],end[1])};
        const maxs = {x: Math.max(start[0],end[0]),z:Math.max(start[1],end[1])};
        if(maxs.x - mins.x > babylonjs__WEBPACK_IMPORTED_MODULE_11__["Epsilon"] && maxs.z - mins.z > babylonjs__WEBPACK_IMPORTED_MODULE_11__["Epsilon"]) {
            let selOutline = [new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](mins.x, 0, mins.z),
                              new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](maxs.x, 0, mins.z),
                              new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](maxs.x, 0, maxs.z),
                              new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](mins.x, 0, maxs.z)
            ];
    
            const frameMesh = babylonjs__WEBPACK_IMPORTED_MODULE_11__["MeshBuilder"].CreateRibbon(`frameOutline${cID}`,
            {
                pathArray: [_coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* genArrayFromOutline */ "g"](selOutline, 20.0, 1.0, true),
                    _coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* genArrayFromOutline */ "g"](selOutline, 25.5, 5.5, true)]
            }, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
            frameMesh.material = mats["layoutFrame"];

            const matCoverMesh = babylonjs__WEBPACK_IMPORTED_MODULE_11__["MeshBuilder"].CreatePolygon(`gridMatCover${cID}`,
            {
                shape: _coremath_js__WEBPACK_IMPORTED_MODULE_5__[/* genArrayFromOutline */ "g"](selOutline, 20.0, 1.0, true)
            }, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
            matCoverMesh.material = mats["gridMaterial"];
            frameMesh.translate(new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](0, 0.3, 0), 1, babylonjs__WEBPACK_IMPORTED_MODULE_11__["Space"].LOCAL);
            matCoverMesh.translate(new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](0, 0.2, 0), 1, babylonjs__WEBPACK_IMPORTED_MODULE_11__["Space"].LOCAL);
            frameMeshes.push(frameMesh);
            matCoverMeshes.push(matCoverMesh);
        }
    }
}

let rotHandleMesh = null;
let rotHandleMiddle = {};
function updateRotationHandle(show) {

    if(rotHandleMesh) {
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene.removeMesh(rotHandleMesh);
        rotHandleMesh.dispose();
    }

    if(show && _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"].length > 0) {
        let mats = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.mats;

        let kRD = _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.keys;
        let selMins = [100000.0, 100000.0];
        let selMaxs = [-100000.0, -100000.0];
        for (const id of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
            const rd = kRD[id];
            selMins[0] = Math.min(selMins[0],rd.mins[0]);
            selMins[1] = Math.min(selMins[1],rd.mins[1]);
            selMaxs[0] = Math.max(selMaxs[0],rd.maxs[0]);
            selMaxs[1] = Math.max(selMaxs[1],rd.maxs[1]);
        }

        rotHandleMiddle = {x: (selMins[0]+selMaxs[0])/2,z:(selMins[1]+selMaxs[1])/2 };
        const rad = Math.sqrt(Math.pow(Math.abs(selMaxs[0]-rotHandleMiddle.x),2)+Math.pow(Math.abs(selMaxs[1]-rotHandleMiddle.z),2)) + 15;
        if(rad > babylonjs__WEBPACK_IMPORTED_MODULE_11__["Epsilon"]) {
            rotHandleMesh = babylonjs__WEBPACK_IMPORTED_MODULE_11__["MeshBuilder"].CreateTorus("rotHandle",
            {
                diameter:rad*2,
                thickness:5,
                tessellation:64
            }, _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].scene);
            rotHandleMesh.material = mats["rotHandle"];
            rotHandleMesh.translate(new babylonjs__WEBPACK_IMPORTED_MODULE_11__["Vector3"](rotHandleMiddle.x, 30.5, rotHandleMiddle.z), 1, babylonjs__WEBPACK_IMPORTED_MODULE_11__["Space"].LOCAL);
        }
    }
}

const keySizeOptions = [
    {txt:"1U", width:1 },
    {txt:"1.25U", width:1.25 },
    {txt:"1.5U", width:1.5 },
    {txt:"1.75U", width:1.75 },
    {txt:"2U", width:2 },
    {txt:"2.25U", width:2.25 },
    {txt:"2.75U", width:2.75 },
    {txt:"3U", width:3 },
    {txt:"6U", width:6 },
    {txt:"6.25U", width:6.25 },
    {txt:"7U", width:7 },
    {txt:"OLED", type:"oled"},
    {txt:"EC11-18", type:"ec11", rad:18},
    {txt:"EC11-19", type:"ec11", rad:19.05},
    {txt:"EC11-30", type:"ec11", rad:30},
    {txt:"ISO"},
    {txt:"1.75U STEPPED"}
];

function refreshLayout() {
    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshLayout */ "k"]();
    for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData)) {
        updateFrameBox(cID,cRD.bounds.mins,cRD.bounds.maxs);
    }
}

const kbgbGUI = {

    addLabel: function(txt) {
        var t = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["TextBlock"]();
        t.width = "80px";
        t.height = ".9";
        t.text = txt;
        t.color = "white";
        t.fontSize = 24;
        return t;
    },
    keyAction: function(action) {
        for (let kId of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
            let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
            let k = bd.layout.keys[kId];
            action(k);
        }
        refreshLayout();
    },
    addKeyActionKeycode: function(action, keyCode) {
        const appliedKeyAction = () => {this.keyAction(action)}
        _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* addBinding */ "a"]("keydown", keyCode, appliedKeyAction)
    },
    addActionButton: function(txt, action, keyCode) {
        if(keyCode) {
            _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* addBinding */ "a"]("keydown", keyCode, action)
        }
        return addButton(txt, action); 
    },
    addCaseSelection: function(holder) {
        let caseOptions = []
        for(const [k,cBD] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases)) {
            if(!kbgbGUI.activeCase) {
                kbgbGUI.activeCase = k;
            }
            caseOptions.push({txt:k, val:k});
        }
        let caseSelectionAction = (o,a,b) => {
            kbgbGUI.activeCase = o.val;
        }
        const dropdown = createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, kbgbGUI.activeCase, caseOptions, caseSelectionAction);
        holder.addControl(dropdown);
        if(caseOptions.length <= 1) {
            dropdown.isVisible = false;
        }
    },
    mData: {},
    modes:{
        "key":{
            cameraMode:"top",
            add: function() {
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* addPointerBinding */ "b"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERDOWN, (pointerInfo) => {
                    const pickResult = pointerInfo.pickInfo;
                    const ray = pickResult.ray;
                    const t = -ray.origin.y / ray.direction.y;
                    const hitLoc = ray.origin.add(ray.direction.scale(t));

                    let beginSelection = true;

                    console.log(`pickResult is`)
                    console.log(pickResult)

                    if (pickResult && pickResult.pickedMesh) {
                        const parent = pickResult.pickedMesh.parent;
                        let name = pickResult.pickedMesh.name;
                        if(name === "rotHandle") {
                            console.log(`entering rotation!`)
                            beginSelection = false;
                            pointerController.setMode("keyRotation",pointerInfo);
                        }
                        else {
                            if (parent && _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().layout.keys[parent.name]) {
                                name = parent.name;
                            }
                            if (_keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"].indexOf(name) >= 0) {
                                beginSelection = false;
                                pointerController.setMode("keyMove",pointerInfo);
                            }
                        }
                    }

                    // if we didn't hit a key that's already selected, start a selection box
                    if(beginSelection) {
                        pointerController.setMode("selection",pointerInfo);
                    }
                });
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* addPointerBinding */ "b"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERMOVE, (pointerInfo) => {
                    pointerController.processMove(pointerInfo);
                });
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* addPointerBinding */ "b"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERUP, (pointerInfo) => {
                    pointerController.processUp(pointerInfo);
                    kbgbGUI.refresh();
                });
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* addPointerBinding */ "b"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERTAP, (pointerInfo) => {
                    pointerController.processUp(pointerInfo);
                    kbgbGUI.refresh();
                });
                // boardOps.removeCaseData();
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;


                let setCtrls = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                setCtrls.height = ctrlBarHeight;
                setCtrls.isPointerBlocker = true;
                setCtrls.isVertical = false;
                setCtrls.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;
                const capProfile = [
                    {txt:"KAM",val:"KAM"},
                    {txt:"KAT",val:"KAT"},
                    {txt:"SA",val:"SA"},
                    {txt:"DSA",val:"DSA"},
                    {txt:"DCS",val:"DCS"},
                    {txt:"Cherry",val:"CHE"}
                ];

                let capProfileChange = (o,a,b) => {
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* updateKeycapMorphTargets */ "s"](o.val);
                }
                setCtrls.addControl(
                    createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().keycapProfile, capProfile, capProfileChange));


                    setCtrls.addControl(addButton("add key", (e) => {
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* addKey */ "b"]();
                    refreshLayout();
                }, {height:buttonHeight, width:"120px"}));

                kbgbGUI.addKeyActionKeycode((k) => k.x -= 0.25*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0], "ArrowLeft");
                kbgbGUI.addKeyActionKeycode((k) => k.y -= 0.25*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1], "ArrowUp");
                kbgbGUI.addKeyActionKeycode((k) => k.y += 0.25*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[1], "ArrowDown");
                kbgbGUI.addKeyActionKeycode((k) => k.x += 0.25*_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"].base1U[0], "ArrowRight");
            
                let keyCtrls = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                keyCtrls.height = ctrlBarHeight;
                keyCtrls.isPointerBlocker = true;
                keyCtrls.isVertical = false;
                keyCtrls.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;
                // keyCtrls.addControl(kbgbGUI.addLabel("Rot: "));
                // keyCtrls.addControl(kbgbGUI.addKeyActionButton(`⤹`, (k) => k.rotation_angle -= 2, "q" ));
                // keyCtrls.addControl(kbgbGUI.addKeyActionButton(`⤸`, (k) => k.rotation_angle += 2, "e" ));
            
                keyCtrls.addControl(kbgbGUI.addLabel("  "));
                let kAction = (keyAction) => {
                        for (let kId of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
                            let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
                            let k = bd.layout.keys[kId];
                            keyAction(k);
                        }
                };
                let setKeyAction = (key,v) => kAction((k) => {
                    k[key] = v;
                });

                var textInput = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["InputText"]();
                // textInput.maxWidth = 0.2;
                textInput.width = "150px";
                textInput.height = buttonHeight;
                textInput.text = " ";
                textInput.color = "white";
                textInput.background = buttonColor;
                textInput.onFocusObservable.add((v) => {
                    _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* blockKeyBindings */ "c"]();
                });
                textInput.onBlurObservable.add((v) => {
                    _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* unblockKeyBindings */ "f"]();
                });
                textInput.onTextChangedObservable.add((v) => {
                    setKeyAction("txt", v.text);
                    textInput.text = ""+v.text;
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshLayout */ "k"]();
                });
                kbgbGUI.mData.textInput = textInput;
                keyCtrls.addControl(textInput);    

                let keySelectionAction = (o,a,b) => {
                    setKeyAction("type", o.type);
                    setKeyAction("width", o.width);
                    setKeyAction("encoder_knob_size", o.rad);
                    refreshLayout();
                }

                kbgbGUI.mData.keySizeDropdown = createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, 0, keySizeOptions, keySelectionAction);

                keyCtrls.addControl( kbgbGUI.mData.keySizeDropdown );


                const rowOptions = [
                    {txt:"r0",val:0},
                    {txt:"r1",val:1},
                    {txt:"r2",val:2},
                    {txt:"r3",val:3},
                    {txt:"r4",val:4},
                    {txt:"r5",val:5}
                ];

                let rowSelectionAction = (o,a,b) => {
                    setKeyAction("row", o.val);
                    refreshLayout();
                }

                kbgbGUI.mData.rowDropdown = createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, 0, rowOptions, rowSelectionAction);

                keyCtrls.addControl( kbgbGUI.mData.rowDropdown );

                let flipStabAction = (v) => kAction((k) => {
                    k.flipStab = v;
                });

                var checkbox = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Checkbox"]();
                checkbox.width = "10px";
                checkbox.height = "10px";
                checkbox.isChecked = false;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    flipStabAction(value);
                    refreshLayout();
                });

                kbgbGUI.mData.stabLabel = kbgbGUI.addLabel("STAB: ")
                keyCtrls.addControl(kbgbGUI.mData.stabLabel);
                kbgbGUI.mData.stabCheckbox = checkbox;
                keyCtrls.addControl(checkbox);


                let caseIdxSwap = (v) => kAction((k) => {
                    if(k.caseIdx == 1) {
                        k.caseIdx = 0;
                    } else {
                        k.caseIdx = 1;
                    }
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* removeKeyRD */ "n"](k.id);
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* addCase */ "a"](k.caseIdx);
                });

                var cb = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Checkbox"]();
                cb.width = "10px";
                cb.height = "10px";
                cb.isChecked = false;
                cb.color = "blue";
                cb.onIsCheckedChangedObservable.add(function(value) {
                    caseIdxSwap(value);
                    refreshLayout();
                });
                keyCtrls.addControl(kbgbGUI.addLabel("split"));
                keyCtrls.addControl(cb);

                keyCtrls.addControl(kbgbGUI.addLabel("  "));

                keyCtrls.addControl(kbgbGUI.addActionButton("del", () => {
                    kbgbGUI.keyAction((k)=> {_boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* removeKey */ "m"](k.id)});
                    _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* clearPickedKeys */ "a"]();
                    kbgbGUI.refresh();
                }, "Backspace"));

                
                kbgbGUI.mData.setCtrls = setCtrls;
                ctrlBar.addControl(setCtrls);
                kbgbGUI.mData.keyCtrls = keyCtrls;
                ctrlBar.addControl(keyCtrls);
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;
                kbgbGUI.refresh();
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* setFlatRotations */ "p"]();
                _gfx_js__WEBPACK_IMPORTED_MODULE_4__[/* showGrid */ "k"]();
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* fadeCase */ "e"]();
                for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData)) {
                    updateFrameBox(cID,cRD.bounds.mins,cRD.bounds.maxs);
                }
            },
            refresh: () => {
                if(_keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"].length === 0) {
                    kbgbGUI.mData.keyCtrls.isVisible = false;
                    kbgbGUI.mData.setCtrls.isVisible = true;
                }
                else {
                    kbgbGUI.mData.setCtrls.isVisible = false;
                    kbgbGUI.mData.keyCtrls.isVisible = true;
                    // kbgbGUI.mData.stabLabel.isVisible = false;
                    // kbgbGUI.mData.stabCheckbox.isVisible = false;
                    let optionMatches = [];
                    let rowOptions = [];
                    let text = "";
                    for (let kId of _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"]) {
                        let bd = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]();
                        let k = bd.layout.keys[kId];
                        if(rowOptions.indexOf(k.row) === -1) {
                            rowOptions.push(k.row);
                        }
                        for(const o of keySizeOptions) {
                            if(o.type === k.type && o.width === k.width && o.rad === k.rad) {
                                if(optionMatches.indexOf(o) === -1) {
                                    optionMatches.push(o);
                                }
                            }
                        }
                        text = k.txt;
                        // todo fix this for multiselection
                        kbgbGUI.mData.stabCheckbox = k.flipStab;
                    }
                    if(optionMatches.length === 1) {
                        kbgbGUI.mData.keySizeDropdown.textBlock.text = optionMatches[0].txt;
                    }
                    else if(optionMatches.length > 1) {
                        kbgbGUI.mData.keySizeDropdown.textBlock.text = `**`;
                    }

                    if(rowOptions.length === 1) {
                        kbgbGUI.mData.rowDropdown.textBlock.text = `r${rowOptions[0]}`;
                    }
                    else if(rowOptions.length > 1) {
                        kbgbGUI.mData.rowDropdown.textBlock.text = `**`;
                    }

                    if(_keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* pickedKeys */ "c"].length !== 1) {
                        kbgbGUI.mData.textInput.isVisible = false;
                    } else {
                        kbgbGUI.mData.textInput.isVisible = true;
                        if(text) {
                            kbgbGUI.mData.textInput.text = text;
                        } else {
                            kbgbGUI.mData.textInput.text = "";
                        }
                    }
                }

                updateRotationHandle(true);

                for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData)) {
                    updateFrameBox(cID,cRD.bounds.mins,cRD.bounds.maxs);
                }
            },
            remove: () => {
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* removePointerBinding */ "e"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERDOWN);
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* removePointerBinding */ "e"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERMOVE);
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* removePointerBinding */ "e"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERUP);
                _interactions_js__WEBPACK_IMPORTED_MODULE_10__[/* removePointerBinding */ "e"](babylonjs__WEBPACK_IMPORTED_MODULE_11__["PointerEventTypes"].POINTERTAP);
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.activeModeCtrl);
                _keyPicking_js__WEBPACK_IMPORTED_MODULE_12__[/* clearPickedKeys */ "a"]();
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* unfadeCase */ "r"]();
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshPCBs */ "l"]();
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                kbgbGUI.mData.keySizeDropdown = null;
                kbgbGUI.mData.stabCheckbox = null;
                updateRotationHandle(false);
                _gfx_js__WEBPACK_IMPORTED_MODULE_4__[/* hideGrid */ "g"]();
                for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.layoutData)) {
                    updateFrameBox(cID);
                }
            }
        },
        "view":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;

                ctrlBar.addControl(addButton("prev", () => {
                    _base_js__WEBPACK_IMPORTED_MODULE_3__["loadPrevKeyboard"]();
                }, {height:buttonHeight,width:"120px"}));

                ctrlBar.addControl(addButton("next", () => {
                    _base_js__WEBPACK_IMPORTED_MODULE_3__["loadNextKeyboard"]();
                }, {height:buttonHeight,width:"120px"}));

                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* setNaturalRotations */ "q"]();
            },
            refresh: () => {},
            remove: () => {
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
        "case":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);

                var checkbox = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Checkbox"]();
                checkbox.width = "10px";
                checkbox.height = "10px";
                console.log(`case: ${kbgbGUI.activeCase}`)
                console.log(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases);
                checkbox.isChecked = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].forceSymmetrical;
                checkbox.color = "green";
                checkbox.onIsCheckedChangedObservable.add(function(value) {
                    _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].forceSymmetrical = value;
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                ctrlBar.addControl(checkbox);

                var ftbx = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Checkbox"]();
                ftbx.width = "10px";
                ftbx.height = "10px";
                ftbx.isChecked = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].hasFeet;
                ftbx.color = "green";
                ftbx.onIsCheckedChangedObservable.add(function(value) {
                    _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].hasFeet = value;
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                });

                ctrlBar.addControl(kbgbGUI.addLabel("FEET: "));
                ctrlBar.addControl(ftbx);

                let isRefreshingTuning = false;

                let addRTBar = function(propName) {
                    if(kbgbGUI.rtBar) {
                        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.rtBar);
                    }

                    let rtBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                    rtBar.width = ".2";
                    rtBar.isPointerBlocker = true;
                    rtBar.isVertical = true;
                    rtBar.horizontalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].HORIZONTAL_ALIGNMENT_RIGHT;
    
                    let refreshTuningValues = function(k) {
                        const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                        const kPin = k+"Pin";
                        let pendingList = [];
                        let lastVal = null;
                        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerDefs"])) {
                            if(layerDef.tuneable !== null) {
                                let pinned = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerGetValue"](cBD, layerName, kPin);
                                let thisVal = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerGetValue"](cBD, layerName, k);
                                if(!pinned) {
                                    pendingList.push(layerName);
                                } else {
                                    if(lastVal === null) {
                                        for(const lName of pendingList) {
                                            _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD,lName,k,thisVal);
                                        }
                                    } else {
                                        const nLerps = pendingList.length;
                                        const t = (thisVal - lastVal)/(nLerps+1);
                                        for(let i = 0; i < nLerps; i++) {
                                            _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD,pendingList[i],k,lastVal+(t*(i+1)));
                                        }
                                    }
                                    lastVal = thisVal;
                                    pendingList = [];
                                }
                            }
                        }
                        if(lastVal !== null) {
                            for(const lName of pendingList) {
                                _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD,lName,k,lastVal);
                            }
                        }
    
                        for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerDefs"])) {
                            if(layerDef.tuneable !== null) {
                                rtBar[layerName].slider.value = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerGetValue"](cBD, layerName, k);
                            }
                        }
                        _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                    }

                    let addTuningButton = function(layerName) {
                        const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                        let buttonBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                        buttonBar.height = "40px";
                        buttonBar.isPointerBlocker = true;
                        buttonBar.isVertical = false;
                        buttonBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;
                        
                        let label = kbgbGUI.addLabel(layerName)
                        var slider = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Slider"]();
                        var lock = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Checkbox"]();
    
                        label.height = "40px"
    
                        if(_tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"][propName]) {
                            slider.minimum = _tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"][propName].min;
                            slider.maximum = _tuning_js__WEBPACK_IMPORTED_MODULE_2__[/* tuning */ "a"][propName].max;
                        }
                        else {
                            slider.minimum = 0;
                            slider.maximum = 1;
                        }
                        slider.value = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerGetValue"](cBD, layerName, propName);
                        slider.height = "15px";
                        slider.width = "100px";
                        slider.onValueChangedObservable.add(function(value) {
                            if(!isRefreshingTuning) {
                                isRefreshingTuning = true;
                                lock.isChecked = true;
                                _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD, layerName, propName+"Pin", true);
                                _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD, layerName, propName, value);
                                refreshTuningValues(propName);
                                isRefreshingTuning = false;
                            }
                        });
    
    
                        lock.width = "10px";
                        lock.height = "10px";
                        lock.isChecked = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerGetValue"](cBD, layerName, propName+"Pin");
                        lock.color = "red";
                        lock.onIsCheckedChangedObservable.add(function(value) {
                            if(!isRefreshingTuning) {
                                isRefreshingTuning = true;
                                _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD, layerName, propName+"Pin", value);
                                refreshTuningValues(propName);
                                isRefreshingTuning = false;
                            }
                        });
    
                        rtBar[layerName] = {lock:lock, slider:slider};
    
                        buttonBar.addControl(label);   
                        buttonBar.addControl(slider);  
                        buttonBar.addControl(lock); 
                        rtBar.addControl(buttonBar);
                    }
    
                    for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerDefs"])) {
                        if(layerDef.tuneable !== null) {
                            addTuningButton(layerName);
                        }
                    }
    
                    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(rtBar);
    
                    kbgbGUI.rtBar = rtBar;
                }

                ctrlBar.addControl(addButton("Shape", () => {
                    addRTBar("bezelConcavity");
                }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("Thickness", () => {
                    addRTBar("bezelThickness");
                }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("Corners", () => {
                    addRTBar("caseCornerFillet");
                }, {height:buttonHeight,width:"120px"}));
                
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* setNaturalRotations */ "q"]();
            },
            refresh: () => {},
            remove: () => {
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.activeModeCtrl);
                if(kbgbGUI.rtBar) {
                    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.rtBar);
                }
            }
        },
        "pcb":{
            cameraMode:"rear",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);
            
                let createCheckbox = (prop) => {
                    var checkbox = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Checkbox"]()
                    checkbox.width = "20px";
                    checkbox.height = "20px";
                    checkbox.isChecked = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase][prop];
                    checkbox.color = "orange";
                    checkbox.onIsCheckedChangedObservable.add(function(value) {
                        _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase][prop] = value;
                        _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                    });
                    return checkbox;
                }

                let createTextInput = (prop) => {
                    var input = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["InputText"]();
                    input.width = "80px";
                    input.maxWidth = "80px";
                    input.height = "40px";
                    input.text = ""+_boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase][prop];
                    input.color = "white";
                    input.background = "green";
                    input.onBlurObservable.add((v) => {
                        console.log(`usb port moving to ${v.text}`);
                        let f = parseFloat(v.text);
                        if(f) {
                            _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase][prop] = f;
                        }
                        input.text = ""+_boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase][prop];
                        _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                    });
                    return input;
                } 

                ctrlBar.addControl(kbgbGUI.addLabel("USB: "));
                ctrlBar.addControl(createCheckbox("hasUSBPort"));
                // ctrlBar.addControl(kbgbGUI.addLabel("SYM: "));
                // ctrlBar.addControl(createCheckbox("forcePCBSymmetrical"));
                ctrlBar.addControl(kbgbGUI.addLabel("LOC: "));
                ctrlBar.addControl(createTextInput("usbPortPos"))
                // ctrlBar.addControl(addToggleButton("Center",(value) => {
                //     boardData.getData().cases[kbgbGUI.activeCase]["usbPortCentered"] = value;
                //     boardOps.refreshCase();
                // }));
                ctrlBar.addControl(kbgbGUI.addLabel("Center "));
                ctrlBar.addControl(createCheckbox("usbPortCentered"));

                createSlider(ctrlBar, "Screw span: ", _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].maxScrewSpan, 40, 300, (v) => {
                    _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].maxScrewSpan = v; _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                }); 
                createSlider(ctrlBar, "Screw offset: ", _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].screwBezelBias, 0.0, 1.0, (v) => {
                    _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase].screwBezelBias = v; _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                }); 

                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
                kbgbGUI.activeModeCtrl = ctrlBar;

                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* setNaturalRotations */ "q"]();
            },
            refresh: () => {},
            remove: () => {
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
        "details":{
            cameraMode:"split",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;

                kbgbGUI.addCaseSelection(ctrlBar);

                const caseOptions = [
                    {txt:"smoke",val:"ac_smoke"},
                    {txt:"clear",val:"ac_clear"},
                    {txt:"blue",val:"ac_blue"},
                    {txt:"purp",val:"ac_purple"},
                    {txt:"yello",val:"ac_yellow"},
                    {txt:"alu",val:"aluminium"},
                    {txt:"pom",val:"pom_white"},
                    {txt:"pom(b)",val:"pom_black"},
                    {txt:"stl",val:"steel"},
                    {txt:"pc",val:"pc_cl"}
                ];

                const plateOptions = [
                    {txt:"alu",val:"aluminium"},
                    {txt:"pom",val:"pom_white"},
                    {txt:"pom(b)",val:"pom_black"},
                    {txt:"steel",val:"steel"},
                    {txt:"fr4",val:"fr4"},
                    {txt:"brass",val:"brass"},
                    {txt:"pc",val:"pc_cl"}
                ];

                let caseMatSelection = (o,a,b) => {
                    const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                    cBD.material = o.val;

                    if(plateOptions.findIndex((opt) => opt.val===o.val) >= 0) {
                        _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD, "plate", "material", o.val);
                    } else if(!cBD.layers["plate"] || !cBD.layers["plate"]["material"]) {
                        _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD, "plate", "material", "pom_white");
                    }
                    _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                }
                const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                ctrlBar.addControl(
                    createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, cBD.material, caseOptions, caseMatSelection));

                let getMaterialDropdown = (layerName) => {
                    let layerMatSelection = (o,a,b) => {
                        const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                        _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerSetValue"](cBD, layerName, "material", o.val);
                        _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* refreshCase */ "i"]();
                    };
                    let dd = null;
                    const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                    let existingValue = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerGetValue"](cBD, layerName, "material");
                    switch(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerDefs"][layerName].mat) {
                        case "case":
                            dd = createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, existingValue, caseOptions, layerMatSelection);
                            break;
                        case "plate":
                            dd = createDropdown(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui, existingValue, plateOptions, layerMatSelection);
    
                            break;
                        case "foam":
                            break;
                    }
                    return dd;
                }
                // ctrlBar.addControl(
                //     createDropdown(globals.screengui,0, [
                //         {txt:"smoke",val:"ac_smoke"},
                //         {txt:"clear",val:"ac_clear"},
                //         {txt:"blue",val:"ac_blue"},
                //         {txt:"purp",val:"ac_purple"},
                //         {txt:"yello",val:"ac_yellow"},
                //         {txt:"alu",val:"aluminium"},
                //         {txt:"pom",val:"pom_white"},
                //         {txt:"pom(b)",val:"pom_black"},
                //         {txt:"stl",val:"steel"},
                //         {txt:"pc",val:"pc_cl"}
                //     ], caseMatSelection));

                let addRTBar = function(propName) {
                    if(kbgbGUI.rtBar) {
                        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.rtBar);
                    }

                    let rtBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                    rtBar.width = ".2";
                    rtBar.isPointerBlocker = true;
                    rtBar.isVertical = true;
                    rtBar.horizontalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].HORIZONTAL_ALIGNMENT_RIGHT;

                    let addTuningButton = function(layerName) {
                        const cBD = _boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().cases[kbgbGUI.activeCase];
                        let buttonBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                        buttonBar.height = buttonHeight;
                        buttonBar.isPointerBlocker = true;
                        buttonBar.isVertical = false;
                        buttonBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;
                        
                        let label = kbgbGUI.addLabel(layerName)
                        let dd = getMaterialDropdown(layerName);
    
                        if(dd === null) return;

                        label.height = "40px"
    
                        rtBar[layerName] = {dropdown:dd};
    
                        buttonBar.addControl(label);   
                        buttonBar.addControl(dd);
                        rtBar.addControl(buttonBar);
                    }
    
                    for(const [layerName, layerDef] of Object.entries(_boardData_js__WEBPACK_IMPORTED_MODULE_1__["layerDefs"])) {
                        addTuningButton(layerName);
                    }
    
                    _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(rtBar);
    
                    kbgbGUI.rtBar = rtBar;
                }

                addRTBar();

                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
                
                kbgbGUI.activeModeCtrl = ctrlBar;
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* expandLayers */ "d"]();
            },
            refresh: () => {},
            remove: () => {
                _boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* collapseLayers */ "c"]();
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.activeModeCtrl);
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.rtBar);
            }
        },
        "files":{
            cameraMode:"front",
            add: function() {
                //let ctrlBar = Control.AddHeader(control, text, size, options { isHorizontal, controlFirst }):
                let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
                ctrlBar.height = ctrlBarHeight;
                ctrlBar.isPointerBlocker = true;
                ctrlBar.isVertical = false;
                //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
                ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_BOTTOM;

                ctrlBar.addControl(addButton("DEBUG", () => {
                            for(const [cID,cRD] of Object.entries(_globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].renderData.cases)) {
                                _pcbOps_js__WEBPACK_IMPORTED_MODULE_9__[/* routePCB */ "d"](cID);
                            }
                            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].debugCanvas.hidden = false;
                            // exportKeyboard();
                        }, {height:buttonHeight,width:"120px"}));

                ctrlBar.addControl(addButton("export SVGs", () => {
                            downloadSVGs();
                        }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("export GBRs", () => {
                            downloadGBRs();
                        }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("save layout", () => {
                            download(_boardOps_js__WEBPACK_IMPORTED_MODULE_6__[/* saveKeyboard */ "o"](), `${_boardData_js__WEBPACK_IMPORTED_MODULE_1__["getData"]().meta.name}.kbd`, 'text/plain');
                        }, {height:buttonHeight,width:"120px"}));
                ctrlBar.addControl(addButton("load layout", () => {
                            document.getElementById("loadKBD").click();
                        }, {height:buttonHeight,width:"120px"}));
                
                ctrlBar.addControl(addButton("import kle", (e) => {
                            document.getElementById("loadKLE").click();
                        }, {height:buttonHeight, width:"120px"}));

                let txt = kbgbGUI.addLabel("WORK IN PROGRESS");

                txt.width = "260px";
                ctrlBar.addControl(txt);
                

                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
                
                kbgbGUI.activeModeCtrl = ctrlBar;
            },
            refresh: () => {},
            remove: () => {
                _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.activeModeCtrl);
            }
        },
    },
    setGUIMode: function(mode) {
        if(mode == kbgbGUI.activeMode) {      
            if(kbgbGUI.modes[kbgbGUI.activeMode]) {
                kbgbGUI.modes[kbgbGUI.activeMode].refresh();
            }
            return;
        }

        if(kbgbGUI.modes[kbgbGUI.activeMode]) {
            kbgbGUI.modes[kbgbGUI.activeMode].remove();
        }
        if(kbgbGUI.modes[mode]) {
            kbgbGUI.modes[mode].add();
            kbgbGUI.modes[mode].refresh();
            Object(_gfx_js__WEBPACK_IMPORTED_MODULE_4__[/* snapCamera */ "l"])(kbgbGUI.modes[mode].cameraMode);
        }
        kbgbGUI.activeMode = mode;
    },
    refresh: function() {
        if(kbgbGUI.modes[kbgbGUI.activeMode]) {
            kbgbGUI.modes[kbgbGUI.activeMode].refresh();
        }
    },
    addModeGUI: function() {
        if(kbgbGUI.modeCtrl) {
            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.modeCtrl);
            kbgbGUI.modeCtrl = null;
        }
        else {
            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["AdvancedDynamicTexture"].CreateFullscreenUI("screenUI");
            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.renderScale = 1.0;
        }

        let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
        ctrlBar.height = ctrlBarHeight;
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(addButton("edit", () => {kbgbGUI.addEditModeGUI()}, {height:"1",width:"120px"}));

        kbgbGUI.modeCtrl = ctrlBar;
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
        kbgbGUI.setGUIMode("view");
    },
    addEditModeGUI: function() {
        if(kbgbGUI.modeCtrl) {
            _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.removeControl(kbgbGUI.modeCtrl);
            kbgbGUI.modeCtrl = null;
        }
        let ctrlBar = new babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["StackPanel"]();  
        ctrlBar.height = ctrlBarHeight;
        ctrlBar.isPointerBlocker = true;
        ctrlBar.isVertical = false;
        //ctrlBar.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
        ctrlBar.verticalAlignment = babylonjsGUI__WEBPACK_IMPORTED_MODULE_13__["Control"].VERTICAL_ALIGNMENT_TOP;

        ctrlBar.addControl(addButton("layout", () => {kbgbGUI.setGUIMode("key")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("layers", () => {kbgbGUI.setGUIMode("details")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("case", () => {kbgbGUI.setGUIMode("case")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("parts", () => {kbgbGUI.setGUIMode("pcb")}, {height:"1",width:"120px"}));
        ctrlBar.addControl(addButton("files", () => {kbgbGUI.setGUIMode("files")}, {height:"1",width:"120px"}));


        kbgbGUI.modeCtrl = ctrlBar;
        _globals_js__WEBPACK_IMPORTED_MODULE_0__[/* globals */ "a"].screengui.addControl(ctrlBar);
    }
}

/***/ }),

/***/ "babylonjs":
/*!**************************!*\
  !*** external "BABYLON" ***!
  \**************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = BABYLON;

/***/ }),

/***/ "babylonjsGUI":
/*!******************************!*\
  !*** external "BABYLON.GUI" ***!
  \******************************/
/*! no static exports found */
/*! exports used: AdvancedDynamicTexture, Button, Checkbox, Control, InputText, ScrollViewer, Slider, StackPanel, TextBlock, ToggleButton */
/***/ (function(module, exports) {

module.exports = BABYLON.GUI;

/***/ })

/******/ });
//# sourceMappingURL=pack.js.map