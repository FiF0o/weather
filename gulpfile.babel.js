"use strict";
//TODO Add task for vendors
//TODO Add task for images

import gulp from 'gulp';
import del from 'del';
import htmlMin from 'gulp-htmlmin';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import eslint from 'gulp-eslint';
import exorcist from 'exorcist';
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import ifElse from 'gulp-if-else';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import sassLint from 'gulp-sass-lint';

//import uncss from 'gulp-uncss';

/**
 Config paramaters for Gulp
*/
import config from './config';

const devBuild = (( config.environment || process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production');
const src = config.source[config.source.length - 1] === '/' ? config.source : `${config.source}/`;
//config.build[--config.build.length] error
const dest = config.build[config.build.length - 1] === '/' ? config.build : `${config.build}/`;
const assets = config.assets[config.assets.length - 1] === '/' ? config.assets : `${config.assets}/`;
//TODO Fix path for images import
const images = {
  in: src + (config.images[config.images.length - 1] === '/' ? config.images : config.images),
  out: dest + assets
};

//TODO Fix path for sass import when css is transpiled
const styles = {
  in: src + config.sass,
  watch: [`${src + config.sass.substring(0, (config.sass.lastIndexOf('/') + 1))}**/*`],
  out: dest + (config.css[config.css.length - 1] === '/' ? config.css : config.css + '/'),
  sassOpt: {
    outputStyle: config.sassOptions.outputStyle || 'compressed',
    imagePath: src + config.sassOptions.imagePath,
    precision: config.sassOptions.precision || 3,
    errLogToConsole: true
  }
};

const js = {
    // in: src + (config.jsDir[config.jsDir.length - 1] === '/' ? config.jsDir + '**/*' : config.jsDir + '/**/*'),
    in: src + (config.jsDir[config.jsDir.length - 1] === '/' ? config.jsDir : config.jsDir + '/'),
    out: dest + config.jsDir,
    //watch: [`${src + config.js.substring(0, (config.js.lastIndexOf('/') +
  // 1))}**/*`],
    filename: config.jsName
  };

const syncOpt = {
  server: {
    baseDir: dest,
    index: config.syncOptions.index || 'index.html'

  },
  open: config.syncOptions.open || false,
  notify: config.syncOptions.notify || true
  //port: process.env.PORT || 3000
  //logFileChanges: false
};

const vendors = {
  in: src + (config.vendors[config.vendors.length - 1] === '/' ?
 `${config.vendors}**/*` : `${config.vendors}/**/*`),
  out: dest + (config.vendors[config.vendors.length - 1] === '/' ?
 config.vendors : config.vendors + '/'),
  watch: [src + (config.vendors[config.vendors.length - 1] === '/' ?
 config.vendors + '**/*' : config.vendors + '/**/*')]
};

const fonts = {
  in: src + (config.fonts[config.fonts.length - 1] === '/' ? config.fonts +
 '**/*' : config.fonts + '/**/*'),
  out: dest + (config.fonts[config.fonts.length - 1] === '/' ? config.fonts :
 config.fonts + '/'),
  watch: [src + (config.fonts[config.fonts.length - 1] === '/' ?
 config.fonts + '**/*' : config.fonts + '/**/*')]
};
/**
 *
 * */

// import it/eveything as an object to return objects and give it an alias to
// use as variable to create objects - string interpolation
import * as pkg  from './package.json';
log(`${pkg.name} ${pkg.version} ${config.environment} build`);

gulp.task('debug', [], () => {
  log(images.in)
  log(images.out)
  log('vendors.in\n'+vendors.in+'\n\n')
  log('vendors.out\n'+vendors.out+'\n\n')
  log('vendors.watch\n'+vendors.watch+'\n\n')
  log('fonts.in\n'+fonts.in+'\n\n')
  log('fonts.out\n'+fonts.out+'\n\n')
  log('fonts.watch\n'+fonts.watch+'\n\n')
});

const sync = browserSync.create();

/**
 * Custom functions
 */

function log(msg) {
  console.log(msg);
}

/**
 * Gulp tasks
 */
gulp.task('html', () => {
  if (!devBuild) {
   return gulp.src([`${src}index.html`])
      .pipe(htmlMin({collapseWhitespace: true}))
      .pipe(gulp.dest(dest))
  } else {
   return gulp.src([`${src}index.html`], { base: 'src/' })
    .pipe(gulp.dest(dest))
  }
  });

gulp.task('html-watch', ['html'], () => sync.reload());


gulp.task('api', () => {
  return gulp.src([`${src}/api/**`])
    .pipe(gulp.dest(`${dest}api/`))
});

 gulp.task('basics', ['html', 'api']);

gulp.task('sass', ['sasslint'], () => {
  // return gulp.src('src/sass/main.sass')
  return gulp.src(styles.in)
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass(
      {
        // indentedSyntax: ,
        // sourceMap: ,
        // sourceComment: ,
        outputStyle: styles.sassOpt.outputStyle,
        image: styles.sassOpt.imagePath,
        precision: styles.sassOpt.precision,
        error: styles.sassOpt.errLogToConsole
      }
    )
    .on('error', sass.logError))
    .pipe(sourcemaps.write('.'))
    // .pipe(gulp.dest('public/assets'));
    .pipe(gulp.dest(styles.out));
});

gulp.task('sasslint', () => {
  //TODO Fix task linting breaks pipe when declaring mixing with string
  // interpolation
  //gulp.src([`${styles.watch}.s+(a|c)ss`, '!node_modules/**'])
  gulp.src([`${styles.watch}.s+(a|c)ss`, '!node_modules/**', '!src/sass/1-tools/**'])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});
//gulp.task('sass:watch', () => {
//  gulp.watch('src/sass/**/*.sass', ['sass']);
//});

// Input file.
watchify.args.debug = true;
var bundler = browserify(js.in + js.filename, watchify.args);

// Babel transform
bundler.transform(babelify.configure({
    sourceMapRelative: 'src'
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    //TODO Refactor ith config param
    .pipe(exorcist('public/assets/js/bundle.js.map'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(ifElse(process.env.NODE_ENV === 'production', uglify))
    .pipe(gulp.dest(js.out));
}

//add Sass task here
gulp.task('default', ['transpile', 'basics', 'sass']);

// add sass task that sass() but sasslint before
gulp.task('transpile', ['lint'], () => bundle());

gulp.task('lint', () => {
    return gulp.src([`${src}/**/*.js`, 'gulpfile.babel.js'])
     .pipe(eslint())
     .pipe(eslint.format())
});

// added sass
gulp.task('serve', ['basics', 'sass', 'transpile'], () => sync.init({ 
  server: {
    baseDir: syncOpt.server.baseDir,
    index: syncOpt.server.index
  }
}));

gulp.task('js-watch', ['transpile'], () => sync.reload());
gulp.task('sass-watch', ['sass'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
  gulp.watch(`${src}/**/*.js`, ['js-watch']);
  gulp.watch(`${styles.watch}.sass`, ['sass-watch']);
  //gulp.watch('public/assets/style.css', sync.reload)
  gulp.watch(`${styles.watch}.sass`, sync.reload);
  // add task for sass watch here
  gulp.watch(`${dest}/index.html`, sync.reload);
});

//import iconfont from 'gulp-iconfont';
//import iconfontCss from 'gulp-iconfont-css';
//import path from 'path';
//import responsive from 'gulp-responsive';

// *****************
//// add custom browserify options here
//var customOpts = {
//  entries: ['./source/assets/js/functions.js'],
//  debug: true,
//  transform: [babelify],
//  // require: { jquery: 'jquery-browserify' }
//};
//var opts = assign({}, watchify.args, customOpts);
//var b = watchify(browserify(opts));
//
//// add transformations here
//// i.e. b.transform(coffeeify);
//
//gulp.task('zarm', bundle); // so you can run `gulp js` to build the file
//b.on('update', bundle); // on any dep update, runs the bundler
//b.on('log', gutil.log); // output build logs to terminal
//
//function bundle() {
//  return b.bundle()
//      // log errors if they happen
//      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
//      .pipe(vinylSource('app.js'))
//      // optional, remove if you don't need to buffer file contents
//      .pipe(buffer())
//      // optional, remove if you dont want sourcemaps
//      .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
//      // Add transformation tasks to the pipeline here.
//      .pipe(sourcemaps.write('./')) // writes .map file
//      .pipe(gulp.dest('./build/assets/js'))
//      //.pipe(browsersync().stream());
//}

gulp.task('image', () => {
 gulp.src(`${images.in}/*.{jpg,jpeg,png}`)
    .pipe(responsive({
     // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
     '*.jpg': [{
         width: 320,
         rename: { suffix: '-320px' }
        },
         {
           width: 480,
           rename: { suffix: '-480px' }
         },
         {
           width: 768,
           rename: { suffix: '-768px' }
         },
         {
           width: 960,
           rename: { suffix: '-960px' }
         },
         {
           // Compress, strip metadata, and rename original image
           rename: { suffix: '-1320px' }
         }]

     // Resize all PNG images to be retina ready
     //'*.png': [{
     //  width: 320
     //},
     //  {
     //  width: 320 * 2,
     //  rename: { suffix: '@2x' }
     //}]
     },
     {
       // Global configuration for all images
       // The output quality for JPEG, WebP and TIFF output formats
       quality: 70,
       // Use progressive (interlace) scan for JPEG and PNG output
       progressive: true,
       // Strip all metadata
       withMetadata: false
     }))
   .pipe(gulp.dest(`${images.out}img`))
});

//// Compile Javascript files
//gulp.task('babel', function () {
//  // to compress Js, update variable environement in config.js to 'production'
//  if (devBuild) {
//    log('-----> Compiling Javascript for Development <-----')
//    return gulp.src(js.in)
//        .pipe(sourcemaps.init())
//        .pipe($.plumber())
//        .pipe($.newer(js.out))
//        .pipe($.jshint())
//        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
//        //.pipe($.jshint.reporter('fail'))
//        .pipe(babel())
//        .pipe($.concat(js.filename))
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest(js.out));
//  } else {
//    log('-----> Compiling Javascript for Production <-----')
//    del([
//      dest + 'js/*'
//    ]);
//    return gulp.src(js.in)
//        .pipe(sourcemaps.init())
//        .pipe($.plumber())
//        .pipe(babel())
//        .pipe($.deporder())
//        .pipe($.size({title: 'Javascript In Size'}))
//        .pipe($.concat(js.filename))
//        .pipe($.stripDebug())
//        //.pipe($.uglify())
//        .pipe(rename({suffix: '.min'}))
//        .pipe($.size({title: 'Javascript Out Size'}))
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest(js.out));
//  }
//})

////Update images on build folder
//gulp.task('build:images',['image','icons']);

//TODO Refactor in the gulp image task
//gulp.task('icons', () => {
//// Creates icons from source directory
//  return gulp.src([`${images.in}/icons/**`],
//        {base: 'source/assets'})
//               .pipe($.newer(images.out))
//               .pipe(gulp.dest(images.out));
//});


//// Update Favicon on build folder
//gulp.task('favicon', () => {
// gulp.src(source + config.favicon)
//  .pipe($.newer(dest))
//  .pipe(gulp.dest(dest))
//});


//gulp.task('iconfont', () => {
//    const fontName = 'icons';
//    const runTimestamp = Math.round(Date.now()/1000);
//    //TODO change base: to global var
//    gulp.src([fonts.in], {base: 'source/assets'})
//        .pipe(iconfontCss({
//            fontName,
//            path: 'source/sass/1-tools/_fonticon.scss',
//            // after Mixin has been executed
//            targetPath: '../../../source/sass/5-custom/_fonticon.scss/',
//            fontPath: '../../assets/fonts/'
//        }))
//        .pipe(iconfont({
//            fontName,
//            formats: ['ttf','eot','woff','svg'],
//            normalize: true,
//            fontHeight: 1001,
//            prependUnicode: true, //
//            timestamp: runTimestamp// recommended opt
//        }))
//        .pipe(gulp.dest(fonts.out));
//});


// Build Task
//gulp.task('build', ['clean', 'jade', 'compass', 'babel', 'iconfont',
// 'favicon', 'build:images', 'watch']);

gulp.task('clean', () => {
  log('-> Cleaning build folder');
  del([
      `${dest}*`
  ]);
  //del([
  //  'public/*',
  //])
});


//TODO Update Help section with new tasks
gulp.task('help', () => {
    console.log('');
    log(`${pkg.name} ${pkg.version} ${config.environment} build`);
    console.log('');
    console.log('======================== Help  ========================');
    console.log('');
    console.log('Usage: gulp [command]');
    console.log('The commands for the task runner are the following.');
    console.log('-------------------------------------------------------');
    console.log('       clean: Removes all the compiled files on ./build');
    console.log('          js: Compile the JavaScript files');
    console.log('        jade: Compile the Jade templates');
    console.log('        sass: Compile the Sass styles');
    console.log('      images: Copy the newer to the build folder');
    console.log('     favicon: Copy the favicon to the build folder');
    console.log('     vendors: Copy the vendors to the build folder');
    console.log('       build: Build the project');
    console.log('       watch: Watch for any changes on the each section');
    console.log('       start: Compile and watch for changes (for dev)');
    console.log('        help: Print this message');
    console.log(' browserSync: Start the browsersync server');
    console.log('========================================================');
    console.log('');
    console.log('========================================================');
    console.log('');
});
