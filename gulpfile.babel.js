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
process.on('uncaughtException', function(err) {
	console.error('Error caught in uncaughtException event:', err);
})

// compiling tasks
gulp.task('build', sequence('clean', 'compile', 'copy-static'))

gulp.task('copy-static', () => {
    return gulp.src('express-src/public/**/*')
        .pipe(gulp.dest('express-dist/public'))
})

gulp.task('compile', ['compile-express', 'compile-mobx'])

gulp.task('compile-express', () => {
    return gulp.src('express-src/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-runtime']
        }))
        .pipe(gulp.dest('express-dist'))
})

gulp.task('compile-mobx', () => {
    const bundler = browserify({
        entries: ['./mobx-src/Entry.js'],
        debug: true
    })

    return bundler
        .transform(babelify, {
            presets: ['es2015', 'react'],
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
        // .pipe(uglify())
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest('./express-src/public/javascripts/mobx-dist/'))
})

// cleaning tasks
gulp.task('clean', ['clean-express', 'clean-mobx'])

gulp.task('clean-express', () => {
    return gulp.src('express-dist/*', { read: false })
        .pipe(clean())
})

gulp.task('clean-mobx', () => {
    return gulp.src('express-src/public/javascripts/mobx-dist/**/*.js', { read: false })
        .pipe(clean())
})

// watching tasks
gulp.task('watch', ['build'], () => {
    const watcher = gulp.watch(['mobx-src/**/*.js'], (event) => {
        sequence('clean-mobx', 'compile-mobx')((err) => {
            if (err) {
                console.log('*** Watcher - Error ***', err)
            }
        })
    })

    watcher.on('change', (event) => {
        console.log(`*** Watcher - File ${event.path} was ${event.type} compiling... ***`)
    })
})
