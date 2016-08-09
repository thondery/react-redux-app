'use strict'

import path from 'path'
import { argv } from 'yargs'

const config = {
  env: process.env.NODE_ENV || 'development',
  path_base: path.resolve(__dirname, './'),
  dev_host: 'localhost',
  dev_port: 3004,
  dir_dist: 'dist',
  dir_client: 'src',
  dir_test: 'tests',
  compiler_vendor: [
    'babel-polyfill',
    'history',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux',
    'bootstrap/dist/css/bootstrap.css'
  ]
}

config.globals = {
  'process.env': {
    NODE_ENV: JSON.stringify(config.env)
  },
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
  '__TEST__': config.env === 'test',
  '__DEBUG__': config.env === 'development' && !argv.no_debug,
  '__COVERAGE__' : !argv.watch && config.env === 'test',
  '__BASENAME__' : JSON.stringify(process.env.BASENAME || '')
}

// ------------------------------------
// Utilities
// ------------------------------------
const resolve = path.resolve
const base = (...args) =>
  Reflect.apply(resolve, null, [config.path_base, ...args])

config.utils_paths = {
  base   : base,
  client : base.bind(null, config.dir_client),
  dist   : base.bind(null, config.dir_dist)
}

export default config