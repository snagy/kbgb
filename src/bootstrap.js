// A dependency graph that contains any wasm must all be imported
// asynchronously. This `bootstrap.js` file does the single async import, so
// that no one else needs to worry about it again.
export let wasmImport = null;
import(/* webpackPrefetch: true */ 'kbgb-wasm').then( wasm => {
    console.log(wasm);
    wasmImport = wasm;
});

// import("./base.js")
//   .catch(e => console.error("Error importing `base.js`:", e));
