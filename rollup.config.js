import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';

import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';

const config = {
  input: 'site/templates/scripts/master.js',
  output: [
    {
      file: 'site/templates/scripts/master.min.js',
      format: 'cjs'
    }
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development")
    }),
    nodePolyfills(),

    resolve({
      browser: true
    }),
    commonjs({
      include: 'node_modules/**',
      requireReturnsDefault: 'auto',
      namedExports: {
        react: Object.keys(react),
        'react-dom': Object.keys(reactDom),
        'react-is': Object.keys(reactIs),
        'prop-types': Object.keys(propTypes),
        '@apollo/client': ['ApolloProvider', 'ApolloClient', 'HttpLink', 'InMemoryCache', 'useQuery', 'gql'],
        'styled-components': ['styled', 'css', 'ThemeProvider']
      },
    }),
    babel({
      babelrc: true,
      exclude: 'node_modules/**'
    }),
    terser()
  ]
};

export default config;