import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'

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
  return gulp.src('mobx-src/**/*.js')
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-runtime']
    }))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('public/javascripts/mbox-dist'))
})

gulp.watch(['express-src/**/*.js', 'routes-src/**/*.js', 'mobx-src/**/*.js'], ['compile'])
