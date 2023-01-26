(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./pkg/kbgb_wasm.js":
/*!**************************!*\
  !*** ./pkg/kbgb_wasm.js ***!
  \**************************/
/*! exports provided: init_wasm_env, BoardGeometry, CaseGeometry, PCBData, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbindgen_json_parse, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbg_log_386a8115a84a780d, __wbindgen_throw */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kbgb_wasm_bg.wasm */ "./pkg/kbgb_wasm_bg.wasm");
/* harmony import */ var _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kbgb_wasm_bg.js */ "./pkg/kbgb_wasm_bg.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "init_wasm_env", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["l"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BoardGeometry", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CaseGeometry", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PCBData", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["c"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_object_drop_ref", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["i"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_string_new", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["j"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_json_parse", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["h"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_new_59cb74e423758ede", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["f"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_stack_558ba5917b466edd", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["g"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_error_4bb6c2a97407129a", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbg_log_386a8115a84a780d", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "__wbindgen_throw", function() { return _kbgb_wasm_bg_js__WEBPACK_IMPORTED_MODULE_1__["k"]; });




/***/ }),

/***/ "./pkg/kbgb_wasm_bg.js":
/*!*****************************!*\
  !*** ./pkg/kbgb_wasm_bg.js ***!
  \*****************************/
/*! exports provided: init_wasm_env, BoardGeometry, CaseGeometry, PCBData, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbindgen_json_parse, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __wbg_log_386a8115a84a780d, __wbindgen_throw */
/*! exports used: BoardGeometry, CaseGeometry, PCBData, __wbg_error_4bb6c2a97407129a, __wbg_log_386a8115a84a780d, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbindgen_json_parse, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbindgen_throw, init_wasm_env */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return init_wasm_env; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BoardGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CaseGeometry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return PCBData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __wbindgen_object_drop_ref; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __wbindgen_string_new; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __wbindgen_json_parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __wbg_new_59cb74e423758ede; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __wbg_stack_558ba5917b466edd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __wbg_error_4bb6c2a97407129a; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __wbg_log_386a8115a84a780d; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __wbindgen_throw; });
/* harmony import */ var _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kbgb_wasm_bg.wasm */ "./pkg/kbgb_wasm_bg.wasm");


const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "o"].buffer) {
        cachegetUint8Memory0 = new Uint8Array(_kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "o"].buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
/**
*/
function init_wasm_env() {
    _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* init_wasm_env */ "n"]();
}

let WASM_VECTOR_LEN = 0;

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "o"].buffer) {
        cachegetInt32Memory0 = new Int32Array(_kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* memory */ "o"].buffer);
    }
    return cachegetInt32Memory0;
}
/**
*/
class BoardGeometry {

    static __wrap(ptr) {
        const obj = Object.create(BoardGeometry.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_boardgeometry_free */ "a"](ptr);
    }
    /**
    * @returns {BoardGeometry}
    */
    static new() {
        var ret = _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* boardgeometry_new */ "h"]();
        return BoardGeometry.__wrap(ret);
    }
    /**
    * @param {number} case_id
    * @param {number} id
    * @param {string} key_type
    * @param {number} x
    * @param {number} y
    * @param {number} w
    * @param {number} h
    * @param {number} rot_angle
    */
    add_key(case_id, id, key_type, x, y, w, h, rot_angle) {
        var ptr0 = passStringToWasm0(key_type, _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "e"], _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "f"]);
        var len0 = WASM_VECTOR_LEN;
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* boardgeometry_add_key */ "g"](this.ptr, case_id, id, ptr0, len0, x, y, w, h, rot_angle);
    }
}
/**
*/
class CaseGeometry {

