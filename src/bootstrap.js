// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
import * as boardOps from './boardOps.js'
export let wasmImport = null;
import(/* webpackPrefetch: true */ 'kbgb-wasm').then( wasm => {
    console.log(wasm);
    wasmImport = wasm;
    wasmImport.init_wasm_env();
    boardOps.finalizeLoadKeyboard();
});

// import("./base.js")
//   .catch(e => console.error("Error importing `base.js`:", e));
