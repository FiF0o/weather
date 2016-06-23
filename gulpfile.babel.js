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
import browserSync from 'browser-sync';
import watchify from 'watchify';
import babelify from 'babelify';
import uglify from 'gulp-uglify';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import sassLint from 'gulp-sass-lint';
import responsive from 'gulp-responsive';
import iconfont from 'gulp-iconfont';
import iconfontCss from 'gulp-iconfont-css';

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
const styles = {
  in: src + config.sass,
  watch: `${src + config.sass.substring(0, (config.sass.lastIndexOf('/') + 1))}**/*`,
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
  log(js.in)
  log(js.out)
  log(js.filename)
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
    //.pipe(uncss({html:['index.html', '']}))
    .pipe(sourcemaps.write('.'))
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

// Input file.
watchify.args.debug = true;
const bundler = browserify(js.in + js.filename, watchify.args);

// Babel transform
bundler.transform(babelify.configure({
    // sourceMaps: true,
    // sourceMapRelative: 'src'
    //sourceMapsAbsolute: true
}));

// On updates recompile
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
    .on('error', function(error){
      console.error( '\nError: ', error.message, '\n');
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(js.out));
}

//add Sass task here
gulp.task('default', ['transpile', 'basics', 'sass']);

// add sass task that sass() but sasslint before
gulp.task('transpile', () => bundle());

gulp.task('lint', () => {
    return gulp.src([`${src}/**/*.js`, 'gulpfile.babel.js'])
     .pipe(eslint())
     .pipe(eslint.format())
});

// added sass
gulp.task('serve', ['basics', 'sass', 'transpile', 'image:all'], () => sync.init({
  server: {
    baseDir: syncOpt.server.baseDir,
    index: syncOpt.server.index
  }
}));

gulp.task('js-watch', ['transpile', 'lint'], () => sync.reload());
gulp.task('sass-watch', ['sass'], () => sync.reload());

gulp.task('watch', ['serve'], () => {
  gulp.watch(`${src}/**/*.js`, ['js-watch']);
  gulp.watch(`${styles.watch}.sass`, ['sass-watch']);
  //gulp.watch('public/assets/style.css', sync.reload)
  gulp.watch(`${styles.watch}.sass`, sync.reload);
  // add task for sass watch here
  gulp.watch(`${dest}/index.html`, sync.reload);
});

gulp.task('image', () => {
  // removed svg and png format as it errors
 gulp.src(`${images.in}/**/*.{jpg,jpeg}`)
    .pipe(responsive({

     // Resize all JPG images to three different sizes: 200, 500, and 630 pixels
     '*.jpg': [
       {width: 320, rename: { suffix: '-320px' }},
         {width: 480, rename: { suffix: '-480px' }},
         {width: 768,rename: { suffix: '-768px' }},
         {width: 960, rename: { suffix: '-960px' }},
         {rename: { suffix: '-1320px' }}
     ],

     // // Resize all PNG images to be retina ready
     // '*.png': [
     //   {width: 120},
     //   {width: 120 * 2, rename: { suffix: '@2x' }}
     // ],
     //  '*.svg': [
     //    {width: 123, }
     //  ]
    },
      {strictMatchImages: false},
     {
       // Global configuration for all images
       // The output quality for JPEG, WebP and TIFF output formats
       quality: 70,
       // Use progressive (interlace) scan for JPEG and PNG output
       progressive: true,
       // Strip all metadata
       withMetadata: false
     }))
   .pipe(gulp.dest(`${images.out}images`))
});

gulp.task('image-svg', () => {
  return gulp.src([`${images.in}/**/*.svg`])
    .pipe(gulp.dest(`${images.out}images`))
});

gulp.task('image-icon', () => {
  return gulp.src([`${images.in}/**/*.png`])
    .pipe(gulp.dest(`${images.out}images`))
});

//TODO Refactor with image task, error is thrown for icons .png...
gulp.task('image:all',['image', 'image-icon', 'image-svg']);

gulp.task('image-watch', ['image:all'], () => sync.reload());

gulp.task('favicon', () => {
  gulp.src(source + config.favicon)
   .pipe(gulp.dest(dest))
});

gulp.task('font-icon', () => {
  // name to be used when calling the css class
   const fontName = 'icons';
   const runTimestamp = Math.round(Date.now()/1000);
   //TODO change base: to var from config
  //base gives relative path starting from the base object
   gulp.src([fonts.in], {base: 'src/assets'})
       .pipe(iconfontCss({
           fontName,
           path: 'src/sass/1-tools/_fonticon.scss',
           // location to output font file after Mixin has been executed
           targetPath: '../../../src/sass/_font-icon.scss',
          // path to get the font to  where it will be transformed -
          // relative to dist dir
           fontPath: '../assets/fonts/'
       }))
       .pipe(iconfont({
           fontName,
           formats: ['ttf','eot','woff','svg'],
           normalize: true,
           fontHeight: 1001,
           prependUnicode: true, //
           timestamp: runTimestamp// recommended opt
       }))
       .pipe(gulp.dest(fonts.out));
});

gulp.task('clean', () => {
  log('-> Cleaning build folder');
  del([
      `${dest}*`
  ]);
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
