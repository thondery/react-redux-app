#!/usr/bin/env node
'use strict'

import config from './config'
import gulp from 'gulp'
import del from 'del'
import gulpLoadPlugins from 'gulp-load-plugins'
import compiler_Config from './webpack.config'
import compiler_Watch  from './webpack.watch'

const [$, paths] = [
  gulpLoadPlugins(),
  config.utils_paths
]

// -------------------------------
// 清除编译目录
// -------------------------------
gulp.task('clean', () =>
  del.sync(config.dir_dist, { dot: true })
)

// -------------------------------
// 编译APP源码
// -------------------------------
gulp.task('compile', ['clean'], () =>
  gulp.src(paths.client('main.js'))
      .pipe($.webpack(compiler_Config))
      .pipe(gulp.dest(config.dir_dist))
)

// -------------------------------
// 调试服务
// -------------------------------
gulp.task('server', ['compile'], () =>
  gulp.src(config.dir_dist)
      .pipe($.webserver({
        host: config.dev_host,
        port: config.dev_port,
        fallback: 'index.html',
        livereload: true,
        directoryListing: false,
        open: false
      }))
)

// -------------------------------
// 监视文件变化
// -------------------------------
gulp.task('watch', ['server'], () => {
  $.watch(['./src/**/*+(js|jsx|es6)'], () =>
    gulp.src(paths.client('main.js'))
      .pipe($.webpack(compiler_Watch))
      .pipe(gulp.dest(config.dir_dist))
  )
})

// -------------------------------
// 调试模式
// -------------------------------
gulp.task('dev', ['watch'])

// -------------------------------
// 编译模式
// -------------------------------
gulp.task('build', ['compile'])