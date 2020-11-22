// rollup.config.js

import {terser} from 'rollup-plugin-terser';

export default {
    input: 'src/base.js',
    output: {
      file: 'static/src/pack.js',
      format: 'umd',
      name: 'base.js',

      sourcemap: true,
      plugins: [terser()]
    }
  };