    static __wrap(ptr) {
        const obj = Object.create(CaseGeometry.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_casegeometry_free */ "b"](ptr);
    }
    /**
    * @returns {CaseGeometry}
    */
    static new() {
        var ret = _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* casegeometry_new */ "j"]();
        return CaseGeometry.__wrap(ret);
    }
    /**
    * @param {string} layer_name
    * @param {number} thickness
    */
    set_layer_override(layer_name, thickness) {
        var ptr0 = passStringToWasm0(layer_name, _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "e"], _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "f"]);
        var len0 = WASM_VECTOR_LEN;
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* casegeometry_set_layer_override */ "m"](this.ptr, ptr0, len0, thickness);
    }
    /**
    * @param {number} id
    * @param {string} device_type_string
    * @param {number} x
    * @param {number} y
    * @param {number} w
    * @param {number} h
    * @param {number} rot_angle
    */
    add_key(id, device_type_string, x, y, w, h, rot_angle) {
        var ptr0 = passStringToWasm0(device_type_string, _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "e"], _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "f"]);
        var len0 = WASM_VECTOR_LEN;
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* casegeometry_add_key */ "i"](this.ptr, id, ptr0, len0, x, y, w, h, rot_angle);
    }
    /**
    * @returns {any}
    */
    process_layout() {
        var ret = _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* casegeometry_process_layout */ "l"](this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {any}
    */
    process_case() {
        var ret = _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* casegeometry_process_case */ "k"](this.ptr);
        return takeObject(ret);
    }
}
/**
*/
class PCBData {

    static __wrap(ptr) {
        const obj = Object.create(PCBData.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbg_pcbdata_free */ "c"](ptr);
    }
    /**
    * @returns {PCBData}
    */
    static new() {
        var ret = _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* pcbdata_new */ "p"]();
        return PCBData.__wrap(ret);
    }
    /**
    * @param {number} min_x
    * @param {number} min_y
    * @param {number} max_x
    * @param {number} max_y
    */
    set_bounds(min_x, min_y, max_x, max_y) {
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* pcbdata_set_bounds */ "r"](this.ptr, min_x, min_y, max_x, max_y);
    }
    /**
    * @returns {number}
    */
    route() {
        const ptr = this.__destroy_into_raw();
        var ret = _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* pcbdata_route */ "q"](ptr);
        return ret;
    }
}

const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

const __wbindgen_json_parse = function(arg0, arg1) {
    var ret = JSON.parse(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

const __wbg_new_59cb74e423758ede = function() {
    var ret = new Error();
    return addHeapObject(ret);
};

const __wbg_stack_558ba5917b466edd = function(arg0, arg1) {
    var ret = getObject(arg1).stack;
    var ptr0 = passStringToWasm0(ret, _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_malloc */ "e"], _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_realloc */ "f"]);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

const __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {
    try {
        console.error(getStringFromWasm0(arg0, arg1));
    } finally {
        _kbgb_wasm_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[/* __wbindgen_free */ "d"](arg0, arg1);
    }
};

const __wbg_log_386a8115a84a780d = function(arg0) {
    console.log(getObject(arg0));
};

const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./pkg/kbgb_wasm_bg.wasm":
/*!*******************************!*\
  !*** ./pkg/kbgb_wasm_bg.wasm ***!
  \*******************************/
/*! exports provided: memory, init_wasm_env, __wbg_casegeometry_free, casegeometry_new, casegeometry_set_layer_override, casegeometry_add_key, casegeometry_process_layout, casegeometry_process_case, __wbg_boardgeometry_free, boardgeometry_new, boardgeometry_add_key, __wbg_pcbdata_free, pcbdata_new, pcbdata_set_bounds, pcbdata_route, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free */
/*! exports used: __wbg_boardgeometry_free, __wbg_casegeometry_free, __wbg_pcbdata_free, __wbindgen_free, __wbindgen_malloc, __wbindgen_realloc, boardgeometry_add_key, boardgeometry_new, casegeometry_add_key, casegeometry_new, casegeometry_process_case, casegeometry_process_layout, casegeometry_set_layer_override, init_wasm_env, memory, pcbdata_new, pcbdata_route, pcbdata_set_bounds */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Instantiate WebAssembly module
var wasmExports = __webpack_require__.w[module.i];

// export exports from WebAssembly module
module.exports = wasmExports;
// exec imports from WebAssembly module (for esm order)
/* harmony import */ var m0 = __webpack_require__(/*! ./kbgb_wasm_bg.js */ "./pkg/kbgb_wasm_bg.js");


// exec wasm module
wasmExports["s"]()

/***/ })

}]);
//# sourceMappingURL=0.pack.js.map