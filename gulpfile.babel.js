import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import clean from 'gulp-clean'
import sequence from 'gulp-sequence'
import rename from 'gulp-rename'
import uglify from 'gulp-uglify'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'

// set env to production for react production build
// envify doesn't work here
process.env.NODE_ENV = 'production'

// compiling tasks
gulp.task('build', sequence('clean', 'compile'))
gulp.task('compile', ['compile-express', 'compile-routes', 'compile-mobx'])

gulp.task('compile-express', () => {
  return gulp.src('express-src/**/*.js')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('express-dist'))
})

gulp.task('compile-routes', () => {
  return gulp.src('routes-src/**/*.js')
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }))
    .pipe(gulp.dest('routes'))
})

gulp.task('compile-mobx', () => {
  let bundler = browserify({
    entries: ['./mobx-src/Entry.js'],
    debug: true
  })

  bundler
    .transform(babelify, {
      presets: ["es2015", "react"],
      plugins: [
        'transform-decorators-legacy',
        'transform-runtime',
        'transform-class-properties',
        ['import', { libraryName: 'antd' }]
      ]
    })
    .bundle()
    .pipe(source('./mobx-src/Entry.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('./public/javascripts/mobx-dist/'))
})

// cleaning tasks
gulp.task('clean', ['clean-express', 'clean-routes', 'clean-mobx'])

gulp.task('clean-express', () => {
  return gulp.src('express-dist/**/*.js', {read: false})
    .pipe(clean())
})

gulp.task('clean-routes', () => {
  return gulp.src('routes/**/*.js', {read: false})
    .pipe(clean())
})

gulp.task('clean-mobx', () => {
  return gulp.src('public/javascripts/mobx-dist/**/*.js', {read: false})
    .pipe(clean())
})

// watching tasks
gulp.task('watch', () => {
  let watcher = gulp.watch(['express-src/**/*.js', 'routes-src/**/*.js', 'mobx-src/**/*.js'], (event) => {
    sequence('clean', 'compile')(err => {
      if (err)
        console.log('*** Watcher - Error ***', err)
    })
  })

  watcher.on('change', event => {
    console.log('*** Watcher - File ' + event.path + ' was ' + event.type + ', compiling... ***')
  })
})
