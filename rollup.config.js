import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const rollupConfig = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/svg-engine.js',
      format: 'esm'
    },
    {
      name: 'svgEngine',
      file: 'dist/svg-engine.browser.js',
      format: 'iife'
    },
    {
      file: 'dist/svg-engine.cjs.js',
      format: 'cjs'
    },
    {
      name: 'svg-engine',
      file: 'dist/svg-engine.umd.js',
      format: 'umd'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage'
          }
        ]
      ],
      plugins : [
        '@babel/plugin-transform-runtime'
      ],
      runtimeHelpers : true
    }),
    commonjs()
  ]
}

module.exports = rollupConfig;
