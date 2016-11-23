/*
* @Author: janmi
* @Date:   2015-07-04 17:22:00
* @Last Modified by:   anchen
* @Last Modified time: 2016-07-14 15:36:25
*/


var gulp = require('gulp'),
    less = require('gulp-less'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    browserSync = require("browser-sync"),
    changed = require('gulp-changed'),
    pug = require('gulp-pug'),
    htmlBeautify = require('gulp-html-beautify');

    var HTML_PATH = 'html/';

    gulp.task('views', function buildHTML() {
      return gulp.src('views/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(htmlBeautify({
          indent_size: 2,
          indent_char: ' ',
          // 这里是关键，可以让一个标签独占一行
          unformatted: true,
          // 默认情况下，body | head 标签前会有一行空格
          extra_liners: []
        }))
    	.pipe(gulp.dest(HTML_PATH))
      .pipe(browserSync.stream());
    });

    gulp.task('less', function(){
        gulp.src('less/*.less', {base:'less'})
            .pipe(plumber())
            .pipe(changed('css',{extension: '.css'}))
            .pipe(less())
            .pipe(autoprefixer({
                browsers: ['last 100 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove:true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest('css'))
            .pipe(browserSync.stream());
    });

    gulp.task('server', ['views', 'less'], function(){
        browserSync.init({
            files: '**/*',
            server: {
                baseDir: '.'
            }
        });

        gulp.watch('less/**/*.less',['less']);
        gulp.watch('views/**/*.pug',['views']);

    });
