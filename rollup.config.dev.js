// rollup.config.js

import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
// import nodePolyfills from 'rollup-plugin-node-polyfills';


export default {
    input: 'src/base.js',
    output: {
      file: 'static/src/pack.js',
      format: 'umd',
      name: 'base.js',
      sourcemap: true
      // ,plugins: [terser()]
    },
    // treeshake:false,
    plugins: [commonjs(), 
              resolve({browser: true,
                           preferBuiltins: false,
                           dedupe: ["svelte"],}),
              json()]
  };