// rollup.config.js

import {terser} from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/base.js',
    output: {
      file: 'static/src/pack.js',
      format: 'umd',
      name: 'base.js',

      sourcemap: true,
      plugins: [terser()]
    },
    plugins: [nodeResolve()]
  };