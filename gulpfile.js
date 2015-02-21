
// GULP ========================
// =============================
// must specify NODE_PATH before running gulp
// NODE_PATH=app gulp dev

// load the plugins
var gulp       = require('gulp')
  , nodemon    = require('gulp-nodemon')
  , watch      = require('gulp-watch')
  , livereload = require('gulp-livereload')
  , childProc  = require('child_process')
  , ngrok      = require('ngrok')
  , config     = require('config')
  ;
  

// NGROK -----------------------
// depends on nodemon
gulp.task('ngrok', ['nodemon'], function(callback) {
    err = null;
    ngrok.connect(config.port, function(grokErr, url) {
        err = grokErr;
        console.log('App reachable @ ' + url);
    });
    callback(err);
});

// MONGO -----------------------
gulp.task('mongo', function(callback) {
    err = null;
    childProc.exec('mongod --dbpath ./db', function(procErr,stdout) {
        console.log(stdout);
        err = procErr;
    });
    
    callback(err);
});

// NODEMON ---------------------
// depends on mongo
gulp.task('nodemon', ['mongo'], function(callback) {
    childProc.exec('NODE_PATH=app');
    nodemon({
        script: 'app.js',
        ext: 'js html'
    })

        .on('start', ['watch'])
        .on('change', ['watch'])
        .on('restart', function() {
            console.log('Restarted!');
        });
        
    callback(err);
});

// JS --------------------------
gulp.task('js', function() {
    gulp.src('public/*.js')
        .pipe(livereload());
});

// HTML ------------------------
gulp.task('html', function() {
    gulp.src('public/*.html')
        .pipe(livereload());
});

// WATCH -----------------------
gulp.task('watch', function() {
    livereload.listen();

    gulp.watch(['server.js'], []);
    gulp.watch(['public/*.js'], ['js']);
    gulp.watch(['public/*.html'], ['html']);
});

// defining the main gulp task
gulp.task('default', ['mongo', 'nodemon']);
gulp.task('dev'    , ['mongo', 'nodemon', 'ngrok']);
