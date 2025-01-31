import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import replace from '@rollup/plugin-replace';
import url from 'postcss-url';

export default [
  {
    input: "app/src/index.tsx",
    output: {
      file: "app/dist/bundle.js",
      format: "iife",
      sourcemap: true,
    },
    plugins: [
      resolve({
        extensions: [".js"],
      }),
      replace({
        preventAssignment: true,
        'process.env.NODE_ENV': JSON.stringify('development')
      }),
      commonjs(),
      typescript({
        tsconfig: './app/tsconfig.json',
        compilerOptions: {
          outDir: './app/dist'
        },
        include: [
          "./app/src/**/*.tsx",
          "./app/src/**/*.ts",
          "./src/**/*.tsx",
          "./src/**/*.ts"
        ],
        exclude: ["dist/**/*.d.ts"]
      }),
      postcss({
        plugins: [
          url({
            url: "inline"
          })
        ]
      }),
      serve({
        open: true,
        verbose: true,
        contentBase: ["", "app", "app/src"],
        host: "localhost",
        port: 3000,
      }),
      livereload({watch: "app/dist"})
    ]
  }
]

